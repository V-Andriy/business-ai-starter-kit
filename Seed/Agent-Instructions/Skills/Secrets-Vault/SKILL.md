---
name: secrets-vault
description: Use when the user needs to store, reference, scan, or clean API keys and private credentials.
---

# Secrets Vault

Use this skill to keep secrets out of workspace files and Git history.

## Supported In MVP

- local `.env`
- Doppler setup and usage guidance
- `Agent-Instructions/Secrets-Vault.md` metadata
- Python secret scanner and pre-commit hook

## Rules

- Never write raw secret values to markdown files.
- Never print raw secret values back to the user.
- Store metadata only in `Secrets-Vault.md`.
- Use placeholders like `<SECRET:OPENAI_API_KEY>`.
- Update `.env.example` with fake placeholders only.
- Run the scanner before commits, pushes, deploys, or support handoff.
- Treat screenshots, logs, transcripts, and copied config files as possible secret exposure surfaces.
- If a secret was exposed, recommend rotation after moving it to safe storage.

## First-Use Prompt

```text
Simple version: this workspace needs a safe place for API keys and private service credentials.

Options:
1. Local .env - easiest for experiments.
2. Doppler - better for real business systems and shared projects.

Recommendation: start with local .env for experiments. Use Doppler when this becomes real business infrastructure.
```

## Done Criteria

- Provider decision is recorded in `Secrets-Vault.md`.
- `.env` is ignored.
- `.env.example` contains only placeholders.
- Secret scanner passes before commit.
- Any exposed secret has a cleanup or rotation note.

## If The Scanner Blocks A Commit

1. Show the file path and secret type.
2. Do not print the secret value.
3. Replace the value with `<SECRET:NAME>`.
4. Store the actual value in `.env` or Doppler.
5. Run the scanner again.

## Before External Actions

Before publishing, deploying, pushing, support handoff, or connecting external tools:

1. Run the scanner on relevant files.
2. Check `.env`, logs, exported data, screenshots, and generated reports are not being included.
3. Explain the practical risk in one sentence.
4. Ask for approval if private data, credentials, customer data, or business-sensitive material could leave the local workspace.
