import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import {
  assertManagedOrMissing,
  assertSafeAsset,
  atomicSync,
  composeSkill,
  digest,
  isWithin,
  privateDir,
  privateFile,
  projectedRealPath,
  schemaVersion,
  syncWithRollback,
  targetHealth,
} from './knowledge_bridge_storage.mjs';

const maxBytes = 256 * 1024;

export function approvalToken(result) {
  return digest(JSON.stringify({
    sha256: result.context.sha256,
    targets: result.targets.map(({ kind, path: targetPath }) => ({ kind, path: targetPath })).sort((a, b) => a.path.localeCompare(b.path)),
  }));
}

function bridgePaths(workspace, env = process.env) {
  const root = path.resolve(workspace);
  const home = env.HOME || os.homedir();
  const state = path.resolve(env.BUSINESS_AI_BRIDGE_HOME || path.join(home, '.business-ai-kit', 'bridge'));
  if (isWithin(projectedRealPath(state), fs.realpathSync(root))) throw new Error('Bridge state cannot be stored inside the source workspace.');
  return {
    workspace: root,
    portable: path.join(root, 'Agent-Instructions', 'Portable-Context.md'),
    scanner: path.join(root, 'Scripts', 'secret_scan.mjs'),
    asset: path.join(root, 'Agent-Instructions', 'Skills', 'portable-workspace-context', 'assets', 'business-ai-workspace'),
    state,
    registry: path.join(state, 'registry.json'),
    codex: path.join(home, '.agents', 'skills', 'business-ai-workspace'),
    claude: path.join(env.CLAUDE_CONFIG_DIR || path.join(home, '.claude'), 'skills', 'business-ai-workspace'),
  };
}

function loadContext(paths) {
  const stat = fs.lstatSync(paths.portable, { throwIfNoEntry: false });
  if (!stat?.isFile() || stat.isSymbolicLink() || stat.size === 0 || stat.size > maxBytes) {
    throw new Error('Portable-Context.md must be a non-empty text file smaller than 256 KiB.');
  }
  const content = fs.readFileSync(paths.portable, 'utf8');
  if (content.includes('\0')) throw new Error('Portable-Context.md must be UTF-8 text.');
  const status = content.match(/^- Status:\s*(.+)$/m)?.[1]?.trim().toLowerCase();
  const alias = content.match(/^- Alias:\s*(.+)$/m)?.[1]?.trim();
  const label = content.match(/^- Label:\s*(.+)$/m)?.[1]?.trim();
  const consent = Number(content.match(/^- Consent version:\s*(\d+)$/m)?.[1]);
  if (status !== 'ready') throw new Error('Portable-Context.md is not marked ready. Review it with the user first.');
  if (!alias || !/^[a-z0-9][a-z0-9-]{1,47}$/.test(alias)) throw new Error('Portable context Alias must use 2-48 lowercase letters, numbers, or hyphens.');
  if (!label || label.length > 80) throw new Error('Portable context Label must be 1-80 characters.');
  if (consent !== 1) throw new Error('Portable context Consent version is unsupported.');
  const approved = content.match(/## Approved Context([\s\S]*?)## Use Boundaries/)?.[1] || '';
  const useful = approved.split(/\r?\n/).some((line) => /^-\s+/.test(line) && !/^- Add (only|compact|current)/.test(line));
  if (!useful) throw new Error('Portable context still contains only starter prompts; add approved context first.');
  return { alias, label, consent, content, sha256: digest(content) };
}

function scanContext(paths) {
  if (!fs.existsSync(paths.scanner)) throw new Error('The workspace secret scanner is missing.');
  const result = spawnSync(process.execPath, [paths.scanner, paths.portable], { cwd: paths.workspace, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`Secret scan blocked the export.\n${(result.stdout || result.stderr || '').trim()}`);
}

function freshRegistry(paths) {
  let registry = { schemaVersion, workspaces: [], targets: [] };
  if (fs.existsSync(paths.registry)) {
    try { registry = JSON.parse(fs.readFileSync(paths.registry, 'utf8')); }
    catch { throw new Error('The bridge registry is invalid JSON.'); }
  }
  if (registry.schemaVersion !== schemaVersion || !Array.isArray(registry.workspaces) || !Array.isArray(registry.targets)) {
    throw new Error('The bridge registry is invalid or uses an unsupported schema.');
  }
  return registry;
}

function workspaceIdentity(paths) {
  const sourceRoot = fs.realpathSync(paths.workspace);
  return { sourceRoot, id: digest(sourceRoot).slice(0, 16) };
}

function validateTargets(paths, targets) {
  const destinations = new Map();
  for (const target of targets) {
    const projected = projectedRealPath(target.path);
    if (isWithin(projected, fs.realpathSync(paths.workspace)) || isWithin(projected, projectedRealPath(paths.state))) {
      throw new Error('A global skill target cannot be inside the source workspace or bridge state.');
    }
    const duplicate = destinations.get(projected);
    if (duplicate && duplicate !== target.path) throw new Error(`Two target paths resolve to the same destination: ${duplicate} and ${target.path}`);
    destinations.set(projected, target.path);
  }
  return targets;
}

function selectedTargets(paths, options) {
  const requested = options.targets?.length ? options.targets : ['codex', 'claude'];
  const targets = requested.map((kind) => {
    if (kind === 'codex') return { kind, path: paths.codex };
    if (kind === 'claude') return { kind, path: paths.claude };
    throw new Error(`Unsupported target "${kind}". Use codex or claude.`);
  });
  for (const root of options.targetDirs || []) targets.push({ kind: 'custom', path: path.resolve(root, 'business-ai-workspace') });
  return validateTargets(paths, [...new Map(targets.map((item) => [item.path, item])).values()]);
}

function desiredTargets(paths, options, registry, workspaceId) {
  const existing = registry.workspaces.find((item) => item.id === workspaceId);
  const explicit = options.targets !== undefined || (options.targetDirs || []).length > 0;
  if (existing && !explicit) {
    return validateTargets(paths, (existing.targetPaths || []).map((targetPath) => {
      const target = registry.targets.find((item) => item.path === targetPath);
      if (!target) throw new Error(`The bridge target registry is incomplete: ${targetPath}`);
      return target;
    }));
  }
  return selectedTargets(paths, options);
}

function saveRegistry(paths, registry) {
  privateFile(paths.registry, `${JSON.stringify(registry, null, 2)}\n`);
}

export function preview(workspace, options = {}) {
  const paths = bridgePaths(workspace, options.env);
  const context = loadContext(paths);
  scanContext(paths);
  const registry = freshRegistry(paths);
  const targets = desiredTargets(paths, options, registry, workspaceIdentity(paths).id);
  return { paths, context, targets };
}

export function previewCowork(workspace, options = {}) {
  const paths = bridgePaths(workspace, options.env);
  const context = loadContext(paths);
  scanContext(paths);
  return { paths, context, targets: [{ kind: 'cowork', path: 'manual upload to the user\'s Claude account' }] };
}

export function install(workspace, options = {}) {
  const checked = preview(workspace, options);
  if (options.approval !== approvalToken(checked)) throw new Error('Approval token does not match the current snapshot and target set. Preview again.');
  const { paths, context } = checked;
  assertSafeAsset(paths.asset);
  const identity = workspaceIdentity(paths);
  const registry = freshRegistry(paths);
  const aliasOwner = registry.workspaces.find((item) => item.alias === context.alias && item.id !== identity.id);
  if (aliasOwner) throw new Error(`Alias "${context.alias}" belongs to another workspace. Choose a different alias.`);
  const entry = { ...identity, alias: context.alias, label: context.label, enabled: true, exportedAt: new Date().toISOString(), sha256: context.sha256, consentVersion: context.consent, targetPaths: checked.targets.map((target) => target.path) };
  const index = registry.workspaces.findIndex((item) => item.id === identity.id);
  if (index >= 0) registry.workspaces[index] = entry; else registry.workspaces.push(entry);
  for (const target of checked.targets) {
    assertManagedOrMissing(target);
    const existing = registry.targets.findIndex((item) => item.path === target.path);
    if (existing >= 0) registry.targets[existing] = target; else registry.targets.push(target);
  }
  const knownTargets = validateTargets(paths, [...registry.targets]);
  registry.targets = registry.targets.filter((target) => registry.workspaces.some((item) => item.targetPaths?.includes(target.path)));
  for (const target of knownTargets) assertManagedOrMissing(target);
  privateFile(path.join(paths.state, 'exports', identity.id, 'context.md'), context.content);
  registry.lastOperation = { status: 'pending', workspaceId: identity.id, startedAt: new Date().toISOString() };
  saveRegistry(paths, registry);
  const completedTargets = [];
  try {
    for (const target of knownTargets) {
      atomicSync(target, paths, registry);
      completedTargets.push(target.path);
    }
    registry.lastOperation = { status: 'complete', workspaceId: identity.id, completedAt: new Date().toISOString() };
    saveRegistry(paths, registry);
  } catch (error) {
    registry.lastOperation = { status: 'failed', workspaceId: identity.id, failedAt: new Date().toISOString(), message: error.message, completedTargets };
    saveRegistry(paths, registry);
    throw error;
  }
  return { entry, targets: checked.targets };
}

export function inspect(workspace, options = {}) {
  const paths = bridgePaths(workspace, options.env);
  const identity = workspaceIdentity(paths);
  const registry = freshRegistry(paths);
  const entry = registry.workspaces.find((item) => item.id === identity.id);
  let currentSha;
  try { currentSha = digest(fs.readFileSync(paths.portable, 'utf8')); } catch {}
  const targets = registry.targets.filter((target) => entry?.targetPaths?.includes(target.path)).map((target) => ({ ...target, health: targetHealth(target, entry) }));
  let state = registry.lastOperation?.status === 'failed' && registry.lastOperation.workspaceId === identity.id ? 'attention-required' : entry ? (entry.enabled ? (entry.sha256 === currentSha ? 'current' : 'stale') : 'disabled') : 'not-installed';
  if (entry && targets.some((target) => target.health !== 'current')) state = 'attention-required';
  return { state, workspace: entry || null, targets, lastOperation: registry.lastOperation || null };
}

export function disable(workspace, options = {}) {
  const paths = bridgePaths(workspace, options.env);
  const identity = workspaceIdentity(paths);
  const registry = freshRegistry(paths);
  const original = structuredClone(registry);
  const entry = registry.workspaces.find((item) => item.id === identity.id);
  if (!entry) throw new Error('This workspace has no installed portable context.');
  const targets = validateTargets(paths, registry.targets.filter((target) => entry.targetPaths?.includes(target.path)));
  for (const target of targets) assertManagedOrMissing(target);
  entry.enabled = false;
  try { syncWithRollback(targets, paths, registry, original); }
  catch (error) {
    original.lastOperation = { status: 'failed', workspaceId: identity.id, failedAt: new Date().toISOString(), message: error.message, completedTargets: error.completedTargets || [] };
    saveRegistry(paths, original);
    throw error;
  }
  registry.lastOperation = { status: 'complete', workspaceId: identity.id, completedAt: new Date().toISOString() };
  saveRegistry(paths, registry);
  return entry;
}

export function uninstall(workspace, options = {}) {
  const paths = bridgePaths(workspace, options.env);
  const identity = workspaceIdentity(paths);
  const registry = freshRegistry(paths);
  const original = structuredClone(registry);
  const before = registry.workspaces.length;
  registry.workspaces = registry.workspaces.filter((item) => item.id !== identity.id);
  if (registry.workspaces.length === before) throw new Error('This workspace has no installed portable context.');
  const knownTargets = validateTargets(paths, [...registry.targets]);
  for (const target of knownTargets) assertManagedOrMissing(target);
  registry.targets = registry.targets.filter((target) => registry.workspaces.some((item) => item.targetPaths?.includes(target.path)));
  try { syncWithRollback(knownTargets, paths, registry, original); }
  catch (error) {
    original.lastOperation = { status: 'failed', workspaceId: identity.id, failedAt: new Date().toISOString(), message: error.message, completedTargets: error.completedTargets || [] };
    saveRegistry(paths, original);
    throw error;
  }
  fs.rmSync(path.join(paths.state, 'exports', identity.id), { recursive: true, force: true });
  if (registry.workspaces.length) {
    registry.lastOperation = { status: 'complete', workspaceId: identity.id, completedAt: new Date().toISOString() };
    saveRegistry(paths, registry);
  } else {
    fs.rmSync(paths.registry, { force: true });
    fs.rmSync(path.join(paths.state, 'exports'), { recursive: true, force: true });
    fs.rmSync(path.join(paths.state, 'cowork'), { recursive: true, force: true });
    fs.rmSync(path.join(paths.state, 'business-ai-workspace-cowork.zip'), { force: true });
  }
  return { remaining: registry.workspaces.length };
}

export function packageCowork(workspace, options = {}) {
  const paths = bridgePaths(workspace, options.env);
  const checked = previewCowork(workspace, options);
  if (options.approval !== approvalToken(checked)) throw new Error('Approval token does not match the current Cowork snapshot. Preview Cowork again.');
  const registry = freshRegistry(paths);
  const identity = workspaceIdentity(paths);
  const entry = registry.workspaces.find((item) => item.id === identity.id && item.enabled);
  if (!entry) throw new Error('Install and enable this workspace snapshot before packaging it for Cowork.');
  if (entry.sha256 !== checked.context.sha256) throw new Error('The installed snapshot is stale. Refresh it before packaging for Cowork.');
  assertSafeAsset(paths.asset);
  const packageRoot = path.join(paths.state, 'cowork');
  const skillDir = path.join(packageRoot, 'business-ai-workspace');
  fs.rmSync(packageRoot, { recursive: true, force: true });
  privateDir(packageRoot);
  composeSkill(skillDir, { kind: 'cowork' }, paths, { ...registry, workspaces: [entry] });
  const zipPath = path.join(paths.state, 'business-ai-workspace-cowork.zip');
  fs.rmSync(zipPath, { force: true });
  const zipped = spawnSync('zip', ['-q', '-r', zipPath, 'business-ai-workspace'], { cwd: packageRoot });
  if (zipped.status === 0) {
    try { fs.chmodSync(zipPath, 0o600); } catch {}
  }
  return { skillDir, zipPath: zipped.status === 0 ? zipPath : null };
}
