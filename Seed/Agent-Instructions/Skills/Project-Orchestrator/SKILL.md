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

For each approved worker, provide a bounded task, the relevant files, expected
output, and ownership boundaries. Share no unrelated private context or raw
credentials. Avoid overlapping edits. Review evidence and integrate results
before presenting the final output; a worker's claim is not validation.

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
