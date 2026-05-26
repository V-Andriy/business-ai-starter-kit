---
name: workspace-heartbeat
description: Use for the hourly workspace review automation and manual workspace reviews.
---

# Workspace Heartbeat

This skill keeps the workspace alive between sessions.

The heartbeat is inspired by the useful parts of Hermes Agent: durable identity,
context files, skills, curated memory, active work tracking, signals, scheduled
review, and safe state separation. Do not copy the Hermes runtime into MVP.
Adapt the operating loop for Codex and non-technical business users.

## Read First

- `AGENTS.md`
- `Agent-Instructions/Soul.md`
- `Agent-Instructions/Current-Focus.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Workspace-Map.md`
- `Agent-Instructions/Memory.md`
- `Agent-Instructions/Agent-State.md`

## Optional Helper Script

If available, run this before deep review:

```text
python3 Scripts/heartbeat_gate.py --workspace .
```

Use the JSON output as a cheap activity snapshot. The script can flag pending
inbox items, signals, git changes, and recent Codex session candidates. If the
script is missing or fails, continue with the manual activity gate instead of
stopping.

## Work Loop

Use this operating shape:

```text
activity evidence -> heartbeat mode -> focused action -> compact log
```

1. Run the lightweight activity gate first.
2. Check whether anything meaningful changed since the last heartbeat:
   - new or changed workspace files
   - pending `Inbox.md` items
   - active thread changes
   - new `Signals/`
   - unresolved blockers
   - recent Codex/session evidence for this workspace when available
3. If nothing changed and no maintenance is pending, write at most one short `Automation-Log.md` entry and stop.
4. If there is meaningful activity, analyze only the relevant chats, session evidence, diffs, inbox items, and active threads.
5. Process `Inbox.md`.
6. Move handled items to `Outbox.md` with a short note.
7. Update active threads and current focus.
8. Refresh workspace map if files or projects changed.
9. Add durable lessons to memory only when stable and compact.
10. Review whether a skill needs a small update from repeated corrections or proven workflow improvements.
11. Log the run in `Automation-Log.md`.
12. Log instruction or skill improvements in `Improvement-Log.md`.
13. Create signals for anything needing follow-up.
14. If there is a clear next decision for the user, make it visible in `Current-Focus.md` or `Signals/Incoming.md`.

## Heartbeat Modes

Choose the lightest mode that can do the job.

### No-Op Mode

Use when the activity gate finds no meaningful new evidence.

Allowed work:

- append one short automation log entry
- stop

Do not update memory, skills, active threads, or user-facing files in no-op mode.

### Triage Mode

Use when there are small changes, pending inbox items, stale active threads, or
minor state cleanup.

Allowed work:

- process inbox/outbox
- update current focus and active threads
- refresh workspace map
- create signals for decisions or blockers
- write compact automation and improvement logs

### Improvement Mode

Use when there is real evidence from recent chats, repeated user corrections,
workspace changes, or project activity.

Allowed work:

- update compact durable memory
- make small low-risk updates to AI-owned skill instructions
- consolidate stale or duplicated state
- propose larger instruction, privacy, or workflow changes instead of applying them silently

### Escalation Mode

Use when the heartbeat finds a decision, risk, blocker, private-data concern,
project-specific autonomous work, deployment, publishing, paid service, external
account, or secret-handling change.

Allowed work:

- document the issue in `Signals/Incoming.md` or `Inbox.md`
- explain the decision needed in plain language
- stop before risky action

## Evidence Rules

Use evidence before changing durable instructions.

Strong evidence:

- explicit user correction
- repeated pattern across multiple sessions
- clear workspace diff showing an accepted workflow
- approved decision in `Decisions.md`
- active thread state that needs maintenance

Weak evidence:

- one ambiguous assistant output
- a guess about what the user prefers
- a single unfinished idea
- private context that should not become a general rule

Low-risk AI-owned files can be updated from strong evidence. Sensitive user or
business context should be updated conservatively. Major behavior changes should
be proposed before writing.

## Automation Model

Use the latest available capable model for the heartbeat automation.

The heartbeat is allowed to use a strong model because it must be smart enough to decide when not to work. Token control should come from the activity gate, not from using a weaker model.

Recommended default:

```text
model: latest available capable model
reasoning effort: medium
schedule: hourly
```

Use higher reasoning only if the workspace is large or the heartbeat is doing substantial self-improvement analysis. Do not spend deep reasoning on no-op checks.

## Heartbeat Judgment

Do not create noise. If there is nothing useful to change:

- write at most one short `Automation-Log.md` entry
- leave user-facing files alone
- do not invent work
- do not repeatedly ask the same question
- stop after the lightweight check

Wake the user only when there is a decision, blocker, risk, or useful next action.

## Prompt To Use For Automation

```text
Review this Business AI Starter Kit workspace with a change-gated heartbeat loop.

First run a lightweight activity gate before deep work:
- If Scripts/heartbeat_gate.py exists, run: python3 Scripts/heartbeat_gate.py --workspace .
- Read AGENTS.md, Agent-Instructions/Soul.md if present, Agent-Instructions/Agent-State.md, Agent-Instructions/Current-Focus.md, Agent-Instructions/Active-Threads.md, Agent-Instructions/Inbox.md, Agent-Instructions/Automation-Log.md, and Agent-Instructions/Workspace-Map.md.
- Check whether there were meaningful changes since the last heartbeat: new or changed workspace files, pending Inbox items, active-thread changes, Signals, unresolved blockers, or new Codex/session evidence available in local session logs for this workspace.
- If there is no meaningful new activity and no pending maintenance, do not perform deep analysis. Append at most one short Automation-Log entry saying the heartbeat checked and found no actionable changes, then stop.

If there is meaningful activity:
- Analyze relevant recent chats/session evidence and workspace diffs when available.
- Process Agent-Instructions/Inbox.md, append handled items to Agent-Instructions/Outbox.md, update Current-Focus.md, Active-Threads.md, Workspace-Map.md, Memory.md, Automation-Log.md, Improvement-Log.md, and Signals when useful.
- Look for durable self-improvement opportunities: repeated user corrections, confusing onboarding moments, stale instructions, useful workflow patterns, memory cleanup, or skill updates.
- Choose No-Op, Triage, Improvement, or Escalation mode. Use the lightest mode that fits the evidence.
- Use evidence thresholds before changing durable instructions. Make small low-risk AI-owned instruction updates only when evidence is clear. Propose larger or sensitive changes first.

Use Hermes-style discipline adapted for this workspace: keep memory compact, treat skills as reusable procedures, preserve user context, and do not make noisy changes.

Perform only low-risk maintenance automatically. Do not publish, deploy, spend money, expose private data, change secrets, connect external accounts, or continue project-specific work unless the user explicitly authorized it.

If something needs the user's judgment, write a clear note in Inbox.md or Signals/Incoming.md and report it. Keep any user-facing summary brief: what changed, what matters next, and what decision is needed.
```

## Safe Automatic Work

- update workspace state files
- summarize completed inbox items
- mark stale threads as paused or waiting
- add compact durable memory after stable evidence
- apply low-risk improvements to AI-owned skill instructions
- propose larger skill or instruction changes instead of applying them silently
- create project-local notes when a project already exists and the update is clearly relevant
- tidy stale setup items after they are handled

## Must Ask First

- publishing
- deployment
- paid services
- deleting user work
- exposing private data
- changing secret storage
- project-specific autonomous execution
- connecting accounts or granting permissions

## Output Rules

Every run should leave an audit trail:

- `Automation-Log.md`: what was checked, what changed, what needs review
- `Outbox.md`: inbox items that were handled
- `Signals/Incoming.md`: decisions or blockers needing attention
- `Improvement-Log.md`: memory, skill, or instruction improvements

Keep entries short. The heartbeat is an operating loop, not a diary.

## Staleness Rules

- Mark a thread as waiting when the next step needs user input.
- Mark a thread as paused when there is no current action and no deadline.
- Do not close a thread unless the objective is complete or the user abandoned it.
- Do not repeatedly re-add the same inbox item after it has been moved to outbox.
