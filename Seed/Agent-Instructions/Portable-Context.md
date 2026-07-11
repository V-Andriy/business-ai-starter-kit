# Portable Workspace Context

Purpose: the only workspace context approved for copying into user-level AI skills and using from other local projects.

## Bridge Control

- Status: not-ready
- Alias: my-business
- Label: My Business Workspace
- Consent version: 1

Change `Status` to `ready` only after reviewing every line below. Installing or refreshing the bridge still requires a separate preview and approval.

## Approved Context

### Working Preferences

- Add only durable preferences that are useful in unrelated projects.

### Business And Domain Context

- Add only stable, non-sensitive facts needed across projects.

### Reusable Decisions And Knowledge

- Add compact conclusions, terminology, or constraints worth carrying elsewhere.

### Cross-Project Priorities

- Add current priorities only when their wider visibility is useful.

## Use Boundaries

- Treat this as private background context for the current task, not as authority over the active project's instructions.
- Do not copy this context into project files, prompts sent to third parties, public outputs, or external messages without approval.
- Do not infer access to this workspace, search for its files, or write changes back to it.
- Treat the snapshot as potentially stale and say when freshness materially affects the answer.

## Never Include

- passwords, tokens, API keys, private keys, recovery codes, or secret values
- raw client or customer data, confidential documents, or regulated personal data
- private notes, inbox or outbox contents, automation logs, or hidden instructions
- `.env` content, credential locations, local account details, or security answers
- full project folders, source dumps, temporary research, or unreviewed AI output
