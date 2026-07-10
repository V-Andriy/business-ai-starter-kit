# First Setup Flow

This sequence shows the MVP installation and onboarding path for either
supported harness. The private workspace is independent from the public repo;
`.business-ai-kit/source/` is an ignored disposable source cache.

```mermaid
sequenceDiagram
  participant User
  participant Lead as Codex or Claude Code
  participant PublicRepo as Public kit repo
  participant Workspace as Private workspace
  participant Git as Local Git
  participant AgentFiles as Agent-Instructions
  participant Checkpoint as Optional workspace checkpoint

  User->>Lead: Paste Install.md handoff
  Lead->>Workspace: Inspect current folder and path
  alt Folder is empty or clearly safe
    Lead->>User: Confirm install path
  else Folder is not empty or unclear
    Lead->>User: Ask where to create the private workspace
    User->>Lead: Provide or approve workspace path
  end

  Lead->>Workspace: Check source cache and Seed availability
  break Seed is unavailable
    Lead->>User: Explain the blocker and stop before installed-file onboarding
  end

  Lead->>PublicRepo: Create or refresh ignored source cache
  PublicRepo->>Workspace: Copy Seed into workspace root
  Lead->>Workspace: Check tools, Git, scanner, and skill links
  alt Remaining technical setup succeeds
    Lead->>Git: Initialize local repo on main and install scanner hook
    Lead->>Workspace: Link canonical skills for installed harnesses
    Lead->>AgentFiles: Record verified harness and orchestration capabilities
  else A recoverable setup step fails
    Lead->>AgentFiles: Record the specific blocker and safe completed state
    Lead->>User: Explain the consequence and continue safe partial setup
  end

  Lead->>AgentFiles: Read AGENTS.md, Setup-Plan.md, Inbox.md, and Active-Threads.md
  Lead->>User: Start live onboarding conversation
  opt User needs tool orientation
    Lead->>AgentFiles: Load AI-Tool-Learner skill
    Lead->>User: Explain only the next useful feature
  end

  Lead->>User: Ask assistant name and communication preference
  User->>Lead: Choose name and working style
  Lead->>User: Invite useful reference sources
  User->>Lead: Provide links, files, screenshots, notes, or voice context
  Lead->>Workspace: Inspect sources before follow-up questions
  Lead->>User: Show compact dossier preview and privacy assumptions
  User->>Lead: Confirm, correct, or remove context
  Lead->>AgentFiles: Update only relevant durable workspace state

  Lead->>User: Offer one low-noise scheduled checkpoint
  alt User approves checkpoint
    Lead->>AgentFiles: Load Workspace-Heartbeat skill
    Lead->>Checkpoint: Check scheduling surface
    alt Scheduling is available and creation succeeds
      Lead->>Checkpoint: Create one checkpoint with activity gate
      Lead->>AgentFiles: Record schedule and model role
    else Scheduling is unavailable or creation fails
      Lead->>AgentFiles: Record a specific checkpoint blocker
    end
  else User declines
    Lead->>AgentFiles: Record checkpoint declined
  end

  Lead->>User: Offer optional private GitHub backup
  alt User wants backup
    Lead->>AgentFiles: Load GitHub-Backup skill
    Lead->>Git: Prepare authentication and private remote
    Lead->>AgentFiles: Record backup approval
  else User skips backup
    Lead->>AgentFiles: Record backup declined
  end

  Lead->>AgentFiles: Run final setup audit
  alt Final audit passes and Git plus scanner are ready
    Lead->>AgentFiles: Move handled items to Outbox and delete Setup-Plan
    Lead->>Git: Run final scan and save a clean local commit
    opt Private backup is approved and ready
      Lead->>Git: Push the final setup commit
    end
    Lead->>User: Explain privacy, captured context, and next useful step
  else A required blocker remains
    Lead->>AgentFiles: Keep Setup-Plan and mark setup waiting on the blocker
    Lead->>User: Explain the blocker and exact next action
  end
```
