# Decisions

Purpose: approved decisions that affect the whole workspace.

## Workspace Decisions

- The workspace is private/local by default.
- Project folders are created in the root only when real work starts.
- `Agent-Instructions/Skills/` is the canonical skills folder.
- The hourly heartbeat processes `Inbox.md` and records handled work in `Outbox.md`.
- Real secrets are not stored in markdown files.
- Hermes best practices are adapted into this workspace structure without requiring Hermes runtime.
- `Agent-Instructions/Soul.md` stores durable assistant identity and communication behavior.
- First-run setup is assistant calibration plus reference-first discovery, not a long questionnaire.
- Skills store repeatable procedures; memory and dossiers store compact durable facts.
- Project-local `AGENTS.md` files may be added when a project needs its own recurring instructions.
- Executive-facing work should separate facts, assumptions, decisions, risks, and next actions.
- The workspace should create useful drafts and project structure after a clear user request instead of waiting for perfect prompts.
