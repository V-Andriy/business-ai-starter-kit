# Decisions

Purpose: approved decisions that affect the whole workspace.

## Workspace Decisions

- The workspace is private/local by default.
- Project folders are created in the root only when real work starts.
- `Agent-Instructions/Skills/` is the canonical skills folder.
- The hourly heartbeat processes `Inbox.md` and records handled work in `Outbox.md`.
- The hourly heartbeat uses the latest available capable model, but starts with a lightweight activity gate and stops when there is no meaningful work.
- The heartbeat follows a Hermes-inspired evidence loop: activity evidence, mode choice, focused action, compact log.
- Real secrets are not stored in markdown files.
- Hermes best practices are adapted into this workspace structure without requiring Hermes runtime.
- `Agent-Instructions/Soul.md` stores durable assistant identity and communication behavior.
- `Agent-Instructions/Soul.md` is a philosophical identity file for how the agent should feel. It may be changed when the user asks to change the assistant's name, personality, tone, relationship, or core principles, but changes should stay small and not include examples or procedures.
- First-run setup is assistant calibration plus reference-first discovery, not a long questionnaire.
- Skills store repeatable procedures; memory and dossiers store compact durable facts.
- Each file must keep its own responsibility. Do not duplicate canonical instructions across files.
- Project-local `AGENTS.md` files may be added when a project needs its own recurring instructions.
- Executive-facing work should separate facts, assumptions, decisions, risks, and next actions.
- The workspace should create useful drafts and project structure after a clear user request instead of waiting for perfect prompts.
