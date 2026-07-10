# Contributing

Business AI Starter Kit is an early open-source MVP for creating private local
AI workspaces in Codex and Claude Code.

## Development Rules

- Keep `Seed/` safe to copy into a user's private workspace.
- Do not commit real secrets, API keys, client files, private business context,
  raw research dumps, local-only paths, or personal workspace state.
- Keep user-facing language plain and practical.
- Keep the MVP focused on install, seed workspace behavior, safety, update
  flow, heartbeat, inbox/outbox, skills compatibility, and support references.
- Do not add project templates, app templates, UI, SaaS backend, or full
  autonomous project execution until the core system is stable.

## Before Submitting Changes

Run:

```text
pnpm check
find Seed -name '*.template' -o -name '*template*'
```

Expected result:

- File audit completes and reports any current cleanup targets.
- Portable-context lifecycle, collision, integrity, and secret-scan tests pass.
- Secret scan passes.
- `find Seed ...` prints nothing.

Use `pnpm audit:files:strict` when a cleanup change is intended to leave the
documentation graph and file sizes fully clean.

## File Ownership

- `Install.md` is the short external setup instruction.
- `Seed/` contains real starter files copied into private user workspaces.
- `Seed/Agent-Instructions/Skills/` is the canonical skills folder.
- `Seed/Scripts/` should stay small, local, auditable, and dependency-light.
- `Templates/` is reserved for future reusable templates and should stay empty
  except documentation until templates are intentionally introduced.
