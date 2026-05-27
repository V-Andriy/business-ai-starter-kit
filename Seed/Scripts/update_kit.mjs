#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const defaultRepo = 'https://github.com/V-Andriy/business-ai-starter-kit.git';

function parseArgs(argv) {
  const args = { workspace: '.', repo: defaultRepo };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--workspace') {
      args.workspace = argv[index + 1] || '.';
      index += 1;
    } else if (arg === '--repo') {
      args.repo = argv[index + 1] || defaultRepo;
      index += 1;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node Scripts/update_kit.mjs [--workspace .] [--repo URL]

Refresh .business-ai-kit/source.`);
}

function run(cmd, args, cwd = undefined) {
  console.log(`+ ${[cmd, ...args].join(' ')}`);
  return spawnSync(cmd, args, { cwd, stdio: 'inherit' }).status ?? 1;
}

function timestamp() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, '0');
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    '-',
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = path.resolve(args.workspace);
  const kitDir = path.join(workspace, '.business-ai-kit');
  const sourceDir = path.join(kitDir, 'source');
  const backupDir = path.join(kitDir, 'backups');

  fs.mkdirSync(kitDir, { recursive: true });

  if (!fs.existsSync(sourceDir)) {
    return run('git', ['clone', args.repo, sourceDir]);
  }

  if (fs.existsSync(path.join(sourceDir, '.git'))) {
    const code = run('git', ['pull', '--ff-only'], sourceDir);
    if (code === 0) return 0;
  }

  fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, `source-backup-${timestamp()}`);
  fs.renameSync(sourceDir, backupPath);
  console.log(`Moved broken source cache to ${backupPath}`);
  return run('git', ['clone', args.repo, sourceDir]);
}

process.exit(main());
