# Business AI Starter Kit Index

## Setup

- [Install.md](Install.md) - short external install instruction for Codex and Claude Code.
- [ARCHITECTURE.md](ARCHITECTURE.md) - block diagrams for install, setup, self-improvement, templates, updates, and safety gates.
- [Architecture/README.md](Architecture/README.md) - index of modular Mermaid architecture diagrams.
- [Architecture/orchestrated-work-flow.md](Architecture/orchestrated-work-flow.md) - orchestration control plane for lead, worker, reviewer, model roles, worktrees, evidence, and sequential fallback.
- [Architecture/portable-context-bridge.md](Architecture/portable-context-bridge.md) - one-way approved context snapshot, managed global skills, and revocation boundaries.
- `LICENSE` - Apache License 2.0.
- `NOTICE` - project attribution and trademark note.
- [SECURITY.md](SECURITY.md) - security reporting and secret-handling notes.
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution and release-check guidance.
- [CHANGELOG.md](CHANGELOG.md) - release history.
- [Skills/Instruction-Governance/SKILL.md](Skills/Instruction-Governance/SKILL.md) - maintainer skill for clear, non-duplicated instruction changes.
- [Seed/README.md](Seed/README.md) - private workspace starter readme.
- [Seed/AGENTS.md](Seed/AGENTS.md) - canonical live workspace agent instructions after install (read by Codex).
- [Seed/CLAUDE.md](Seed/CLAUDE.md) - Claude Code / Cowork entry point that imports `Seed/AGENTS.md`.
- [Seed/Agent-Instructions/Soul.md](Seed/Agent-Instructions/Soul.md) - durable assistant identity, tone, and felt user experience.
- [Seed/Agent-Instructions/Setup-Plan.md](Seed/Agent-Instructions/Setup-Plan.md) - temporary first-run setup plan deleted after setup.
- [Seed/Agent-Instructions/Skills/AI-Tool-Learner/SKILL.md](Seed/Agent-Instructions/Skills/AI-Tool-Learner/SKILL.md) - plain-language usage guidance for first-time or non-technical users, harness-aware for Codex and Claude Code.
- [Seed/Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md](Seed/Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md) - optional low-noise workspace checkpoint behavior.
- [Seed/Agent-Instructions/Skills/GitHub-Backup/SKILL.md](Seed/Agent-Instructions/Skills/GitHub-Backup/SKILL.md) - optional private GitHub backup workflow.
- [Seed/Agent-Instructions/Skills/Kit-Feedback/SKILL.md](Seed/Agent-Instructions/Skills/Kit-Feedback/SKILL.md) - user-approved feedback and upstream improvement workflow.
- [Seed/Agent-Instructions/Skills/Update-Review/SKILL.md](Seed/Agent-Instructions/Skills/Update-Review/SKILL.md) - source cache refresh and update review.
- [Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md](Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md) - secrets and scanner workflow.
- [Seed/Agent-Instructions/Skills/Project-Planning/SKILL.md](Seed/Agent-Instructions/Skills/Project-Planning/SKILL.md) - new project setup and executive briefing.
- [Seed/Agent-Instructions/Skills/Project-Orchestrator/SKILL.md](Seed/Agent-Instructions/Skills/Project-Orchestrator/SKILL.md) - lead/worker/reviewer routing, agent orchestration, worktree safety, evidence, and integration guidance.
- [Seed/Agent-Instructions/Skills/portable-workspace-context/SKILL.md](Seed/Agent-Instructions/Skills/portable-workspace-context/SKILL.md) - prepares and manages the optional cross-project context bridge.
- [Seed/Agent-Instructions/Skills/portable-workspace-context/assets/business-ai-workspace/SKILL.md](Seed/Agent-Instructions/Skills/portable-workspace-context/assets/business-ai-workspace/SKILL.md) - explicit-invocation, read-only consumer skill installed into supported harnesses.
- [Templates/README.md](Templates/README.md) - optional reusable templates note.
- [Templates/Chat-Start-Accelerator-Hook/README.md](Templates/Chat-Start-Accelerator-Hook/README.md) - optional startup hook template for Codex and Claude Code.

## Workspace Seed

- [Seed/](Seed/) - ready-to-copy starter files for the user's private workspace.
- [Seed/Agent-Instructions/Soul.md](Seed/Agent-Instructions/Soul.md) - default AI partner personality and user experience rules.
- [Seed/Agent-Instructions/Setup-Plan.md](Seed/Agent-Instructions/Setup-Plan.md) - temporary setup checklist for new workspaces.
- [Seed/Agent-Instructions/Agent-State.md](Seed/Agent-Instructions/Agent-State.md) - setup status, permissions, and blockers.
- [Seed/Agent-Instructions/Current-Focus.md](Seed/Agent-Instructions/Current-Focus.md) - current workspace focus.
- [Seed/Agent-Instructions/Active-Threads.md](Seed/Agent-Instructions/Active-Threads.md) - ongoing work continuity.
- [Seed/Agent-Instructions/Workspace-Map.md](Seed/Agent-Instructions/Workspace-Map.md) - workspace structure map.
- [Seed/Agent-Instructions/Memory.md](Seed/Agent-Instructions/Memory.md) - compact durable memory.
- [Seed/Agent-Instructions/Portable-Context.md](Seed/Agent-Instructions/Portable-Context.md) - the only user-approved context eligible for cross-project snapshots.
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

- [Templates/](Templates/) - optional source-library templates.
- The seed does not depend on root templates. Project Planning has small internal starter files inside the skill.

## Workspace Scripts

These scripts live inside `Seed/` because they are copied into the user's workspace.

- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/AGENTS.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/AGENTS.md) - project-local agent instruction starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/CLAUDE.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/CLAUDE.md) - project-local Claude Code bridge that imports the project `AGENTS.md`.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Project Brief.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Project%20Brief.md) - project brief starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Executive Brief.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Executive%20Brief.md) - executive brief starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Next Actions.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Next%20Actions.md) - next actions starter.
- [Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Decisions.md](Seed/Agent-Instructions/Skills/Project-Planning/starter-files/Decisions.md) - project decision log starter.
- [Seed/Scripts/secret_scan.mjs](Seed/Scripts/secret_scan.mjs) - local secret scanner for staged files or paths.
- [Seed/Scripts/link_skills.mjs](Seed/Scripts/link_skills.mjs) - creates `.agents/skills` (Codex) and `.claude/skills` (Claude Code) as symlinks to the workspace skills folder.
- [Seed/Scripts/heartbeat_gate.mjs](Seed/Scripts/heartbeat_gate.mjs) - lightweight heartbeat activity snapshot for inbox, signals, git changes, and recent Codex or Claude Code session candidates.
- [Seed/Scripts/install_git_hooks.mjs](Seed/Scripts/install_git_hooks.mjs) - installs a pre-commit hook that runs the scanner.
- [Seed/Scripts/update_kit.mjs](Seed/Scripts/update_kit.mjs) - refreshes `.business-ai-kit/source/`.
- [Seed/Scripts/knowledge_bridge.mjs](Seed/Scripts/knowledge_bridge.mjs) - previews, installs, refreshes, inspects, disables, removes, and packages portable context.
- [scripts/knowledge_bridge.test.mjs](scripts/knowledge_bridge.test.mjs) - isolated lifecycle and privacy-boundary integration tests.
