# Weekly Maintenance

Setup includes one small weekly check with confirmed local scope, timing, timezone, and host consent. If scheduling is unavailable, record a blocker and manual weekly fallback.

```mermaid
flowchart TD
  Request["Weekly check or requested manual review"] --> Scope["Read scope and relevant status"]
  Scope --> Hint["Optional workspace activity hint"]
  Hint --> Check["Inspect smallest needed evidence; honor explicit requests and deadlines"]
  Check --> Changed{"Meaningful change?"}
  Changed -- "No" --> Stop["No write, commit, or scheduled notification"]
  Changed -- "Yes" --> Allowed{"Within approved scope?"}
  Allowed -- "No" --> Handoff["New actionable inbox handoff"]
  Allowed -- "Yes" --> Edit["Update owning file only"]
  Edit --> Verify["Verify and save coherent local changes; hook scans staged snapshot"]
  Verify --> Log["One compact meaningful-change log"]
```

See [workspace rules](../Seed/AGENTS.md) for canonical behavior and the
[architecture index](README.md) for related flows.
