#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const sessionStartHook = {
  matcher: 'startup|resume',
  hooks: [
    {
      type: 'command',
      command:
        'ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"; node "$ROOT/Scripts/chat_start_accelerator_context.mjs" --workspace "$ROOT"',
      timeout: 5,
      statusMessage: 'Loading workspace startup context',
    },
  ],
};

// Codex reads .codex/hooks.json and Claude Code reads .claude/settings.json,
// but both use the same SessionStart hook shape and the same script, which
// emits hookSpecificOutput.additionalContext. Install into both so the hook
// works in whichever harness opens the workspace.
const harnessHookFiles = [
  { name: 'Codex', file: ['.codex', 'hooks.json'] },
  { name: 'Claude Code', file: ['.claude', 'settings.json'] },
];

function parseArgs(argv) {
  const args = { workspace: '.' };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--workspace') {
      args.workspace = argv[index + 1] || '.';
      index += 1;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node Scripts/install_chat_start_hook.mjs [--workspace .]

Install the optional Business AI Starter Kit startup context hook for Codex and Claude Code.`);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Could not parse existing ${filePath}: ${error.message}`);
  }
}

function sameHook(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function mergeHooks(existing) {
  const next = existing && typeof existing === 'object' ? existing : {};
  next.hooks = next.hooks && typeof next.hooks === 'object' ? next.hooks : {};
  const current = Array.isArray(next.hooks.SessionStart) ? next.hooks.SessionStart : [];

  if (!current.some((entry) => sameHook(entry, sessionStartHook))) {
    next.hooks.SessionStart = [...current, sessionStartHook];
  } else {
    next.hooks.SessionStart = current;
  }

  return next;
}

function writeIfChanged(filePath, content) {
  try {
    if (fs.readFileSync(filePath, 'utf8') === content) return false;
  } catch {
    // File does not exist yet.
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function findAcceleratorScript(workspace) {
  const candidates = [
    path.join(workspace, '.business-ai-kit', 'source', 'Templates', 'Chat-Start-Accelerator-Hook', 'Scripts', 'chat_start_accelerator_context.mjs'),
    path.join(workspace, 'Templates', 'Chat-Start-Accelerator-Hook', 'Scripts', 'chat_start_accelerator_context.mjs'),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = path.resolve(args.workspace);
  const sourceScript = findAcceleratorScript(workspace);

  if (!sourceScript) {
    console.error('Chat Start Accelerator template not found. Run pnpm kit:update first, then try again.');
    return 1;
  }

  const targetScript = path.join(workspace, 'Scripts', 'chat_start_accelerator_context.mjs');
  const scriptChanged = writeIfChanged(targetScript, fs.readFileSync(sourceScript, 'utf8'));
  if (scriptChanged) console.log(`Installed ${path.relative(workspace, targetScript)}`);

  let anyHookChanged = false;
  for (const harness of harnessHookFiles) {
    const hooksPath = path.join(workspace, ...harness.file);
    let mergedHooks;
    try {
      mergedHooks = mergeHooks(readJson(hooksPath));
    } catch (error) {
      console.error(error.message);
      console.error('Fix the existing hooks file, then run the installer again.');
      return 1;
    }
    const hooksChanged = writeIfChanged(hooksPath, `${JSON.stringify(mergedHooks, null, 2)}\n`);
    if (hooksChanged) {
      console.log(`Updated ${path.relative(workspace, hooksPath)} (${harness.name})`);
      anyHookChanged = true;
    }
  }

  if (!scriptChanged && !anyHookChanged) console.log('Chat Start Accelerator hook is already installed.');
  console.log('In Codex, open /hooks and trust the project hook. In Claude Code, review .claude/settings.json and approve the hook if prompted.');
  return 0;
}

process.exit(main());
