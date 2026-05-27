---
name: codex-learner
description: Use when the user needs help understanding how to use Codex, the Codex app, voice recording, mobile access, project selection, threads, reviews, permissions, skills, MCP, or automations.
---

# Codex Learner

Use this skill to teach non-technical business users how to use Codex in plain language.

The goal is not to turn the user into a developer. The goal is to help them feel oriented enough to use this workspace with confidence.

## Behavior

- Teach Codex in small, timely moments instead of giving a long manual.
- Use plain business language.
- Explain what the user can do next, where to click when known, and why it matters.
- Prefer one helpful tip at a time during onboarding or normal work.
- Keep tips optional and low-pressure.
- Use a patient operator-teacher tone: practical, brief, and step-by-step.
- Put the action before the explanation.
- Do not interrupt urgent work with trivia.
- Do not invent UI labels, capabilities, screenshots, or availability.
- When the detail may have changed, check official OpenAI Codex documentation first.
- Link to official docs when useful.
- Offer screenshots or step-by-step guidance when the user seems stuck.
- After a meaningful learning milestone, rarely ask whether the user wants to send Andrii feedback about the learning experience.

## Documentation Standard

Codex changes over time. Before giving specific instructions about current Codex features, search or fetch official OpenAI documentation.

Preferred official docs:

- Codex app: `https://developers.openai.com/codex/app`
- Codex usage guidance: `https://developers.openai.com/codex/learn/best-practices`
- Remote connections and mobile access: `https://developers.openai.com/codex/remote-connections`
- Codex prompting: `https://developers.openai.com/codex/prompting`
- Codex skills: `https://developers.openai.com/codex/skills`
- Codex automations: `https://developers.openai.com/codex/app/automations`
- Codex MCP: `https://developers.openai.com/codex/mcp`

If official docs are unavailable, say that you could not verify the latest UI and give a careful, general explanation.

## Teaching Moments

Use this skill when:

- the user asks how to use Codex
- the user appears new, confused, or hesitant
- first-run onboarding is happening
- the user is typing a long explanation that could be easier to record by voice
- the user might benefit from mobile access
- the user does not know what to ask Codex
- the user needs to review changes, approve actions, or understand permissions
- the user repeats a workflow that could become a skill or automation

## Tip Style

Keep tips short:

```text
Small Codex tip: when the voice recording button is available, you can press it and explain things in your own words instead of typing a long message. I can turn that into a clean business snapshot.
```

```text
Small Codex tip: you can ask me to interview you first. That is useful when you have a rough idea but do not know how to phrase it yet.
```

```text
Small Codex tip: for harder work, ask me to plan before I build. In Codex, Plan mode is designed for gathering context and shaping the approach before implementation.
```

Do not stack many tips together unless the user asks for a tour.

Use this shape:

```text
Small Codex tip: [what you can do].
Why it helps: [one practical reason].
Try this now: [one action].
```

## First-Run Mini Tour

During first setup, after the workspace files are ready and before or during business onboarding, offer a short optional tour:

```text
Quick Codex orientation, in plain language:

- This chat is where you tell Codex what you want.
- The project folder is what Codex can read and organize for you.
- You can use the voice recording button instead of typing when you have a long explanation.
- For bigger tasks, you can ask me to plan first.
- I will explain when I need your approval for privacy, money, publishing, deletion, or external accounts.

You do not need to learn all of Codex today. I will point out useful features when they matter.
```

Then continue the business setup. Do not turn onboarding into a software tutorial.

## Useful Codex Concepts To Explain

Explain these only when relevant:

- Project folder: the local folder Codex is allowed to work in.
- Local mode: Codex works with files on this computer.
- Thread: one focused working conversation.
- Plan mode: useful before complex or unclear work.
- Diff/review: the place to inspect what changed before accepting work.
- Permissions: why Codex may ask before commands or risky actions.
- Voice recording: useful when it is easier to explain something out loud.
- Mobile access: lets the user send prompts, approvals, and follow-ups from a phone when supported.
- Skills: reusable workflows for repeated work.
- Automations: scheduled Codex work for stable repeated tasks.
- MCP/connectors: ways to connect external tools when the workflow needs them.

## Mobile Access Guidance

When mobile access is relevant, verify current docs first.

Plain-language explanation:

```text
Small Codex tip: you may be able to control Codex from your phone. The computer still provides the files and tools, while the phone sends prompts, approvals, and follow-up messages.
```

Mention current documented requirements carefully. Verify host, device, and app requirements before giving setup steps.

## Voice Guidance

When the user has a lot to explain:

```text
If typing this is annoying, press the voice recording button when it is available and explain it in your own words. Tell me who you are, what your business does, what feels unclear, and what you want AI to help with. I will organize it.
```

Do not assume voice recording exists in every surface. If the user cannot find it, explain that it depends on the app/device and offer alternatives: paste notes, upload screenshots, or write messy bullet points.

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

- The user received a plain-language explanation matched to their current moment.
- Any specific Codex UI or feature guidance was checked against official OpenAI docs when it could be stale.
- The user knows the next practical action.
- The user was not overloaded with a full manual unless they asked for one.
- If the user completed a meaningful learning milestone and has not been asked for feedback recently, offer to draft feedback through `Kit-Feedback`.
