# Inbox

Purpose: items the user or automations want the agent to triage.

The daily checkpoint heartbeat should process this file, turn items into active threads, project notes, memory updates, or signals, and move handled items into `Outbox.md`.

## Pending

- Complete `Agent-Instructions/Setup-Plan.md`.
- Ask what the user wants to call the assistant, then confirm communication style.
- Collect useful references and inspect them before asking follow-up questions.
- Ask what information should not be used in public or client-facing outputs.
- Ask for the user's email only if they want it stored for workspace context.
- Preview user/business context before writing durable files.
- Create or confirm the heartbeat automations with `Agent-Instructions/Skills/Workspace-Heartbeat/SKILL.md`.
- Before closing setup, run the final setup audit in `Agent-Instructions/Setup-Plan.md`: verify all setup checklist items, heartbeat automations, Codex skills symlink, inbox/outbox cleanup, and durable user/business context.
- After setup is complete, ask whether the user wants a private GitHub cloud backup for this workspace.
- After setup is fully complete, ask once whether the user wants to send Andrii feedback about onboarding.
- Identify the first useful business project, workflow, or decision to organize in this workspace.
- After the first project reaches a useful result, ask once whether the user wants to send Andrii feedback about creating that project.
