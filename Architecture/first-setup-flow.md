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
    Codex->>Git: Run Scripts/install_git_hooks.py --workspace .
  else Git init fails
    Codex->>AgentFiles: Record Git blocker in Agent-State.md and Inbox.md
  end

  alt Secret scanner hook succeeds
    Codex->>AgentFiles: Mark hook configured
  else Hook install fails
    Codex->>AgentFiles: Record hook blocker and keep workspace usable
  end

  Codex->>Workspace: Read installed AGENTS.md and Agent-Instructions/
  Codex->>AgentFiles: Load Business-Setup skill
  Codex->>User: Ask small onboarding question group
  User->>Codex: Provide business context and privacy boundaries
  Codex->>AgentFiles: Update User-Dossier, Business-Dossier, Current-Focus, Active-Threads, Workspace-Map, Memory, Decisions, Agent-State

  Codex->>AgentFiles: Load Workspace-Heartbeat skill
  Codex->>User: Explain heartbeat frequency, safe writes, reporting, and how to turn it off
  Codex->>Heartbeat: Create hourly workspace heartbeat
  alt Heartbeat created
    Codex->>AgentFiles: Mark heartbeat configured
  else Heartbeat not available
    Codex->>AgentFiles: Record heartbeat blocker in Agent-State.md and Inbox.md
  end

  Codex->>User: Explain what is private, what is safe to commit, and the next useful step
```
