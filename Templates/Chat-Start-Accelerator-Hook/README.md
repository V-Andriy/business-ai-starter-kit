# Chat Start Accelerator Hook

An optional local `SessionStart` helper for Codex and Claude Code. The normal
workspace works through its instruction files without installing this hook.
Install only when the user requests it; setup does not depend on it.

## Output

The script emits a bounded JSON `hookSpecificOutput.additionalContext` value
with workspace metadata and pointers. It does not inject the contents of
Soul, dossiers, focus, inbox, memory, state, or setup files into every session.
The agent loads the relevant file only when the current task needs it.

The hook is read-only, local, and bounded to keep startup context small. It
makes no AI calls, network requests, commits, or source-cache updates. It is
not a promise of a specific speed or token saving.

## Install

From the private workspace, after explicit opt-in:

```text
pnpm startup-hook:install
```

Review the generated configuration for the current host. Codex uses
`.codex/hooks.json`; Claude Code uses `.claude/settings.json`. Follow any
host trust prompt. Cowork support is not implied by Claude Code support.

The installer must preserve existing settings and unrelated hooks. For a
manual install, copy the script and merge only its `SessionStart` entry from
the template configuration into the existing host config.

## Verify

```text
node Scripts/chat_start_accelerator_context.mjs --workspace .
```

Expected: valid JSON with short metadata and pointers, no instruction-file
contents, and no workspace mutations. The public repository's
`pnpm check:context` checks those properties in an isolated temporary fixture.

## Remove

Remove only this hook's `SessionStart` entry from each host configuration.
Preserve other hooks and settings. The workspace continues using `AGENTS.md`
and Claude Code's `CLAUDE.md` import.
