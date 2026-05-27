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

const safePlaceholder = /<SECRET:[A-Z0-9_]+>/;
const skipDirs = new Set([
  '.git',
  '.business-ai-kit/source',
  'node_modules',
  '__pycache__',
  '.venv',
  'venv',
  '.next',
  'dist',
  'build',
]);
const skipSuffixes = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.pdf',
  '.zip',
  '.tar',
  '.gz',
  '.sqlite',
  '.db',
]);
const safeFilenames = new Set(['.env.example']);

function parseArgs(argv) {
  const args = { paths: [], staged: false };
  for (const arg of argv) {
    if (arg === '--staged') {
      args.staged = true;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    } else {
      args.paths.push(arg);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node Scripts/secret_scan.mjs [--staged] [paths...]

Scan files for likely secrets. Defaults to the current directory.`);
}

function runGit(args) {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  if (result.status !== 0) return [];
  return result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function stagedFiles() {
  return runGit(['diff', '--cached', '--name-only', '--diff-filter=ACMR']);
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function shouldSkip(filePath) {
  const pathText = normalizePath(filePath);
  if (safeFilenames.has(path.basename(filePath))) return true;
  if (skipSuffixes.has(path.extname(filePath).toLowerCase())) return true;
  return [...skipDirs].some((item) => pathText === item || pathText.startsWith(`${item}/`));
}

function walk(root, files) {
  let stats;
  try {
    stats = fs.statSync(root);
  } catch {
    return;
  }

  if (stats.isFile()) {
    if (!shouldSkip(root)) files.push(root);
    return;
  }

  if (!stats.isDirectory()) return;

  for (const entry of fs.readdirSync(root)) {
    const child = path.join(root, entry);
    if (!shouldSkip(child)) walk(child, files);
  }
}

function candidateFiles(paths, staged) {
  if (staged) {
    return stagedFiles().filter((filePath) => fs.existsSync(filePath) && !shouldSkip(filePath));
  }

  const roots = paths.length ? paths : ['.'];
  const files = [];
  for (const root of roots) {
    walk(root, files);
  }
  return files;
}

function scanFile(filePath) {
  let text;
  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch {
    return [];
  }

  const findings = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (safePlaceholder.test(line)) return;
    for (const [label, pattern] of patterns) {
      if (pattern.test(line)) {
        findings.push({ lineNo: index + 1, label });
        break;
      }
    }
  });
  return findings;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = candidateFiles(args.paths, args.staged);
  const allFindings = [];

  for (const filePath of files) {
    for (const finding of scanFile(filePath)) {
      allFindings.push({ filePath, ...finding });
    }
  }

  if (allFindings.length) {
    console.log('Secret scan failed. Review these files before committing:');
    for (const finding of allFindings) {
      console.log(`- ${finding.filePath}:${finding.lineNo} (${finding.label})`);
    }
    console.log('Replace raw values with <SECRET:NAME> and store values in .env or Doppler.');
    return 1;
  }

  console.log(`Secret scan passed (${files.length} file(s) checked).`);
  return 0;
}

process.exit(main());
