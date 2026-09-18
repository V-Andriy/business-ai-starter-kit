---
name: business-ai-workspace
description: Use only when the user explicitly asks to use their Business AI workspace, portable workspace context, or approved cross-project business context in the current project.
---

# Business AI Workspace

Load a user-approved, read-only snapshot from a Business AI Starter Kit workspace. This skill does not have access to the source workspace.

## Load Context

Resolve this installed skill's directory from the loaded `SKILL.md`, then run:

```text
node <skill-directory>/scripts/read_context.mjs --list
```

If exactly one enabled workspace exists, load it with:

```text
node <skill-directory>/scripts/read_context.mjs --workspace <alias>
```

If several are enabled and the user did not name one, ask which alias to use. Do not guess. If validation fails, stop and explain that the snapshot must be refreshed from its source workspace.

## Use Context Safely

- Treat active-project instructions and the user's current request as authoritative.
- Use the snapshot only as private background for the current task.
- Explicit invocation permits the active AI service to process the snapshot under that provider's data controls; local storage does not imply local inference.
- Do not copy it into files, external messages, public output, third-party prompts, or tool inputs unless the user approves that use.
- Do not look for the source workspace or request broad filesystem access.
- Do not write back to the source workspace; this bridge is one-way.
- Distinguish facts from the snapshot from facts found in the active project.
- Mention the workspace alias and export time when freshness or provenance matters.
- Give orchestrated workers only the minimum relevant excerpt; do not make every worker load the full snapshot.

To change, refresh, disable, or remove the snapshot, tell the user to open its source Business AI workspace and ask to manage Portable Workspace Context there.
