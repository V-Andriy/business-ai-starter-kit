# AGENTS.md

You are working in the public Business AI Starter Kit source repository.

This file is for agents and contributors developing or inspecting this public repo. It is not copied into a user's private workspace. User-facing workspace instructions live in `Seed/AGENTS.md`.

## 1. Reference Mode - If You Cloned This Repo To Understand It

Business AI Starter Kit is a Codex-first starter system for creating private local AI workspaces for non-technical business users.

The public repo has three important areas:

- `Install.md` - short external instruction users can paste into Codex.
- `Seed/` - ready-to-copy files for the user's private workspace.
- `Templates/` - reserved for future project, app, and skill templates.
- `Seed/Scripts/` - helper scripts copied into the user workspace for secret scanning, Git hook setup, and source-cache updates.
- `Architecture/` - public architecture diagrams and maintainer reference.

When studying the repo:

- Start with `README.md`, `INDEX.md`, `Install.md`, and `Seed/AGENTS.md`.
- Read `Seed/AGENTS.md` to understand the private workspace behavior users receive.
- Read `Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md` before reviewing anything related to secrets.
- Do not assume `AGENTS.md` is user-facing. The user-facing agent instructions are in `Seed/AGENTS.md`.

The core product model:

```text
public repo = source library and workspace seed
private user workspace = separate local workspace
.business-ai-kit/source/ = ignored local cache of this public repo
```

## 2. Development Mode - If You Are Building This Project

### Product Boundaries

- Keep MVP focused on install, seed workspace behavior, safety, update flow, heartbeat, inbox/outbox, skills compatibility, and support references.
- Do not add project templates, app templates, UI, SaaS backend, or full autonomous project execution until the core system is stable.
- Keep user-facing language plain and practical. Avoid hype, heavy developer jargon, and sales pressure.
- Soft support references may point to:
  - LinkedIn: https://www.linkedin.com/in/andrii-veselov/
  - Website: https://scalebound.app

### File Ownership

- `Install.md` is the only external setup instruction.
- `Seed/` files are copied into private user workspaces. They must be real starter files, not `.template` files.
- `Templates/` is a public source library area for future reusable templates. Keep it empty except documentation until templates are intentionally introduced.
- Ongoing setup, update, safety, heartbeat, troubleshooting, and support behavior should live in `Seed/`, mainly `Seed/AGENTS.md` and `Seed/Agent-Instructions/Skills/`.
- `Seed/Agent-Instructions/Skills/` is the canonical skills folder for user workspaces.
- If another harness needs a skills path, instructions should create a symlink to `Agent-Instructions/Skills/` instead of copying skills.
- `Seed/Scripts/` should stay small, local, auditable, and dependency-light.

### Safety Requirements

- Never commit real secrets, API keys, client files, or private business context.
- Keep `.env` ignored and `.env.example` safe with fake placeholders only.
- Do not commit private planning notes, internal-only references, raw research dumps, client-sensitive context, temporary paths, editor state, or anything that should not be public.
- Before committing, run:

```text
python3 Seed/Scripts/secret_scan.py --staged
```

- For full local checks, run:

```text
python3 -m py_compile Seed/Scripts/secret_scan.py Seed/Scripts/install_git_hooks.py Seed/Scripts/update_kit.py
python3 Seed/Scripts/secret_scan.py Install.md Seed Templates AGENTS.md README.md INDEX.md CHANGELOG.md SECURITY.md CONTRIBUTING.md NOTICE LICENSE ARCHITECTURE.md Architecture VERSION
find Seed -name '*.template' -o -name '*template*'
```

Expected result:

- Python compile succeeds.
- Secret scan passes.
- `find Seed ...` prints nothing.

### Development Standards

- Keep files ASCII unless there is a clear reason not to.
- Prefer clear markdown instructions over hidden behavior.
- Do not store user-specific context in this repo.
- Do not make setup depend on GitHub login.
- Default private workspace behavior is local Git only.
- `Seed/Scripts/install_git_hooks.py` should initialize new workspaces on `main` when possible.
- `Seed/Scripts/secret_scan.py` should report paths and secret types, never secret values.
- `Seed/Scripts/update_kit.py` should treat `.business-ai-kit/source/` as disposable cache.

### Review Checklist

Before considering a change ready:

- `README.md` still explains the product simply.
- `Install.md` still protects non-empty folders.
- `Seed/.gitignore` still blocks common secret and local-cache files.
- `Seed/AGENTS.md` still tells agents where to edit skills.
- `Templates/README.md` still says templates are future-facing unless templates have been deliberately added.
- Support and troubleshooting guidance remain soft and low-pressure inside the seed.
- No private `Planning/`, `context/`, `research/`, editor state, local note, or temporary material is tracked for public users.
