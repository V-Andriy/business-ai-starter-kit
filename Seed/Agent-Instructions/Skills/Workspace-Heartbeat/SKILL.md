---
name: workspace-heartbeat
description: Use to configure and run the required small weekly workspace maintenance check, or a requested manual review.
---

# Workspace Heartbeat

Keep maintenance narrow and useful. First-time setup includes one small weekly
check. Configure it through the actual host scheduler after confirming timing
and required consent; use a documented manual weekly fallback if unavailable.
Follow `../../../AGENTS.md` for safety, local history, and context handling.

## Choose The Scope

For a manual request, identify the issue or folder the user wants checked.
The setup schedule runs once weekly and covers local workspace continuity:
actionable inbox changes, stale ongoing-work pointers, and confirmed context
that needs a small correction. Confirm day/time, timezone, and host consent.
Explain how to pause it and that AI runs consume the
host's usage allowance or credits; a local activity gate inside an AI run does
not prevent the cost of starting that run.

Use the current configured model and settings unless the user requests a
change. Do not increase the cadence or expand the scope without approval.
Check for an existing matching automation before creating one.
Use the host's supported scheduling tool and verify the saved configuration.
Record the verified id, scope, timezone, and next run in `Agent-State.md`; log
setup once. If the host cannot schedule it or consent is withheld, record the
blocker and manual weekly fallback. Do not claim an automation was created.

A general maintenance request does not authorize project execution, external
research, account connections, or instruction rewrites. Keep those outside
the run unless explicitly included in the approved scope.

## Smallest Useful Check

1. Read the approved scope and the relevant status or source only.
2. Inspect `git status --short` when file changes matter to the review.
3. Use `pnpm heartbeat:gate` if an activity snapshot will help choose which
   files need inspection. It is an activity hint, not a complete activity record
   or an AI billing control. A false `needs_deep_review` does not override an
   explicit request or due deadline; clean commits may still need scoped review.
4. Read only changed or relevant sections. Do not load every dossier, log,
   project, or chat history for a routine check.
5. Stop when there is no meaningful new evidence or actionable change.

Old unanswered decisions are not new activity. Logs created by maintenance
are not a reason to launch another broad review. Do not browse for something
to report or invent improvements to justify a run.

## Allowed Work

Within the approved scope, a review may:

- correct a stale pointer or status using verified evidence
- consolidate duplicate handoffs without losing their source detail
- capture a confirmed preference or lesson in its owning file
- identify a concrete blocker or changed decision for the user

Change only the owning file. Avoid copying the same status into dossiers,
focus, threads, logs, and project trackers. Use project pointers when enough.
Do not close work merely because the user has not answered. Mark it waiting
or paused; close only when complete or abandoned by the user.

For related repositories, verify their current state before reporting a
pending action. Do not modify those repositories under a workspace review.
Use strong evidence for any approved durable instruction edit: an explicit
correction, repeated observed problem, or verified documentation.

## No Change Means No Write

When nothing meaningful changed:

- write no automation log, inbox item, status refresh, or commit
- send no routine notification from a scheduled run
- stop; for a manual review, report the requested findings, including unchanged
  pending items when relevant. Say no action is needed only after verifying it

For a meaningful change, keep one compact audit entry in `Automation-Log.md`
with the result and relevant file pointer. Use `Improvement-Log.md` instead
for a substantive skill improvement; do not duplicate the narrative.
Follow the root Git rules for a completed local maintenance batch. Secret
scanning follows `../Secrets-Vault/SKILL.md`; read-only reviews and unchanged
runs do not trigger a scan.

## User Handoff

Put a new decision, failure, or required action in `Agent-Instructions/Inbox.md`
with enough context to explain why it matters and a link to details.
Keep unchanged questions untouched. Do not repeatedly notify the user.
An automation chat does not prove the user saw the handoff. Move it to
`Outbox.md` only after resolution or an explicitly recorded stale outcome.

Never infer permission from an unattended user being unavailable. Stop before
an action outside the saved authorization and record the needed decision.

## Scheduling Prompt

Adapt this to the approved scope; leave schedule and model in the tool config:

```text
Review [approved scope] for [specific meaningful change]. Follow
Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md. Read only the context
needed for this check. Make only the approved local maintenance changes.
Stay quiet and write nothing when the state is unchanged or non-actionable.
Notify only on a meaningful change, completion, failure, or required user
action, and save an actionable Inbox.md handoff when needed.
```

To disable or change a schedule, use its recorded id and verify the resulting
state. Do not delete unrelated automations or treat manual review as consent
to create a recurring schedule.
