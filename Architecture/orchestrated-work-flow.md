# Orchestrated Work Flow

This is the execution control plane for substantial work. It is shared across
Codex and Claude Code even when their native agent features differ.

```mermaid
flowchart TD
  Intent["User intent and authorization"] --> Lead["Lead agent owns outcome"]
  Lead --> Frame["Define success, constraints, evidence, and approvals"]
  Frame --> Shape{"Smallest useful execution shape"}

  Shape -- "Sequential or tightly coupled" --> Solo["Lead works directly"]
  Shape -- "Independent bounded tracks" --> NativeSubagents{"Native subagents available?"}
  Shape -- "Workers must coordinate" --> NativeTeam{"Agent team available and approved?"}
  Shape -- "Large repeated pattern" --> Workflow["Scripted workflow or batch"]

  NativeSubagents -- "Yes" --> Subagents["Focused subagents"]
  NativeSubagents -- "No" --> Sequential["Sequential role passes"]
  NativeTeam -- "Yes" --> Team["Coordinated agent team"]
  NativeTeam -- "No" --> Sequential

  Subagents --> Ownership["Assign outcome, inputs, exclusive scope, evidence, stop condition"]
  Team --> Ownership
  Workflow --> Ownership

  Ownership --> Exclusive{"Can assign non-overlapping file ownership?"}
  Exclusive -- "No" --> Sequential
  Exclusive -- "Yes" --> Isolation{"Workers need separate Git or filesystem state?"}
  Isolation -- "Yes" --> Worktrees["Isolated worktrees, one branch each"]
  Isolation -- "No" --> Workers["Run bounded workers"]
  Worktrees --> Workers

  Workers --> Evidence["Return result, evidence, checks, and touched files"]
  Solo --> Evidence
  Sequential --> Evidence
  Evidence --> Review{"Independent review needed?"}
  Review -- "Yes" --> Reviewer["Fresh reviewer checks risk and success criteria"]
  Review -- "No" --> Integrate["Lead integrates in dependency order"]
  Reviewer --> Integrate

  Integrate --> Validate["Run relevant tests, scan, and safety gates"]
  Validate --> Result{"Success criteria met?"}
  Result -- "No, local fix remains" --> Lead
  Result -- "No, decision or approval needed" --> Inbox["Record clear user decision in Inbox"]
  Result -- "Yes" --> Final["Lead returns one coherent result"]
```

## Role Policy

- Lead: strongest practical reasoning available for decomposition, ambiguity,
  integration, and final synthesis.
- Worker: balanced capability for implementation, research, and tool use.
- Fast worker: efficient capability for bounded search, classification, and
  deterministic processing.
- Reviewer: fresh strong context for independent verification when the risk
  justifies it.

Model names are examples, not architecture. The harness may select models by
role, inherit one model for every agent, or provide no native subagents. The
workflow falls back to sequential role passes without changing the safety or
evidence requirements.

## Boundaries

- Native agent state stays in the harness. Workspace files hold only durable
  business state, decisions, evidence, and cross-session handoffs.
- Workers do not inherit authority to publish, spend, connect accounts, expose
  secrets, or expand project scope.
- When portable context is used, the lead loads the selected snapshot and gives
  workers only the minimum relevant excerpt instead of distributing the full snapshot.
- Parallel writers need non-overlapping ownership or worktree isolation.
- Claude Code agent view is a Research Preview; agent teams are experimental
  and disabled by default. OpenAI Responses API Multi-agent is beta. The kit
  does not depend on these features.
- Persistent cross-harness agent networking remains outside the MVP.
