# Installed Workspace Model

Files are available for continuity, not a requirement to read or update all of them at startup.

```mermaid
flowchart TD
  Root["Private workspace"] --> Rules["AGENTS.md canonical; CLAUDE.md import"]
  Root --> Context["Agent-Instructions read on demand"]
  Root --> Scripts["Local scanner, links, update, activity hint"]
  Root --> Cache["Ignored .business-ai-kit/source"]
  Root --> Env["Ignored .env; metadata only in Markdown"]
  Context --> Skills["Relevant business or maintenance skill"]
  Context --> Memory["Dossiers, memory, decisions as needed"]
  Context --> Handoff["Inbox and ongoing-work pointers"]
  Root --> Ongoing["Ongoing project only"]
  Ongoing --> Brief["Project Brief.md"]
  Ongoing --> Output["Actual output"]
  Ongoing -. "Only when warranted" .-> Extra["Sources, trackers, project rules"]
```

See [workspace rules](../Seed/AGENTS.md) for canonical behavior and the
[architecture index](README.md) for related flows.
