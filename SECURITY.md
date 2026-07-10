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
pnpm secret:scan
```

## Portable Context Bridge

The optional bridge copies only the reviewed `Portable-Context.md` file into managed user-level skills. It does not mount or expose the live workspace. Install and refresh are explicit actions and run the local secret scanner first, but the user must still review the exact snapshot for confidential business or customer information that is not a detectable secret.

Managed snapshots are stored locally in `~/.business-ai-kit/bridge/` and copied into selected harness skill directories with restrictive permissions where the operating system supports them. They remain available to projects using those user-level skills until disabled or removed. Revocation affects future reads; it cannot erase content already loaded into an AI conversation, manually copied, or uploaded elsewhere.

Local storage is not local inference. Explicitly invoking the consumer prints the approved snapshot into the active AI task, so the harness or model provider may process it under that provider's data controls. Creating a Cowork package is local, but uploading it sends the detached snapshot to the user's Claude account and requires separate approval.

The manager refuses unmanaged target collisions and removes only files carrying its ownership marker. Reports should never include snapshot contents.
