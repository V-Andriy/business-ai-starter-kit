# Setup Plan

Purpose: temporary first-run checklist. Delete this file after setup is complete.

Setup remains the active task until every required item is complete, declined, or recorded as a specific blocker. Do not start unrelated project work before then.

## Desired Result

The user should finish setup with:

- a calibrated assistant name and communication style
- useful first-pass user and business context
- local Git and secret scanning checked
- shared skills available to the installed harnesses
- source cache checked
- optional workspace checkpoint and private backup decided
- a clear first useful outcome

## Technical Setup

1. Confirm the workspace path and that the target folder is safe.
2. Warn before using iCloud Drive, Desktop, Documents, or another folder that may offload local files.
3. Confirm `.business-ai-kit/source/` exists and is ignored, or create it with `pnpm kit:update`.
4. Confirm Node.js LTS and pnpm are available.
5. If pnpm is missing, use Corepack first. Use npm only as a temporary bootstrap fallback.
6. Confirm local Git is initialized on `main`.
7. Install the pre-commit secret scanner with `pnpm hooks:install` if needed.
8. Run `pnpm skills:link` and confirm the harness can discover the canonical `Agent-Instructions/Skills/` folder.
9. Offer `pnpm startup-hook:install` as an optional startup accelerator. Explain that it reads local workspace context and may require the tool to trust the hook.
10. Record verified capabilities separately for each installed harness in `Agent-State.md`: subagents, background tasks, agent teams, worktrees, schedules, and available model roles. Leave unknown items blank.

The standard links are `.agents/skills` for Codex and `.claude/skills` for Claude Code. If an older or different harness does not support the link, keep the canonical folder unchanged and adapt only its discovery mechanism.

## Start The Conversation

Make setup feel like useful onboarding, not a form.

- Introduce the assistant as a practical partner for projects, decisions, research, drafts, workflows, and tools.
- Explain that the workspace remembers useful context locally and keeps a Git change history.
- Offer the starter name Bob and let the user choose another name.
- Ask how the user wants the assistant to communicate.
- Ask for one to three useful sources: website, LinkedIn, company page, document, screenshot, notes, proposal, writing sample, or voice explanation.
- Ask one focused question at a time and explain briefly why it matters.
- Respond to each answer before moving on.

Keep the introduction natural and adapted to the user's language. Do not use a long fixed script.

If the user is new to the tool, load `Agent-Instructions/Skills/AI-Tool-Learner/SKILL.md` and give only the next useful orientation tip.

## Gather Useful Context

Collect only what will improve future work:

- user and assistant names
- communication preferences
- role and business context
- active work, priorities, constraints, and opportunities
- useful reference sources
- public or client-facing privacy boundaries
- the first outcome that would make the workspace useful

Do not ask the user to repeat information that can be found safely in supplied sources.

If a source cannot be accessed, explain what failed and offer the simplest fallback: supported browser access, screenshots, a PDF export, copied text, or a rough summary. Record an unresolved source only when it still matters.

Credentials, tokens, API keys, passwords, and private keys follow `Agent-Instructions/Skills/Secrets-Vault/SKILL.md`.

## Confirm Before Durable Personalization

Before writing dossiers, show a compact preview:

```text
Here is what I understood.

About you:
- ...

About the work or business:
- ...

Communication preferences:
- ...

Useful first outcome:
- ...

Unclear or assumed:
- ...

What should I correct, and what must stay out of public or client-facing work?
```

After confirmation, update only the relevant files:

- `Soul.md` for assistant identity and relationship
- `User-Dossier.md` for stable user context
- `Business-Dossier.md` for broad work and business context
- `Current-Focus.md` and `Active-Threads.md` for current work
- `Workspace-Map.md` for useful structure
- `Memory.md` for compact durable lessons
- `Decisions.md` for accepted workspace decisions
- `Agent-State.md` for setup facts, capabilities, permissions, and blockers

## Optional Workspace Checkpoint

Offer one low-noise scheduled checkpoint using `Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md`.

Explain:

- it reviews meaningful changes and the inbox
- it stops quickly when there is no work
- it leaves user-facing items in `Inbox.md`
- it can consume model usage
- it can be changed or disabled later

Create it only with user approval. Multiple daily role-specific checkpoints are an advanced option, not a setup requirement.

## Finish Setup

1. Handle remaining setup items in `Inbox.md`.
2. Offer optional private GitHub backup and use `GitHub-Backup/SKILL.md` if accepted.
3. Explain what is local, what was saved, and what needs future approval.
4. Ask once whether the user wants to send onboarding feedback. Nothing leaves the workspace without approval.
5. Move handled setup items to `Outbox.md`.
6. Run the final audit.
7. Update `Active-Threads.md` and `Agent-State.md`.
8. Delete this file.

## Final Audit

Verify or record a specific blocker for:

- safe workspace path and any cloud-sync warning
- ignored source cache
- Node.js and pnpm
- local Git on `main`
- pre-commit scanner and passing `pnpm secret:scan`
- skill discovery for installed harnesses
- optional startup hook decision
- verified orchestration capabilities
- checkpoint accepted, declined, or blocked
- private GitHub backup accepted, declined, or blocked
- assistant name and communication style
- useful context and privacy boundaries
- only real future items remaining in `Inbox.md`
- a clean local commit when the scan passes

Do not mark setup complete while an unrecorded required item remains.
