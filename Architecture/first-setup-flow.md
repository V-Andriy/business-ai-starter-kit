# First Setup Flow

Install preserves existing files. Brief onboarding, confirmed context, and weekly maintenance setup are required; a useful draft can be delivered along the way.

```mermaid
sequenceDiagram
  participant User
  participant Agent
  participant Workspace
  User->>Agent: Request installation
  Agent->>Workspace: Inspect target folder
  alt Non-empty or unclear folder
    Agent->>User: Ask for safe location or explicit overwrite approval
  end
  Agent->>Workspace: Copy Seed including hidden files
  Agent->>Workspace: Verify local tools, Git, scanner, skills links, ignored cache
  Agent->>User: Report actual results or concrete blockers
  Agent->>User: Deliver requested draft or ask what would help today
  rect rgb(245, 245, 245)
    Agent->>User: Collect missing business context and confirm short profile
    Agent->>Workspace: Save only confirmed useful context
  end
  Agent->>User: Confirm weekly timing, timezone, scope, and host consent
  Agent->>Workspace: Verify weekly schedule or record blocker and manual fallback
  opt User requests an optional capability
    Agent->>User: Confirm scope and consequences
    Agent->>Workspace: Configure approved hook or backup
  end
```

See [workspace rules](../Seed/AGENTS.md) for canonical behavior and the
[architecture index](README.md) for related flows.
