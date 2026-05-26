---
name: update-review
description: Use when refreshing the Business AI Starter Kit source cache and reviewing useful updates.
---

# Update Review

Use this skill when the user asks to update the kit or when the heartbeat checks for useful updates.

## Steps

1. Refresh `.business-ai-kit/source/`.
2. Read source `CHANGELOG.md`, `INDEX.md`, and `VERSION`.
3. Read changed source guidance in `Seed/AGENTS.md`, `Seed/Agent-Instructions/Skills/`, and `Seed/Scripts/`.
4. Compare new guidance against the current workspace.
5. Classify files as kit-owned, user-owned, or hybrid.
6. Identify only useful updates.
7. Explain updates in plain language.
8. Apply only approved changes to user-owned or hybrid files.
9. Log the review in `Automation-Log.md`.

## Source Cache Recovery

- If `.business-ai-kit/source/` is missing, clone the public kit again.
- If it is healthy, pull latest changes.
- If it is broken or has conflicts, move it to `.business-ai-kit/backups/` with a timestamp and clone a fresh copy.

## Rules

- Do not overwrite user context.
- Do not silently change `AGENTS.md`.
- Do not change privacy boundaries without approval.
- Do not update secret behavior without approval.
- Use proposals when a change is meaningful.
- Treat updates like a dry run first: inspect, summarize, then apply.
- Preserve local user edits even when kit guidance changed.
- Back up or clearly preserve content before replacing hybrid files.

## Ownership Guide

Kit-owned:

- generic skills
- helper scripts
- `.env.example`
- generic setup/update/safety instructions

User-owned:

- dossiers
- private notes
- project work
- real `.env`
- business decisions and memory

Hybrid:

- `AGENTS.md`
- `README.md`
- `Current-Focus.md`
- `Active-Threads.md`
- `Workspace-Map.md`
- `Secrets-Vault.md`

For hybrid files, merge useful guidance into the user's current file instead of replacing it wholesale.

## Hermes Compatibility Review

When kit updates mention Hermes, OpenClaw, other AI harnesses, skills, memory, context files, or automation:

- adapt the concept to this workspace structure
- keep user-facing language business-friendly
- do not add Hermes runtime requirements unless the user asks
- prefer symlinks for skills compatibility instead of copying skill folders
- keep procedures in skills and facts in memory/dossiers

## Output Pattern

```text
I found 2 useful updates:
1. ...
2. ...

Apply both?
```
