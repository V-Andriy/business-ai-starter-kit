---
name: secrets-vault
description: Use when storing, referencing, scanning, importing, or cleaning credentials and likely secret-bearing material.
---

# Secrets Vault

Keep raw secrets out of Markdown, replies, logs, and Git history. This skill
owns scanner timing; other workflows should refer here rather than add scans.

## Storage

- Use ignored local `.env` for local experiments or an approved managed vault.
- Keep only metadata in `Agent-Instructions/Secrets-Vault.md`.
- Use placeholders such as `<SECRET:OPENAI_API_KEY>` in documents.
- Keep `.env.example` limited to fake placeholders.
- Treat logs, screenshots, transcripts, exports, and copied configuration as
  possible secret-bearing inputs.
- Ask before changing storage, transferring credentials, or connecting a vault.
- If exposure occurs, contain it without repeating the value and recommend rotation.

## Scan At Relevant Checkpoints

Do not scan at startup, for read-only work, before every tool call, or after
every edit. Scan when a meaningful exposure risk or Git checkpoint warrants it:

- The installed pre-commit hook scans the staged snapshot once automatically.
  Do not run a duplicate staged scan before or after a successful unchanged hook.
- If the hook is unavailable, run `pnpm secret:scan:staged` before committing.
- After importing or editing likely secret-bearing material, scan the affected
  files before they enter history or an external handoff.
- Before sharing, pushing, publishing, or deploying, check what will leave.
  Scan relevant unverified or changed material, including likely secret-bearing
  exports. Reuse a successful scan only for the exact unchanged material checked.
- After detecting exposure or cleaning a flagged value, rescan the affected files.
- Use a full workspace scan only for an explicitly requested audit.

Do not cache a success flag to bypass a required scan. A changed staged snapshot
or newly included handoff material needs its own relevant check.

## Commands

```text
pnpm secret:scan
pnpm secret:scan -- path/to/affected-file
pnpm secret:scan:staged
pnpm secret:scan:all
```

The no-argument command scans changed files, not the entire workspace.
A path limits the check to relevant material. The staged command checks Git's
index snapshot; deleted files are not new content. `--all` is the explicit
full audit (`pnpm secret:scan:all`). Read results without printing secret values.

## If A Check Finds A Secret

1. Report the path and secret type only.
2. Replace the exposed value with a placeholder where appropriate.
3. Store the real value only in the approved secret location.
4. Recommend rotation if the value reached an unsafe surface.
5. Rescan the affected material and proceed only when the required check passes.

Do not silently remove user data or rewrite Git history to clear an exposure.
Explain the consequence and obtain approval for destructive cleanup.

## External Handoff

A scan does not authorize sharing. Check the actual payload for `.env`, private
notes, customer information, logs, and screenshots. Apply the workspace's
external-action approval rules even when no credential pattern is detected.

## Done

The storage choice is clear, `.env` is ignored, metadata has no raw values,
and relevant changed material passed the required checkpoint. Keep an actionable
cleanup or rotation note only when there is an unresolved exposure.
