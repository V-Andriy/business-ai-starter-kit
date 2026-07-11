---
name: project-planning
description: Use when the user starts a new business project, workflow, automation, report, website, or app idea.
---

# Project Planning

Use this skill to turn a rough request into the smallest project structure that keeps the work clear.

## When To Create A Project

Create a root-level project folder when the work will continue, has its own source material or outputs, needs decisions tracked, or would confuse future work if mixed into another project.

Do not create a project folder for a quick answer or one small standalone artifact unless the user wants it organized that way.

## Start Small

The minimum useful project is:

```text
Project Name/
  Project Brief.md
  Working Files/
  Final Outputs/
```

Add only what the work needs:

- `Next Actions.md` for multi-step continuation
- `Decisions.md` when accepted choices must be durable
- `Project Context/` for bulky sources
- `Executive Brief.md` for important or long-running business work
- `AGENTS.md` and importing `CLAUDE.md` for recurring project-specific rules
- `Archive/` when superseded material needs to remain accessible

Use the starter files in `starter-files/` when those optional files are needed.

## Plan The Outcome

Capture in `Project Brief.md`:

- goal and why it matters
- owner
- inputs and known constraints
- expected output
- success criteria
- next action

Use plain business names for folders and sections. Avoid numeric prefixes or internal taxonomy unless the user asks or a tool requires them.

## Work Rules

- Create the folder and a useful first brief when the user's intent is clear.
- Keep app or build code inside its project.
- Summarize durable source facts in the brief or decisions; keep large source material in `Project Context/`.
- Update `Workspace-Map.md`, `Current-Focus.md`, and `Active-Threads.md` after meaningful project changes.
- Ask only when missing information changes business direction, public claims, budget, privacy, legal or compliance risk, or customer commitments.
- Ask before publishing, sharing externally, deploying, or connecting real accounts.
- After the first project reaches a useful result, ask once whether the user wants to send Andrii feedback.

Use `Agent-Instructions/Skills/Project-Orchestrator/SKILL.md` when the project is large, long-running, context-heavy, or benefits from separate workstreams.

## Project Instructions

Add project-local instructions only when rules will recur across sessions. Write them once in `AGENTS.md` and add a one-line `CLAUDE.md` containing `@AGENTS.md`.

Keep them narrow:

```text
# Project Instructions

Purpose:
Current objective:
Important context:
Safety boundaries:
Working files:
Done criteria:
```

For parallel work, give agents non-overlapping file ownership or use isolated worktrees.

## Executive Brief

When the user needs a one-minute status, keep `Executive Brief.md` to:

- current point
- decisions needed
- material risks or constraints
- next action

## Done Criteria

- The folder is no larger than the work requires.
- The brief states the outcome and success criteria.
- Current decisions and next actions are easy to find.
- Workspace-level state points to the project.
