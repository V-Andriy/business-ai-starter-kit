# Update And Migration Flow

This diagram shows the safe update path from the ignored public source cache
into a private user workspace. Update review is inspect-first and approval-first
for anything user-owned, hybrid, sensitive, or behavior-changing.

```mermaid
flowchart TD
  Trigger{"Update trigger"} --> Manual["User asks: Update my Business AI Starter Kit"]
  Trigger --> Scheduled["Optional scheduled update review"]
  Manual --> Skill["Run Update-Review skill"]
  Scheduled --> Skill

  Skill --> Refresh["Refresh .business-ai-kit/source/"]
  Refresh --> CacheState{"Source cache state"}
  CacheState -- "Missing" --> Clone["Clone public kit into source/"]
  CacheState -- "Healthy" --> Pull["git pull --ff-only"]
  CacheState -- "Broken, dirty, conflicted" --> Backup["Move source/ to timestamped .business-ai-kit/backups/"]
  Backup --> FreshClone["Clone fresh public kit into source/"]
  CacheState -- "Network or Git failure" --> Recover["Try simple recovery, then record blocker if unresolved"]

  Clone --> ReadSource["Read VERSION, CHANGELOG, INDEX, README, ARCHITECTURE, Seed, Skills, Scripts, Templates"]
  Pull --> ReadSource
  FreshClone --> ReadSource
  Recover --> Usable["Leave workspace usable and log failure"]

  ReadSource --> Compare["Compare source changes against installed workspace"]
  Compare --> Useful{"Useful for this workspace?"}
  Useful -- "No" --> NoChange["Log no useful update"]
  Useful -- "Yes" --> Ownership["Classify ownership and risk"]

  Ownership --> ChangeType{"Change type"}
  ChangeType -- "Kit-owned and low risk" --> ExplainSafe["Explain briefly"]
  ChangeType -- "Hybrid" --> Proposal["Create plain-language proposal or proposed merge"]
  ChangeType -- "User-owned" --> Preserve["Do not overwrite; explain why"]
  ChangeType -- "Sensitive control file" --> Impact["Explain impact first"]
  ChangeType -- "Secret behavior, privacy, publishing, external account" --> Safety["Route through Safety Gates"]

  ExplainSafe --> ApplySafe["Apply safe kit-owned update"]
  Proposal --> Approval{"User approves?"}
  Impact --> Approval
  Safety --> Approval
  Approval -- "Yes" --> ApplyApproved["Apply approved change only"]
  Approval -- "No" --> LeaveCurrent["Leave current workspace unchanged"]
  Preserve --> LeaveCurrent

  ApplySafe --> ScanNeed{"Commit or external handoff involved?"}
  ApplyApproved --> ScanNeed
  ScanNeed -- "Yes" --> SecretScan["Run secret scanner"]
  ScanNeed -- "No" --> LogReview["Log review in Automation-Log.md"]
  SecretScan --> ScanResult{"Scanner passed?"}
  ScanResult -- "Yes" --> LocalCommit["Commit workspace file changes locally with plain-language message when appropriate"]
  ScanResult -- "No" --> Cleanup["Replace values with placeholders or ask for cleanup approval"]
  Cleanup --> LogReview
  LocalCommit --> LogReview
  LeaveCurrent --> LogReview
  NoChange --> LogReview
  Usable --> LogReview
```
