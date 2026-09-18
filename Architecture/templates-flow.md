# Templates Flow

The optional startup hook is the current template. Project and app templates remain future-facing; normal seed installation does not depend on them.

```mermaid
flowchart TD
  Need["User task"] --> Fit{"Optional template helps?"}
  Fit -- "No" --> Work["Continue task directly"]
  Fit -- "Yes" --> Inspect["Inspect selected template and current host support"]
  Inspect --> Explain["Explain files and behavior it would add"]
  Explain --> Approval{"Required approval obtained?"}
  Approval -- "No" --> Stop["Leave workspace unchanged"]
  Approval -- "Yes" --> Apply["Merge only needed configuration; preserve existing files"]
  Apply --> Verify["Verify behavior and record meaningful result"]
```

See [workspace rules](../Seed/AGENTS.md) for canonical behavior and the
[architecture index](README.md) for related flows.
