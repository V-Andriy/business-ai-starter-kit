#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const scanner = path.resolve('Seed/Scripts/secret_scan.mjs');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-scan-check-'));
// Synthetic pattern match, assembled so the fixture source contains no credential.
const fake = ['sk', 'fixture'.repeat(6)].join('-');
function git(...args) {
  const result = spawnSync('git', args, { cwd: fixture, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
}
function write(name, text) {
  fs.writeFileSync(path.join(fixture, name), text);
}
function scan(args, code) {
  const result = spawnSync(process.execPath, [scanner, ...args], { cwd: fixture, encoding: 'utf8' });
  assert.equal(result.status, code, result.stdout + result.stderr);
  assert.ok(!(result.stdout + result.stderr).includes(fake), 'Never print credential contents');
  return result.stdout;
}
function commit() {
  git('-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', '-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '-qm', 'Fixture');
}
try {
  git('init', '-q');
  write('.gitignore', '.env\n');
  write('safe.md', 'A safe initial draft.\n');
  git('add', '.');
  commit();
  write('.env', fake);
  assert.ok(scan([], 0).includes('skipped'), 'Clean workspace ignores local vault contents');
  write('new notes.md', 'A changed draft.\n');
  assert.ok(scan([], 0).includes('1 file(s)'), 'Only the new draft should be scanned');
  write('new notes.md', fake);
  scan([], 1);
  git('add', 'new notes.md');
  write('new notes.md', 'Safe working copy, unsafe staged copy.\n');
  scan(['--staged'], 1);
  git('add', 'new notes.md');
  write('new notes.md', fake);
  scan(['--staged'], 0);
  scan([], 1);
  write('new notes.md', 'Safe final copy.\n');
  git('add', '.');
  commit();
  write('.env.example', fake);
  scan(['.env.example'], 1);
  write('.env.example', '<SECRET:EXAMPLE> ' + fake);
  scan(['.env.example'], 1);
  write('.env.example', '<SECRET:EXAMPLE>\n');
  scan(['.env.example'], 0);
  fs.unlinkSync(path.join(fixture, '.env.example'));
  write('old.md', fake);
  git('add', 'old.md');
  commit();
  assert.ok(scan([], 0).includes('skipped'), 'Default does not repeatedly scan unchanged history');
  scan(['--all'], 1);
  git('rm', 'old.md');
  scan(['--staged'], 0);
  scan(['--', '--staged'], 0);
  scan(['missing.md'], 1);
  scan(['--staged', '--all'], 1);
  console.log('Secret scanner fixtures passed: changed-only scope, staged snapshot, placeholders, explicit full audit, deletion, failure handling, redacted output.');
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
