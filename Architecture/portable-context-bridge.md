# Portable Context Bridge

This flow shows the optional, one-way bridge from a private workspace into other local AI projects. The global consumer receives a reviewed snapshot, never live workspace access.

```mermaid
flowchart LR
  subgraph Source["Private source workspace"]
    Dossiers["Dossiers, memory, private notes, projects"]
    Portable["Portable-Context.md only"]
    Manager["Portable context manager"]
    Preview["Exact preview and secret scan"]
  end

  subgraph Store["Private user-level bridge store"]
    Registry["Workspace aliases, hashes, and per-target grants"]
    Snapshot["Read-only snapshot copies"]
  end

  subgraph Harnesses["Explicit-invocation consumer skills"]
    Codex["Codex user skill"]
    Claude["Claude Code personal skill"]
    Cowork["Cowork manual ZIP upload"]
    Custom["Approved compatible target"]
  end

  subgraph Target["Another project"]
    Request["User explicitly asks for workspace context"]
    Lead["Lead loads one alias"]
    Workers["Workers receive minimum relevant excerpts"]
    Output["Target-project result"]
  end

  Dossiers -. "curation proposal only" .-> Portable
  Portable --> Manager --> Preview --> Approval{"User approves exact content and targets?"}
  Approval -- "No" --> Stop["No external write"]
  Approval -- "Yes" --> Registry
  Approval -- "Yes" --> Snapshot
  Registry --> Codex
  Registry --> Claude
  Registry --> Cowork
  Registry --> Custom
  Snapshot --> Codex
  Snapshot --> Claude
  Snapshot --> Cowork
  Snapshot --> Custom

  Request --> Lead
  Codex --> Lead
  Claude --> Lead
  Cowork --> Lead
  Custom --> Lead
  Lead --> Workers --> Output

  Dossiers -. "never exported" .-> Blocked["No live workspace path"]
  Lead -. "no write-back" .-> Blocked
  Disable["Disable or uninstall"] --> Registry
  Disable --> Snapshot
```

## Invariants

- Only `Portable-Context.md` is eligible for export.
- Preview, secret scan, and approval happen before every install or refresh.
- Installed skills are physical, self-contained copies with no source-workspace path.
- The consumer is explicit-invocation, integrity-checks snapshots, and cannot write back.
- Active-project instructions remain authoritative.
- Multiple source workspaces use unique aliases; the lead does not guess among them.
- Disable and uninstall stop future reads but cannot erase existing conversation history or separately uploaded copies.
- Local storage is not local inference: explicit invocation allows the active AI service to process the approved snapshot under its provider data controls.
