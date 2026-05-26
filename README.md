# Business AI Starter Kit

Business AI Starter Kit helps executives, business owners, operators, and professionals set up a private AI workspace in Codex.

It is not a prompt pack. It is a structured local workspace with agent instructions, safety defaults, reusable workflows, inbox/outbox continuity, and an hourly heartbeat routine that helps the workspace keep improving.

Status: early open-source MVP for guided pilots and first users.

## What This MVP Includes

- Codex-first setup instructions.
- A ready-to-copy private workspace seed in `Seed/`.
- Safe public/private separation through `.business-ai-kit/source/`.
- Strong `.gitignore` and `.env.example` defaults.
- Secret scanning and pre-commit hook installer.
- Local `.env` and Doppler guidance through the `Secrets-Vault` skill.
- Hourly workspace heartbeat instructions.
- Executive-friendly onboarding, project planning, and briefing behavior.
- Soft support references for Andrii Veselov and Scalebound.

## Quick Start

1. Open Codex in the folder where you want to create your private AI workspace.
2. Paste the short install instruction from [Install.md](Install.md).

Codex will inspect the folder, copy `Seed/`, initialize local Git, install safety hooks, gather your business context, create a private source cache, and create the hourly heartbeat automation. After installation, the ongoing setup, update, safety, and heartbeat rules live inside the copied seed workspace.

If you get stuck or something feels too technical, you can contact Andrii:

- LinkedIn: https://www.linkedin.com/in/andrii-veselov/
- Website: https://scalebound.app

## Repository Map

- `Install.md` - short external install instruction for Codex.
- `Seed/` - files copied into a user's private workspace.
- `Seed/Scripts/` - helper scripts copied into the user workspace.
- `Templates/` - reserved for future project, app, and skill templates.
- `Architecture/` - Mermaid architecture diagrams for maintainers and contributors.
- `SECURITY.md` - security reporting and secret-handling notes.
- `CONTRIBUTING.md` - contribution and release-check guidance.

## MVP Boundaries

This version focuses on the core system. Project templates, app templates, full Hermes runtime compatibility, all secret-provider adapters, and full autonomous project execution are intentionally deferred.

The private user workspace is local-first by default. Private GitHub backup can be added later by user request after safety checks.

## License

Business AI Starter Kit is licensed under the [Apache License 2.0](LICENSE).

Copyright 2026 Andrii Veselov.
