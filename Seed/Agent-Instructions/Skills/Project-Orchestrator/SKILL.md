---
name: project-orchestrator
description: Use for large, multi-step, long-running, or context-heavy work that may benefit from decomposition, subagents, agent teams, background sessions, workflows, or independent verification.
---

# Project Orchestrator

Use this skill to turn one large request into a controlled set of workstreams.

The lead agent owns the objective, routing, safety, integration, and final answer. Workers own bounded tasks. More agents are useful only when the work divides cleanly.

## Start With The Outcome

Before delegating, write down:

- objective
- success criteria
- constraints and approval boundaries
- evidence or validation required
- workstreams and their dependencies
- final integration owner

Keep project state in the project folder. Keep workspace-wide state in `Current-Focus.md`, `Active-Threads.md`, and `Workspace-Map.md`.

## Choose The Smallest Useful Shape

1. **One agent** - use for short, sequential, tightly coupled, or same-file work.
2. **Focused subagents** - use for independent research, exploration, review, testing, or isolated implementation. Each worker returns a result to the lead.
3. **Background sessions** - use when several independent tasks should continue while the user or lead works elsewhere.
4. **Agent team** - use only when workers must challenge, message, or coordinate with each other. Teams add cost and coordination overhead.
5. **Scripted or dynamic workflow** - use for repeatable audits, large mechanical migrations, or many similar tasks with a stable input/output contract.
6. **Batch with worktrees** - use when many agents need isolated Git and filesystem state. Keep file ownership non-overlapping even across worktrees.

Do not use parallel agents when the next step depends on the previous result, the work shares one fragile context, or multiple workers would edit the same files without isolation.

## Detect Capabilities

Use the orchestration primitives available in the running harness. Do not assume a feature, model, plan, or beta flag is available.

- Codex product surfaces may provide subagents, Ultra execution, background or cloud tasks, and worktrees depending on the surface and plan.
- The OpenAI Responses API separately provides Multi-agent as a GPT-5.6 beta. The workspace does not depend on this API feature.
- Claude Code may provide subagents, agent view (Research Preview), agent teams (experimental and disabled by default), worktrees, dynamic workflows, and goal checks depending on version, plan, and settings.
- Agent teams and other experimental features must not be required for the workspace to function.

If native orchestration is unavailable, run the same plan sequentially in the main agent and keep the same evidence and integration gates.

Check current official documentation before giving version-specific setup instructions or enabling an experimental feature.

## Route Models By Role

Prefer capability roles over permanent model names:

- **Lead:** strongest practical reasoning model for decomposition, ambiguity, architecture, synthesis, and high-impact decisions.
- **Worker:** balanced model for implementation, research, analysis, and tool use.
- **Fast worker:** efficient model for search, classification, extraction, formatting, and no-op gates.
- **Reviewer:** strong model with fresh context for independent verification of important work.

Examples as of July 2026:

- OpenAI: GPT-5.6 Sol for frontier work, Terra for balanced work, and Luna for efficient high-volume work.
- Anthropic: Claude Fable 5 for the most ambitious long-running work, Opus 4.8 for complex agentic coding or review, Sonnet 5 for balanced execution, and Haiku 4.5 for fast economical tasks.

Use these examples only when the models are actually available. Costs, names, defaults, and access change. If the harness cannot choose a different model per worker, use the current model and preserve the role boundaries in the task instructions.

Reserve expensive or high-effort modes for work where the quality gain matters. Do not spend frontier-model time on deterministic cleanup that a fast worker or local script can do safely.

## Build The Work Plan

Create bounded tracks with explicit ownership:

```text
Track:
Outcome:
Inputs:
Owned files or systems:
Do not touch:
Evidence required:
Return format:
Stop condition:
```

Good worker tracks include:

- research one source or question
- inspect one subsystem
- test one hypothesis
- implement one non-overlapping component
- review a completed change from fresh context
- validate a specific user-visible flow

Give workers only the context they need. Do not pass unrelated private notes, secrets, or the full conversation by default.

## Protect Parallel Writes

Assume workers share the same repository unless the harness explicitly isolates them.

- Give each worker exclusive ownership of files or folders.
- Use isolated worktrees, each on its own branch, when workers need separate Git or filesystem state.
- If file ownership overlaps, sequence those edits instead of relying on branches or worktrees to prevent integration conflicts.
- Keep one integration owner.
- Never ask two workers to edit the same file concurrently.
- Ask research and review workers not to edit.
- Check Git status before delegation and before integration.
- Preserve user changes and unrelated untracked files.

If isolation is unavailable, parallelize read-only work and keep writes with the lead.

## Coordinate Without Noise

The lead should:

- start independent tracks together when useful
- keep dependent tracks blocked until their inputs exist
- send corrections to the existing worker instead of spawning replacements
- stop workers whose task is obsolete
- surface important progress without narrating every tool call
- record a decision or blocker when the plan changes materially

Workers may propose scope changes, but only the lead can integrate them into the project plan.

## Integrate And Verify

Do not treat worker completion as project completion.

The lead must:

1. Review every result and inspect relevant diffs.
2. Resolve contradictions and missing evidence.
3. Integrate changes in dependency order.
4. Run the smallest relevant checks, then the full project check when risk justifies it.
5. Use a fresh reviewer for important, security-sensitive, public, or broad changes.
6. Confirm the final user-visible outcome against the original success criteria.

Verification should be independent when practical. A worker should not be the only judge of its own result.

## Cost And Stopping Rules

- Start with the fewest workers that can create real parallelism.
- Prefer two or three clear tracks over many tiny tasks.
- Do not duplicate research unless independent comparison is the point.
- Stop when success criteria are met, a real user decision is required, or the remaining gain does not justify the cost.
- Report when a premium model, paid workflow, or high-concurrency mode could materially increase usage before enabling it.

## Long-Running Work

Continue autonomously only when the user has authorized the project and the next step is local, reversible, and inside the accepted scope.

Before pausing or handing off:

- update the project brief or next actions
- record completed tracks and evidence
- record blockers and decisions needed
- update `Active-Threads.md`
- leave a clean Git state or explain why work remains uncommitted

Publishing, deployment, spending, account connections, secret changes, and material scope expansion still require the approvals defined in `AGENTS.md`.

## Done Criteria

- The requested outcome exists.
- Evidence and checks support it.
- Worker results were reviewed and integrated.
- No parallel write conflict or unrelated user change was hidden.
- Decisions, blockers, and next actions are current.
- The user receives one coherent result from the lead.

## Current Documentation

- Codex subagents: `https://learn.chatgpt.com/docs/agent-configuration/subagents`
- OpenAI Responses API Multi-agent (beta): `https://developers.openai.com/api/docs/guides/tools-multi-agent`
- Codex model guidance: `https://developers.openai.com/api/docs/guides/latest-model`
- Claude parallel agents: `https://code.claude.com/docs/en/agents`
- Claude subagents: `https://code.claude.com/docs/en/sub-agents`
- Claude agent teams: `https://code.claude.com/docs/en/agent-teams`
- Claude workflows: `https://code.claude.com/docs/en/workflows`
