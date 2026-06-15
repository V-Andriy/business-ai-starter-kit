# Install Business AI Starter Kit

Paste this whole block into Codex or Claude Code (Cowork) from the folder where you want your private AI workspace.

```text
Set up my Business AI Starter Kit workspace from this repository.

Source repository: https://github.com/V-Andriy/business-ai-starter-kit

This kit supports Codex and Claude Code (Cowork) directly, and the same workspace can run in both at once. The instruction files are paired: `AGENTS.md` is canonical and Codex reads it; `CLAUDE.md` imports `AGENTS.md` so Claude Code reads the same rules. Skills are shared from `Agent-Instructions/Skills/` through `.agents/skills` (Codex) and `.claude/skills` (Claude Code). Run `pnpm skills:link` to create both symlinks.

If you are running in a different AI coding harness, adapt the workspace to that harness. Identify the harness, read its relevant local or official documentation, map the starter-kit rules to its instruction, skill, automation, memory, and permission model, and solve compatibility issues yourself. Keep the user-facing behavior the same, but do not blindly apply Codex-specific setup when the harness needs a different mechanism.

Use the source repository's `Seed/` folder as the workspace starter. If the source repository is not already available locally, clone it first into a temporary location or into `.business-ai-kit/source/` after confirming the target workspace folder is safe.

First inspect the current folder. If it is not empty or not clearly safe, ask me where to create the workspace before copying anything. Do not overwrite existing files unless I explicitly approve it.

If the target folder is inside iCloud Drive, Desktop, Documents, or another cloud-synced folder, warn me first. Cloud storage may remove local copies from this computer and make the AI tool unable to access workspace files.

Keep setup plain and practical. Give short progress updates:

- checking the folder
- copying the starter workspace
- checking local tools
- installing local safety checks
- preparing the source cache for future updates
- starting the first onboarding conversation

Copy the contents of `Seed/` into the workspace, including hidden files such as `.gitignore` and `.env.example`. Do not copy repository maintenance files unless they are inside `Seed/`.

After copying, read these installed workspace files and treat them as the source of truth:

- `AGENTS.md` (canonical rules; `CLAUDE.md` imports this file for Claude Code)
- `Agent-Instructions/Setup-Plan.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Skills/`

Run `Agent-Instructions/Setup-Plan.md` exactly as the setup checklist. When the setup plan points to a skill, follow that skill as the source of truth.

Do not duplicate or improvise setup rules from memory. Follow the installed files.

Complete `Setup-Plan.md` end to end. Do not restate skill rules inside the install flow.

Do not start project work, suggest first projects, build tools, or reorganize my material until `Setup-Plan.md` is complete or blocked on a specific decision. If I ask for other work during setup, acknowledge it, save it if useful, and return to the next setup step.

Do not stop at "installation complete." Start the live onboarding conversation from `Setup-Plan.md`, ask one useful question at a time, briefly explain why each question matters, and adapt to my language.

Keep `.business-ai-kit/source/` ignored by Git. Do not add analytics, telemetry, tracking, or background reporting.
```

After installation, ongoing workspace behavior, update, safety, heartbeat, support, and project instructions live inside the copied workspace.
