# Security Policy

## Reporting Security Issues

Please do not open public GitHub issues with secrets, credentials, private
business context, or exploitable security details.

For security-sensitive reports, contact:

- LinkedIn: https://www.linkedin.com/in/andrii-veselov/
- Website: https://scalebound.app

## Scope

Business AI Starter Kit is a local workspace starter. It is not a secret
manager, hosted platform, or security boundary.

The project includes helper guidance and a lightweight local scanner to reduce
accidental secret exposure, but users are still responsible for reviewing files
before committing, sharing, publishing, or deploying work.

## Secret Handling

- Do not commit real `.env` files, API keys, private keys, tokens, customer
  data, or private business context.
- Use `.env.example` only for safe placeholders.
- Store raw secret values in `.env` for local experiments or in a proper secret
  manager for real business systems.
- Rotate any credential that was accidentally pasted into chat, committed, or
  shared externally.

Before publishing or contributing, run:

```text
python3 Seed/Scripts/secret_scan.py Install.md Seed Templates AGENTS.md README.md INDEX.md CHANGELOG.md SECURITY.md CONTRIBUTING.md NOTICE LICENSE
```
