# Setup Plan

Purpose: establish essential local safety, useful business context, and one
small weekly maintenance check before marking first-time setup complete.

## Essential Local Setup

1. Confirm the workspace path and preserve existing files. If installation
   needs a non-empty or unclear target, ask for a safe location before copying.
2. Explain any cloud-sync or offloading risk for the chosen folder.
3. Check Node.js LTS, Git, and pnpm. Explain any needed installation and use
   the platform's supported installer. Use Corepack for pnpm when available;
   npm is allowed only to bootstrap pnpm.
4. Initialize local Git on `main` when possible and run `pnpm hooks:install`.
5. Run `pnpm skills:link`; verify `.agents/skills` and `.claude/skills` point to
   `Agent-Instructions/Skills/`. Keep `CLAUDE.md` importing `AGENTS.md`.
6. Confirm `.env` and `.business-ai-kit/source/` are ignored. Run
   `pnpm kit:update` if the public source cache is missing.
7. Save coherent setup changes locally. The pre-commit hook scans the staged
   snapshot automatically; follow `Skills/Secrets-Vault/SKILL.md` for any
   missing hook, scan failure, or secret-bearing material.

Record actual results and concrete blockers in `Agent-State.md`. Do not run a
separate full-workspace scan just because setup started.
Codex and Claude Code are the supported instruction pairing. Check current
documentation for other harnesses before claiming imports, hooks, skills, or
scheduling work there. Startup hooks remain optional.

## Required First Conversation

Use a brief conversation to learn enough to help well. Reuse information
already supplied or available in approved references; do not ask it again.
Ask one or two closely related questions at a time. Explain why only when
it is not obvious. Collect:

- the user's role and what the business or work does
- the near-term outcome or problem the user wants help with
- the current process, tools, and useful reference material
- important constraints and privacy boundaries
- preferred communication style
- timezone and a suitable weekly maintenance day/time

Assistant naming is optional. Do not require email, contact details, sensitive
personal information, or a long biography. If the user prefers not to share
an item, record that boundary and proceed with the stated limitation.

Inspect supplied references before asking follow-up questions. If access fails,
explain what is missing and offer an export or copied excerpt. For credentials,
use `Skills/Secrets-Vault/SKILL.md` without repeating raw values.

Show a short profile summary separating confirmed facts, assumptions, and
unknowns. Ask the user to confirm or correct it before setup is complete.
Save useful confirmed user facts in `User-Dossier.md`, business facts in
`Business-Dossier.md`, and project detail in the relevant brief. Update
`Soul.md` only for assistant identity and communication preferences.

## First Useful Output

Use onboarding to understand the requested outcome, then make a useful first
draft promptly. Do not turn every answer into another profile question.
A draft can be an onboarding milestone, but it does not replace the required
profile confirmation or weekly maintenance setup.

If no outcome is named, offer a small relevant choice: a customer message,
options comparison, meeting action list, or process checklist.
A one-off task needs no project scaffold. Use `Skills/Project-Planning/SKILL.md`
for work that will continue across sessions.

## Weekly Maintenance Setup

Follow `Skills/Workspace-Heartbeat/SKILL.md` to configure one small weekly check.
Explain its local scope, weekly cadence, AI resource use, and how to pause it.
Confirm the timezone/day/time and any consent required by the host scheduler.
Use the host's actual supported scheduling tool; do not fabricate capability
or install an alternate scheduler silently.

Check for an existing matching schedule before creating one. Verify the saved
configuration and record its id, scope, timezone, and next run in `Agent-State.md`.
If scheduling is unavailable or consent is withheld, record the concrete blocker
and a manual weekly fallback. Never label that fallback an active automation.
The fallback is an explicit limitation, not a reason to invent unattended work.

## Optional Capabilities

Offer only when relevant:

- Private GitHub backup: `Skills/GitHub-Backup/SKILL.md`; external setup and
  first push require approval. Local Git is enough for local continuity.
- Startup context hook: opt-in via `pnpm startup-hook:install`; explain its
  navigation hints and any host trust prompt before installation.
- Feedback: `Skills/Kit-Feedback/SKILL.md`; external sharing requires approval.

- Portable context: `Skills/portable-workspace-context/SKILL.md`; curate only
  `Portable-Context.md` for cross-project use. Exact preview and approval are
  required before installing or refreshing the user-level snapshot. It is not
  a live link, and setup does not require enabling it.

Keep the current model/settings by default. Extra trackers and agents are not
setup requirements.

## Close Setup

Verify essential local checks, the confirmed short profile, and one verified
weekly schedule or a documented scheduling blocker with manual weekly fallback.
Record actual results without claiming unperformed checks passed. Keep setup
partial if an essential safety check or profile confirmation remains unresolved.

Move handled setup items from `Inbox.md` to `Outbox.md`; keep only real blockers
or follow-ups. Remove setup from active threads when complete. Remove this
temporary checklist only after completion; retain it for unresolved essentials.
Tell the user what is ready, any fallback limitation, and the next useful action.
