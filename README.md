# Business AI Starter Kit

A private local workspace for business work with Codex or Claude Code.
Ask for an outcome, get a useful first draft, and keep just enough context to
continue later. Status: alpha, for guided pilots and early users.

## Start With Useful Work

Use the kit to compare options, write business material, turn meeting notes
into actions, or document a repeatable process. It provides a small set of
workflows, local change history, secret scanning, and clear privacy boundaries.

- One agent and the current model settings are the default.
- Context and skills load when relevant to the task.
- A brief required onboarding establishes business context and confirms a short profile.
- Ongoing projects start with one brief and the actual output.
- Setup includes one small weekly maintenance check; startup hooks remain optional.
- Local Git is the default; external backup needs approval.

## Quick Start

1. Open Codex or Claude Code in a folder for your private workspace.
2. Paste this message:

```text
Set up my Business AI Starter Kit workspace using the official instructions:
https://raw.githubusercontent.com/V-Andriy/business-ai-starter-kit/refs/heads/main/Install.md

Follow the folder safety checks, then help me produce a useful first output.
```

The agent checks the folder before copying anything, prepares local tools and
safety checks, and asks what would make the workspace useful today. Existing
files are not overwritten without approval. A short conversation covers your role,
business objective, current process, constraints, privacy, and communication
preferences. The agent reuses what you already shared and confirms its summary.
Naming the assistant is optional; sensitive personal details are not required.

Try a concrete request:

```text
Compare these three suppliers against these requirements and give me a short
recommendation with sources and open questions.
```

```text
Turn these meeting notes into decisions, open questions, and owner/action/date
items. Mark missing owners or dates rather than guessing.
```

## What Stays Simple

A quick draft needs no project folder. Work that continues across sessions gets
a small project brief; extra trackers are added only when needed. The agent
reads the relevant sources rather than every dossier and log at startup.

Setup includes one weekly local maintenance check with confirmed timing and
host consent. It stays quiet when nothing meaningful changes. If the host
cannot schedule it, the agent records a blocker and a manual weekly fallback.
Manual reviews are also available. AI checks consume usage when they run. The kit
cannot guarantee a particular monthly-plan allowance, token saving, or price.
A local activity gate helps narrow a review after it starts; it is not a way
to avoid the cost of launching an AI run.

## Tool Compatibility

Codex uses `AGENTS.md`; Claude Code imports it from `CLAUDE.md`. Both use the
canonical skills folder through their respective links. Avoid simultaneous
edits to the same files. Cowork is a separate product surface: verify its
current support before assuming Claude Code imports, hooks, or skills work
there. Other harnesses also need a documentation-based compatibility check.

See the [model and skill review](Architecture/model-and-skill-review.md) for
sources, design decisions, and manual acceptance scenarios.

## Privacy And Recovery

Your workspace is separate from this public repository. Keep private business
context, client files, notes, and credentials there. Secret scanning reduces
accidental exposure; it does not replace reviewing an external handoff.

The kit adds no analytics, telemetry, or background reporting. Your chosen AI
tool and any explicitly connected service have their own data handling terms.
The agent asks before external sharing, publishing, account connections,
spending, or destructive actions. Feedback and private GitHub backup are optional.

## Repository Map

- [Install.md](Install.md): external setup instruction.
- [Seed/](Seed/README.md): real starter files copied to a private workspace.
- [INDEX.md](INDEX.md): file and workflow navigation.
- [ARCHITECTURE.md](ARCHITECTURE.md): system model and detailed diagrams.
- [Templates/](Templates/README.md): optional startup hook; project/app templates remain future work.
- [SECURITY.md](SECURITY.md): security reporting and secret handling.
- [CONTRIBUTING.md](CONTRIBUTING.md): contribution and release checks.

Maintainers use `pnpm check` for audit and secret scans and `pnpm check:context`
for the isolated startup-hook and activity-gate checks. `pnpm check` is an
explicit repository audit with a full public-file secret scan. Ordinary
`pnpm secret:scan` checks changed files; the commit hook checks staged content
once. Routine read-only work does not need scanning.

## Boundaries And Support

The kit focuses on useful business outputs, local continuity, safety, and
reviewed updates. It does not add a SaaS backend, UI, or unattended project
execution. Project and app templates remain outside the current scope.

For practical feedback or help, contact Andrii on
[LinkedIn](https://www.linkedin.com/in/andrii-veselov/) or
[scalebound.app](https://scalebound.app). Nothing is sent automatically.

Licensed under [Apache License 2.0](LICENSE). Copyright 2026 Andrii Veselov.
