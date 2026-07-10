# Business AI Starter Kit

Business AI Starter Kit helps executives, business owners, operators, and professionals set up a private local AI workspace in Codex or Claude Code (Cowork). The same workspace runs in both, and you can switch between them anytime.

It is not a prompt pack. It gives the AI a simple workspace structure, clear operating rules, safety defaults, and reusable workflows so the user can organize real business work without learning developer tooling first.

Status: alpha open-source MVP for guided pilots and first users.

This project is early. Feedback is welcome, especially when it points to clearer setup, better workflows, useful starter templates, or simpler instructions.

## What It Does

- Creates a private local workspace from the files in `Seed/`.
- Runs in Codex and Claude Code (Cowork) from one shared workspace, so you are not locked into a single tool.
- Helps the AI start a live onboarding conversation instead of ending at a technical install.
- Teaches first-time users small practical habits in plain language, matched to the tool they are in, including voice or dictation, planning, review, permissions, and mobile access when relevant.
- Keeps user context, decisions, memory, inbox/outbox, and reusable workflows organized.
- Can install an optional, explicit-invocation global skill that carries only a separately approved context snapshot into other local projects.
- Adds safety defaults for secrets, local Git, and private files.
- Creates project folders only when real work starts.
- Uses one lead agent for the outcome and adds bounded worker or reviewer passes only when they materially improve the result.
- Supports an optional low-noise checkpoint that reviews meaningful changes, keeps state current, and stops quickly when there is no work.
- Uses opt-in feedback only. There is no analytics, telemetry, tracking, or background reporting.

## Quick Start

1. Open [Codex](https://openai.com/codex/) in ChatGPT desktop, the CLI, or your IDE, or open [Claude Code](https://www.anthropic.com/claude-code) (Cowork).
2. Create or open the folder where you want your private AI workspace.
3. Open a new chat in that folder.
4. Paste this message:

```text
Set up my Business AI Starter Kit workspace using the official install instructions:

https://raw.githubusercontent.com/V-Andriy/business-ai-starter-kit/refs/heads/main/Install.md

Follow that file exactly. After installation, guide me through the first onboarding conversation.
```

5. Let the AI guide you. It will inspect the folder, set up the workspace, and ask for a few useful links, files, screenshots, notes, or a voice recording so it can understand you and your work.

The AI will inspect the folder, copy `Seed/`, initialize local Git, install safety hooks, link skills for your tool, create a private source cache, and explain what it is doing in plain language. Then it will start a real conversation: introduce itself, ask how you want it to communicate, invite you to share a few useful business sources, and adapt from how you naturally communicate.

After reviewing the sources, the AI should show a short dossier preview for you to confirm or correct before it writes durable user and business context into the workspace.

The first useful request after setup is:

```text
Help me organize my current AI priorities and pick the first project.
```

For a larger project, ask:

```text
Use orchestrator mode. Break this into safe workstreams, delegate independent parts when useful, verify the results, and give me one integrated outcome.
```

The kit adapts to the models and agent features available in the current tool. It does not require premium models, agent teams, or experimental multi-agent features for normal work.

## Portable Context Across Projects

After onboarding, users can ask the workspace to prepare Portable Workspace Context. The bridge copies one reviewed file into self-contained user-level skills for Codex and Claude Code; Cowork can receive the same snapshot as a manually uploaded skill package. It supports several source workspaces through unique aliases.

This is deliberately not live workspace access. The consumer cannot read dossiers, private notes, projects, `.env`, queues, or the source workspace. Install and refresh require an exact preview, a secret scan, and explicit approval. The consumer runs only when the user asks for it, treats the target project's instructions as authoritative, and cannot write back.

Snapshots are stored locally, but explicit invocation lets the active AI service process the approved content under that provider's data controls. A Cowork package stays local until the user separately uploads it to their Claude account.

## Share

To share Business AI Starter Kit with a friend, send them this repository and the install prompt below.

Repository:

```text
https://github.com/V-Andriy/business-ai-starter-kit
```

Install prompt:

```text
Set up my Business AI Starter Kit workspace using the official install instructions:

https://raw.githubusercontent.com/V-Andriy/business-ai-starter-kit/refs/heads/main/Install.md

Follow that file exactly. After installation, guide me through the first onboarding conversation.
```

## Privacy

Your private workspace is separate from this public repository. Business context, client files, `.env`, private notes, and project work should stay in the private workspace.

Portable Context is optional. Its installed snapshots are private copies in the user's home folder and remain available to supported local harnesses until disabled or removed. Removing a snapshot cannot erase content already loaded into an existing conversation.

Feedback to the public kit is optional. If the AI notices a useful improvement, it should ask before preparing a LinkedIn message or a small pull request.

## Help

If you get stuck, something feels too technical, or you want help shaping what to build with this workspace, contact Andrii. Short feedback is welcome: what worked, what was confusing, what you tried to build, and what would make the kit more useful.

- LinkedIn: https://www.linkedin.com/in/andrii-veselov/
- Website: https://scalebound.app

## Repository Map

- `Install.md` - short external install instruction for Codex and Claude Code.
- `Seed/` - files copied into a user's private workspace.
- `Seed/Scripts/` - helper scripts copied into the user workspace.
- `Templates/` - reserved for future project, app, and skill templates.
- `Architecture/` - Mermaid architecture diagrams for maintainers and contributors.
- `SECURITY.md` - security reporting and secret-handling notes.
- `CONTRIBUTING.md` - contribution and release-check guidance.

## MVP Boundaries

This version focuses on install, private workspace behavior, safety, orchestration, opt-in portable context, update flow, checkpoint maintenance, project organization, and feedback.

Project templates, app templates, full external-runtime compatibility, all secret-provider adapters, a UI, SaaS backend, and full autonomous project execution are intentionally deferred.

The private user workspace is local-first by default. Private GitHub backup can be added after setup if the user approves it.

## License

Business AI Starter Kit is licensed under the [Apache License 2.0](LICENSE).

Copyright 2026 Andrii Veselov.
