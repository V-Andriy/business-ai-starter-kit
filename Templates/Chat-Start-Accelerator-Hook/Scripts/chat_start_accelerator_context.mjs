#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const maxFileChars = 9000;
const maxTotalChars = 45000;

const startupFiles = [
  'Agent-Instructions/Soul.md',
  'Agent-Instructions/Current-Focus.md',
  'Agent-Instructions/Active-Threads.md',
  'Agent-Instructions/Workspace-Map.md',
  'Agent-Instructions/Inbox.md',
  'Agent-Instructions/Agent-State.md',
];

function parseArgs(argv) {
  const args = { workspace: process.cwd() };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--workspace') {
      args.workspace = argv[index + 1] || process.cwd();
      index += 1;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node Scripts/chat_start_accelerator_context.mjs [--workspace .]

Print compact Codex startup context for a Business AI Starter Kit workspace.`);
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function truncate(text, limit) {
  if (text.length <= limit) return text.trim();
  return `${text.slice(0, limit).trim()}\n\n[truncated for startup context]`;
}

function gitOutput(workspace, args) {
  const result = spawnSync('git', args, {
    cwd: workspace,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
  if (result.error && result.error.code === 'ENOENT') return 'git unavailable';
  if (result.status !== 0) return null;
  return result.stdout.trim();
}

function gitSummary(workspace) {
  const branch = gitOutput(workspace, ['branch', '--show-current']) || 'unknown';
  const status = gitOutput(workspace, ['status', '--short']);
  if (status === 'git unavailable') return ['Git: unavailable'];
  if (status === null) return ['Git: not initialized or status unavailable'];

  const visibleStatus = status
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .filter((line) => !line.includes('.business-ai-kit/source/'));

  if (!visibleStatus.length) return [`Git branch: ${branch || 'unknown'}`, 'Git status: clean'];
  return [
    `Git branch: ${branch || 'unknown'}`,
    `Git status: ${visibleStatus.length} changed path(s)`,
    ...visibleStatus.slice(0, 20).map((line) => `- ${line}`),
  ];
}

function pendingItemCount(text) {
  if (!text) return 0;
  return text.split(/\r?\n/).filter((line) => {
    const trimmed = line.trim();
    return trimmed.startsWith('- ') && !trimmed.toLowerCase().startsWith('- no ');
  }).length;
}

function buildContext(workspace) {
  const sections = [];
  const missing = [];
  const setupPlanPath = path.join(workspace, 'Agent-Instructions', 'Setup-Plan.md');
  const setupActive = fs.existsSync(setupPlanPath);
  const sourceCacheExists = fs.existsSync(path.join(workspace, '.business-ai-kit', 'source'));
  const inboxText = readText(path.join(workspace, 'Agent-Instructions', 'Inbox.md'));

  sections.push('# Business AI Starter Kit Startup Context');
  sections.push('');
  sections.push('Use this as startup context only. Follow AGENTS.md and load specific files again before editing them.');
  sections.push('');
  sections.push('## Workspace State');
  sections.push(`- Workspace: ${workspace}`);
  sections.push(`- Setup active: ${setupActive ? 'yes' : 'no'}`);
  sections.push(`- Pending inbox items: ${pendingItemCount(inboxText)}`);
  sections.push(`- Source cache present: ${sourceCacheExists ? 'yes' : 'no'}`);
  sections.push(...gitSummary(workspace));

  const filesToRead = setupActive
    ? [...startupFiles, 'Agent-Instructions/Setup-Plan.md']
    : startupFiles;

  for (const relativePath of filesToRead) {
    const absolutePath = path.join(workspace, relativePath);
    const text = readText(absolutePath);
    if (text === null) {
      missing.push(relativePath);
      continue;
    }
    sections.push('');
    sections.push(`## ${relativePath}`);
    sections.push(truncate(text, maxFileChars));
  }

  if (missing.length) {
    sections.push('');
    sections.push('## Missing Startup Files');
    for (const relativePath of missing) sections.push(`- ${relativePath}`);
  }

  sections.push('');
  sections.push('## Startup Reminder');
  sections.push('- If Setup-Plan.md exists, finish setup before normal project work.');
  sections.push('- Treat Inbox.md as active working memory.');
  sections.push('- Load the relevant skill before specialized work.');
  sections.push('- Do not expose secrets or private notes.');

  return truncate(sections.join('\n'), maxTotalChars);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = path.resolve(args.workspace);

  if (!fs.existsSync(path.join(workspace, 'Agent-Instructions'))) {
    return 0;
  }

  const additionalContext = buildContext(workspace);
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext,
    },
  }));
  return 0;
}

process.exit(main());
