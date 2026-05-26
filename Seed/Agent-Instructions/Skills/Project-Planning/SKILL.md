---
name: project-planning
description: Use when the user starts a new business project, workflow, automation, report, website, or app idea.
---

# Project Planning

Use this skill to turn a rough business request into an organized project folder.

## When To Create A Project

Create a root-level project folder when the work:

- will continue beyond one reply
- has its own context or outputs
- needs decisions or next actions tracked
- would confuse future work if mixed into another project
- involves customer-facing, executive, financial, operational, legal, hiring, or automation decisions

## Default Project Structure

```text
Project Name/
  AGENTS.md
  Project Brief.md
  Executive Brief.md
  Project Context/
  Working Files/
  Final Outputs/
  Decisions.md
  Next Actions.md
  Archive/
```

When creating these files, use the starter files in `starter-files/` if present. Adapt headings to the project, but keep the same decision-focused shape.

## Rules

- Use plain business names for project folders.
- Do not create project folders before real work starts.
- Keep app/build code inside the relevant project.
- Add project-local `AGENTS.md` for recurring project rules, safety boundaries, tools, and context-loading notes.
- Keep bulky source material in `Project Context/`; summarize durable facts in the brief or decisions.
- Update `Workspace-Map.md`, `Current-Focus.md`, and `Active-Threads.md`.
- Ask before making a project public, sharing files externally, deploying apps, or connecting real accounts.
- Keep `Executive Brief.md` short: objective, current status, key decisions, risks, and next action.

## Project Autonomy

After the user clearly asks for a project, create the minimum useful structure and first draft without over-questioning.

Safe defaults:

- create the folder
- write a first `Project Brief.md`
- write a short `Executive Brief.md` when the project affects business decisions or will continue across sessions
- create `Decisions.md` and `Next Actions.md`
- add a project-local `AGENTS.md` when the project will continue across sessions
- update global workspace state

Ask when the missing answer changes business direction, public claims, budget, privacy, legal/compliance risk, or customer-facing commitments.

## Project AGENTS.md

Keep project-local instructions short:

```text
# Project Instructions

Purpose:

Current objective:

Important context:

Safety boundaries:

Working files:

Done criteria:
```

This mirrors Hermes-style progressive context without making the user manage agent infrastructure.

## First Project Brief

Capture:

- goal
- owner
- why it matters
- inputs
- expected output
- success criteria
- next action

## Executive Brief

Use this format:

```text
# Executive Brief

## Current Point

One short paragraph on what this project is and where it stands.

## Decisions Needed

- 

## Risks Or Constraints

- 

## Next Action

- 
```

Keep this file current enough that the user can open it and understand the project in under one minute.
