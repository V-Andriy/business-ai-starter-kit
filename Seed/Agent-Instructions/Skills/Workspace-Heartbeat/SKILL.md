---
name: workspace-heartbeat
description: Use for daily checkpoint workspace maintenance automations and manual workspace reviews.
---

# Workspace Heartbeat

Use this skill to keep the workspace durable, useful, and ready for the user to return.

The heartbeat runs in autonomous mode. It should do low-risk maintenance, look for useful next actions, and write anything user-facing into `Inbox.md` for the next live conversation.

## Read First

- `AGENTS.md`
- `Agent-Instructions/Soul.md`
- `Agent-Instructions/Current-Focus.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Outbox.md`
- `Agent-Instructions/Workspace-Map.md`
- `Agent-Instructions/Memory.md`
- `Agent-Instructions/Agent-State.md`
- `Agent-Instructions/Automation-Log.md`

## Schedule

Create three daily checkpoint automations by default:

- morning: 09:30
- late morning: 11:30
- late afternoon: 16:30

Use separate automations for each daily time. Do not rely on one RRULE with multiple `BYHOUR` values unless the Codex app UI clearly shows every intended run time. If the UI shows only one daily time, treat the schedule as single-time and create separate automations.

Record the exact automation ids in `Automation-Log.md`.

Use the user's locale and working pattern when known. Do not create hourly automations by default.

## Activity Gate

Run this first when available:

```text
pnpm heartbeat:gate
```

Use the JSON output as a cheap activity snapshot. If the script is missing or fails, continue with a manual check.

Meaningful activity includes:

- new or changed workspace files
- Git status changes
- pending `Inbox.md` items
- active thread changes
- new `Signals/`
- unresolved blockers
- recent Codex/session evidence for this workspace when available
- external news or documentation changes that are clearly relevant to the user's active work

If nothing meaningful changed, write at most one short `Automation-Log.md` entry and stop.

## Work Loop

Use the lightest mode that can produce value.

```text
activity evidence -> mode -> focused action -> git hygiene -> compact log
```

1. Run the activity gate.
2. Check `git status --short`.
3. Review recent relevant chat/session evidence when available.
4. Process `Inbox.md`.
5. Move handled items to `Outbox.md`.
6. Update dossiers, memory, current focus, active threads, and workspace map when useful.
7. Review relevant docs and skills when new evidence suggests they are stale or improvable.
8. Check whether any active project or business domain would benefit from timely external research.
9. Create `Inbox.md` items for useful discoveries, decisions, blockers, or recommendations the user should see later.
10. Keep Git history clean with coherent local checkpoint commits after meaningful completed changes.
11. Log the run in `Automation-Log.md`.
12. Log instruction or skill improvements in `Improvement-Log.md`.

## Modes

### No-Op

Use when there is no meaningful new evidence.

- Append at most one short automation log entry.
- Do not update memory, skills, active threads, or user-facing files.
- Stop.

### Triage

Use for small changes, pending inbox items, stale active threads, Git status checks, or minor state cleanup.

- process inbox/outbox
- update current focus and active threads
- refresh workspace map
- create inbox items or signals for decisions and blockers
- write compact logs

### Maintenance

Use when there is useful low-risk work to do.

- update user and business dossiers
- update compact durable memory
- review docs, skills, and project state
- tidy stale setup or project state
- summarize useful discoveries for the user in `Inbox.md`
- keep local Git history clean after completed changes

### Improvement

Use when recent chats, repeated corrections, workspace changes, documentation changes, or project activity show a durable improvement opportunity.

- make small low-risk updates to AI-owned skill instructions
- consolidate stale or duplicated state
- propose larger instruction, external-sharing, or workflow changes before applying them
- record reusable kit feedback only after user approval

### Escalation

Use when there is a decision, risk, blocker, public-output concern, project-specific autonomous work, deployment, publishing, paid service, external account, GitHub backup, or secret-handling change.

- document the issue in `Inbox.md` or `Signals/Incoming.md`
- explain the needed decision in plain language
- stop before risky action

## Proactive Usefulness

Look for useful work without inventing noise.

Good proactive work:

- capture useful context from recent conversations into dossiers or memory
- update active threads and next actions
- spot useful calculators, apps, dashboards, automations, workflows, templates, or checklists that could help the user
- review Git status and keep changes understandable
- check project docs for stale decisions or missing next actions
- continue active project maintenance when the next step is already clear, safe, and does not require user input
- review skills when repeated behavior suggests a better workflow
- check official docs when a tool or platform detail may have changed
- check public web/news only when it is clearly relevant to the user's active business, project, market, tool, customer, or risk

Do not browse the web just to have something to report. If research finds something useful, summarize it in `Inbox.md` with why it matters and a suggested next action.

If you see a useful tool or workflow idea, write it to `Inbox.md` with:

- what it would do
- why it would help
- the smallest useful first version
- whether it needs approval before building

Project continuation is allowed only when:

- the project already exists
- the next action is written in project files or `Active-Threads.md`
- the work is low-risk and local
- no publishing, deployment, paid service, external account, secret change, or public/client-facing claim is involved
- no business decision is missing

If those conditions are not met, write the proposed next step to `Inbox.md`.

## Git Hygiene

The workspace should be recoverable.

- Inspect `git status --short` on each meaningful heartbeat.
- Keep unrelated changes separate when possible.
- Run the secret scanner before commits or pushes.
- Make local commits proactively for coherent completed maintenance batches.
- Use clear commit messages.
- If a private GitHub backup remote is configured and approved, push after clean heartbeat commits so the cloud copy stays current.
- Do not create or change remotes, create public repositories, or do a first backup push without user approval.
- Record blockers when Git is unavailable, dirty in a confusing way, or a secret scan fails.

## User-Aware Autonomous Mode

The heartbeat usually runs without the user present.

- Do not expect live answers.
- Put user-facing discoveries, recommendations, and decisions in `Inbox.md`.
- Put completed maintenance in `Outbox.md` and `Automation-Log.md`.
- Keep summaries short: what was checked, what changed, what matters next.
- Do not send external messages, publish, deploy, spend money, connect accounts, or change secrets.

## Evidence Rules

Strong evidence:

- explicit user correction
- repeated pattern across sessions
- accepted workflow in workspace diffs
- approved decision in `Decisions.md`
- active thread state that needs maintenance
- current official documentation for tool behavior

Weak evidence:

- one ambiguous assistant output
- a guess about user preference
- one unfinished idea
- personal or business context that belongs in dossiers instead of general rules

Use strong evidence for durable instruction changes. Update user and business dossiers when new useful context is stable enough to help future work.

## Automation Model

Use the latest available capable model for checkpoint automations.

Recommended default:

```text
model: latest available capable model
reasoning effort: medium
schedule: use the Schedule section in this skill
```

Use higher reasoning only when the workspace is large or the heartbeat is doing real self-improvement analysis.

## Prompt For Automation

```text
Review this Business AI Starter Kit workspace with a daily checkpoint maintenance loop.

First run a lightweight activity gate:
- If Scripts/heartbeat_gate.mjs exists, run: pnpm heartbeat:gate.
- Read AGENTS.md, Agent-Instructions/Soul.md, Agent-Instructions/Agent-State.md, Agent-Instructions/Current-Focus.md, Agent-Instructions/Active-Threads.md, Agent-Instructions/Inbox.md, Agent-Instructions/Outbox.md, Agent-Instructions/Automation-Log.md, and Agent-Instructions/Workspace-Map.md.
- Check git status.
- Check for meaningful changes: workspace files, Inbox items, active threads, Signals, blockers, recent local session evidence, or relevant docs/news that matter to active work.
- If there is no meaningful activity and no pending maintenance, append at most one short Automation-Log entry and stop.

If there is meaningful activity:
- Analyze only relevant recent evidence.
- Process Inbox.md, append handled items to Outbox.md, and update Current-Focus.md, Active-Threads.md, Workspace-Map.md, User-Dossier.md, Business-Dossier.md, Memory.md, Automation-Log.md, Improvement-Log.md, and Signals when useful.
- Review docs and skills when new evidence suggests they are stale or improvable.
- Use web research only when clearly relevant to the user's active work, and write useful findings to Inbox.md.
- Choose No-Op, Triage, Maintenance, Improvement, or Escalation mode.
- Make low-risk AI-owned instruction updates only from strong evidence.
- Keep local Git history clean after coherent completed changes. Run the secret scanner before commits. If an approved private GitHub backup is configured, push clean commits.
- Propose larger or external-facing changes first.

Do not publish, deploy, spend money, share workspace context externally, change secrets, connect accounts, create or change GitHub backup, do a first GitHub push, or start new project-specific autonomous work unless the user explicitly authorized it.

Keep any user-facing summary in Inbox.md brief: what changed, what matters next, and what decision is needed.
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
- creating or changing GitHub backup
- first push to a GitHub backup

## Output Rules

Every run should leave a compact audit trail:

- `Automation-Log.md`: what was checked, what changed, what needs review
- `Outbox.md`: inbox items that were handled
- `Inbox.md`: useful discoveries, decisions, recommendations, or blockers for the next user session
- `Signals/Incoming.md`: coordination pointers when another automation or agent needs attention
- `Improvement-Log.md`: memory, skill, or instruction improvements

Keep entries short. The heartbeat is an operating loop, not a diary.

## Staleness Rules

- Mark a thread as waiting when the next step needs user input.
- Mark a thread as paused when there is no current action and no deadline.
- Close a thread only when the objective is complete or abandoned by the user.
- Do not re-add the same inbox item after it has been moved to outbox.
