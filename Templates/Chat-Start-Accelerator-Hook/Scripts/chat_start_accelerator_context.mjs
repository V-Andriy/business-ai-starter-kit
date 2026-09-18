#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Optional navigation hint only. Workspace content is loaded on demand.
const pointers = [
  'Agent-Instructions/Current-Focus.md',
  'Agent-Instructions/Inbox.md',
  'Agent-Instructions/Active-Threads.md',
];

function parseArgs(argv) {
  const args = { workspace: process.cwd() };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--workspace') {
      args.workspace = argv[++index] || process.cwd();
    } else if (argv[index] === '-h' || argv[index] === '--help') {
      console.log('Usage: node Scripts/chat_start_accelerator_context.mjs [--workspace .]');
      process.exit(0);
    }
  }
  return args;
}

function buildContext(workspace) {
  const lines = [
    'Business AI Starter Kit: follow AGENTS.md.',
    'Load only the context needed for the current request. This hook does not read file contents.',
  ];
  const setupPath = path.join(workspace, 'Agent-Instructions/Setup-Plan.md');
  if (fs.existsSync(setupPath)) {
    lines.push('Setup checklist available: Agent-Instructions/Setup-Plan.md. Check recorded setup state; brief onboarding and profile confirmation are required before setup is complete.');
  }
  for (const relativePath of pointers) {
    if (fs.existsSync(path.join(workspace, relativePath))) lines.push(`Context pointer: ${relativePath}`);
  }
  return lines.join('\n');
}

function main() {
  const workspace = path.resolve(parseArgs(process.argv.slice(2)).workspace);
  if (!fs.existsSync(path.join(workspace, 'Agent-Instructions'))) return;
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: buildContext(workspace),
    },
  }));
}

main();
