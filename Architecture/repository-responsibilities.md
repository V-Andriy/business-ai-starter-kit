# Repository Responsibilities

This diagram defines public-source ownership versus private-workspace ownership.
The user workspace is not a fork of the public kit. The public repo is copied
and referenced through an ignored local source cache.

```mermaid
flowchart LR
  subgraph PublicRepo["Public Business AI Starter Kit repo"]
    PRInstall["Install.md handoff"]
    PRSeed["Seed/ real starter workspace files"]
    PRScripts["Seed/Scripts/ helper scripts"]
    PRSkills["Seed/Agent-Instructions/Skills/ generic skills"]
    PRTemplates["Templates/ future reusable library"]
    PRDocs["README, INDEX, CHANGELOG, VERSION"]
    PRArchitecture["ARCHITECTURE.md and Architecture/"]
    PRSecurity["LICENSE, NOTICE, SECURITY, CONTRIBUTING"]
  end

  subgraph PrivateWorkspace["Private user workspace"]
    PWRoot["Workspace root"]
    PWAgents["AGENTS.md workspace behavior"]
    PWContext["Agent-Instructions/ private context system"]
    PWSkills["Agent-Instructions/Skills/ canonical local skills"]
    PWScripts["Scripts/ copied helper scripts"]
    PWProjects["Plain-language project folders"]
    PWEnv[".env ignored raw secrets"]
    PWExample[".env.example safe placeholders"]
    PWCache[".business-ai-kit/source/ ignored public repo clone"]
    PWBackups[".business-ai-kit/backups/ disposable cache backups"]
  end

  PRInstall --> PWRoot
  PRSeed --> PWAgents
  PRSeed --> PWContext
  PRScripts --> PWScripts
  PRSkills --> PWSkills
  PRDocs --> PWCache
  PRArchitecture --> PWCache
  PRSecurity --> PWCache
  PRTemplates -. "future reference or approved install" .-> PWProjects

  PWRoot --> PWAgents
  PWRoot --> PWContext
  PWRoot --> PWScripts
  PWRoot --> PWProjects
  PWRoot --> PWExample
  PWContext --> PWSkills
  PWEnv -. "never committed or copied to public outputs" .-> PWContext
  PWCache -. "read-only source reference for updates/templates" .-> PWAgents
  PWBackups -. "created only when source cache recovery is needed" .-> PWCache
```
