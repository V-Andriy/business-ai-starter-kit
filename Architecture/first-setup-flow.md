# First Setup Flow

This sequence shows the exact MVP installation and onboarding path. The
workspace is independent from the public repo; `.business-ai-kit/source/` is a
disposable ignored clone used for updates and source reference.

```mermaid
sequenceDiagram
  participant User
  participant Codex
  participant PublicRepo as Public kit repo
  participant Workspace as Private workspace
  participant Git as Local Git
  participant AgentFiles as Agent-Instructions
  participant Heartbeat as Codex heartbeat automation

  User->>Codex: Paste Install.md handoff
  Codex->>Workspace: Inspect current folder and path
  alt Folder is empty or clearly safe
    Codex->>User: Confirm install path in plain language
  else Folder is not empty or unclear
    Codex->>User: Ask where to create the private workspace
    User->>Codex: Provide or approve workspace path
  end

  Codex->>Workspace: Create workspace root if needed
  Codex->>User: Give short plain-language progress updates during setup
  Codex->>Workspace: Verify Node.js, npm, and pnpm; install or record blocker if missing
  Codex->>Workspace: Create .business-ai-kit/
  Codex->>PublicRepo: Clone public repo into .business-ai-kit/source/
  alt Source clone succeeds
    Codex->>Workspace: Copy .business-ai-kit/source/Seed/ into workspace root
  else Source clone fails
    Codex->>Workspace: Record source-cache blocker if workspace files are available
    Codex->>User: Explain setup can continue only if Seed/ is locally available
  end

  Codex->>Git: Initialize local repo on main
  alt Git init succeeds
    Codex->>Git: Run pnpm hooks:install
  else Git init fails
    Codex->>AgentFiles: Record Git blocker in Agent-State.md and Inbox.md
  end

  alt Secret scanner hook succeeds
    Codex->>AgentFiles: Mark hook configured
  else Hook install fails
    Codex->>AgentFiles: Record hook blocker and keep workspace usable
  end

  Codex->>Workspace: Read installed AGENTS.md and Agent-Instructions/
  Codex->>AgentFiles: Read Setup-Plan.md, Inbox.md, and Active-Threads.md
  Codex->>User: Start live onboarding handoff, not just "install complete"
  Codex->>AgentFiles: Load Codex-Learner skill for optional first-time Codex orientation
  Codex->>User: Explain chat, project folder, voice recording, Plan mode, review, permissions, and docs-backed tips when relevant
  Codex->>User: Introduce personal AI agent, default Bob name, useful capabilities, and naming question
  User->>Codex: Choose agent name or keep Bob
  Codex->>User: Ask communication preference
  User->>Codex: Describe preferred communication style
  Codex->>User: Invite reference sources
  User->>Codex: Provide links, files, screenshots, voice recording, or business context
  Codex->>Codex: Inspect sources before asking follow-up questions
  Codex->>User: Show dossier preview with facts, assumptions, gaps, opportunities, and recommended first project
  User->>Codex: Confirm, correct, set public-output boundaries, or add context
  Codex->>AgentFiles: Update Soul, User-Dossier, Business-Dossier, Current-Focus, Active-Threads, Workspace-Map, Memory, Decisions, Agent-State

  Codex->>AgentFiles: Load Workspace-Heartbeat skill
  Codex->>User: Explain daily checkpoint heartbeat, safe writes, reporting, and how to turn it off
  Codex->>Heartbeat: Create workspace heartbeat automations from Workspace-Heartbeat skill
  alt Heartbeat created
    Codex->>AgentFiles: Mark heartbeat configured
  else Heartbeat not available
    Codex->>AgentFiles: Record heartbeat blocker in Agent-State.md and Inbox.md
  end

  Codex->>User: Ask whether to set up private GitHub backup
  alt User wants backup
    Codex->>AgentFiles: Load GitHub-Backup skill
    Codex->>User: Guide GitHub account or OAuth login if needed
    Codex->>Git: Create private repository and push after secret scan
  else User skips backup
    Codex->>AgentFiles: Record backup declined for now
  end

  Codex->>AgentFiles: Move handled setup items from Inbox.md to Outbox.md
  Codex->>AgentFiles: Delete Setup-Plan.md after setup is complete
  Codex->>User: Explain what is private, what was captured, and the next useful step
```
