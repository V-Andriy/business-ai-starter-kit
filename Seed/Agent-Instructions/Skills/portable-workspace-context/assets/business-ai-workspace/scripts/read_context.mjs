#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const skillDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const referencesDir = path.join(skillDir, 'references');
const registryPath = path.join(referencesDir, 'registry.json');
const maxBytes = 256 * 1024;

function fail(message) {
  console.error(`Portable context unavailable: ${message}`);
  process.exit(1);
}

function readRegistry() {
  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch {
    fail('the managed registry is missing or invalid. Refresh it from the source workspace.');
  }
  if (registry.schemaVersion !== 1 || !Array.isArray(registry.workspaces)) {
    fail('the managed registry uses an unsupported format.');
  }
  return registry;
}

function enabledWorkspaces(registry) {
  return registry.workspaces.filter((item) => item.enabled === true);
}

function safeSnapshot(item) {
  if (!item.file || path.isAbsolute(item.file)) fail('a snapshot path is invalid.');
  const candidate = path.resolve(referencesDir, item.file);
  const allowedRoot = path.resolve(referencesDir, 'workspaces');
  for (const directory of [referencesDir, allowedRoot]) {
    let directoryStat;
    try { directoryStat = fs.lstatSync(directory); } catch { fail('the managed snapshot directory is missing.'); }
    if (!directoryStat.isDirectory() || directoryStat.isSymbolicLink()) fail('a managed snapshot directory is unsafe.');
  }
  if (candidate !== allowedRoot && !candidate.startsWith(`${allowedRoot}${path.sep}`)) {
    fail('a snapshot path escapes the managed skill.');
  }
  let stat;
  try {
    stat = fs.lstatSync(candidate);
  } catch {
    fail(`snapshot for "${item.alias}" is missing.`);
  }
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > maxBytes) {
    fail(`snapshot for "${item.alias}" is not a valid managed text file.`);
  }
  const realCandidate = fs.realpathSync(candidate);
  const realRoot = fs.realpathSync(allowedRoot);
  if (!realCandidate.startsWith(`${realRoot}${path.sep}`)) fail('a snapshot resolves outside the managed skill.');
  const content = fs.readFileSync(candidate, 'utf8');
  const digest = crypto.createHash('sha256').update(content).digest('hex');
  if (digest !== item.sha256) fail(`snapshot for "${item.alias}" failed integrity validation.`);
  return content;
}

function parseAlias(argv) {
  const index = argv.indexOf('--workspace');
  return index >= 0 ? argv[index + 1] : undefined;
}

const registry = readRegistry();
const enabled = enabledWorkspaces(registry);
const argv = process.argv.slice(2);
const allowedArgs = new Set(['--list', '--workspace']);
for (let index = 0; index < argv.length; index += 1) {
  if (!allowedArgs.has(argv[index])) fail(`unknown argument "${argv[index]}".`);
  if (argv[index] === '--workspace') {
    if (!argv[index + 1] || argv[index + 1].startsWith('--')) fail('--workspace requires an alias.');
    index += 1;
  }
}

if (argv.includes('--list')) {
  console.log(JSON.stringify({
    generatedAt: registry.generatedAt,
    workspaces: enabled.map(({ alias, label, exportedAt, sha256 }) => ({
      alias,
      label,
      exportedAt,
      sha256,
    })),
  }, null, 2));
  process.exit(0);
}

const alias = parseAlias(argv);
if (!alias && enabled.length !== 1) {
  fail(enabled.length ? 'more than one workspace is enabled; choose an alias from --list.' : 'no workspace is enabled.');
}
const selected = alias ? enabled.find((item) => item.alias === alias) : enabled[0];
if (!selected) fail(`no enabled workspace has alias "${alias}".`);

const content = safeSnapshot(selected);
console.log(`Workspace: ${selected.label} (${selected.alias})`);
console.log(`Exported: ${selected.exportedAt}`);
console.log(`Integrity: sha256:${selected.sha256}`);
console.log('---');
process.stdout.write(content.endsWith('\n') ? content : `${content}\n`);
