# Full System Flow

The public source and private workspace remain separate. Each task loads only the context it needs.

```mermaid
flowchart TD
  Public["Public source repo"] --> Install["Install.md folder checks"]
  Install --> Seed["Copy Seed to private workspace"]
  Seed --> Safety["Local tools, Git, scanner, skills links"]
  Safety --> Onboard["Brief required onboarding and confirmed profile"]
  Onboard --> Weekly["One verified weekly schedule or documented manual fallback"]
  Weekly --> Work["Useful first output"]
  Work --> Request{"Current request"}
  Request -- "One-off" --> Draft["Answer or draft"]
  Request -- "Ongoing" --> Brief["Project brief and output"]
  Request -- "Credentials" --> Secrets["Secrets Vault skill"]
  Request -- "Update" --> Update["Review relevant source changes"]
  Request -- "Maintenance" --> Manual["Scoped manual check"]
  Weekly --> Manual
  Manual --> Stop["Finish scoped review; no-op means no writes"]
  Draft --> External{"External or destructive action?"}
  Brief --> External
  External -- "Yes" --> Approval["Require authorization"]
  External -- "No" --> Local["Validate and save coherent local work"]
```

See [workspace rules](../Seed/AGENTS.md) for canonical behavior and the
[architecture index](README.md) for related flows.
