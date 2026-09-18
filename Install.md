# Install Business AI Starter Kit

Paste this whole block into Codex or Claude Code from the folder where you want your private AI workspace.

```text
Set up my Business AI Starter Kit workspace from this repository.

Source repository: https://github.com/V-Andriy/business-ai-starter-kit

This kit supports Codex and Claude Code directly, using shared local files. Avoid concurrent edits to the same files. The instruction files are paired: `AGENTS.md` is canonical and Codex reads it; `CLAUDE.md` imports `AGENTS.md` so Claude Code reads the same rules. Skills are shared from `Agent-Instructions/Skills/` through `.agents/skills` (Codex) and `.claude/skills` (Claude Code). Run `pnpm skills:link` to create both symlinks.

For Cowork or another AI harness, verify support before adapting the workspace. Identify the harness, read its relevant local or official documentation, map the starter-kit rules to its instruction, skill, automation, memory, and permission model, and solve compatibility issues yourself. Keep the user-facing behavior the same, but do not blindly apply Codex-specific setup when the harness needs a different mechanism.

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
- Relevant skills only when `Setup-Plan.md` or the current task calls for them

Run `Agent-Instructions/Setup-Plan.md` exactly as the setup checklist. When the setup plan points to a skill, follow that skill as the source of truth.

Do not duplicate or improvise setup rules from memory. Follow the installed files.

Complete the essential local checks and brief required user/business onboarding in `Setup-Plan.md`. Reuse information I already supplied, confirm a short profile summary, and make a useful first output along the way. Assistant naming is optional; do not force sensitive personal details.

Set up one small weekly maintenance check as described in the installed skill. Explain its local scope and AI resource use, confirm day/time/timezone and required host consent, and record the verified schedule or a concrete blocker with manual weekly fallback. Use only the host's supported scheduler. Startup hooks and external backup remain optional. Use one agent and current model settings.

Portable Workspace Context is optional after the required onboarding. Use the installed bridge skill only on request, with exact preview and approval before writing a snapshot outside the workspace. Do not enable it as a side effect of setup.

Do not stop at "installation complete." Deliver or begin the requested output. If I have not named an outcome, ask what would make this useful today.

Keep `.business-ai-kit/source/` ignored by Git. Do not add analytics, telemetry, tracking, or background reporting.
```

After installation, ongoing workspace behavior, update, safety, heartbeat, support, and project instructions live inside the copied workspace.
