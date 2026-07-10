# Architecture Diagram Index

This folder keeps the MVP architecture flows as small, manageable Markdown files.
Each file contains one logical Mermaid diagram that can render in normal
Markdown preview tools such as Codex, VS Code, GitHub, Obsidian, Typora, or
Mermaid Live Editor.

## Source Priority

The diagrams should match the installed `Seed/` behavior, repository docs,
scripts, and MVP boundaries.

If a diagram conflicts with installed `Seed/` behavior, fix the diagram or
update the implementation deliberately. Do not leave the flow ambiguous.

## Editing Standard

- Keep one logical diagram per file.
- Use Mermaid inside Markdown fenced blocks.
- Keep diagrams small enough to edit by hand.
- Link diagrams from this index and from root `ARCHITECTURE.md`.
- Do not rely on imports or custom render tooling for MVP.
- Keep semantic architecture in Markdown and Mermaid, not in visual-only layout
  metadata.
- If a diagram becomes too large, split it into a new file and link it here.

## Diagrams

- [Full System Flow](full-system-flow.md) - end-to-end MVP flow from public repo to private workspace, setup, normal work, updates, templates, secrets, safety, and heartbeat.
- [Orchestrated Work Flow](orchestrated-work-flow.md) - lead, worker, reviewer, model-role, worktree, evidence, integration, and fallback flow for substantial work.
- [Portable Context Bridge](portable-context-bridge.md) - reviewed one-way snapshots, managed global consumers, multi-workspace aliases, and revocation boundaries.
- [Repository Responsibilities](repository-responsibilities.md) - public source repo versus private user workspace ownership and copy/cache boundaries.
- [Installed Workspace Model](installed-workspace-model.md) - files and folders expected in the private workspace after setup.
- [First Setup Flow](first-setup-flow.md) - install, source-cache, onboarding, capability detection, optional checkpoint, and blocker recording.
- [Self-Improvement Loop](self-improvement-loop.md) - optional checkpoint, inbox/outbox, active threads, memory, skills, signals, Git awareness, and safe autonomy limits.
- [Templates Flow](templates-flow.md) - MVP placeholder behavior and future template review/application flow.
- [Update And Migration Flow](update-and-migration-flow.md) - source cache refresh, recovery, ownership classification, approval, scan, local commit, and logging.
- [Safety Gates](safety-gates.md) - actions that require approval, secret handling, scanner use, and audit logging.
- [Architecture Mind Map](architecture-mindmap.md) - compact brain map of the project logic.

## Recommended Tools

- VS Code Markdown preview with Mermaid support.
- Mermaid Live Editor: https://mermaid.live/
- Obsidian or Typora for local Markdown preview.

Mermaid is the architecture source of truth until the project deliberately adopts
a heavier architecture-as-code tool or a local visual layer such as the future
Vibe Canvas concept.
