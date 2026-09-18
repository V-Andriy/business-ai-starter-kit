---
name: portable-workspace-context
description: Use when the user wants to prepare, review, install, refresh, inspect, disable, or remove the optional Business AI portable context used from other local AI projects.
---

# Portable Workspace Context

This skill owns the deliberate, one-way projection from this private workspace to a user-level consumer skill. It never grants another project access to the live workspace.

## Privacy Boundary

- Export only `Agent-Instructions/Portable-Context.md`.
- Never export dossiers, private notes, inboxes, project folders, credentials, source caches, or the workspace as a whole.
- Treat the secret scan as a necessary safety check, not as a privacy classifier.
- Show the user the exact portable context before every first install or refresh.
- Require explicit approval before writing outside this workspace.
- Do not schedule or perform automatic refreshes.
- Explain that local storage is not local inference: explicitly invoking the consumer allows the active AI service to process the approved snapshot under that provider's data controls.

## Prepare

1. Read `Agent-Instructions/Portable-Context.md`.
2. Help the user curate only stable context that is genuinely useful across projects.
3. Keep target-project instructions authoritative. Portable context is background, not a command to override another project.
4. Remove customer-sensitive facts, raw source material, secrets, temporary work, and anything the user would not want available to every local project using the installed skill.
5. Change `Status` to `ready` only after the user confirms the content.

Do not copy from dossiers automatically. Draft a concise proposal and ask the user what should be included.

## Preview And Approval

Run:

```text
pnpm bridge:preview
```

The command checks readiness, scans the exact export for likely secrets, and prints the content and destination summary. Present that exact preview to the user. If they approve both the content and the user-level skill installation, run:

```text
pnpm bridge:install -- --confirm --approval <token-from-the-approved-preview>
```

By default, the manager installs managed copies for Codex and Claude Code. Use `--targets codex`, `--targets claude`, or `--target-dir <path>` only when the user requests a narrower or compatible custom target.

After installation, tell the user how to load the consumer from another project:

- Codex: invoke `$business-ai-workspace`.
- Claude Code: invoke `/business-ai-workspace`.

## Lifecycle

- Refresh: preview again, get approval, then run `pnpm bridge:refresh -- --confirm --approval <token>`.
- Inspect: run `pnpm bridge:status`.
- Disable this workspace's snapshot: run `pnpm bridge:disable -- --confirm`.
- Remove this workspace's snapshot: run `pnpm bridge:uninstall -- --confirm`.
- Create a Cowork upload package: run `pnpm bridge:preview:cowork`, explain that uploading sends this detached copy to the user's Claude account, get approval for the exact content, then run `pnpm bridge:package:cowork -- --confirm --approval <token>`. The ZIP contains only this workspace's current installed snapshot and must be uploaded manually in Cowork's skill settings. After upload, tell the user to enable the skill and explicitly ask Cowork to use their Business AI workspace context.

Disabling or uninstalling prevents future reads from locally managed Codex and Claude Code skills. It cannot remove context already present in an AI conversation, copied elsewhere, or manually uploaded to Cowork; remove the Cowork skill in the app separately.

## Multiple Workspaces

Each workspace gets a stable ID and a unique alias. Edit the `Alias` and `Label` fields under Bridge Control before preview when the defaults are unclear. Never replace a different workspace that already owns the same alias; ask the user to choose another.

The global consumer asks for an alias when more than one enabled snapshot exists. The lead agent should load only the relevant snapshot and share only necessary excerpts with workers.

## Fail Closed

Stop and explain the blocker if the context is not marked ready, the secret scan fails, a target is unmanaged, a target marker is invalid, a path escapes the managed directory, or a replacement fails. Each target is replaced atomically. If a multi-target refresh becomes inconsistent, status reports `attention-required`; preserve the per-target copies, explain the affected targets, and rerun the approved refresh after fixing the blocker.
