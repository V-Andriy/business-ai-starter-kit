---
name: project-orchestrator
description: Use for large, multi-step, context-heavy, or long-running workspace projects that benefit from decomposition, clean context, staged execution, or subagents when available.
---

# Project Orchestrator

Use this skill when a project is too large for one clean pass.

The goal is to keep work moving without overloading the main chat.

## When To Use

Use this skill for:

- multi-step builds
- audits or research passes
- app, automation, dashboard, or calculator projects
- project cleanup or migration
- work that touches many files
- work that needs separate research, implementation, and review tracks
- work where subagents would keep context cleaner

## Operating Rules

- Read the project files first.
- Define the current objective, constraints, next action, and done criteria.
- Split the work into small tracks.
- Keep project state in the project folder.
- Keep global state in `Active-Threads.md`, `Current-Focus.md`, and `Workspace-Map.md`.
- Use subagents when the environment supports them and the task benefits from parallel research, review, testing, or implementation.
- Do not use subagents for private secrets, credentials, or unnecessary work.
- Review subagent outputs before trusting them.
- Integrate results in the main thread.

## Subagent Pattern

Use subagents for bounded work:

- research one topic
- review one file or module
- test one behavior
- inspect one design option
- draft one artifact

Give each subagent:

- the narrow task
- the relevant files or context
- the expected output
- what not to touch

Do not pass unrelated private context.

## Project Continuation

Autonomous continuation is allowed when:

- the project already exists
- the next action is written in project files or `Active-Threads.md`
- the task is local and low-risk
- no user decision is missing
- no publishing, deployment, paid service, external account, secret change, or public/client-facing claim is involved

If the next action needs the user, write the decision request in `Inbox.md` and stop.

## Done Criteria

- The project has a clear next action or completed output.
- Decisions and blockers are recorded.
- Useful outputs are in the project folder.
- Global workspace state is updated.
- Git status is checked after meaningful file work.
