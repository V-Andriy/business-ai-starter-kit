# Safety Gates

This diagram defines when the agent can proceed, when it must ask, and how
secrets are routed through the separate secret-handling model.

```mermaid
flowchart TD
  Action["Proposed agent action"] --> Risk{"Any safety trigger?"}
  Risk -- "No" --> SafeDefault["Proceed with sensible default"]
  SafeDefault --> LowRiskLog{"Meaningful workspace change?"}
  LowRiskLog -- "Yes" --> LogSafe["Update state files or log briefly"]
  LowRiskLog -- "No" --> Done["Done"]

  Risk -- "Yes" --> TriggerType{"Trigger type"}
  TriggerType -- "Secret or credential" --> SecretsSkill["Use Secrets-Vault skill"]
  TriggerType -- "Private or sensitive context leaving workspace" --> Explain["Explain practical consequence"]
  TriggerType -- "Publishing, deploy, email, post, share" --> Explain
  TriggerType -- "Paid service or signup" --> Explain
  TriggerType -- "Delete, overwrite, or destructive edit" --> Explain
  TriggerType -- "External account or broad permission" --> Explain
  TriggerType -- "Project-specific autonomous execution" --> Explain
  TriggerType -- "Change AGENTS, privacy, secret behavior, or communication preference" --> Explain

  SecretsSkill --> SecretStorage{"Where should raw value live?"}
  SecretStorage -- "Experiment or local fallback" --> Env["Ignored local .env"]
  SecretStorage -- "Real business, production, team, payments, customer data" --> Vault["Recommend managed vault such as Doppler"]
  Env --> Metadata["Write only metadata and placeholders to Secrets-Vault.md"]
  Vault --> Metadata
  Metadata --> Scanner["Run secret scanner before commit, push, deploy, publish, or support handoff"]
  Scanner --> Explain

  Explain --> Approval["Ask for explicit user approval"]
  Approval --> Approved{"Approved?"}
  Approved -- "Yes" --> Proceed["Proceed within approved scope"]
  Approved -- "No" --> Safer["Stop or propose safer alternative"]
  Proceed --> Audit["Record decision, update state, or log action"]
  Safer --> Audit
  LogSafe --> Done
  Audit --> Done
```

Must ask first:

- publishing, deploying, emailing, posting, sharing, or making work public
- spending money or signing up for paid services
- deleting or overwriting user work
- moving private notes into public or client-facing outputs
- changing `AGENTS.md`, privacy rules, secret behavior, or communication preferences
- connecting external accounts or granting broad permissions
- storing, exposing, rotating, or migrating raw credentials
- autonomous project-specific work beyond explicit authorization
