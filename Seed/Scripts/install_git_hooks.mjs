#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const hook = `#!/bin/sh
set -eu

if [ -f "Scripts/secret_scan.mjs" ]; then
  node Scripts/secret_scan.mjs --staged
elif [ -f ".business-ai-kit/source/Seed/Scripts/secret_scan.mjs" ]; then
  node .business-ai-kit/source/Seed/Scripts/secret_scan.mjs --staged
elif [ -f "Seed/Scripts/secret_scan.mjs" ]; then
  node Seed/Scripts/secret_scan.mjs --staged
else
  echo "Business AI Kit secret scanner not found; refusing commit for safety." >&2
  exit 1
fi
`;

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
  console.log(`Usage: node Scripts/install_git_hooks.mjs [--workspace .]

Install the Business AI Starter Kit pre-commit hook.`);
}

function run(cmd, args, cwd) {
  return spawnSync(cmd, args, { cwd, stdio: 'inherit' }).status ?? 1;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = path.resolve(args.workspace);
  const gitDir = path.join(workspace, '.git');

  if (!fs.existsSync(gitDir)) {
    let code = run('git', ['init', '-b', 'main'], workspace);
    if (code !== 0) code = run('git', ['init'], workspace);
    if (code !== 0) {
      console.error('Could not initialize Git repository.');
      return code;
    }
  }

  const hooksDir = path.join(workspace, '.git', 'hooks');
  fs.mkdirSync(hooksDir, { recursive: true });
  const hookPath = path.join(hooksDir, 'pre-commit');

  if (fs.existsSync(hookPath)) {
    const existing = fs.readFileSync(hookPath, 'utf8');
    if (!existing.includes('Business AI Kit secret scanner') && !existing.includes('secret_scan.mjs')) {
      const backupPath = path.join(hooksDir, 'pre-commit.business-ai-kit-backup');
      fs.writeFileSync(backupPath, existing, 'utf8');
      console.log(`Existing pre-commit hook backed up to ${backupPath}`);
    }
  }

  fs.writeFileSync(hookPath, hook, 'utf8');
  fs.chmodSync(hookPath, 0o755);
  console.log(`Installed pre-commit hook at ${hookPath}`);
  return 0;
}

process.exit(main());
