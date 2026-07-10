# Self-Improvement Loop

The self-improvement loop is an optional low-noise workspace checkpoint for
Codex or Claude Code. It starts after first setup when the user enables it, but it is not permission for autonomous project
execution. It maintains the workspace, processes the inbox, checks Git, improves
procedures, and records anything that needs user judgment.

```mermaid
flowchart TD
  Start["Scheduled Workspace Heartbeat"] --> ReadRules["Read AGENTS.md"]
  ReadRules --> ReadState["Read Current-Focus, Active-Threads, Workspace-Map, Inbox, Agent-State, Memory"]
  ReadState --> DetectChanges["Check project folders, Git status, recent workspace changes, and relevant session evidence"]
  DetectChanges --> ProcessInbox["Process Inbox.md"]

  ProcessInbox --> Item{"Actionable item exists?"}
  Item -- "No" --> Quiet["Write short low-noise Automation-Log entry"]
  Item -- "Yes" --> Classify["Classify item"]

  Classify --> ItemType{"Item type"}
  ItemType -- "Workspace state" --> StateUpdate["Update focus, active threads, map, outbox, or agent state"]
  ItemType -- "Durable context" --> MemoryUpdate["Update dossiers or compact Memory.md when useful"]
  ItemType -- "Repeated procedure" --> SkillReview["Review related Skill"]
  ItemType -- "Project note" --> ProjectNote["Update project Next Actions, Decisions, or context pointer"]
  ItemType -- "Needs judgment or approval" --> DecisionNote["Write clear blocker or decision request to Inbox.md"]
  ItemType -- "Agent handoff" --> Signal["Create or update Signals/ pointer"]
  ItemType -- "Kit update request" --> UpdateReview["Run Update-Review flow"]
  ItemType -- "Reusable kit feedback" --> KitFeedback["Draft user-approved feedback or small upstream proposal"]

  SkillReview --> SkillRisk{"Skill change risk"}
  SkillRisk -- "Small AI-owned wording or proven workflow" --> SkillApply["Apply skill update"]
  SkillRisk -- "Behavior-changing or broad" --> SkillPropose["Propose skill change for user review"]

  StateUpdate --> SafetyCheck{"Could this share externally, spend money, publish, delete, connect accounts, push to GitHub, or continue project work?"}
  MemoryUpdate --> SafetyCheck
  ProjectNote --> SafetyCheck
  Signal --> SafetyCheck
  UpdateReview --> SafetyCheck
  KitFeedback --> Approval{"User approved sharing?"}
  SkillApply --> ImprovementLog["Log skill or memory improvement in Improvement-Log.md"]
  SkillPropose --> DecisionNote
  Approval -- "No" --> DecisionNote
  Approval -- "Yes" --> SafetyCheck

  SafetyCheck -- "No" --> Outbox["Move handled inbox items to Outbox.md"]
  SafetyCheck -- "Yes" --> DecisionNote
  DecisionNote --> NeedsReview["Mark needs user review in Automation-Log.md"]
  Outbox --> RunLog["Log run in Automation-Log.md"]
  Quiet --> RunLog
  ImprovementLog --> RunLog
  NeedsReview --> RunLog
```

Rules:

- `Active-Threads.md` is the continuity source of truth.
- User and business context belongs in dossiers; compact repeated lessons belong in memory.
- Procedures belong in skills.
- Active project work belongs in project files and active threads.
- `Inbox.md` is the default place for user decisions and blockers.
- `Signals/` is a pointer channel for automations and future agents.
- Secrets never belong in markdown.
- Noisy heartbeat runs should log briefly and leave files alone.
- Git status should be checked on meaningful runs.
- Project-specific autonomous work needs explicit user authorization.
- Public kit feedback is opt-in only: draft a LinkedIn message or one focused PR after user approval.
