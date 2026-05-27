# Agent State

Purpose: concise operating state for agents and automations.

## Setup

- First-run onboarding: pending
- Assistant identity calibration: pending
- Secret scanner hook: pending
- Hourly heartbeat automation: pending
- Heartbeat model policy: use the latest available capable model with an activity gate that stops when there is no meaningful work
- Kit source cache: pending
- Context model: `AGENTS.md`, `Agent-Instructions/`, project-local `AGENTS.md`, and skills
- First executive briefing: pending

## Operating Loop

- Startup should read soul, current focus, active threads, workspace map, inbox, and agent state.
- Heartbeat should process inbox, update workspace state, maintain compact memory, and log useful changes.
- Heartbeat should first check for new chats/session evidence, workspace changes, inbox items, active-thread changes, Signals, and blockers. If nothing changed, it should stop after a short log entry.
- Heartbeat can use `pnpm heartbeat:gate` as a lightweight activity snapshot before deep review.
- Heartbeat should choose No-Op, Triage, Improvement, or Escalation mode based on evidence.
- Skills are procedural memory and should be updated only when a workflow improvement is durable.
- User and broad work/business context belong in dossiers. Detailed project context belongs in project folders. Procedures belong in skills.
- Executive-facing work should keep facts, assumptions, decisions, risks, and next actions distinct.
- Feedback to the public kit is user-approved only. No analytics, telemetry, or background reporting.

## Safety Boundaries

- Ask before publishing, deploying, deleting user work, spending money, or sharing workspace context outside the local workspace.
- Use the Secrets Vault skill for credentials, tokens, passwords, API keys, private keys, and secret storage changes.
- Ask before connecting external accounts or granting broad permissions.

## Standing Defaults

- Local-first workspace.
- Brief user-facing summaries unless the user asks for detail.
- Create project folders only when real work starts.
- Keep private notes, raw source material, and internal context out of public or client-facing outputs unless approved.
- Explain technical actions in plain language: what is happening, why it matters, what the agent is doing, and what the user needs to do.
