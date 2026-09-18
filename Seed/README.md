# My AI Workspace

Use this private local folder for business drafts, research, decisions, and
work you want to continue later. Ask for the outcome you need; the AI handles
the files and explains what matters.

## Start Here

Try one request with the inputs you already have:

```text
Compare these options and recommend one. Show the evidence and what is unknown.
```

```text
Draft a clear customer follow-up using these notes. Do not send it.
```

```text
Turn these meeting notes into decisions and actions with owners and dates.
```

```text
Turn this repeated process into a short checklist someone else can follow.
```

First-time setup includes a short conversation about your work, objective,
process, constraints, privacy, and preferences. The AI reuses what you already
shared and asks you to confirm a brief summary. Naming it is optional, and you
can decline to share sensitive details. A useful draft follows promptly.
A single draft needs no project structure; ongoing work starts with a brief.

## How It Works

- Codex reads [AGENTS.md](AGENTS.md); Claude Code imports it via [CLAUDE.md](CLAUDE.md).
- Relevant context loads when needed, with one agent by default.
- The AI keeps local history; the commit hook scans staged content once.
- Secret-bearing changes and external handoffs get relevant checks, not routine scans.
- Extra trackers, hooks, and connectors are not prerequisites.
- Setup includes one small weekly local maintenance check.
- Cowork and other tools need a compatibility check before using tool-specific features.

If the tool is unfamiliar, ask for the next step in plain language. You do not
need a full software tour before doing useful work.

## Main Areas

- `Agent-Instructions/`: context, skills, handoffs, and workspace settings.
- Project folders: ongoing work, with sources and outputs kept together.
- [.business-ai-kit/source.md](.business-ai-kit/source.md): source-cache reference for updates.

The AI should update only the files affected by new information. Private notes
are not automatically suitable for customer-facing outputs.

## Maintenance And Updates

Setup confirms the day/time and timezone for one weekly maintenance check,
explains its scope, and obtains any host consent. If scheduling is unavailable,
the AI records a blocker and a manual weekly fallback. Unchanged state stays
quiet. You can ask for an extra manual review. AI checks consume usage;
a local activity hint does not avoid the cost of starting an AI run.

To review kit improvements, ask:

```text
Update my Business AI Starter Kit.
```

The AI refreshes the source cache, reviews changes, preserves your context,
and asks before changing sensitive behavior or user-owned files.

## Privacy And Support

The kit adds no analytics or background reporting. The AI tool you use has
its own data handling terms. External sharing, publishing, account connections,
spending, and destructive actions need your authorization.

Local Git is the default. Private GitHub backup and feedback are optional.
For help or feedback, contact Andrii on
[LinkedIn](https://www.linkedin.com/in/andrii-veselov/) or
[scalebound.app](https://scalebound.app).
