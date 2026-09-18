# Decisions

Purpose: record durable workspace decisions.

## Decisions

- This workspace uses local Git by default.
- Private GitHub backup is optional and user-approved.
- Real secrets are not stored in markdown files.
- Cross-project context uses only an explicitly approved snapshot of `Portable-Context.md`; no live access or automatic refresh.
- `Agent-Instructions/Skills/` is the canonical skills folder.
- First-time setup includes a short confirmed business profile and one small weekly maintenance check.
- Weekly and manual reviews use the smallest relevant scope; unchanged state creates no logs.
- If host scheduling is unavailable, record a blocker and manual weekly fallback.
- `Agent-Instructions/Soul.md` stores assistant identity and communication behavior.
- Project-local `AGENTS.md` files may be added when a project needs recurring instructions.

## Notes

- Keep decisions short.
- Record what was decided, not the full discussion.
- Put procedures in skills.
- Put facts in dossiers, memory, or project files.
