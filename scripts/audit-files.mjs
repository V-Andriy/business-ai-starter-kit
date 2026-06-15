#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const docsRoots = ['AGENTS.md', 'README.md', 'INDEX.md', 'Seed/AGENTS.md'];

const thresholds = {
  docs: { tooShort: 6, tiny: 20, warn: 220, serious: 300 },
  code: { tooShort: 10, tiny: 30, warn: 300, serious: 400 },
};

const ignoredDirs = new Set([
  '.git',
  '.business-ai-kit',
  'node_modules',
  '.next',
  'dist',
  'build',
  '.venv',
  'venv',
  '__pycache__',
]);

const docExtensions = new Set(['.md']);
const codeExtensions = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);

const exceptions = {
  tinyDocs: {
    'Templates/README.md': 'Intentional placeholder until templates are introduced.',
    'Seed/CLAUDE.md': 'Thin Claude Code / Cowork bridge that imports Seed/AGENTS.md; rules stay in AGENTS.md.',
    'Seed/Agent-Instructions/Skills/Project-Planning/starter-files/CLAUDE.md': 'Project-local Claude Code bridge that imports the project AGENTS.md; intentionally tiny.',
    'Seed/Agent-Instructions/Automation-Log.md': 'Starter log file, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Improvement-Log.md': 'Starter log file, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Inbox.md': 'Starter queue file, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Outbox.md': 'Starter queue file, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Private-Notes.md': 'Starter private notes file, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Memory.md': 'Starter memory file, intentionally compact.',
    'Seed/Agent-Instructions/Workspace-Map.md': 'Starter workspace map, intentionally compact.',
    'Seed/Agent-Instructions/Active-Threads.md': 'Starter active work file, intentionally compact.',
    'Seed/Agent-Instructions/Decisions.md': 'Starter decision log, intentionally compact.',
    'Seed/Agent-Instructions/Secrets-Vault.md': 'Starter secret metadata file, intentionally compact.',
    'Seed/Agent-Instructions/Current-Focus.md': 'Starter focus file, intentionally compact.',
    'Seed/Agent-Instructions/Business-Dossier.md': 'Starter dossier file, intentionally compact.',
    'Seed/Agent-Instructions/User-Dossier.md': 'Starter dossier file, intentionally compact.',
    'Seed/Agent-Instructions/Signals/README.md': 'Tiny index for incoming and outgoing signal files.',
    'Seed/Agent-Instructions/Signals/Incoming.md': 'Starter signal queue, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Signals/Outgoing.md': 'Starter signal queue, expected to grow in a private workspace.',
    'Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Decisions.md': 'Project starter decision log, intentionally compact.',
    'Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Executive Brief.md': 'Project starter executive brief, intentionally compact.',
    'Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Next Actions.md': 'Project starter action list, intentionally compact.',
  },
  largeDocs: {
    'Seed/AGENTS.md': 'Canonical private workspace behavior contract; split only when behavior boundaries are clearer.',
    'Seed/Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md': 'Canonical heartbeat workflow; split only when reusable subflows are clearer.',
  },
  tinyCode: {},
  largeCode: {},
  orphanDocs: {
    'Planning/context/00-brain-dump.md': 'Known cleanup target; private planning material should not stay tracked long-term.',
    'Planning/context/source-map.md': 'Known cleanup target; private planning material should not stay tracked long-term.',
  },
};

function parseArgs(argv) {
  return {
    strict: argv.includes('--strict'),
  };
}

function normalize(filePath) {
  return filePath.split(path.sep).join('/');
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.isFile()) {
      files.push(normalize(path.relative(process.cwd(), fullPath)));
    }
  }
  return files;
}

function lineCount(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (!text.length) return 0;
  return text.split(/\r?\n/).length;
}

function linkTargets(filePath) {
  const dir = path.dirname(filePath);
  const text = fs.readFileSync(filePath, 'utf8');
  const targets = [];
  const pattern = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;
  while ((match = pattern.exec(text))) {
    const rawTarget = match[1].split('#', 1)[0].trim();
    if (!rawTarget || rawTarget.includes('://') || rawTarget.startsWith('mailto:')) continue;
    const decoded = decodeURIComponent(rawTarget);
    const target = normalize(path.normalize(path.join(dir, decoded)));
    if (target.endsWith('.md')) targets.push(target);
  }
  return targets;
}

function reachableDocs(docFiles) {
  const docSet = new Set(docFiles);
  const queue = docsRoots.filter((root) => docSet.has(root));
  const seen = new Set(queue);

  while (queue.length) {
    const current = queue.shift();
    for (const target of linkTargets(current)) {
      if (!docSet.has(target) || seen.has(target)) continue;
      seen.add(target);
      queue.push(target);
    }
  }

  return seen;
}

function addIssue(issues, level, filePath, message) {
  issues.push({ level, filePath, message });
}

function auditSize(filePath, kind, count, issues) {
  const limits = thresholds[kind];
  const tinyExceptions = kind === 'docs' ? exceptions.tinyDocs : exceptions.tinyCode;
  const largeExceptions = kind === 'docs' ? exceptions.largeDocs : exceptions.largeCode;

  if (count === 0) {
    addIssue(issues, 'serious', filePath, `${kind} file is empty`);
  } else if (count <= limits.tooShort && !tinyExceptions[filePath]) {
    addIssue(issues, 'serious', filePath, `${kind} file is suspiciously short (${count} lines)`);
  } else if (count <= limits.tiny && !tinyExceptions[filePath]) {
    addIssue(issues, 'warning', filePath, `${kind} file is tiny (${count} lines); verify its purpose`);
  } else if (count >= limits.serious && !largeExceptions[filePath]) {
    addIssue(issues, 'serious', filePath, `${kind} file is oversized (${count} lines)`);
  } else if (count >= limits.warn && !largeExceptions[filePath]) {
    addIssue(issues, 'warning', filePath, `${kind} file is large (${count} lines)`);
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = walk(process.cwd());
  const docFiles = files.filter((filePath) => docExtensions.has(path.extname(filePath)));
  const codeFiles = files.filter((filePath) => codeExtensions.has(path.extname(filePath)));
  const reachable = reachableDocs(docFiles);
  const issues = [];

  for (const filePath of docFiles) {
    auditSize(filePath, 'docs', lineCount(filePath), issues);
    if (!reachable.has(filePath) && !exceptions.orphanDocs[filePath]) {
      addIssue(issues, 'serious', filePath, 'Markdown file is not reachable from a documentation root');
    }
  }

  for (const filePath of codeFiles) {
    auditSize(filePath, 'code', lineCount(filePath), issues);
  }

  if (!issues.length) {
    console.log(`File audit passed (${docFiles.length} doc file(s), ${codeFiles.length} code file(s)).`);
    return 0;
  }

  const serious = issues.filter((issue) => issue.level === 'serious');
  const warnings = issues.filter((issue) => issue.level === 'warning');

  console.log(`File audit found ${serious.length} serious issue(s) and ${warnings.length} warning(s).`);
  for (const issue of issues) {
    console.log(`- [${issue.level}] ${issue.filePath}: ${issue.message}`);
  }
  console.log('Add a documented exception only when the file has a clear intentional role.');
  if (!args.strict && serious.length) {
    console.log('Audit-only mode: exiting 0. Use --strict to fail on serious issues.');
  }
  return args.strict && serious.length ? 1 : 0;
}

process.exit(main());
