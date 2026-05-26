# Business AI Starter Kit Index

## Setup

- `Install.md` - short external install instruction for Codex.
- `ARCHITECTURE.md` - block diagrams for install, setup, self-improvement, templates, updates, and safety gates.
- `Architecture/README.md` - index of modular Mermaid architecture diagrams.
- `LICENSE` - Apache License 2.0.
- `NOTICE` - project attribution and trademark note.
- `SECURITY.md` - security reporting and secret-handling notes.
- `CONTRIBUTING.md` - contribution and release-check guidance.
- `Seed/AGENTS.md` - live workspace agent instructions after install.
- `Seed/Agent-Instructions/Soul.md` - durable assistant identity, tone, durability, and first-run conversation rules.
- `Seed/Agent-Instructions/Skills/Business-Setup/SKILL.md` - first-run onboarding.
- `Seed/Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md` - hourly heartbeat behavior.
- `Seed/Agent-Instructions/Skills/Update-Review/SKILL.md` - source cache refresh and update review.
- `Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md` - secrets and scanner workflow.
- `Seed/Agent-Instructions/Skills/Project-Planning/SKILL.md` - new project setup and executive briefing.
- `Seed/Agent-Instructions/Skills/Project-Planning/starter-files/` - starter files copied into project folders.

## Workspace Seed

- `Seed/` - ready-to-copy starter files for the user's private workspace.
- `Seed/Agent-Instructions/Soul.md` - default AI partner personality and user experience rules.
- `Seed/Agent-Instructions/Skills/` - canonical skills folder.

## Templates

- `Templates/` - reserved for future project, app, and skill templates.
- MVP seed does not depend on root templates yet. Project Planning has small internal starter files inside the skill.

## Workspace Scripts

These scripts live inside `Seed/` because they are copied into the user's workspace.

- `Seed/Scripts/secret_scan.py` - local secret scanner for staged files or paths.
- `Seed/Scripts/heartbeat_gate.py` - lightweight heartbeat activity snapshot for inbox, signals, git changes, and recent Codex session candidates.
- `Seed/Scripts/install_git_hooks.py` - installs a pre-commit hook that runs the scanner.
- `Seed/Scripts/update_kit.py` - refreshes `.business-ai-kit/source/`.
