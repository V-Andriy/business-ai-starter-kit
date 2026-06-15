---
name: workspace-heartbeat
description: Use for daily checkpoint workspace maintenance automations and manual workspace reviews.
---

# Workspace Heartbeat

Use this skill to keep the workspace durable, useful, and ready for the user to return.

The heartbeat runs in autonomous mode. It should do low-risk maintenance, look for useful next actions, and write anything user-facing into `Inbox.md` for the next live conversation.

Core standard: a heartbeat is useful only when it improves workspace state, memory, instructions, project organization, or the next-action surface. A checklist entry that merely says the same pending decisions still exist is not useful work.

Each non-no-op heartbeat must also ask: what would make future work better within this run's daily role? Look for one small workflow, memory, cleanup, handoff, or project-structure improvement that would prevent repeated mistakes, reduce stale state, sharpen future agent behavior, or make the user's next session easier.

Automation delivery rule: the automation chat is isolated. User-facing questions, warnings, recommendations, approval requests, and feedback prompts are not delivered unless they are written to `Inbox.md` for the next live chat agent to surface.

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
- `Agent-Instructions/Improvement-Log.md`

## Schedule

Create three daily checkpoint automations by default. They are intentionally different jobs, not the same broad heartbeat at three times:

- morning, 09:30: memory intake and business focus
- late morning, 11:30: workspace cleanup and decision hygiene
- late afternoon, 16:30: learning, skills, and instruction improvement

Use separate automations for each daily time. Do not rely on one RRULE with multiple `BYHOUR` values unless your tool's scheduling UI (Codex automations or Claude Code scheduled tasks) clearly shows every intended run time. If the UI shows only one daily time, treat the schedule as single-time and create separate automations.

Record the exact automation ids in `Automation-Log.md`.

Use the user's locale and working pattern when known. Do not create hourly automations by default.

## Daily Roles

### 09:30 - Memory Intake And Business Focus

Use the morning run to turn recent real activity into durable context and a clear operating picture.

Allowed:

- update `Memory.md`, `User-Dossier.md`, `Business-Dossier.md`, `Current-Focus.md`, and `Active-Threads.md` from strong evidence
- add or tighten one `Inbox.md` handoff only when the user needs to see it
- surface one practical business-development next action when relevant

Do not:

- edit skills
- do broad cleanup
- start project-specific autonomous work
- repeat unchanged pending decisions

### 11:30 - Workspace Cleanup And Decision Hygiene

Use the late-morning run to keep the workspace readable, current, and low-noise.

Allowed:

- compress duplicate inbox items
- move handled items to `Outbox.md`
- mark stale date-sensitive prompts as skipped or stale when the date has passed
- refresh `Workspace-Map.md`, `Active-Threads.md`, and project tracker references when stale

Do not:

- write durable memory unless cleanup reveals a confirmed stable fact
- edit skills
- start new research projects
- add inbox items unless the user's next decision changes

### 16:30 - Learning, Skills, And Instruction Improvement

Use the late-afternoon run to learn from the day's agent behavior and improve reusable procedures.

Allowed:

- review today's automation logs, improvement log, explicit user corrections, and relevant diffs
- patch workspace-owned skills or instructions only from strong evidence
- update `Improvement-Log.md`
- write report-only recommendations for major automation, skill, strategy, or instruction changes

Do not:

- clean the inbox except for an instruction risk or blocker
- do broad project state refresh
- change business strategy or public messaging from weak evidence
- rewrite a skill from one weak signal
- duplicate a weekly system-wide instruction evolution automation when one exists

## Activity Gate

Run this first when available:

```text
pnpm heartbeat:gate
```

Use the JSON output as a cheap activity snapshot. If the script is missing or fails, continue with a manual check.

Meaningful activity includes:

- new or changed workspace files
- Git status changes
- newly changed `Inbox.md` items, not old unresolved decisions by themselves
- active thread changes
- new `Signals/`
- unresolved blockers
- recent assistant session evidence for this workspace when available (Codex or Claude Code)
- external news or documentation changes that are clearly relevant to the user's active work

If nothing meaningful changed, write at most one short `Automation-Log.md` entry and stop. Do not run a deep review just because yesterday's decision queue is still pending.

## Work Loop

Use the lightest mode that can produce value. Apply the automation's daily role before choosing mode; do not use one checkpoint to do another checkpoint's job.

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
10. Delete, merge, or compress duplicate/stale AI-owned instructions and decision prompts when the source detail is preserved elsewhere.
11. Run the workflow improvement loop within the automation's daily role: identify one prevention rule, cleanup, project-structure fix, memory update, or handoff improvement that would make the next run or next user session better.
12. Keep Git history clean with coherent local checkpoint commits after meaningful completed changes.
13. Log the run in `Automation-Log.md`.
14. Log instruction or skill improvements in `Improvement-Log.md`.

Before logging, name the value produced and the improvement lesson. If the answer is only "checked files" or "pending items remain", switch to No-Op or do one small cleanup that is actually useful.

## Modes

### No-Op

Use when there is no meaningful new evidence.

- Append at most one short automation log entry.
- Do not update memory, skills, active threads, or user-facing files.
- Stop.

### Triage

Use for small changes, pending inbox items, stale active threads, Git status checks, or minor state cleanup.

- process inbox/outbox; merge duplicate decision prompts into one decision digest when project trackers already hold the details
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
- add prevention rules when a run reveals stale cross-repo state, repeated checklist behavior, unclear ownership, noisy inbox patterns, or ambiguous next actions
- propose larger instruction, external-sharing, or workflow changes before applying them
- record reusable kit feedback only after user approval

Respect the daily role before choosing this mode. The 09:30 and 11:30 runs should leave skill and instruction edits for the 16:30 run unless there is an active instruction risk or blocker.

### Escalation

Use when there is a decision, risk, blocker, public-output concern, project-specific autonomous work, deployment, publishing, paid service, external account, GitHub backup, or secret-handling change.

- document the issue in `Inbox.md` or `Signals/Incoming.md`
- explain the needed decision in plain language
- stop before risky action

## Proactive Usefulness

Look for useful work without inventing noise.

Good proactive work:

- capture useful context from recent conversations into dossiers or memory
- remove duplicated instruction/state text when one canonical file is enough
- update active threads and next actions
- after spotting a stale or inaccurate next action, update the rule that allowed it when the fix is low-risk and clearly reusable
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
- Do not mark user-facing questions or feedback prompts as handled merely because the automation wrote them in its own chat. They remain pending until a live chat agent surfaces them to the user, the user answers, or the item becomes stale and is explicitly recorded that way.
- Put completed maintenance in `Outbox.md` and `Automation-Log.md`.
- Keep summaries short: what was checked, what changed, what matters next.
- Keep `Inbox.md` small enough to read. Prefer a few grouped decisions that point to project trackers over long repeated lists of individual event or task bullets.
- Do not send external messages, publish, deploy, spend money, connect accounts, or change secrets.

## Live Chat Handoff Rules

Use these rules when a heartbeat or automation leaves work for the next real user conversation:

- Write the inbox item as a live handoff, not as an automation report.
- Start with the practical ask: decision, attention, approval, correction, or optional feedback.
- Include only enough context for the live agent to explain why it matters.
- If the item is optional, say it is optional.
- Never move the item to `Outbox.md` until a live chat agent has actually shown it to the user, the user answered it, or the item is stale.
- If an item was mistakenly marked handled because it appeared only in an automation chat, restore it to `Inbox.md` and record the correction in `Improvement-Log.md`.

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

## Workflow Improvement Loop

Every non-no-op run should include a short retrospective:

- What changed in the workspace or recent sessions?
- What did that reveal about instructions, memory, project structure, inbox hygiene, or handoff quality?
- What small role-appropriate edit would make the next run better?
- Can that edit be safely made now without user approval?

Apply small, low-risk AI-owned improvements immediately. Examples:

- add a stale-state check after discovering a next action that points to already-committed work
- tighten a project-local `AGENTS.md` when future agents keep missing a boundary
- merge duplicate instructions into one canonical file
- move detailed project facts out of global memory into the project folder
- update `Workspace-Map.md` when navigation has changed
- add a brief dossier or memory note when the user gives a stable preference

Do not turn this into busywork. If there is no genuine lesson, say so and no-op. Do not use this loop to bypass a daily role's limits.

## Cross-Repo State Rules

When a heartbeat records work in a related repo outside this workspace:

- Check that repo's current `git status --short` and latest commit before writing a pending item.
- If the related repo is dirty, record the specific verification or commit needed.
- If the related repo is clean and the needed work is already committed, update this workspace to point to the committed state instead of adding stale follow-up.
- If the related repo changes after the heartbeat's first check, prefer the latest observed state before committing this workspace's handoff.
- Never leave `Inbox.md`, `Current-Focus.md`, or project next actions saying "uncommitted changes" when the related repo is already clean.

## Decision Debt Rules

Pending decisions are not automatically new work. On each meaningful run:

- If a decision is unchanged and still needs the user, leave it alone or group it under a short digest.
- If several bullets ask the same kind of decision, consolidate them into one decision prompt and point to the project tracker for detail.
- If the date passed, mark the item handled, skipped, or stale in the project file and move the old prompt to `Outbox.md`.
- If the heartbeat cannot legally or safely decide something, do not repeat the full item forever; preserve the detail in the project file and keep only the next business decision visible.
- Do not add a new inbox item unless it changes what the user should decide or do next.

## Automation Model

Use the latest available capable model for checkpoint automations.

Recommended default:

```text
model: latest available capable model
reasoning effort: medium
schedule: use the Schedule section in this skill
```

Use higher reasoning only when the workspace is large or the heartbeat is doing real self-improvement analysis.

## Prompt Templates

Use these prompts for the three standard checkpoint automations. Keep schedules, model, workspace, execution environment, and active status in the automation config; keep the operational procedure here in the skill.

### 09:30 Prompt

```text
Run the 09:30 Business AI Starter Kit checkpoint: Memory Intake And Business Focus.

Load and follow Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md, especially the 09:30 role. Run pnpm heartbeat:gate first, read the required startup files, and check git status.

Focus only on durable memory, dossiers, current focus, active threads, and one practical business-development next action. Do not edit skills, do broad cleanup, start project-specific autonomous work, or repeat unchanged pending decisions.

Do not publish, deploy, spend money, share workspace context externally, change secrets, connect accounts, create or change GitHub backup, do a first GitHub push, or start new project-specific autonomous work unless the user explicitly authorized it.

If there is no meaningful role-specific work, append at most one short Automation-Log no-op entry and stop. If files changed, run the secret scanner before committing, commit a coherent maintenance change, and push only when an approved private backup remote is already configured.
```

### 11:30 Prompt

```text
Run the 11:30 Business AI Starter Kit checkpoint: Workspace Cleanup And Decision Hygiene.

Load and follow Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md, especially the 11:30 role. Run pnpm heartbeat:gate first, read the required startup files, and check git status.

Focus only on cleanup: compress duplicate inbox items, move handled items to Outbox.md, mark stale date-sensitive prompts as skipped or stale, and refresh Workspace-Map.md, Active-Threads.md, or project tracker references when they are stale.

Do not edit skills, start new research projects, write durable memory unless cleanup reveals a confirmed stable fact, or add a new inbox item unless it changes the user's next decision.

Do not publish, deploy, spend money, share workspace context externally, change secrets, connect accounts, create or change GitHub backup, do a first GitHub push, or start new project-specific autonomous work unless the user explicitly authorized it.

If there is no meaningful cleanup, append at most one short Automation-Log no-op entry and stop. If files changed, run the secret scanner before committing, commit a coherent maintenance change, and push only when an approved private backup remote is already configured.
```

### 16:30 Prompt

```text
Run the 16:30 Business AI Starter Kit checkpoint: Learning, Skills, And Instruction Improvement.

Load and follow Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md, especially the 16:30 role. Run pnpm heartbeat:gate first, read the required startup files, and check git status.

Focus only on today's reusable lessons: review Automation-Log.md, Improvement-Log.md, explicit user corrections, recent relevant diffs, and evidence of repeated agent friction. Patch workspace-owned skills or instructions only from strong evidence. Major automation, skill, strategy, public-output, or cross-repo changes should be report-only unless the user has explicitly approved them.

Do not clean the inbox except for an instruction risk or blocker, do broad project state refresh, change business strategy or public messaging from weak evidence, rewrite a skill from one weak signal, or duplicate a weekly system-wide instruction evolution automation when one exists.

Do not publish, deploy, spend money, share workspace context externally, change secrets, connect accounts, create or change GitHub backup, do a first GitHub push, or start new project-specific autonomous work unless the user explicitly authorized it.

If there is no meaningful learning or instruction improvement, append at most one short Automation-Log no-op entry and stop. If files changed, run the secret scanner before committing, commit a coherent maintenance change, and push only when an approved private backup remote is already configured.
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

If no workspace improvement was made, say that directly in the log and do not imply progress.

## Staleness Rules

- Mark a thread as waiting when the next step needs user input.
- Mark a thread as paused when there is no current action and no deadline.
- Close a thread only when the objective is complete or abandoned by the user.
- Do not re-add the same inbox item after it has been moved to outbox.
