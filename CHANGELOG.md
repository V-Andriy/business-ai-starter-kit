# Changelog

## Unreleased

- Reworked the kit around an orchestration-first execution model: a lead agent owns scope, authorization, integration, verification, and the final result while bounded workers handle independent tracks.
- Added capability-based lead, worker, fast-worker, and reviewer model roles with current GPT-5.6 and Claude model examples, without requiring model pins or premium access.
- Added an execution ladder for one agent, subagents, background sessions, agent teams, scripted workflows, batch work, and worktree isolation, with sequential fallback when native orchestration is unavailable.
- Added a dedicated orchestrated-work architecture flow and updated cross-harness diagrams to treat Codex and Claude Code as capability adapters instead of separate workspace designs.
- Simplified the canonical workspace instructions for newer models by removing repeated behavior, keeping approval boundaries explicit, and moving task-specific procedure into skills.
- Reduced first-run setup to outcome-focused onboarding with verified harness capabilities, an optional single checkpoint, and no long fixed conversation script.
- Replaced the 430-line heartbeat with a smaller adaptive checkpoint that routes model capability by task, stops quickly on no-op runs, and keeps multi-agent execution out of routine maintenance.
- Made project structure progressive so small projects start with only a brief and working/output folders, then add decisions, executive context, or project-local instructions when needed.
- Updated Claude Code documentation links and added current guidance for subagents, agent teams, workflows, worktrees, and model-aware orchestration.
- Added first-class Claude Code (Cowork) support alongside Codex from one shared workspace: `CLAUDE.md` imports the canonical `AGENTS.md`, skills link into `.claude/skills` as well as `.agents/skills`, and the startup hook installs into `.claude/settings.json` as well as `.codex/hooks.json`.
- Generalized `link_codex_skills.mjs` into `link_skills.mjs` (links both harness skill paths) and the startup-hook installer to set up both harnesses.
- Renamed the `Codex-Learner` skill to `AI-Tool-Learner` and made it harness-aware so it teaches Codex or Claude Code based on the running tool.
- Added optional role-specific checkpoint focus areas for busy workspaces while keeping one adaptive checkpoint as the default.
- Added a setup command to install the Codex startup context hook from the template, and changed setup guidance to offer it as a default accelerator that users can still decline or leave untrusted.
- Hardened automation handoff rules so background runs put user-facing questions, warnings, recommendations, and feedback prompts in `Inbox.md` for the next live chat instead of treating automation chat output as delivered.
- Tightened heartbeat quality rules so unchanged pending decisions do not trigger deep reviews by themselves, and maintenance runs must produce a real workspace improvement or log a clear no-op.
- Refined assistant personality guidance to use more questions, confirm hypotheses, and stay proactive without pressuring the user.
- Added optional Chat Start Accelerator Hook template for faster Codex startup context loading.
- Hardened first-run setup completion with a setup lock, final setup audit, active inbox handling, cross-harness skill links, an explicit checkpoint decision, proactive Git checkpoints, and clearer GitHub backup guidance.
- Made first install more interactive with plain-language progress updates, live onboarding, source-first context gathering, dossier preview, and confirmation before durable personalization.
- Added `Codex-Learner` skill for plain-language Codex onboarding, docs-backed usage tips, voice recording button guidance, planning, review, permissions, mobile access, skills, MCP, and automations.
- Tightened assistant tone toward simple, practical, concise, step-by-step guidance without hype or academic narration.
- Re-separated `Soul.md` from setup instructions so it only holds assistant identity and felt experience, with procedural onboarding kept in setup skills and install guidance.
- Added a first-install warning for iCloud/Desktop/Documents cloud-offload workspace locations.
- Added `Agent-Instructions/Soul.md` for durable assistant identity, plain-language behavior, and persistence through blockers.
- Reworked first-run business setup into assistant calibration and reference-first discovery.
- Added startup guidance to load `Soul.md` before workspace state.
- Updated seed workspace state to track assistant identity calibration.
- Updated checkpoint guidance to route model capability by task and use a lightweight no-op gate before deeper maintenance work.
- Migrated local helper scripts from Python to plain Node.js `.mjs` scripts and added pnpm package commands.
- Added `scripts/audit-files.mjs` for file-size and documentation-graph checks with explicit exceptions.
- Added `Scripts/heartbeat_gate.mjs` and expanded heartbeat guidance with Hermes-inspired modes: No-Op, Triage, Maintenance, Improvement, and Escalation.
- Added a user-approved kit feedback workflow for LinkedIn feedback and small upstream improvement proposals.
- Simplified first-user README, install handoff, and seed workspace guidance for non-technical business users.
- Added alpha pilot language that invites early users to share what they are trying to build and request workflow or template support.

## 0.1.0

- Added MVP public repo shell.
- Added Codex-first setup instructions.
- Added private workspace seed.
- Added daily checkpoint heartbeat operating model.
- Added inbox/outbox continuity files.
- Added Secrets Vault skill with local `.env` and Doppler guidance.
- Added local secret scanner and pre-commit hook installer.
- Added support references for Andrii Veselov and Scalebound.
- Polished install flow for safer first setup and source-cache creation.
- Strengthened executive-facing workspace behavior, decision hygiene, and output standards.
- Added project-level executive briefing guidance.
- Tightened heartbeat, onboarding, and project planning workflows.
- Added Apache-2.0 license, security policy, and contribution guidance.
- Removed local planning notes and editor state from the public release tree.
