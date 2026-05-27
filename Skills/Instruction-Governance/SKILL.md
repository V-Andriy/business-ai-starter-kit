---
name: instruction-governance
description: Use when editing, reviewing, or creating instructions, rules, AGENTS.md files, workspace guidance, seed skills, or maintainer documentation in the Business AI Starter Kit public repository. Helps keep rules short, owned by one file, current, and free of duplication or change commentary.
---

# Instruction Governance

Use this skill before changing durable instructions in this repository.

The goal is simple: every rule should be easy to find, easy to read, and owned by the narrowest file that needs it.

## Core Rules

- One file, one responsibility.
- Put each rule in the narrowest file that owns it.
- Do not duplicate canonical rules across files. Link to the source instead.
- Do not describe edits inside instructions. Replace old instructions with the new truth.
- Keep rules short, direct, and testable.
- Prefer concrete paths, commands, boundaries, and approvals over general advice.
- Delete stale or redundant wording when editing nearby instructions.
- Use examples only when they prevent real ambiguity.
- Write instructions in the same communication style the agent should use.

## Source Of Truth

- `AGENTS.md`: maintainer and contributor rules for this public repository.
- `Install.md`: the only external setup instruction users paste into Codex.
- `Seed/AGENTS.md`: user-facing workspace operating rules after install.
- `Seed/Agent-Instructions/Soul.md`: assistant identity, tone, relationship, and felt experience only.
- `Seed/Agent-Instructions/Skills/`: repeatable workflows copied into user workspaces.
- `Seed/Agent-Instructions/Decisions.md`: durable workspace decisions, not procedures.
- `Architecture/`: public architecture and maintainer reference.
- `Templates/`: future-facing template library; keep empty except documentation until templates are intentionally added.
- `Skills/`: maintainer-only skills for developing this public repository.

## Placement Rules

- Put setup steps in `Install.md`, `Seed/AGENTS.md`, or setup skills.
- Put runtime workspace behavior in `Seed/AGENTS.md`.
- Put repeatable procedures in `Seed/Agent-Instructions/Skills/`.
- Put public repository development constraints in root `AGENTS.md`.
- Put assistant personality and tone in `Seed/Agent-Instructions/Soul.md`.
- Put secret handling workflow in `Seed/Agent-Instructions/Skills/Secrets-Vault/SKILL.md`.
- Put secret metadata examples in `Seed/Agent-Instructions/Secrets-Vault.md`.
- Put project history and accepted decisions in decision logs.
- Put maintainer-only guidance in `AGENTS.md`, `Architecture/`, or root `Skills/`.

## Edit Workflow

1. Identify the file that owns the rule.
2. Search for existing related wording with `rg`.
3. Move, replace, or delete existing text before adding new text.
4. Write the final rule in present tense.
5. Link to the canonical source when another file needs awareness.
6. Run the relevant checks before considering the edit ready.

## Wording Standard

Instructions carry tone. Write them in the voice the agent should inherit when it reads them.

Use the desired agent style:

- simple
- calm
- direct
- practical
- specific
- respectful
- low on jargon
- free of hype

Use:

- `Do X.`
- `Use X when Y.`
- `Ask before X.`
- `Keep X in Y.`
- `Do not X.`

Avoid:

- `We added...`
- `This was changed to...`
- `Previously...`
- `Going forward...`
- `It is important to note...`
- `Best practice is...`
- long explanations that prove why the rule exists
- language you do not want the agent to mirror back to users

## Rule Quality Check

A good rule is:

- necessary
- specific
- durable
- actionable
- owned by one file
- easy to verify or observe

Remove or rewrite a rule when it is:

- repeated elsewhere
- temporary
- motivational
- written as history
- obvious from nearby files
- only relevant to one past task

## Review Checklist

Before finishing an instruction change:

- No duplicated canonical rule remains.
- No change commentary remains inside the instruction.
- No stale or temporary context remains.
- No private user context is introduced.
- No procedure is placed in identity, memory, dossier, or decision files.
- The narrowest relevant file owns the rule.
- The edited file remains readable.
- `pnpm check` passes, or any blocker is reported.
