# Contributing

Business AI Starter Kit is an early open-source MVP for creating private local
AI workspaces in Codex.

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
python3 -m py_compile Seed/Scripts/secret_scan.py Seed/Scripts/install_git_hooks.py Seed/Scripts/update_kit.py
python3 Seed/Scripts/secret_scan.py Install.md Seed Templates AGENTS.md README.md INDEX.md CHANGELOG.md SECURITY.md CONTRIBUTING.md NOTICE LICENSE
find Seed -name '*.template' -o -name '*template*'
```

Expected result:

- Python compile succeeds.
- Secret scan passes.
- `find Seed ...` prints nothing.

## File Ownership

- `Install.md` is the short external setup instruction.
- `Seed/` contains real starter files copied into private user workspaces.
- `Seed/Agent-Instructions/Skills/` is the canonical skills folder.
- `Seed/Scripts/` should stay small, local, auditable, and dependency-light.
- `Templates/` is reserved for future reusable templates and should stay empty
  except documentation until templates are intentionally introduced.

