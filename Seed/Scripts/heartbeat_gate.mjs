#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

function parseArgs(argv) {
  const args = { workspace: '.' };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--workspace') {
      args.workspace = argv[index + 1] || '.';
      index += 1;
    } else if (arg === '-h' || arg === '--help') {
      printHelp();
      process.exit(0);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node Scripts/heartbeat_gate.mjs [--workspace .]

Check whether heartbeat work is likely needed.`);
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
}

function hasPendingMarkdownItems(filePath) {
  const text = readText(filePath);
  if (!text.trim()) return false;
  return text.split(/\r?\n/).some((line) => {
    const stripped = line.trim();
    return stripped.startsWith('- ')
      && !stripped.toLowerCase().startsWith('- no ')
      && !/^- \[x\]/i.test(stripped);
  });
}

function fileMtime(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs / 1000;
  } catch {
    return 0;
  }
}

function gitStatus(workspace) {
  const result = spawnSync('git', ['status', '--short'], {
    cwd: workspace,
    encoding: 'utf8',
  });
  if (result.error && result.error.code === 'ENOENT') return ['git-unavailable'];
  if (result.status !== 0) return [`git-status-failed: ${(result.stderr || '').trim()}`];

  const ignoredPrefixes = ['?? .business-ai-kit/source/', '!! .business-ai-kit/source/'];
  const lines = [];
  for (const line of result.stdout.split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (ignoredPrefixes.some((prefix) => line.startsWith(prefix))) continue;
    lines.push(line);
  }
  return lines;
}

function newestMtime(paths) {
  const mtimes = [];
  for (const filePath of paths) {
    try {
      mtimes.push(fs.statSync(filePath).mtimeMs / 1000);
    } catch {
      // Missing state files are treated as no prior heartbeat state.
    }
  }
  return mtimes.length ? Math.max(...mtimes) : 0;
}

function iso(timestampSeconds) {
  if (!timestampSeconds) return null;
  return new Date(timestampSeconds * 1000).toISOString();
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const workspace = path.resolve(args.workspace);
  const instructions = path.join(workspace, 'Agent-Instructions');
  const automationLog = path.join(instructions, 'Automation-Log.md');
  const outbox = path.join(instructions, 'Outbox.md');
  const lastStateTime = newestMtime([automationLog, outbox]);

  const inboxPath = path.join(instructions, 'Inbox.md');
  const incomingSignalPath = path.join(instructions, 'Signals', 'Incoming.md');
  const outgoingSignalPath = path.join(instructions, 'Signals', 'Outgoing.md');
  const inboxPending = hasPendingMarkdownItems(inboxPath);
  const incomingSignal = hasPendingMarkdownItems(incomingSignalPath);
  const outgoingSignal = hasPendingMarkdownItems(outgoingSignalPath);
  const inboxChanged = inboxPending && fileMtime(inboxPath) > lastStateTime;
  const signalsChanged =
    (incomingSignal && fileMtime(incomingSignalPath) > lastStateTime) ||
    (outgoingSignal && fileMtime(outgoingSignalPath) > lastStateTime);
  const statusLines = gitStatus(workspace);

  const reasons = [];
  if (inboxChanged) reasons.push('changed inbox items');
  if (signalsChanged) reasons.push('changed signals');
  if (statusLines.length) reasons.push('workspace git changes');

  const result = {
    workspace,
    checked_at: new Date().toISOString(),
    last_state_time: iso(lastStateTime),
    needs_deep_review: Boolean(reasons.length),
    reasons,
    signals: {
      inbox_pending: inboxPending,
      inbox_changed_since_last_state: inboxChanged,
      incoming_signal: incomingSignal,
      outgoing_signal: outgoingSignal,
      signals_changed_since_last_state: signalsChanged,
      git_status_count: statusLines.length,
    },
    git_status: statusLines.slice(0, 50),
    // This is a local hint, not a scheduler or a complete activity history.
    scope: 'workspace files only; no assistant session history is read',
    limitations: 'Activity hint only. Log timestamps are not processing checkpoints; clean commits and deadlines require an explicit scoped check.',
  };

  console.log(JSON.stringify(result, null, 2));
  return 0;
}

process.exit(main());
