---
name: project-planning
description: Use when business work will continue across sessions and needs a small project brief, or when the user explicitly requests project organization.
---

# Project Planning

Give the user a useful output before building management structure.
A one-off answer, comparison, email, or draft normally needs no project folder.

## When A Project Helps

Create a project when the user asks for one or the work has ongoing context,
multiple outputs, or decisions that must survive across sessions.
Use a plain business name. Keep business work in its project, without numeric
folder prefixes or a taxonomy the user must learn.

Start with only:

```text
Project Name/
  Project Brief.md
  [the actual draft or output]
```

Use `starter-files/Project Brief.md` as a small guide. Capture the goal,
useful inputs, constraints, current result, next action, and done criteria.
Keep unknowns explicit. Do not block a draft on filling every heading.

## Add Structure Only When Needed

- `Source Materials/`: enough source files to need their own location.
- `Working Files/` or `Final Outputs/`: multiple versions or deliverables.
- `Decisions.md`: decisions have become difficult to follow in the brief.
- `Next Actions.md`: several actions, owners, or dependencies need tracking.
- `Executive Brief.md`: a stakeholder needs a separate short status view.
- `AGENTS.md`: recurring project rules differ from the workspace defaults.
- `CLAUDE.md`: alongside project `AGENTS.md`, importing `@AGENTS.md` for Claude Code.

The remaining `starter-files/` are optional starting points, not a checklist.
Do not copy them all or create empty folders in anticipation of future work.
Keep each fact in one place and use links in other files.

## Work And Memory

Make the first draft with available information and mark assumptions.
Ask when an unknown changes business direction, privacy, budget, claims,
legal risk, or customer commitments. Follow workspace approval boundaries.

Add one pointer to `Active-Threads.md` for work that will resume. Update
`Workspace-Map.md` only if navigation needs a new entry. Update current focus
only when the priority changes. Do not duplicate the brief in global files.

Maintain the brief when a decision or next action changes, not after every
reply. For multi-step work, load `../Project-Orchestrator/SKILL.md` only when
it would help manage dependencies or verification.

## Ready To Resume

The project is organized enough when the user can find the output and the
next session can identify the objective, relevant inputs, and next action.
Extra trackers are useful only when they make that easier.
