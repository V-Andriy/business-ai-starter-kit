---
name: project-orchestrator
description: Use when an authorized project needs several dependent steps, focused verification, or an explicitly requested delegation plan.
---

# Project Orchestrator

Use one agent by default. Break complex work into a few concrete steps without
creating extra roles, trackers, or agents for routine drafting and research.

## Plan Only What Helps

Read the project brief and the sources needed for the next step.
Define the desired output, constraints, done criteria, and key dependencies.
Keep a short plan in the conversation or existing brief. Add a separate task
tracker only when multiple owners or dependencies warrant it.
Produce an early useful draft or working slice before expanding the plan.

## Execute And Verify

Within the current authorization, complete ordinary local work and relevant
checks. Review claims against sources and test behavior affected by changes.
Do not repeat checks that already passed unless changes or failures justify it.
Keep detailed context in project files and global state as a short pointer.

Use the current model and reasoning setting by default. Do not automatically
switch to the newest or most expensive model, or promise fixed usage savings.

## Optional Delegation

Use subagents only when the user explicitly requests delegation or approves a
concrete parallel plan with useful independent tasks. Explain the likely
additional AI usage before requesting that approval.
Do not delegate work that can be finished with a simple local step.

For each approved worker, specify outcome, inputs, owned files or systems,
files not to touch, required evidence, return format, and stop condition.
Give research/review workers read-only scope. Share only necessary context;
when using portable context, give excerpts rather than the full snapshot.

## Ownership And Routing

The lead owns scope, integration, safety, and the final result. Workers own
bounded tasks; a reviewer supplies independent evidence when the risk warrants
it. Keep the current model/settings unless the user approves a change. Role
names do not require premium models, experimental teams, or extra agents.

Assume workers share files unless isolation is verified. Give each writer
exclusive ownership. Use separate worktrees/branches when separate Git or
filesystem state is needed; sequence overlapping edits even with worktrees.
If isolation is unavailable, parallelize only approved read-only tracks and
keep writes with the lead. Preserve user changes and unrelated untracked files.

Verify actual harness capabilities before using teams, background sessions,
worktrees, or scripted workflows. Fall back to sequential passes when native
support is missing. Background execution needs its own explicit authorization.
Keep ephemeral worker state in the harness; save only durable project decisions,
evidence, and cross-session handoffs in workspace files.

Start independent approved tracks together and wait for inputs before dependent
work. Send corrections to an existing worker and stop obsolete work instead of
spawning replacements. Workers may propose scope changes, not authorize them.

## Integrate Evidence

Review each result and relevant diff, resolve contradictions, and integrate in
dependency order. Run the smallest relevant checks, expanding only when risk or
new failures warrant it. A worker's completion or self-review is not proof the
user's outcome is complete. For approved independent review, keep the reviewer
focused on material risk and success criteria. Return one coherent result.

## Continuation Boundary

A saved next action helps resume work; it does not authorize unattended work.
Continue in the current user-requested session within its scope. Start a
scheduled or background run only after an explicit request defining its scope.
Use the Workspace Heartbeat skill for maintenance schedules.

Stop before external actions, spending, destructive changes, or material scope
expansion unless explicitly authorized. If blocked, record the specific need
in the project brief and add an inbox handoff only when it needs later attention.

## Finish

Deliver the output, the meaningful validation result, and any remaining
limitation. Update the existing brief or action tracker with the next step.
Follow root workspace rules for safety, local Git, and external approval.
Do not create extra status documents or logs merely to show activity.
