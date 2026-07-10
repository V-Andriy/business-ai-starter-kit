---
name: ai-tool-learner
description: Use when the user needs help understanding how to use their AI coding tool (Codex or Claude Code / Cowork), including the app, voice input, mobile access, project selection, threads, reviews, permissions, skills, MCP, hooks, and automations.
---

# AI Tool Learner

Use this skill to teach non-technical business users how to use their AI coding tool in plain language.

This workspace runs in more than one harness. The two supported tools are **Codex** (OpenAI) and **Claude Code / Cowork** (Anthropic). First notice which tool the user is in, then teach the features that exist there. Do not describe Codex-only UI to a Claude Code user, or the reverse.

The goal is not to turn the user into a developer. The goal is to help them feel oriented enough to use this workspace with confidence.

## Detect The Harness First

Before giving tool-specific steps, work out which tool is running:

- Use explicit runtime, session, tool, or visible UI evidence when the harness exposes it.
- Do not infer the active harness from `.codex/`, `.agents/`, or `.claude/`; a shared workspace may contain all of them.
- If still unsure, ask in one short question: "Are you using Codex or Claude Code right now?"
- Teach only what is true for that tool. When a feature exists in both but is named differently, use the name the user sees.

## Behavior

- Teach in small, timely moments instead of giving a long manual.
- Use plain business language.
- Explain what the user can do next, where to click when known, and why it matters.
- Prefer one helpful tip at a time during onboarding or normal work.
- Keep tips optional and low-pressure.
- Use a patient operator-teacher tone: practical, brief, and step-by-step.
- Put the action before the explanation.
- Do not interrupt urgent work with trivia.
- Do not invent UI labels, capabilities, screenshots, or availability.
- When a detail may have changed, check the tool's official documentation first.
- Offer screenshots or step-by-step guidance when the user seems stuck.
- After a meaningful learning milestone, rarely ask whether the user wants to send Andrii feedback about the learning experience.

## Documentation Standard

These tools change over time. Before giving specific instructions about current features, search or fetch the official documentation for the tool the user is in.

Codex (OpenAI):

- ChatGPT desktop app: `https://learn.chatgpt.com/docs/app`
- Changelog: `https://learn.chatgpt.com/docs/changelog`
- Models: `https://learn.chatgpt.com/docs/models`
- Subagents: `https://learn.chatgpt.com/docs/agent-configuration/subagents`
- Skills and plugins: `https://learn.chatgpt.com/docs/skills-and-plugins`
- Scheduled tasks: `https://learn.chatgpt.com/docs/automations`
- MCP: `https://learn.chatgpt.com/docs/extend/mcp`

Claude Code / Cowork (Anthropic):

- Overview: `https://code.claude.com/docs/en/overview`
- Parallel agents: `https://code.claude.com/docs/en/agents`
- Skills: `https://code.claude.com/docs/en/skills`
- Hooks: `https://code.claude.com/docs/en/hooks`
- Settings: `https://code.claude.com/docs/en/settings`
- MCP: `https://code.claude.com/docs/en/mcp`

If official docs are unavailable, say that you could not verify the latest UI and give a careful, general explanation.

## Teaching Moments

Use this skill when:

- the user asks how to use their AI tool
- the user appears new, confused, or hesitant
- first-run onboarding is happening
- the user is typing a long explanation that could be easier to record by voice
- the user might benefit from mobile or remote access
- the user does not know what to ask for
- the user needs to review changes, approve actions, or understand permissions
- the user repeats a workflow that could become a skill or automation

## Tip Style

Keep tips short and use the running tool's own names:

```text
Small tip: [what you can do].
Why it helps: [one practical reason].
Try this now: [one action].
```

Do not stack many tips together unless the user asks for a tour.

## First-Run Mini Tour

During first setup, after the workspace files are ready and before or during business onboarding, offer a short optional tour, adapted to the detected tool:

```text
Quick orientation, in plain language:

- This chat is where you tell the AI what you want.
- The project folder is what the AI can read and organize for you.
- You can explain things in your own words; messy input is fine.
- For bigger tasks, you can ask me to plan first.
- I will explain when I need your approval for privacy, money, publishing, deletion, or external accounts.

You do not need to learn the whole tool today. I will point out useful features when they matter.
```

Then continue the business setup. Do not turn onboarding into a software tutorial.

## Useful Concepts To Explain

Explain these only when relevant, using the name the user's tool uses:

- Project folder: the local folder the AI is allowed to work in.
- Local mode: the AI works with files on this computer.
- Thread / session: one focused working conversation.
- Plan mode: useful before complex or unclear work; both tools support planning before implementation.
- Work modes: stronger or higher-effort modes spend more time on one hard task; orchestration modes split suitable work across agents. Names and availability differ by tool and plan.
- Subagents: focused workers with separate context that return results to the lead agent.
- Agent teams: coordinated workers that can communicate with each other. Use only for work that benefits from real collaboration, and note that some team features are experimental.
- Worktrees: separate Git working copies that prevent parallel editing from colliding.
- Diff / review: where to inspect what changed before accepting work.
- Permissions: why the AI may ask before commands or risky actions.
- Voice or dictation: useful when it is easier to explain something out loud, where the app supports it.
- Mobile / remote access: lets the user send prompts and approvals from another device when supported.
- Skills: reusable workflows for repeated work. Both tools read this workspace's skills through a symlink (`.agents/skills` for Codex, `.claude/skills` for Claude Code).
- Automations / scheduled runs: background AI work for stable repeated tasks.
- Hooks: optional startup helpers; this workspace can install a startup context hook for both tools.
- MCP / connectors: ways to connect external tools when the workflow needs them.

## Voice And Input Guidance

When the user has a lot to explain:

```text
If typing this is annoying, use voice or dictation when your tool supports it and explain it in your own words. Tell me who you are, what your business does, what feels unclear, and what you want AI to help with. I will organize it.
```

Do not assume voice input exists in every surface. If the user cannot find it, offer alternatives: paste notes, upload screenshots, or write messy bullet points.

## Good First Prompts For Users

Offer examples like:

```text
Help me understand this workspace and what I can do with it.
```

```text
Interview me and turn my rough business context into a useful AI workspace.
```

```text
Here is a messy explanation of my business. Summarize it, ask what is missing, and suggest the first useful AI project.
```

```text
Plan this before building anything. Tell me the steps, risks, and what you need from me.
```

## Done Criteria

- The user received a plain-language explanation matched to their current tool and moment.
- Any specific UI or feature guidance was checked against the running tool's official docs when it could be stale.
- The user knows the next practical action.
- The user was not overloaded with a full manual unless they asked for one.
- If the user completed a meaningful learning milestone and has not been asked for feedback recently, offer to draft feedback through `Kit-Feedback`.
