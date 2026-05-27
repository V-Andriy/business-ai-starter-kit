# Business AI Starter Kit

Business AI Starter Kit helps executives, business owners, operators, and professionals set up a private local AI workspace in Codex.

It is not a prompt pack. It gives Codex a simple workspace structure, clear operating rules, safety defaults, and reusable workflows so the user can organize real business work without learning developer tooling first.

Status: alpha open-source MVP for guided pilots and first users.

This project is early. Feedback is welcome and useful. Andrii is actively helping early users shape this into a system that supports real business work, including workflow improvements, starter templates, and clearer instructions.

## What It Does

- Creates a private local workspace from the files in `Seed/`.
- Helps Codex ask a few useful onboarding questions instead of a long technical questionnaire.
- Keeps user context, decisions, memory, inbox/outbox, and reusable workflows organized.
- Adds safety defaults for secrets, local Git, and private files.
- Creates project folders only when real work starts.
- Supports an optional heartbeat routine that reviews the workspace and suggests useful next steps.
- Uses opt-in feedback only. There is no analytics, telemetry, tracking, or background reporting.

## Quick Start

1. Open Codex in the folder where you want to create your private AI workspace.
2. Paste the short install instruction from [Install.md](Install.md).
3. Let Codex do the setup, then answer the first small onboarding questions.

Codex will inspect the folder, copy `Seed/`, initialize local Git, install safety hooks, gather useful business context, create a private source cache, and set up the heartbeat routine if available.

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

Project templates, app templates, full Hermes runtime compatibility, all secret-provider adapters, a UI, SaaS backend, and full autonomous project execution are intentionally deferred.

The private user workspace is local-first by default. Private GitHub backup can be added later by user request after safety checks.

## License

Business AI Starter Kit is licensed under the [Apache License 2.0](LICENSE).

Copyright 2026 Andrii Veselov.
