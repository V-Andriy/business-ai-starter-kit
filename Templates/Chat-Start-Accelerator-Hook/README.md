# Chat Start Accelerator Hook

This optional template adds a `SessionStart` hook that gives the agent the workspace context it would normally read at the start of meaningful work. It works in both Codex (`.codex/hooks.json`) and Claude Code (`.claude/settings.json`), using the same local script.

Offer it during setup as a default productivity accelerator, especially when startup context is repeatedly slow or when users often begin with prompts that could pull the agent away from the workspace operating rules.

The normal workspace must keep working through `AGENTS.md` (and `CLAUDE.md`, which imports it) without this hook. If the user declines or does not trust the hook, setup should continue normally.

## What It Does

On startup or resume, the hook runs a local script and adds a compact startup brief to the agent context. The script emits `hookSpecificOutput.additionalContext`, which both Codex and Claude Code consume.

The script reads:

- `Agent-Instructions/Soul.md`
- `Agent-Instructions/Current-Focus.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Workspace-Map.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Agent-State.md`
- `Agent-Instructions/Setup-Plan.md` when setup is still active

It also summarizes Git branch, Git status, pending inbox count, and whether `.business-ai-kit/source/` exists.

## Safety

- The hook only reads local files.
- It does not write files.
- It does not pull updates, browse the web, install packages, commit, push, or call external services.
- It does not read `.env`, raw credentials, `Private-Notes.md`, or full dossiers.
- It caps large files and total output.
- It has a short timeout so startup is not blocked for long.

Treat the output as a startup brief. The agent should still open source files again before editing them.

## Install

From a private Business AI Starter Kit workspace:

Preferred setup path:

```text
pnpm startup-hook:install
```

This installs the hook for both harnesses. Then, in Codex, open `/hooks`, review the command, and trust it; in Claude Code, review `.claude/settings.json` and approve the hook if prompted.

Manual path:

1. Copy `Scripts/chat_start_accelerator_context.mjs` into the workspace `Scripts/` folder.
2. Copy `.codex/hooks.json` into the workspace `.codex/` folder (Codex) and `.claude/settings.json` into the workspace `.claude/` folder (Claude Code).
3. If either file already exists, merge the `SessionStart` entry instead of replacing existing hooks or settings.
4. Run:

```text
node Scripts/chat_start_accelerator_context.mjs --workspace .
```

Expected result: JSON with `hookSpecificOutput.additionalContext`.

Use this plain-language explanation:

```text
There is an optional startup hook. It only reads local workspace instruction files and gives me a short startup brief. You can trust it for faster startup context, or skip it. The workspace still works either way.
```

## Uninstall

Remove the `SessionStart` entry from `.codex/hooks.json` and `.claude/settings.json`, or delete those files if each contains only this hook.

The workspace will fall back to the normal `AGENTS.md` startup routine.
