---
name: business-setup
description: Use during first-run onboarding or when the user wants to improve business context in the workspace.
---

# Business Setup

Use this skill to calibrate the assistant and gather enough user/business context for the workspace to become useful without overwhelming the user.

This is a conversation-first flow. Do not make the user manage files, folders, Git, or setup mechanics.

## Behavior

- Treat first setup as assistant calibration, not a technical questionnaire.
- Start by helping the user shape the assistant's name, style, and technical detail level.
- Ask for references before asking the user to explain everything manually.
- Inspect links, files, screenshots, notes, websites, public profiles, and writing samples when available.
- Show the user what you understood, then ask what is wrong or missing.
- Ask in small groups when questions are needed.
- Prefer business language over technical language.
- Lead with the practical next step instead of giving the user technical choices.
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
2. Calibrate the assistant identity:
   - What would you like to call me?
   - Which style should I use?
   - How technical should my explanations be?
   - What chat and documentation languages should I use?
3. Ask for references instead of asking the user to explain from scratch.
4. Inspect available references and workspace context before asking follow-up questions.
5. Create a first dossier preview with facts, assumptions, gaps, and likely AI opportunities.
6. Ask the user what you got wrong.
7. Fill `Soul.md`, `User-Dossier.md`, `Business-Dossier.md`, `Current-Focus.md`, `Active-Threads.md`, `Workspace-Map.md`, `Memory.md`, `Decisions.md`, and `Agent-State.md`.
8. Create or confirm the hourly heartbeat automation.
9. Explain what is private, what was captured, and the recommended first useful project or workflow.

## Opening Script

Use a warm, simple opening like this. Adapt language to the user.

```text
Hi, I am your AI partner for this workspace.

First, let's make me useful for you.

1. What would you like to call me?
   You can keep the default if you want.

2. What style should I use?
   - Default: calm, direct, practical business partner
   - Chief of Staff: structured, focused, keeps work moving
   - Creative Strategist: more ideas, positioning, and content
   - Operator: more process, tasks, and execution
   - Coach: explains more and helps you learn

3. How technical should I be?
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

What did I get wrong?
```

Use this correction step to distinguish confirmed facts from assumptions.

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

After onboarding, give the user a concise setup brief:

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
