---
name: workspace-heartbeat
description: Use for a low-noise scheduled workspace checkpoint that reviews meaningful changes, maintains durable state, and hands important findings to the next live conversation.
---

# Workspace Heartbeat

The heartbeat is a maintenance checkpoint, not permission to start new project work.

Its job is to notice meaningful changes, keep durable state usable, and leave important user-facing items in `Inbox.md`.

## Default Shape

Use one scheduled checkpoint by default. Offer multiple role-specific checkpoints only when the workspace has enough activity to justify their usage and maintenance cost.

A checkpoint must:

1. Load `AGENTS.md` and the current workspace state.
2. Run the activity gate.
3. Stop quickly when nothing meaningful changed.
4. Make only low-risk in-scope maintenance changes.
5. Leave questions, warnings, recommendations, and approvals in `Inbox.md`.
6. Keep one compact audit entry.

## Model Routing

Do not always use the strongest available model.

- Use a fast or efficient model for the activity gate, simple classification, and deterministic cleanup.
- Use a balanced worker for ordinary state maintenance.
- Use a strong reasoning model only when evidence supports a difficult synthesis or instruction review.
- Use a fresh reviewer for a broad or behavior-changing instruction proposal.

If the scheduling surface cannot route models by stage, choose a balanced default and escalate only in a live task. Never require a premium model or experimental orchestration feature for the heartbeat.

## Activity Gate

Run:

```text
pnpm heartbeat:gate
```

Then inspect only enough evidence to decide whether useful work exists:

- `Inbox.md`
- `Current-Focus.md`
- `Active-Threads.md`
- `Agent-State.md`
- `Signals/Incoming.md`
- `git status --short`
- recent relevant workspace or session changes when available

An unchanged pending decision is not new activity.

## Modes

### No-Op

Use when there is no meaningful change or action.

- Do not rewrite state files.
- Do not create a new inbox item.
- Append at most one short no-op entry to `Automation-Log.md`.
- Stop.

### Triage

Use when new information needs classification or handoff.

- Group duplicate inbox items.
- Mark stale time-sensitive items clearly.
- Move handled items to `Outbox.md` only when delivery rules are satisfied.
- Leave a compact decision, risk, or blocker for the live agent.

### Maintenance

Use for factual state drift.

- Refresh stale pointers in current focus, active threads, workspace map, or project next actions.
- Add confirmed durable context to the correct dossier or memory file.
- Keep the change smaller than the evidence.

### Improvement

Use only with strong evidence of repeated friction or an accepted better workflow.

- Patch the narrowest workspace-owned skill or instruction.
- Do not rewrite broad rules from one weak signal.
- Log the evidence and the improvement in `Improvement-Log.md`.
- Leave broad, risky, or user-owned instruction changes as a proposal.

### Escalation

Use when the next action crosses an approval boundary, expands project scope, needs a user decision, or cannot be completed safely.

- Do not perform the action.
- Write one clear item to `Inbox.md`: what happened, why it matters, and what decision is needed.
- Record the blocker in the relevant active thread.

## Allowed Maintenance

Without new approval, a checkpoint may:

- inspect local workspace state
- update factual status and pointers
- consolidate duplicate queue items
- move genuinely handled work to the outbox
- add a compact confirmed memory or dossier fact
- fix a small broken local reference
- improve a workspace-owned skill from strong repeated evidence
- make a coherent local commit after a clean scan
- push to an already approved private backup remote

The approval boundaries in `AGENTS.md` always apply. A scheduler, stronger model, or subagent does not expand authorization.

Never prepare, broaden, install, refresh, package, or remove Portable Workspace Context from a checkpoint. If the local snapshot appears stale, leave a proposal in `Inbox.md`; the next live conversation must show the exact preview and obtain approval.

## Orchestration

Most checkpoints should use one agent.

Use a focused read-only subagent only when an independent review would materially improve a difficult instruction or state diagnosis. Do not start agent teams, high-concurrency modes, dynamic workflows, or project implementation from a routine heartbeat.

Ephemeral worker state belongs in the harness. Use `Signals/` only for durable pointers that must survive into another session or automation.

## Git And Evidence

- Check Git status before writing.
- Preserve user changes and unrelated files.
- Base updates on current files, not assumptions from old logs.
- Stage only the intended files, run `pnpm secret:scan:staged`, then commit.
- Commit only a coherent maintenance change.
- Do not push unless a private backup remote is already configured and approved.

## User Delivery

Automation output is not delivered user communication.

Put anything the user must see in `Inbox.md`. Include:

- discovery or status
- practical consequence
- requested decision or attention
- relevant file or project pointer

The next live agent must surface the item before marking it handled.

## Default Scheduled Prompt

```text
Run the Business AI Starter Kit workspace checkpoint.

Read AGENTS.md, then load and follow Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md. Run pnpm heartbeat:gate, inspect the required state and git status, and choose exactly one mode: No-Op, Triage, Maintenance, Improvement, or Escalation.

Stay within the current user authorization and the approval boundaries in AGENTS.md. Do not start new project work. Keep user-facing findings in Agent-Instructions/Inbox.md because this automation chat is not a delivery channel.

If nothing meaningful changed, write at most one short no-op log entry and stop. If files change, stage only the intended files, run pnpm secret:scan:staged, and make one coherent local commit. Push only to an already approved private backup remote.
```

## Optional Role Split

For a busy workspace, the user may approve separate checkpoints:

- morning: durable context and current business focus
- midday: queue and state cleanup
- late day: repeated friction and instruction improvement

Each scheduled run must still use the activity gate and one mode. Do not create multiple schedules by default.

## Audit Trail

Use only the files that match the outcome:

- `Automation-Log.md` for one compact run record
- `Inbox.md` for user-facing handoff
- `Outbox.md` for handled inbox items
- `Improvement-Log.md` for durable instruction improvements
- `Signals/Incoming.md` or `Signals/Outgoing.md` for cross-session pointers

Keep entries factual and short. Do not imply progress when no useful change occurred.

## Done Criteria

- The checkpoint selected one mode from current evidence.
- No-op runs stayed quiet.
- Changes were narrow, safe, and verified.
- Anything the user must see is in `Inbox.md`.
- The audit trail matches what actually happened.
