#!/usr/bin/env node
import fs from 'node:fs';
import os from 'node:os';
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
    return stripped.startsWith('- ') && !stripped.toLowerCase().startsWith('- no ');
  });
}

function statusPathMtime(workspace, statusLine) {
  let rawPath = statusLine.slice(3).trim();
  if (rawPath.includes(' -> ')) rawPath = rawPath.split(' -> ', 2)[1].trim();
  rawPath = rawPath.replace(/^"|"$/g, '');
  try {
    return fs.statSync(path.join(workspace, rawPath)).mtimeMs / 1000;
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

function gitStatus(workspace, since) {
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
    if (since && statusPathMtime(workspace, line) <= since) continue;
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

function walkFiles(root, visit) {
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return false;
  }

  for (const entry of entries) {
    const child = path.join(root, entry.name);
    if (entry.isDirectory()) {
      if (walkFiles(child, visit)) return true;
    } else if (entry.isFile()) {
      if (visit(child)) return true;
    }
  }
  return false;
}

function recentSessionCandidates(workspace, since) {
  const sessionsRoot = path.join(os.homedir(), '.codex', 'sessions');
  if (!fs.existsSync(sessionsRoot)) return [];

  const candidates = [];
  const workspaceName = path.basename(workspace);
  const workspaceText = workspace;

  walkFiles(sessionsRoot, (filePath) => {
    try {
      if (fs.statSync(filePath).mtimeMs / 1000 <= since) return false;
      const sample = fs.readFileSync(filePath, 'utf8').slice(0, 200000);
      if (sample.includes(workspaceText) || sample.includes(workspaceName)) {
        candidates.push(filePath);
      }
    } catch {
      return false;
    }
    return candidates.length >= 20;
  });

  return candidates;
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

  const inboxPending = hasPendingMarkdownItems(path.join(instructions, 'Inbox.md'));
  const incomingSignal = hasPendingMarkdownItems(path.join(instructions, 'Signals', 'Incoming.md'));
  const outgoingSignal = hasPendingMarkdownItems(path.join(instructions, 'Signals', 'Outgoing.md'));
  const statusLines = gitStatus(workspace, lastStateTime);
  const sessionCandidates = recentSessionCandidates(workspace, lastStateTime);

  const reasons = [];
  if (inboxPending) reasons.push('pending inbox items');
  if (incomingSignal || outgoingSignal) reasons.push('pending signals');
  if (statusLines.length) reasons.push('workspace git changes');
  if (sessionCandidates.length) reasons.push('recent Codex session evidence');

  const result = {
    workspace,
    checked_at: new Date().toISOString(),
    last_state_time: iso(lastStateTime),
    needs_deep_review: Boolean(reasons.length),
    reasons,
    signals: {
      inbox_pending: inboxPending,
      incoming_signal: incomingSignal,
      outgoing_signal: outgoingSignal,
      git_status_count: statusLines.length,
      recent_session_candidate_count: sessionCandidates.length,
    },
    git_status: statusLines.slice(0, 50),
    recent_session_candidates: sessionCandidates,
  };

  console.log(JSON.stringify(result, null, 2));
  return 0;
}

process.exit(main());
