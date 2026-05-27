---
name: workspace-heartbeat
description: Use for the hourly workspace review automation and manual workspace reviews.
---

# Workspace Heartbeat

Use this skill to keep the workspace current between sessions without creating noise.

The heartbeat checks for meaningful change, performs low-risk maintenance, and leaves a compact audit trail.

## Read First

- `AGENTS.md`
- `Agent-Instructions/Soul.md`
- `Agent-Instructions/Current-Focus.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Workspace-Map.md`
- `Agent-Instructions/Memory.md`
- `Agent-Instructions/Agent-State.md`

## Activity Gate

Run this first when available:

```text
pnpm heartbeat:gate
```

Use the JSON output as a cheap activity snapshot. If the script is missing or fails, continue with a manual check.

Meaningful activity includes:

- new or changed workspace files
- pending `Inbox.md` items
- active thread changes
- new `Signals/`
- unresolved blockers
- recent Codex/session evidence for this workspace when available

If nothing meaningful changed, write at most one short `Automation-Log.md` entry and stop.

## Work Loop

Use the lightest mode that fits the evidence.

```text
activity evidence -> mode -> focused action -> compact log
```

1. Run the activity gate.
2. Choose a mode.
3. Analyze only relevant files, diffs, inbox items, active threads, and session evidence.
4. Process `Inbox.md`.
5. Move handled items to `Outbox.md`.
6. Update `Current-Focus.md`, `Active-Threads.md`, and `Workspace-Map.md` when useful.
7. Add durable memory only when it is stable and compact.
8. Update skills only from strong evidence.
9. Log the run in `Automation-Log.md`.
10. Log instruction or skill improvements in `Improvement-Log.md`.
11. Create signals for decisions or blockers.

## Modes

### No-Op

Use when there is no meaningful new evidence.

- Append at most one short automation log entry.
- Do not update memory, skills, active threads, or user-facing files.
- Stop.

### Triage

Use for small changes, pending inbox items, stale active threads, or minor state cleanup.

- process inbox/outbox
- update current focus and active threads
- refresh workspace map
- create signals for decisions or blockers
- write compact logs

### Improvement

Use when recent chats, repeated corrections, workspace changes, or project activity show a real improvement opportunity.

- update compact durable memory
- make small low-risk updates to AI-owned skill instructions
- consolidate stale or duplicated state
- propose larger instruction, external-sharing, or workflow changes before applying them

### Escalation

Use when there is a decision, risk, blocker, public-output concern, project-specific autonomous work, deployment, publishing, paid service, external account, or secret-handling change.

- document the issue in `Signals/Incoming.md` or `Inbox.md`
- explain the needed decision in plain language
- stop before risky action

## Evidence Rules

Strong evidence:

- explicit user correction
- repeated pattern across sessions
- accepted workflow in workspace diffs
- approved decision in `Decisions.md`
- active thread state that needs maintenance

Weak evidence:

- one ambiguous assistant output
- a guess about user preference
- one unfinished idea
- personal or business context that belongs in dossiers instead of general rules

Use strong evidence for durable instruction changes. Update user and business dossiers when new useful context is stable enough to help future work.

## Automation Model

Use the latest available capable model for the heartbeat automation.

Recommended default:

```text
model: latest available capable model
reasoning effort: medium
schedule: hourly
```

Use higher reasoning only when the workspace is large or the heartbeat is doing real self-improvement analysis.

## Prompt For Automation

```text
Review this Business AI Starter Kit workspace with a change-gated heartbeat loop.

First run a lightweight activity gate:
- If Scripts/heartbeat_gate.mjs exists, run: pnpm heartbeat:gate.
- Read AGENTS.md, Agent-Instructions/Soul.md, Agent-Instructions/Agent-State.md, Agent-Instructions/Current-Focus.md, Agent-Instructions/Active-Threads.md, Agent-Instructions/Inbox.md, Agent-Instructions/Automation-Log.md, and Agent-Instructions/Workspace-Map.md.
- Check for meaningful changes: workspace files, Inbox items, active threads, Signals, blockers, or recent local session evidence for this workspace.
- If there is no meaningful new activity and no pending maintenance, append at most one short Automation-Log entry and stop.

If there is meaningful activity:
- Analyze only relevant recent evidence.
- Process Inbox.md, append handled items to Outbox.md, and update Current-Focus.md, Active-Threads.md, Workspace-Map.md, Memory.md, Automation-Log.md, Improvement-Log.md, and Signals when useful.
- Choose No-Op, Triage, Improvement, or Escalation mode.
- Make low-risk AI-owned instruction updates only from strong evidence.
- Propose larger or external-facing changes first.

Do not publish, deploy, spend money, share workspace context externally, change secrets, connect accounts, or continue project-specific autonomous work unless the user explicitly authorized it.

Keep any user-facing summary brief: what changed, what matters next, and what decision is needed.
```

## Must Ask First

- publishing
- deployment
- paid services
- deleting user work
- sharing workspace context externally
- changing secret storage
- project-specific autonomous execution
- connecting accounts or granting permissions

## Output Rules

Every run should leave a compact audit trail:

- `Automation-Log.md`: what was checked, what changed, what needs review
- `Outbox.md`: inbox items that were handled
- `Signals/Incoming.md`: decisions or blockers needing attention
- `Improvement-Log.md`: memory, skill, or instruction improvements

Keep entries short. The heartbeat is an operating loop, not a diary.

## Staleness Rules

- Mark a thread as waiting when the next step needs user input.
- Mark a thread as paused when there is no current action and no deadline.
- Close a thread only when the objective is complete or abandoned by the user.
- Do not re-add the same inbox item after it has been moved to outbox.
