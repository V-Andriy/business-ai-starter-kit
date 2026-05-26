---
name: business-setup
description: Use during first-run onboarding or when the user wants to improve business context in the workspace.
---

# Business Setup

Use this skill to gather enough business context for the AI to be useful without overwhelming the user.

## Behavior

- Ask in small groups.
- Prefer business language over technical language.
- Lead with the practical next step instead of giving the user technical choices.
- Inspect any existing files the user points to before asking them to repeat context.
- Record stable facts in `Agent-Instructions/User-Dossier.md` and `Agent-Instructions/Business-Dossier.md`.
- Record current priorities in `Agent-Instructions/Current-Focus.md`.
- Record durable preferences in `Agent-Instructions/Memory.md`.
- Record setup status and blockers in `Agent-Instructions/Agent-State.md`.
- Do not store secrets or raw private dumps.
- Keep the first conversation short. Gather only enough context to make the workspace immediately useful.

## First-Run Flow

1. Confirm the workspace path in plain language.
2. Check setup state: Git, source cache, secret scanner hook, heartbeat automation.
3. Ask the minimum context questions.
4. Fill the dossiers and workspace state files.
5. Create or confirm the hourly heartbeat automation.
6. Explain what is private, what is safe to commit, and what the workspace will do next.

## Minimum Questions

- What should I call you?
- What business or project is this workspace for?
- What do you do?
- What are you trying to use AI for first?
- What information is private or sensitive?
- What style of communication do you prefer?
- What source material can I inspect?
- What decision or outcome would make this workspace valuable in the next week?

## Better Questions For Business Users

Use these as short groups, not a long form:

```text
First, I need enough context to make this workspace useful.

1. What should I call you, and what business is this for?
2. What are the 1-2 most useful things AI could help with first?
3. What information should stay private or be handled carefully?
```

Then ask only what is needed next:

- Which files, websites, notes, or tools should I inspect?
- What communication style do you prefer: brief, balanced, or detailed?
- Is this workspace only local for now, or do you want private backup later?
- What result would make the first week successful?

## First Executive Brief

After onboarding, give the user a concise setup brief:

```text
Workspace is ready enough to start.

What I captured:
- ...

First useful project:
- ...

Needs your decision:
- ...

Private by default:
- .env and private notes stay local unless you approve otherwise.
```

## Migration And Existing Context

If the user has existing notes, project folders, previous AI instructions, Hermes/OpenClaw-style files, or another workspace:

- inspect before copying
- summarize what looks useful
- ask before importing private or sensitive content
- copy durable context into the right destination instead of dumping everything into memory
- put user preferences in `User-Dossier.md`
- put business facts in `Business-Dossier.md`
- put repeatable procedures in `Agent-Instructions/Skills/`
- put active work in `Active-Threads.md`
- leave raw archives in a clearly named project or archive folder only with approval

## Done Criteria

- User and business dossiers have useful first-pass content.
- Current focus has a clear next action.
- Active threads include setup status.
- Agent state records whether Git hooks, source cache, and heartbeat are configured.
- Memory has only compact durable facts.
- Inbox has no setup item that was already handled.
- The user understands what is private and what the workspace will do next.
- The first recommended project or workflow is clear enough to start.
