---
name: workspace-heartbeat
description: Use for the hourly workspace review automation and manual workspace reviews.
---

# Workspace Heartbeat

This skill keeps the workspace alive between sessions.

## Read First

- `AGENTS.md`
- `Agent-Instructions/Current-Focus.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Workspace-Map.md`
- `Agent-Instructions/Memory.md`
- `Agent-Instructions/Agent-State.md`

## Work Loop

1. Read the workspace state and decide whether anything changed since the last run.
2. Process `Inbox.md`.
3. Move handled items to `Outbox.md` with a short note.
4. Update active threads and current focus.
5. Refresh workspace map if files or projects changed.
6. Add durable lessons to memory only when stable and compact.
7. Review whether a skill needs a small update from repeated corrections or proven workflow improvements.
8. Log the run in `Automation-Log.md`.
9. Log instruction or skill improvements in `Improvement-Log.md`.
10. Create signals for anything needing follow-up.
11. If there is a clear next decision for the user, make it visible in `Current-Focus.md` or `Signals/Incoming.md`.

## Heartbeat Judgment

Do not create noise. If there is nothing useful to change:

- write a short `Automation-Log.md` entry
- leave user-facing files alone
- do not invent work
- do not repeatedly ask the same question

Wake the user only when there is a decision, blocker, risk, or useful next action.

## Prompt To Use For Automation

```text
Review this Business AI Starter Kit workspace.

Read AGENTS.md and the Agent-Instructions files. Process Agent-Instructions/Inbox.md, append handled items to Agent-Instructions/Outbox.md, update Current-Focus.md, Active-Threads.md, Workspace-Map.md, Memory.md, Automation-Log.md, Improvement-Log.md, and Signals when useful.

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
