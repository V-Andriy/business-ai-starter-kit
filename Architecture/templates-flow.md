# Templates Flow

Templates are future-facing in MVP v1. The installed seed does not depend on
templates, and templates are not copied by default. The public repo can still
act as a reference library for future project, app, skill, or workflow starters.

```mermaid
flowchart TD
  PublicTemplates["Templates/ in public repo"] --> Placeholder["MVP placeholder only"]
  Placeholder --> NoDependency["Seed install does not depend on Templates/"]
  NoDependency --> Trigger{"Why inspect templates?"}

  Trigger -- "No relevant user work" --> Unused["Remain unused source reference"]
  Trigger -- "User starts project or workflow" --> Planning["Use Project-Planning skill"]
  Trigger -- "User asks for kit update or new starter" --> UpdateReview["Use Update-Review skill"]
  Trigger -- "Future approved template library exists" --> TemplateReview["Inspect selected template"]

  Planning --> SourceInspect["Read template or source guidance from .business-ai-kit/source/"]
  UpdateReview --> SourceInspect
  TemplateReview --> SourceInspect

  SourceInspect --> Mode{"Usage mode"}
  Mode -- "Use once" --> ReferenceOnly["Use as reference for current task only"]
  Mode -- "Copy for reuse or customization" --> Explain["Explain what files or behavior it will create or change"]

  ReferenceOnly --> Output["Create only the user-facing output or project files needed now"]
  Explain --> Impact{"User-owned, hybrid, sensitive, or behavior-changing impact?"}
  Impact -- "No" --> ApplyDefault["Apply safe default"]
  Impact -- "Yes" --> Approval["Ask user approval"]
  Approval -- "Approved" --> ApplyDefault
  Approval -- "Not approved" --> Stop["Do not install or copy template"]

  ApplyDefault --> Destination{"Destination"}
  Destination -- "New project" --> ProjectFiles["Create root project folder and project context"]
  Destination -- "Reusable workflow" --> SkillFiles["Create or update Agent-Instructions/Skills/ only when reuse is clear"]
  Destination -- "App or build starter" --> BuildArea["Create build area inside relevant project"]

  ProjectFiles --> State["Update Workspace-Map, Active-Threads, Current-Focus, and Decisions"]
  SkillFiles --> Improvement["Log skill change in Improvement-Log.md"]
  BuildArea --> State
  Output --> State
  Stop --> State
```
