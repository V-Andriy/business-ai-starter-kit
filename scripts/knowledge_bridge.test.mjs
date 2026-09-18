import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  approvalToken,
  disable,
  inspect,
  install,
  packageCowork,
  preview,
  previewCowork,
  uninstall,
} from '../Seed/Scripts/lib/knowledge_bridge_core.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const asset = path.join(repo, 'Seed', 'Agent-Instructions', 'Skills', 'portable-workspace-context', 'assets', 'business-ai-workspace');
const scanner = path.join(repo, 'Seed', 'Scripts', 'secret_scan.mjs');

function context(alias = 'primary-business', fact = 'The preferred review style is concise and evidence-led.') {
  return `# Portable Workspace Context

## Bridge Control

- Status: ready
- Alias: ${alias}
- Label: ${alias.replaceAll('-', ' ')}
- Consent version: 1

## Approved Context

### Working Preferences

- ${fact}

## Use Boundaries

- Use as private background only.

## Never Include

- Secrets or raw client data.
`;
}

function fixture(name, alias = 'primary-business') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `business-ai-bridge-${name}-`));
  const workspace = path.join(root, 'Workspace With Spaces');
  const portable = path.join(workspace, 'Agent-Instructions', 'Portable-Context.md');
  const skillAsset = path.join(workspace, 'Agent-Instructions', 'Skills', 'portable-workspace-context', 'assets', 'business-ai-workspace');
  fs.mkdirSync(path.dirname(portable), { recursive: true });
  fs.mkdirSync(path.join(workspace, 'Scripts'), { recursive: true });
  fs.cpSync(asset, skillAsset, { recursive: true });
  fs.copyFileSync(scanner, path.join(workspace, 'Scripts', 'secret_scan.mjs'));
  fs.writeFileSync(portable, context(alias));
  const home = path.join(root, 'Home With Spaces');
  const env = { ...process.env, HOME: home, CLAUDE_CONFIG_DIR: path.join(home, 'Claude Config') };
  return { root, workspace, portable, home, env };
}

function target(home, kind, env) {
  return kind === 'codex'
    ? path.join(home, '.agents', 'skills', 'business-ai-workspace')
    : path.join(env.CLAUDE_CONFIG_DIR, 'skills', 'business-ai-workspace');
}

function readInstalled(skillDir, alias) {
  return spawnSync(process.execPath, [path.join(skillDir, 'scripts', 'read_context.mjs'), '--workspace', alias], { encoding: 'utf8' });
}

function approvedInstall(workspace, options) {
  const checked = preview(workspace, options);
  return install(workspace, { ...options, approval: approvalToken(checked) });
}

test('preview is exact, opt-in, and rejects an unprepared template', () => {
  const item = fixture('preview');
  const result = preview(item.workspace, { env: item.env });
  assert.equal(result.context.content, fs.readFileSync(item.portable, 'utf8'));
  assert.deepEqual(result.targets.map((entry) => entry.kind), ['codex', 'claude']);
  fs.writeFileSync(item.portable, context().replace('Status: ready', 'Status: not-ready'));
  assert.throws(() => preview(item.workspace, { env: item.env }), /not marked ready/);
});

test('approval token is bound to exact content and targets', () => {
  const item = fixture('approval');
  const checked = preview(item.workspace, { env: item.env, targets: ['codex'] });
  fs.writeFileSync(item.portable, context('primary-business', 'This content changed after approval.'));
  assert.throws(() => install(item.workspace, {
    env: item.env,
    targets: ['codex'],
    approval: approvalToken(checked),
  }), /Approval token does not match/);
  assert.equal(fs.existsSync(target(item.home, 'codex', item.env)), false);
});

test('installs self-contained private Codex and Claude skills', () => {
  const item = fixture('install');
  const result = approvedInstall(item.workspace, { env: item.env });
  assert.equal(result.targets.length, 2);
  for (const kind of ['codex', 'claude']) {
    const skill = target(item.home, kind, item.env);
    assert.ok(fs.existsSync(path.join(skill, '.business-ai-managed.json')));
    assert.equal(fs.lstatSync(skill).isSymbolicLink(), false);
    assert.equal(fs.statSync(path.join(skill, 'references', 'registry.json')).mode & 0o777, 0o600);
    const loaded = readInstalled(skill, 'primary-business');
    assert.equal(loaded.status, 0, loaded.stderr);
    assert.match(loaded.stdout, /preferred review style/);
    assert.doesNotMatch(fs.readFileSync(path.join(skill, 'references', 'registry.json'), 'utf8'), new RegExp(item.workspace.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  const claudeSkill = fs.readFileSync(path.join(target(item.home, 'claude', item.env), 'SKILL.md'), 'utf8');
  assert.match(claudeSkill, /disable-model-invocation: true/);
  const coworkPreview = previewCowork(item.workspace, { env: item.env });
  const cowork = packageCowork(item.workspace, { env: item.env, approval: approvalToken(coworkPreview) });
  assert.doesNotMatch(fs.readFileSync(path.join(cowork.skillDir, 'SKILL.md'), 'utf8'), /disable-model-invocation: true/);
  assert.ok(fs.existsSync(path.join(cowork.skillDir, 'references', 'registry.json')));
  assert.equal(inspect(item.workspace, { env: item.env }).state, 'current');
});

test('Cowork packaging rejects unsafe bundled assets', { skip: process.platform === 'win32' }, () => {
  const item = fixture('cowork-asset-safety');
  approvedInstall(item.workspace, { env: item.env, targets: ['codex'] });
  const outside = path.join(item.root, 'outside.txt');
  fs.writeFileSync(outside, 'must not enter the Cowork package\n');
  const unsafe = path.join(
    item.workspace,
    'Agent-Instructions',
    'Skills',
    'portable-workspace-context',
    'assets',
    'business-ai-workspace',
    'unsafe-link.txt',
  );
  fs.symlinkSync(outside, unsafe);
  const checked = previewCowork(item.workspace, { env: item.env });
  assert.throws(
    () => packageCowork(item.workspace, { env: item.env, approval: approvalToken(checked) }),
    /contains a symlink/,
  );
  assert.equal(fs.existsSync(path.join(item.home, '.business-ai-kit', 'bridge', 'business-ai-workspace-cowork.zip')), false);
});

test('a failed secret scan preserves the last installed snapshot', () => {
  const item = fixture('refresh');
  approvedInstall(item.workspace, { env: item.env, targets: ['codex'] });
  const skill = target(item.home, 'codex', item.env);
  const before = readInstalled(skill, 'primary-business').stdout;
  const syntheticSecret = `sk-${'1'.repeat(30)}`;
  fs.writeFileSync(item.portable, context('primary-business', `Temporary key: ${syntheticSecret}`));
  assert.throws(() => approvedInstall(item.workspace, { env: item.env, targets: ['codex'] }), /Secret scan blocked/);
  assert.equal(readInstalled(skill, 'primary-business').stdout, before);
  assert.equal(inspect(item.workspace, { env: item.env }).state, 'stale');
});

test('refuses unmanaged collisions and removes only managed targets', () => {
  const item = fixture('collision');
  const codex = target(item.home, 'codex', item.env);
  fs.mkdirSync(codex, { recursive: true });
  fs.writeFileSync(path.join(codex, 'keep.txt'), 'user-owned');
  assert.throws(() => approvedInstall(item.workspace, { env: item.env, targets: ['codex'] }), /unmanaged target/);
  assert.equal(fs.readFileSync(path.join(codex, 'keep.txt'), 'utf8'), 'user-owned');

  const clean = fixture('uninstall');
  approvedInstall(clean.workspace, { env: clean.env, targets: ['codex'] });
  const managed = target(clean.home, 'codex', clean.env);
  assert.ok(fs.existsSync(managed));
  assert.deepEqual(uninstall(clean.workspace, { env: clean.env }), { remaining: 0 });
  assert.equal(fs.existsSync(managed), false);
  assert.ok(fs.existsSync(clean.portable));
});

test('failed revocation preserves source state and reports attention', () => {
  for (const operation of ['disable', 'uninstall']) {
    const item = fixture(`revoke-${operation}`);
    approvedInstall(item.workspace, { env: item.env, targets: ['codex'] });
    const skill = target(item.home, 'codex', item.env);
    fs.writeFileSync(path.join(skill, '.business-ai-managed.json'), '{}\n');
    const run = operation === 'disable' ? disable : uninstall;
    assert.throws(() => run(item.workspace, { env: item.env }), /unmanaged target/);
    assert.equal(inspect(item.workspace, { env: item.env }).state, 'attention-required');
    assert.ok(fs.existsSync(item.portable));
    assert.match(fs.readFileSync(path.join(skill, 'references', 'workspaces', inspect(item.workspace, { env: item.env }).workspace.id, 'context.md'), 'utf8'), /preferred review style/);
  }
});

test('supports multiple workspaces without alias replacement', () => {
  const first = fixture('multi', 'first-business');
  const secondWorkspace = path.join(first.root, 'Second Workspace');
  const secondPortable = path.join(secondWorkspace, 'Agent-Instructions', 'Portable-Context.md');
  const secondAsset = path.join(secondWorkspace, 'Agent-Instructions', 'Skills', 'portable-workspace-context', 'assets', 'business-ai-workspace');
  fs.mkdirSync(path.dirname(secondPortable), { recursive: true });
  fs.mkdirSync(path.join(secondWorkspace, 'Scripts'), { recursive: true });
  fs.cpSync(asset, secondAsset, { recursive: true });
  fs.copyFileSync(scanner, path.join(secondWorkspace, 'Scripts', 'secret_scan.mjs'));
  fs.writeFileSync(secondPortable, context('second-business', 'Use Canadian English.'));
  approvedInstall(first.workspace, { env: first.env, targets: ['codex'] });
  approvedInstall(secondWorkspace, { env: first.env, targets: ['codex'] });
  const skill = target(first.home, 'codex', first.env);
  const list = spawnSync(process.execPath, [path.join(skill, 'scripts', 'read_context.mjs'), '--list'], { encoding: 'utf8' });
  assert.equal(list.status, 0);
  assert.deepEqual(JSON.parse(list.stdout).workspaces.map((entry) => entry.alias), ['first-business', 'second-business']);
  fs.writeFileSync(secondPortable, context('first-business', 'This alias collides.'));
  assert.throws(() => approvedInstall(secondWorkspace, { env: first.env, targets: ['codex'] }), /belongs to another workspace/);
});

test('keeps each workspace limited to its approved harness targets', () => {
  const first = fixture('scopes', 'claude-only');
  const secondWorkspace = path.join(first.root, 'Codex Workspace');
  const secondPortable = path.join(secondWorkspace, 'Agent-Instructions', 'Portable-Context.md');
  const secondAsset = path.join(secondWorkspace, 'Agent-Instructions', 'Skills', 'portable-workspace-context', 'assets', 'business-ai-workspace');
  fs.mkdirSync(path.dirname(secondPortable), { recursive: true });
  fs.mkdirSync(path.join(secondWorkspace, 'Scripts'), { recursive: true });
  fs.cpSync(asset, secondAsset, { recursive: true });
  fs.copyFileSync(scanner, path.join(secondWorkspace, 'Scripts', 'secret_scan.mjs'));
  fs.writeFileSync(secondPortable, context('codex-only', 'Visible only in the Codex target.'));
  approvedInstall(first.workspace, { env: first.env, targets: ['claude'] });
  approvedInstall(secondWorkspace, { env: first.env, targets: ['codex'] });
  const claudeList = spawnSync(process.execPath, [path.join(target(first.home, 'claude', first.env), 'scripts', 'read_context.mjs'), '--list'], { encoding: 'utf8' });
  const codexList = spawnSync(process.execPath, [path.join(target(first.home, 'codex', first.env), 'scripts', 'read_context.mjs'), '--list'], { encoding: 'utf8' });
  assert.deepEqual(JSON.parse(claudeList.stdout).workspaces.map((entry) => entry.alias), ['claude-only']);
  assert.deepEqual(JSON.parse(codexList.stdout).workspaces.map((entry) => entry.alias), ['codex-only']);
});

test('rejects bridge paths that resolve inside the source workspace', { skip: process.platform === 'win32' }, () => {
  const item = fixture('containment');
  assert.throws(() => preview(item.workspace, {
    env: { ...item.env, BUSINESS_AI_BRIDGE_HOME: path.join(item.workspace, '.bridge') },
  }), /Bridge state cannot be stored inside/);
  const linkedRoot = path.join(item.root, 'Linked Target Root');
  fs.symlinkSync(item.workspace, linkedRoot, 'dir');
  assert.throws(() => preview(item.workspace, {
    env: item.env,
    targets: ['codex'],
    targetDirs: [linkedRoot],
  }), /cannot be inside the source workspace/);

  const installed = fixture('containment-after-install');
  approvedInstall(installed.workspace, { env: installed.env, targets: ['codex'] });
  const skillsRoot = path.join(installed.home, '.agents', 'skills');
  const savedRoot = `${skillsRoot}.saved`;
  fs.renameSync(skillsRoot, savedRoot);
  fs.symlinkSync(installed.workspace, skillsRoot, 'dir');
  assert.throws(() => preview(installed.workspace, { env: installed.env }), /cannot be inside the source workspace/);
  fs.rmSync(skillsRoot);
  fs.renameSync(savedRoot, skillsRoot);
});

test('reader and status fail closed on malformed installed state', () => {
  const item = fixture('reader-validation');
  approvedInstall(item.workspace, { env: item.env, targets: ['codex'] });
  const skill = target(item.home, 'codex', item.env);
  const missingAlias = spawnSync(process.execPath, [path.join(skill, 'scripts', 'read_context.mjs'), '--workspace'], { encoding: 'utf8' });
  assert.notEqual(missingAlias.status, 0);
  assert.match(missingAlias.stderr, /requires an alias/);
  fs.writeFileSync(path.join(skill, 'references', 'registry.json'), '{}\n');
  assert.equal(inspect(item.workspace, { env: item.env }).state, 'attention-required');
});
