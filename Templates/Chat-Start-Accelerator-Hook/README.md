# Chat Start Accelerator Hook

This optional template adds a Codex `SessionStart` hook that gives the agent the workspace context it would normally read at the start of meaningful work.

Use it when startup context is repeatedly slow or when users often begin with prompts that could pull the agent away from the workspace operating rules.

Do not install it by default. The normal workspace must keep working through `AGENTS.md` without this hook.

## What It Does

On Codex startup or resume, the hook runs a local script and adds a compact startup brief to the agent context.

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

1. Copy `Scripts/chat_start_accelerator_context.mjs` into the workspace `Scripts/` folder.
2. Copy `.codex/hooks.json` into the workspace `.codex/` folder.
3. If the workspace already has `.codex/hooks.json`, merge the `SessionStart` entry instead of replacing existing hooks.
4. Run:

```text
node Scripts/chat_start_accelerator_context.mjs --workspace .
```

Expected result: JSON with `hookSpecificOutput.additionalContext`.

When Codex notices the new project hook, open `/hooks`, review the command, and trust it if the user wants faster startup context.

Use this plain-language explanation:

```text
Codex found an optional startup hook. It only reads local workspace instruction files and gives me a short startup brief. You can trust it for faster startup context, or skip it. The workspace still works either way.
```

## Uninstall

Remove the `SessionStart` entry from `.codex/hooks.json`, or delete `.codex/hooks.json` if it contains only this hook.

The workspace will fall back to the normal `AGENTS.md` startup routine.
