# Changelog

## Unreleased

- Made first install more interactive with plain-language progress updates, live onboarding, source-first context gathering, dossier preview, and confirmation before durable personalization.
- Added `Codex-Learner` skill for plain-language Codex onboarding, docs-backed usage tips, voice recording button guidance, planning, review, permissions, mobile access, skills, MCP, and automations.
- Tightened assistant tone toward simple, practical, concise, step-by-step guidance without hype or academic narration.
- Re-separated `Soul.md` from setup instructions so it only holds assistant identity and felt experience, with procedural onboarding kept in setup skills and install guidance.
- Added a first-install warning for iCloud/Desktop/Documents cloud-offload workspace locations.
- Added `Agent-Instructions/Soul.md` for durable assistant identity, plain-language behavior, and persistence through blockers.
- Reworked first-run business setup into assistant calibration and reference-first discovery.
- Added startup guidance to load `Soul.md` before workspace state.
- Updated seed workspace state to track assistant identity calibration.
- Updated heartbeat guidance to use the latest available capable model with a lightweight no-op gate before deep self-improvement work.
- Migrated local helper scripts from Python to plain Node.js `.mjs` scripts and added pnpm package commands.
- Added `scripts/audit-files.mjs` for file-size and documentation-graph checks with explicit exceptions.
- Added `Scripts/heartbeat_gate.mjs` and expanded heartbeat guidance with Hermes-inspired modes: No-Op, Triage, Improvement, and Escalation.
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
