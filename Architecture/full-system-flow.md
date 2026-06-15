# Full System Flow

This is the MVP lifecycle source-of-truth diagram. It ties together install,
workspace ownership, first-run setup, normal work, heartbeat, updates, secrets,
templates, and safety boundaries.

The diagram should match the installed `Seed/` behavior, repository docs, and
MVP boundaries.

```mermaid
flowchart TD
  PR["Public Business AI Starter Kit repo"] --> InstallDoc["Install.md handoff"]
  PR --> Seed["Seed/ workspace starter"]
  PR --> SourceDocs["README, INDEX, CHANGELOG, VERSION"]
  PR --> FutureTemplates["Templates/ future library"]

  User["User opens Codex"] --> InstallDoc
  InstallDoc --> TargetCheck{"Target folder empty or clearly safe?"}
  TargetCheck -- "No" --> AskLocation["Ask where to create private workspace"]
  TargetCheck -- "Yes" --> ConfirmPath["Confirm install path"]
  AskLocation --> ConfirmPath

  ConfirmPath --> PrivateWorkspace["Private local workspace"]
  PrivateWorkspace --> Cache["Clone public repo into ignored .business-ai-kit/source/"]
  Cache --> CopySeed["Copy Seed/ files into workspace root"]
  Seed --> CopySeed
  CopySeed --> LocalGit["Initialize local Git on main"]
  LocalGit --> Hook["Install pre-commit secret scanner"]
  Hook --> ReadInstalled["Read installed AGENTS.md and Agent-Instructions/"]
  ReadInstalled --> LiveHandoff["Start live onboarding handoff"]
  LiveHandoff --> ToolLearner["Optional AI-Tool-Learner orientation"]
  ToolLearner --> Calibrate["Introduce agent and ask communication preference"]
  Calibrate --> GatherSources["Gather user and business sources"]
  GatherSources --> DossierPreview["Inspect sources and show dossier preview"]
  DossierPreview --> ConfirmContext["User confirms, corrects, or removes sensitive details"]
  ConfirmContext --> WorkspaceState["Fill soul, dossiers, memory, active threads, focus, map, decisions, agent state"]
  WorkspaceState --> HeartbeatSetup["Create daily checkpoint Workspace Heartbeat automations"]
  HeartbeatSetup --> BackupOffer["Offer optional private GitHub backup"]
  BackupOffer --> Ready["Workspace ready for real business work"]

  Ready --> Startup["Every meaningful session reads focus, active threads, map, inbox, agent state, and relevant skill"]
  Startup --> Request{"Request type"}

  Request -- "New project, workflow, app, report, document" --> ProjectPlanning["Use Project-Planning skill"]
  ProjectPlanning --> ProjectFolder["Create or reuse plain-language root project folder"]
  ProjectFolder --> ProjectState["Maintain project brief, context, working files, final outputs, decisions, next actions"]
  ProjectState --> UpdateGlobalState["Update Workspace-Map, Current-Focus, and Active-Threads"]

  Request -- "Secret, API key, credential, private config" --> SecretsSkill["Use Secrets-Vault skill"]
  SecretsSkill --> SecretStorage{"Storage path"}
  SecretStorage -- "MVP default" --> LocalEnv["Raw values in ignored .env"]
  SecretStorage -- "Production or team use" --> ManagedVault["Recommend managed vault such as Doppler"]
  LocalEnv --> SecretMetadata["Only names, purpose, provider, and placeholders in Secrets-Vault.md"]
  ManagedVault --> SecretMetadata
  SecretMetadata --> SecretScan["Run secret scan before commit, push, deploy, publishing, or support handoff"]

  Request -- "Update kit" --> UpdateReview["Use Update-Review skill"]
  UpdateReview --> RefreshCache["Refresh .business-ai-kit/source/"]
  RefreshCache --> ReviewSource["Read source changelog, index, version, Seed, skills, scripts, docs"]
  ReviewSource --> Classify["Classify changes as kit-owned, user-owned, or hybrid"]
  Classify --> UpdateApproval{"Approval needed?"}
  UpdateApproval -- "No, low-risk kit-owned" --> ApplyUpdate["Apply safe update and explain"]
  UpdateApproval -- "Yes" --> ProposeUpdate["Explain useful update in plain language and ask"]
  ProposeUpdate --> UserApprovesUpdate{"User approves update?"}
  UserApprovesUpdate -- "Yes" --> ApplyUpdate
  UserApprovesUpdate -- "No" --> SkipUpdate["Leave current workspace unchanged"]
  ApplyUpdate --> LogUpdate["Log in Automation-Log.md and commit workspace file changes locally when appropriate"]
  SkipUpdate --> LogUpdate

  Request -- "Use or install template" --> TemplateFlow["Inspect Templates/ or source guidance"]
  TemplateFlow --> TemplateDecision{"MVP dependency?"}
  TemplateDecision -- "No current dependency" --> UseAsReference["Use source as reference only"]
  TemplateDecision -- "Future approved use" --> CreateOutput["Create only useful workspace/project output"]
  UseAsReference --> UpdateGlobalState
  CreateOutput --> UpdateGlobalState

  Request -- "Private GitHub backup" --> GithubBackup["Use GitHub-Backup skill"]
  GithubBackup --> PrivateRepo["Create private repo after auth and secret scan"]
  PrivateRepo --> UpdateGlobalState

  HeartbeatSetup --> Checkpoint["Daily Checkpoint Workspace Heartbeat"]
  Checkpoint --> ReadState["Read AGENTS.md and Agent-Instructions/"]
  ReadState --> GitCheck["Check Git status and recent evidence"]
  GitCheck --> ProcessInbox["Process Inbox.md"]
  ProcessInbox --> AutoSafe{"Low-risk maintenance?"}
  AutoSafe -- "Yes" --> Maintain["Update state, outbox, memory, map, active threads, signals, and small skill improvements"]
  AutoSafe -- "No" --> RecordNeed["Record decision, blocker, or risk in Inbox.md or Signals/"]
  Maintain --> HeartbeatLog["Log run in Automation-Log.md and improvements in Improvement-Log.md"]
  RecordNeed --> HeartbeatLog

  Request -- "Publish, deploy, paid service, delete, external account, public share" --> SafetyGate["Safety Gates"]
  SafetyGate --> Approval["Explain consequence and require user approval"]
  Approval --> UpdateGlobalState
```
