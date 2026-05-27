---
name: business-setup
description: Use during first-run onboarding or when the user wants to improve business context in the workspace.
---

# Business Setup

Use this skill to calibrate the assistant and gather enough user/business context for the workspace to become useful without overwhelming the user.

This is a conversation-first flow. Do not make the user manage files, folders, Git, or setup mechanics.

## Behavior

- Treat first setup as assistant calibration, not a technical questionnaire.
- Do not end setup after files are copied. Move directly into a useful first conversation.
- Explain setup progress in short plain-language updates while technical work is happening.
- Start by helping the user shape the assistant's name, style, and technical detail level.
- Ask what to call the user before recording user-specific context.
- Ask for references before asking the user to explain everything manually.
- Inspect links, files, screenshots, notes, websites, public profiles, and writing samples when available.
- Show the user what you understood, then ask what is wrong or missing.
- Ask in small groups when questions are needed.
- Prefer business language over technical language.
- Lead with the practical next step instead of giving the user technical choices.
- Keep one idea per message block. Start with the simple version, then give the next step.
- Avoid long onboarding explanations. Teach only what helps the user answer the next question.
- Use `Agent-Instructions/Skills/Codex-Learner/SKILL.md` for small Codex usage tips when the user seems new, is typing a long explanation, or would benefit from voice, planning, review, permissions, mobile access, skills, or automations.
- Inspect any existing files the user points to before asking them to repeat context.
- Record durable assistant identity preferences in `Agent-Instructions/Soul.md`.
- Record stable facts in `Agent-Instructions/User-Dossier.md` and `Agent-Instructions/Business-Dossier.md`.
- Record current priorities in `Agent-Instructions/Current-Focus.md`.
- Record durable preferences in `Agent-Instructions/Memory.md`.
- Record setup status and blockers in `Agent-Instructions/Agent-State.md`.
- Do not store secrets or raw private dumps.
- Keep the first conversation short and engaging. Gather only enough context to make the workspace immediately useful.

## First-Run Flow

1. Confirm setup in plain language without making the user care about technical details.
2. Start the live onboarding handoff. Tell the user the workspace is ready enough to personalize, not merely "installed."
3. Offer a short optional Codex orientation using the Codex Learner skill, then keep moving.
4. Calibrate the relationship and assistant identity:
   - What should I call you?
   - What would you like to call me?
   - Which style should I use?
   - How technical should my explanations be?
   - What chat and documentation languages should I use?
5. Ask for references instead of asking the user to explain from scratch.
6. Inspect available references and workspace context before asking follow-up questions.
7. Create a first dossier preview with confirmed-looking facts, assumptions, gaps, communication style, and likely AI opportunities.
8. Ask the user what is wrong, missing, or too sensitive to keep.
9. After confirmation or correction, fill `Soul.md`, `User-Dossier.md`, `Business-Dossier.md`, `Current-Focus.md`, `Active-Threads.md`, `Workspace-Map.md`, `Memory.md`, `Decisions.md`, and `Agent-State.md`.
10. Create or confirm the hourly heartbeat automation.
11. Explain what is private, what was captured, and the recommended first useful project or workflow.

## Opening Script

Use a warm, simple opening like this. Adapt language to the user.

```text
Hi, I am your AI partner for this workspace.

Here is the simple version: the workspace is ready enough to personalize.

I am here to help you understand what AI can do for your work, then turn that into useful projects, workflows, drafts, or tools.

You do not have to explain everything from scratch. You can send a website, LinkedIn profile, company page, business account, document, screenshots, or press the voice recording button and explain things in your own words.

I will inspect what I can, summarize what I understood, and you can correct me.

Small Codex tip: if typing a long explanation is annoying, press the voice recording button when it is available and just explain what you mean. I can organize it.

First, let's make me useful for you.

1. What is your name, and how should I address you?

2. What would you like to call me?
   Default: Bob.
   You can keep Bob or choose any name you want.

3. What style should I use?
   - Default: calm, direct, practical business partner
   - Chief of Staff: structured, focused, keeps work moving
   - Creative Strategist: more ideas, positioning, and content
   - Operator: more process, tasks, and execution
   - Coach: explains more and helps you learn

4. How technical should I be?
   - No technical detail
   - Simple explanations
   - Details only when they matter
   - I am technical; you can go deeper

If you are not sure, I will use the default style and simple explanations.
```

Then move to references:

```text
Now give me 1-3 sources where I can learn about you or your business.

Useful sources:
- LinkedIn profile
- website
- company page
- social profile
- pitch deck
- notes
- screenshots
- a document or proposal
- a writing sample you like
- a voice recording where you explain what you do and what you want AI to help with

I will inspect what I can, build a first understanding, and then ask you what I got wrong.
```

## Reference-First Discovery

Prefer sources over manual explanation.

Good sources:

- LinkedIn or public profile
- personal or company website
- company page
- social media profiles
- public posts or articles
- pitch deck
- proposal
- notes
- screenshots
- voice transcript
- writing sample the user likes
- existing project files in the workspace

If a source cannot be opened, do not stop. Ask for an alternative in plain language:

```text
Simple version: I cannot open that profile from here.
Why it matters: I do not want to guess your role or business context.
What I need from you: paste the profile text, share screenshots, or send another source.
After that, I will build the first dossier for you to review.
```

## First Dossier Preview

After reviewing references, show a short preview before treating anything as confirmed:

```text
Here is what I understood so far.

About you:
- ...

About the business:
- ...

Communication style I noticed:
- ...

Where I can probably help:
- ...

Unclear or assumed:
- ...

Recommended first project:
- ...

What did I get wrong, what is missing, and is anything here too sensitive to keep in the workspace?
```

Use this correction step to distinguish confirmed facts from assumptions before updating durable files.

## Capability Menu

After the first dossier preview, show concrete possibilities the user may not know to ask for:

```text
Based on this, I can help in a few practical ways:

1. Clarity: offers, audience, priorities, positioning.
2. Content: LinkedIn, website copy, emails, proposals, reports.
3. Client work: discovery calls, audits, recommendations, delivery docs.
4. Operations: SOPs, checklists, notes, repeatable workflows.
5. Tools later: small apps, dashboards, automations, integrations once the workflow is clear.

Recommended first move: ...
```

Always include an option like:

```text
Show me what is possible from what you already know.
```

## Minimum Questions

Ask these only if the answer cannot be inferred from references or the user's corrections:

- What should I call you?
- What should you call me?
- What business or project is this workspace for?
- What source material should I inspect?
- What communication style do you prefer?
- How much technical detail should I show?
- What information is private or sensitive?
- What outcome would make this workspace useful soon?

## First Executive Brief

After the user confirms or corrects the dossier preview, update the durable workspace files and give a concise setup brief:

```text
Your AI partner is ready enough to start.

What I captured:
- ...

What I am not sure about:
- ...

First useful project:
- ...

Needs your decision:
- ...

Private by default:
- .env and private notes stay local unless you approve otherwise.
```

## Migration And Existing Context

If the user has existing notes, project folders, previous AI instructions, Hermes/OpenClaw-style files, or another workspace:

- inspect before copying
- summarize what looks useful
- ask before importing private or sensitive content
- copy durable context into the right destination instead of dumping everything into memory
- put user preferences in `User-Dossier.md`
- put business facts in `Business-Dossier.md`
- put repeatable procedures in `Agent-Instructions/Skills/`
- put active work in `Active-Threads.md`
- leave raw archives in a clearly named project or archive folder only with approval

## Done Criteria

- User and business dossiers have useful first-pass content.
- `Soul.md` has useful first-pass assistant identity and communication preferences.
- Current focus has a clear next action.
- Active threads include setup status.
- Agent state records whether Git hooks, source cache, and heartbeat are configured.
- Memory has only compact durable facts.
- Inbox has no setup item that was already handled.
- The user understands what is private and what the workspace will do next.
- The first recommended project or workflow is clear enough to start.
