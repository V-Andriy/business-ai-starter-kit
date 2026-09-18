---
name: ai-tool-learner
description: Use when the user asks how to use their current AI tool or needs one practical feature explained to finish a task.
---

# AI Tool Learner

Teach only what helps the next action. Do not turn a business task into a
software tour or make orientation a setup requirement.

## Identify The Tool

Use runtime evidence or the user's description. Both `.agents/skills` and
`.claude/skills` may exist in this workspace, so files alone do not identify
the running tool. Ask briefly if the surface is unclear.

Codex and Claude Code use different interfaces. Cowork is a separate product
surface; do not assume it supports Claude Code instruction imports, hooks,
settings, scheduling, or skills.

## Verify Then Explain

Read current official or local documentation before giving specific UI steps,
feature availability, model choices, limits, or pricing. Use the documentation
for the actual surface. If verification is unavailable, say so and offer a
general next step without inventing labels or support.

Useful starting points:

- [Codex documentation](https://developers.openai.com/codex)
- [Codex skills](https://developers.openai.com/codex/skills)
- [Claude Code documentation](https://code.claude.com/docs/en/overview)
- [Claude Code memory](https://code.claude.com/docs/en/memory)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Claude help](https://support.claude.com/): use current Cowork articles for Cowork.

Give one action, where to do it when verified, and why it helps. Offer a longer
tour only when requested. Use the terms visible in the user's tool.

## Relevant Teaching Moments

- Review: inspect the changed output before publishing or sharing.
- Planning: agree on uncertain goals before a large implementation.
- Permissions: explain why the next action needs approval.
- Input: use pasted notes, files, or supported voice/dictation when easier.
- Skills: use a workflow for a repeated task; avoid installing a large library.
- Automations: an explicit recurring task uses AI resources when it runs.
- Connectors: use only when the requested task needs an external service.
- Portable context: an explicitly invoked approved snapshot for another project,
  managed by `../portable-workspace-context/SKILL.md`. Explain provider processing,
  exact-preview approval, and revocation limits before installation.

Keep the current model/settings by default. Explain that consumption depends
on workload and tool limits; do not promise a $20 plan will cover a workload.
A stronger model or parallel agents may help a specific difficult task, but
neither is a default orientation step.

## Done

The user knows one practical next action, guidance matches the actual tool,
and any unverified detail is labeled. Continue the business task promptly.
