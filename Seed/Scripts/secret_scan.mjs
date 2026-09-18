#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const patterns = [
  ['OpenAI API key', /\bsk-[A-Za-z0-9_-]{20,}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ['Stripe secret key', /\bsk_(live|test)_[A-Za-z0-9]{20,}\b/],
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['Private key block', /-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['Generic secret assignment', /\b(api[_-]?key|secret|token|password)\b\s*[:=]\s*['"]?([A-Za-z0-9_./+=-]{24,})/i],
];
const skipDirs = new Set(['.git', 'node_modules', '__pycache__', '.venv', 'venv', '.next', 'dist', 'build']);
const binaryExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.pdf', '.zip', '.tar', '.gz', '.sqlite', '.db']);

function git(args, cwd = process.cwd(), encoding = 'utf8') {
  const result = spawnSync('git', args, { cwd, encoding, maxBuffer: 32 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    throw new Error('Git scan input unavailable. Use explicit file paths outside a Git workspace.');
  }
  return result.stdout;
}

function gitPaths(args, root) {
  return git(args, root).split('\0').filter(Boolean);
}

function skip(file) {
  const parts = file.split(path.sep);
  return parts.some((part) => skipDirs.has(part))
    || parts.join('/').includes('.business-ai-kit/source/')
    || binaryExtensions.has(path.extname(file).toLowerCase());
}

function walk(file, files) {
  if (skip(file)) return;
  const stat = fs.lstatSync(file);
  if (stat.isSymbolicLink()) return;
  if (stat.isFile()) files.push(file);
  else if (stat.isDirectory()) {
    for (const name of fs.readdirSync(file)) walk(path.join(file, name), files);
  }
}

function inputs(args) {
  const staged = args.includes('--staged');
  const all = args.includes('--all');
  if (staged && all) throw new Error('Choose --staged or --all, not both.');
  const paths = args.filter((arg) => !['--', '--staged', '--all'].includes(arg));
  if (paths.some((arg) => arg.startsWith('--'))) throw new Error('Unknown scan option.');
  // --staged takes precedence over paths from a package script.
  if (paths.length && !staged && !all) {
    const files = [];
    for (const file of paths) walk(file, files);
    return { root: process.cwd(), files, staged: false };
  }
  const root = git(['rev-parse', '--show-toplevel']).trim();
  const stagedPaths = () => gitPaths(['diff', '--cached', '--name-only', '-z', '--diff-filter=ACMRT'], root);
  const files = staged ? stagedPaths() : all
    ? gitPaths(['ls-files', '-z', '--cached', '--others', '--exclude-standard'], root)
    : [
      ...stagedPaths(),
      ...gitPaths(['diff', '--name-only', '-z', '--diff-filter=ACMRT'], root),
      ...gitPaths(['ls-files', '-z', '--others', '--exclude-standard'], root),
    ];
  return { root, files, staged };
}

function read(file, root, staged) {
  if (staged) return git(['show', `:${file}`], root, null);
  const absolute = path.resolve(root, file);
  // Deleted files and symlinks contain no working-tree text to inspect.
  if (!fs.existsSync(absolute) || fs.lstatSync(absolute).isSymbolicLink()) return null;
  return fs.readFileSync(absolute);
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node Scripts/secret_scan.mjs [--staged | --all | paths...]\nDefault: changed and new non-ignored Git files. --staged scans index contents; --all audits all non-ignored Git files.');
    return 0;
  }
  try {
    const { root, files, staged } = inputs(args);
    let checked = 0;
    let found = false;
    for (const file of new Set(files)) {
      if (skip(file)) continue;
      const data = read(file, root, staged);
      if (!data || data.includes(0)) continue;
      checked += 1;
      data.toString('utf8').split(/\r?\n/).forEach((line, index) => {
        // Ignore the placeholder itself, never the rest of a line or example file.
        const content = line.replace(/<SECRET:[A-Z0-9_]+>/g, '');
        const match = patterns.find(([, pattern]) => pattern.test(content));
        if (match) {
          found = true;
          console.log(`- ${JSON.stringify(file)}:${index + 1} (${match[0]})`);
        }
      });
    }
    if (found) {
      console.log('Secret scan failed. Remove raw credentials from these files before sharing or committing.');
      return 1;
    }
    console.log(checked ? `Secret scan passed (${checked} file(s) checked).` : 'Secret scan skipped: no eligible changed files.');
    return 0;
  } catch (error) {
    // Report no file contents or Git output, which could contain credentials.
    console.error(`Secret scan could not complete: ${error.code || error.message}`);
    return 1;
  }
}

process.exit(main());
