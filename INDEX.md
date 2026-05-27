# Business AI Starter Kit Index

## Setup

- [Install.md](Install.md) - short external install instruction for Codex.
- [ARCHITECTURE.md](ARCHITECTURE.md) - block diagrams for install, setup, self-improvement, templates, updates, and safety gates.
- [Architecture/README.md](Architecture/README.md) - index of modular Mermaid architecture diagrams.
- `LICENSE` - Apache License 2.0.
- `NOTICE` - project attribution and trademark note.
- [SECURITY.md](SECURITY.md) - security reporting and secret-handling notes.
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution and release-check guidance.
- [CHANGELOG.md](CHANGELOG.md) - release history.
- [Seed/README.md](Seed/README.md) - private workspace starter readme.
- [Seed/AGENTS.md](Seed/AGENTS.md) - live workspace agent instructions after install.
- [Seed/Agent-Instructions/Soul.md](Seed/Agent-Instructions/Soul.md) - durable assistant identity, tone, durability, and first-run conversation rules.
- [Seed/Agent-Instructions/Skills/Business-Setup/SKILL.md](Seed/Agent-Instructions/Skills/Business-Setup/SKILL.md) - first-run onboarding.
- [Seed/Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md](Seed/Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md) - hourly heartbeat behavior.
- [Seed/Agent-Instructions/Skills/Kit-Feedback/SKILL.md](Seed/Agent-Instructions/Skills/Kit-Feedback/SKILL.md) - user-approved feedback and upstream improvement workflow.
- [Seed/Agent-Instructions/Skills/Update-Review/SKILL.md](Seed/Agent-Instructions/Skills/Update-Review/SKILL.md) - source cache refresh and update review.
- [Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md](Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md) - secrets and scanner workflow.
- [Seed/Agent-Instructions/Skills/Project-Planning/SKILL.md](Seed/Agent-Instructions/Skills/Project-Planning/SKILL.md) - new project setup and executive briefing.
- [Templates/README.md](Templates/README.md) - future-facing templates note.

## Workspace Seed

- [Seed/](Seed/) - ready-to-copy starter files for the user's private workspace.
- [Seed/Agent-Instructions/Soul.md](Seed/Agent-Instructions/Soul.md) - default AI partner personality and user experience rules.
- [Seed/Agent-Instructions/Agent-State.md](Seed/Agent-Instructions/Agent-State.md) - setup status, permissions, and blockers.
- [Seed/Agent-Instructions/Current-Focus.md](Seed/Agent-Instructions/Current-Focus.md) - current workspace focus.
- [Seed/Agent-Instructions/Active-Threads.md](Seed/Agent-Instructions/Active-Threads.md) - ongoing work continuity.
- [Seed/Agent-Instructions/Workspace-Map.md](Seed/Agent-Instructions/Workspace-Map.md) - workspace structure map.
- [Seed/Agent-Instructions/Memory.md](Seed/Agent-Instructions/Memory.md) - compact durable memory.
- [Seed/Agent-Instructions/Decisions.md](Seed/Agent-Instructions/Decisions.md) - workspace-level decision log.
- [Seed/Agent-Instructions/User-Dossier.md](Seed/Agent-Instructions/User-Dossier.md) - user preferences and profile.
- [Seed/Agent-Instructions/Business-Dossier.md](Seed/Agent-Instructions/Business-Dossier.md) - business context.
- [Seed/Agent-Instructions/Inbox.md](Seed/Agent-Instructions/Inbox.md) - triage queue.
- [Seed/Agent-Instructions/Outbox.md](Seed/Agent-Instructions/Outbox.md) - handled work record.
- [Seed/Agent-Instructions/Automation-Log.md](Seed/Agent-Instructions/Automation-Log.md) - automation activity log.
- [Seed/Agent-Instructions/Improvement-Log.md](Seed/Agent-Instructions/Improvement-Log.md) - skill and workspace improvement log.
- [Seed/Agent-Instructions/Private-Notes.md](Seed/Agent-Instructions/Private-Notes.md) - private workspace notes.
- [Seed/Agent-Instructions/Secrets-Vault.md](Seed/Agent-Instructions/Secrets-Vault.md) - secret metadata only.
- [Seed/Agent-Instructions/Signals/README.md](Seed/Agent-Instructions/Signals/README.md) - signal folder guidance.
- [Seed/Agent-Instructions/Signals/Incoming.md](Seed/Agent-Instructions/Signals/Incoming.md) - incoming coordination pointers.
- [Seed/Agent-Instructions/Signals/Outgoing.md](Seed/Agent-Instructions/Signals/Outgoing.md) - outgoing coordination pointers.
- [Seed/Agent-Instructions/Skills/](Seed/Agent-Instructions/Skills/) - canonical skills folder.

## Templates

- [Templates/](Templates/) - reserved for future project, app, and skill templates.
- MVP seed does not depend on root templates yet. Project Planning has small internal starter files inside the skill.

## Workspace Scripts

These scripts live inside `Seed/` because they are copied into the user's workspace.

- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/AGENTS.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/AGENTS.md) - project-local agent instruction starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Project Brief.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Project%20Brief.md) - project brief starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Executive Brief.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Executive%20Brief.md) - executive brief starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Next Actions.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Next%20Actions.md) - next actions starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Decisions.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Decisions.md) - project decision log starter.
- [Seed/Scripts/secret_scan.mjs](Seed/Scripts/secret_scan.mjs) - local secret scanner for staged files or paths.
- [Seed/Scripts/heartbeat_gate.mjs](Seed/Scripts/heartbeat_gate.mjs) - lightweight heartbeat activity snapshot for inbox, signals, git changes, and recent Codex session candidates.
- [Seed/Scripts/install_git_hooks.mjs](Seed/Scripts/install_git_hooks.mjs) - installs a pre-commit hook that runs the scanner.
- [Seed/Scripts/update_kit.mjs](Seed/Scripts/update_kit.mjs) - refreshes `.business-ai-kit/source/`.
