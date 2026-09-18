#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Isolated fixtures: never install hooks or alter the developer's workspace.
const root = process.cwd();
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-context-check-'));
const startup = path.join(root, 'Templates/Chat-Start-Accelerator-Hook/Scripts/chat_start_accelerator_context.mjs');
const gate = path.join(root, 'Seed/Scripts/heartbeat_gate.mjs');

function run(command, args, cwd = fixture) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

function write(relativePath, content) {
  const target = path.join(fixture, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  return target;
}

function snapshot() {
  const entries = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === '.git') continue;
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(target);
      else entries.push([path.relative(fixture, target), fs.readFileSync(target, 'utf8'), fs.statSync(target).mtimeMs]);
    }
  }
  walk(fixture);
  return entries;
}

try {
  assert.equal(run(process.execPath, [startup, '--workspace', fixture]), '');
  write('Agent-Instructions/Current-Focus.md', 'PRIVATE_FIXTURE_CONTENT\n'.repeat(10000));
  write('Agent-Instructions/Inbox.md', '# Inbox\n\n- No pending items.\n');
  write('Agent-Instructions/Setup-Plan.md', 'SETUP_FIXTURE_CONTENT');
  const startupResult = JSON.parse(run(process.execPath, [startup, '--workspace', fixture]));
  const context = startupResult.hookSpecificOutput.additionalContext;
  assert.equal(startupResult.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.ok(context.length < 1000, 'Startup output must remain bounded with large input files');
  assert.ok(context.includes('Current-Focus.md'));
  assert.ok(context.includes('Setup-Plan.md'));
  assert.ok(!context.includes('PRIVATE_FIXTURE_CONTENT'));
  assert.ok(!context.includes('SETUP_FIXTURE_CONTENT'));

  run('git', ['init', '-q']);
  run('git', ['add', '.']);
  run('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'Fixture']);
  let result = JSON.parse(run(process.execPath, [gate, '--workspace', fixture]));
  assert.equal(result.needs_deep_review, false, 'Clean workspace should not trigger review');
  assert.ok(!('recent_session_candidates' in result), 'No home session history should be returned');

  const pendingPath = write('Agent-Instructions/Inbox.md', '# Inbox\n\n- Confirm the draft audience.\n');
  const oldTime = new Date('2020-01-01T00:00:00Z');
  fs.utimesSync(pendingPath, oldTime, oldTime);
  write('Agent-Instructions/Automation-Log.md', '# Log\n');
  run('git', ['add', 'Agent-Instructions/Automation-Log.md']);
  run('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', '-c', 'core.hooksPath=/dev/null', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'Log only']);
  const before = snapshot();
  result = JSON.parse(run(process.execPath, [gate, '--workspace', fixture]));
  assert.equal(result.needs_deep_review, true, 'Old file timestamps must not hide uncommitted changes');
  assert.equal(result.signals.inbox_pending, true);
  assert.ok(result.git_status.some((line) => line.includes('Inbox.md')));
  run(process.execPath, [startup, '--workspace', fixture]);
  assert.deepEqual(snapshot(), before, 'Helpers must not write workspace files');
  console.log('Context helper fixtures passed: bounded startup, no content injection, clean no-op, dirty detection, read-only behavior.');
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
