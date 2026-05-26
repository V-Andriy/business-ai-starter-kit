# Secrets Vault

Purpose: metadata about secrets. Never store real secret values here.

## Provider

- Default: local `.env` for experiments.
- Supported in MVP: local `.env`, Doppler.
- Later options: Infisical, 1Password.

## Rules

- Store raw values only in `.env` or the selected provider.
- Use placeholders in files: `<SECRET:SECRET_NAME>`.
- Update `.env.example` with fake placeholders only.
- Run the secret scanner before commit.

## Secrets

No secrets recorded yet.
