import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const owner = 'business-ai-starter-kit';
export const schemaVersion = 1;

export function digest(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export function privateDir(dir) {
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  try { fs.chmodSync(dir, 0o700); } catch {}
}

export function privateFile(file, text) {
  privateDir(path.dirname(file));
  const temp = `${file}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(temp, text, { mode: 0o600 });
  try { fs.chmodSync(temp, 0o600); } catch {}
  fs.renameSync(temp, file);
}

export function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

function makePrivateTree(root) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const child = path.join(root, entry.name);
    if (entry.isDirectory()) {
      try { fs.chmodSync(child, 0o700); } catch {}
      makePrivateTree(child);
    } else if (entry.isFile()) {
      try { fs.chmodSync(child, 0o600); } catch {}
    }
  }
  try { fs.chmodSync(root, 0o700); } catch {}
}

export function projectedRealPath(targetPath) {
  const remainder = [];
  let current = path.resolve(targetPath);
  while (!fs.existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) break;
    remainder.unshift(path.basename(current));
    current = parent;
  }
  const base = fs.existsSync(current) ? fs.realpathSync(current) : current;
  return path.resolve(base, ...remainder);
}

export function isWithin(candidate, root) {
  return candidate === root || candidate.startsWith(`${root}${path.sep}`);
}

export function assertManagedOrMissing(target) {
  if (!fs.existsSync(target.path)) return;
  const marker = readJson(path.join(target.path, '.business-ai-managed.json'), null);
  if (marker?.owner !== owner || marker?.schemaVersion !== schemaVersion) {
    throw new Error(`Refusing to replace unmanaged target: ${target.path}`);
  }
}

export function assertSafeAsset(root) {
  const stat = fs.lstatSync(root, { throwIfNoEntry: false });
  if (!stat?.isDirectory() || stat.isSymbolicLink()) throw new Error('The bundled consumer skill is missing or unsafe.');
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const child = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`The bundled consumer skill contains a symlink: ${child}`);
    if (entry.isDirectory()) assertSafeAsset(child);
    else if (!entry.isFile()) throw new Error(`The bundled consumer skill contains an unsupported entry: ${child}`);
  }
}

function consumerRegistry(registry) {
  return {
    schemaVersion,
    generatedAt: new Date().toISOString(),
    workspaces: registry.workspaces.map(({ id, alias, label, enabled, exportedAt, sha256 }) => ({
      id, alias, label, enabled, exportedAt, sha256, file: `workspaces/${id}/context.md`,
    })),
  };
}

function claudeFrontmatter(text) {
  const end = text.indexOf('\n---', 4);
  if (end < 0) throw new Error('Consumer SKILL.md has invalid frontmatter.');
  return `${text.slice(0, end)}\ndisable-model-invocation: true${text.slice(end)}`;
}

export function composeSkill(destination, target, paths, registry) {
  fs.cpSync(paths.asset, destination, { recursive: true, errorOnExist: true });
  if (target.kind === 'claude' || target.kind === 'cowork') {
    const skillFile = path.join(destination, 'SKILL.md');
    fs.writeFileSync(skillFile, claudeFrontmatter(fs.readFileSync(skillFile, 'utf8')));
  }
  const refs = path.join(destination, 'references');
  privateDir(path.join(refs, 'workspaces'));
  const installed = consumerRegistry(registry);
  privateFile(path.join(refs, 'registry.json'), `${JSON.stringify(installed, null, 2)}\n`);
  for (const item of registry.workspaces.filter((entry) => entry.enabled)) {
    const source = path.join(paths.state, 'exports', item.id, 'context.md');
    privateFile(path.join(refs, 'workspaces', item.id, 'context.md'), fs.readFileSync(source, 'utf8'));
  }
  privateFile(path.join(destination, '.business-ai-managed.json'), `${JSON.stringify({
    owner, schemaVersion, generatedAt: installed.generatedAt,
  }, null, 2)}\n`);
  makePrivateTree(destination);
}

function registryForTarget(registry, targetPath) {
  return { ...registry, workspaces: registry.workspaces.filter((item) => item.targetPaths?.includes(targetPath)) };
}

function removeManagedTarget(target) {
  if (!fs.existsSync(target.path)) return;
  assertManagedOrMissing(target);
  fs.rmSync(target.path, { recursive: true });
}

export function atomicSync(target, paths, registry) {
  assertManagedOrMissing(target);
  const scoped = registryForTarget(registry, target.path);
  if (!scoped.workspaces.length) return removeManagedTarget(target);
  privateDir(path.dirname(target.path));
  const stage = `${target.path}.stage-${process.pid}-${Date.now()}`;
  const backup = `${target.path}.backup-${process.pid}-${Date.now()}`;
  try {
    composeSkill(stage, target, paths, scoped);
    if (fs.existsSync(target.path)) fs.renameSync(target.path, backup);
    fs.renameSync(stage, target.path);
    fs.rmSync(backup, { recursive: true, force: true });
  } catch (error) {
    fs.rmSync(stage, { recursive: true, force: true });
    if (!fs.existsSync(target.path) && fs.existsSync(backup)) fs.renameSync(backup, target.path);
    throw error;
  }
}

export function syncWithRollback(targets, paths, candidate, original) {
  const completed = [];
  try {
    for (const target of targets) {
      atomicSync(target, paths, candidate);
      completed.push(target);
    }
  } catch (error) {
    const rollbackErrors = [];
    for (const target of completed.reverse()) {
      try { atomicSync(target, paths, original); } catch (rollbackError) { rollbackErrors.push(rollbackError.message); }
    }
    if (rollbackErrors.length) error.message += ` Rollback also failed: ${rollbackErrors.join('; ')}`;
    error.completedTargets = completed.map((target) => target.path);
    throw error;
  }
}

export function targetHealth(target, entry) {
  if (!fs.existsSync(target.path)) return 'missing';
  const marker = readJson(path.join(target.path, '.business-ai-managed.json'), null);
  const installed = readJson(path.join(target.path, 'references', 'registry.json'), null);
  if (marker?.owner !== owner || marker?.schemaVersion !== schemaVersion || !Array.isArray(installed?.workspaces)) return 'invalid';
  const snapshot = installed.workspaces.find((item) => item.id === entry.id);
  if (!snapshot || snapshot.enabled !== entry.enabled || snapshot.sha256 !== entry.sha256) return 'stale';
  if (!entry.enabled) return 'current';
  try {
    const content = fs.readFileSync(path.join(target.path, 'references', snapshot.file), 'utf8');
    return digest(content) === snapshot.sha256 ? 'current' : 'invalid';
  } catch { return 'invalid'; }
}
