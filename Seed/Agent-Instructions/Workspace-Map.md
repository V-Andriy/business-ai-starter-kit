# Workspace Map

Purpose: help the AI navigate this workspace without scanning everything every time.

## Root

- `AGENTS.md` - main workspace instructions.
- `README.md` - user-facing workspace guide.
- `Agent-Instructions/Soul.md` - assistant identity, tone, and felt user experience.
- `Agent-Instructions/` - global AI operating context.
- `Agent-Instructions/Portable-Context.md` - user-approved, one-way context snapshot for use from other local projects.
- `Agent-Instructions/Skills/portable-workspace-context/` - prepares and manages the optional global consumer skill.
- `.business-ai-kit/` - internal kit source reference and ignored source cache. Global bridge state lives separately in the user's home folder.
- `Scripts/` - local helper scripts for Git hooks, secret scanning, and kit updates.

## Projects

No project folders yet. Create one only when real work starts.

When a project will continue across sessions, add a short project-local `AGENTS.md` so future agent sessions can load the right context when working inside that folder.
