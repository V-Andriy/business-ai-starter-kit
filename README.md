# Business AI Starter Kit

Business AI Starter Kit helps executives, business owners, operators, and professionals set up a private local AI workspace in Codex.

It is not a prompt pack. It gives Codex a simple workspace structure, clear operating rules, safety defaults, and reusable workflows so the user can organize real business work without learning developer tooling first.

Status: alpha open-source MVP for guided pilots and first users.

This project is early. Feedback is welcome, especially when it points to clearer setup, better workflows, useful starter templates, or simpler instructions.

## What It Does

- Creates a private local workspace from the files in `Seed/`.
- Helps Codex start a live onboarding conversation instead of ending at a technical install.
- Teaches first-time Codex users small practical habits in plain language, including the voice recording button, planning, review, permissions, and mobile access when relevant.
- Keeps user context, decisions, memory, inbox/outbox, and reusable workflows organized.
- Adds safety defaults for secrets, local Git, and private files.
- Creates project folders only when real work starts.
- Supports optional daily checkpoint maintenance that reviews the workspace, keeps state current, and suggests useful next steps.
- Uses opt-in feedback only. There is no analytics, telemetry, tracking, or background reporting.

## Quick Start

1. Download and open [Codex](https://openai.com/codex/).
2. Create or open the folder where you want your private AI workspace.
3. Open a new Codex chat in that folder.
4. Paste this message:

```text
Set up my Business AI Starter Kit workspace using the official install instructions:

https://raw.githubusercontent.com/V-Andriy/business-ai-starter-kit/refs/heads/main/Install.md

Follow that file exactly. After installation, guide me through the first onboarding conversation.
```

5. Let Codex guide you. It will inspect the folder, set up the workspace, and ask for a few useful links, files, screenshots, notes, or a voice recording so it can understand you and your work.

Codex will inspect the folder, copy `Seed/`, initialize local Git, install safety hooks, create a private source cache, and explain what it is doing in plain language. Then it will start a real conversation: introduce itself, ask how you want it to communicate, invite you to share a few useful business sources, and adapt from how you naturally communicate.

After reviewing the sources, Codex should show a short dossier preview for you to confirm or correct before it writes durable user and business context into the workspace.

The first useful request after setup is:

```text
Help me organize my current AI priorities and pick the first project.
```

## Privacy

Your private workspace is separate from this public repository. Business context, client files, `.env`, private notes, and project work should stay in the private workspace.

Feedback to the public kit is optional. If the AI notices a useful improvement, it should ask before preparing a LinkedIn message or a small pull request.

## Help

If you get stuck, something feels too technical, or you want help shaping what to build with this workspace, contact Andrii. Short feedback is welcome: what worked, what was confusing, what you tried to build, and what would make the kit more useful.

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

This version focuses on install, private workspace behavior, safety, update flow, heartbeat, project organization, and feedback.

Project templates, app templates, full external-runtime compatibility, all secret-provider adapters, a UI, SaaS backend, and full autonomous project execution are intentionally deferred.

The private user workspace is local-first by default. Private GitHub backup can be added after setup if the user approves it.

## License

Business AI Starter Kit is licensed under the [Apache License 2.0](LICENSE).

Copyright 2026 Andrii Veselov.
