# Install Business AI Starter Kit

Paste this whole block into Codex from the folder where you want your private AI workspace.

```text
Set up my Business AI Starter Kit workspace from this repository.

Source repository: https://github.com/V-Andriy/business-ai-starter-kit

Use the source repository's `Seed/` folder as the workspace starter. If the source repository is not already available locally, clone it first into a temporary location or into `.business-ai-kit/source/` after confirming the target workspace folder is safe.

First inspect the current folder. If it is not empty or not clearly safe, ask me where to create the workspace before copying anything. Do not overwrite existing files unless I explicitly approve it.

If the target folder is inside iCloud Drive, Desktop, Documents, or another cloud-synced folder, warn me first. Cloud storage may remove local copies from this computer and make Codex unable to access workspace files.

Keep setup plain and practical. Give short progress updates:

- checking the folder
- copying the starter workspace
- checking local tools
- installing local safety checks
- preparing the source cache for future updates
- starting the first onboarding conversation

Copy the contents of `Seed/` into the workspace, including hidden files such as `.gitignore` and `.env.example`. Do not copy repository maintenance files unless they are inside `Seed/`.

After copying, read these installed workspace files and treat them as the source of truth:

- `AGENTS.md`
- `Agent-Instructions/Setup-Plan.md`
- `Agent-Instructions/Inbox.md`
- `Agent-Instructions/Active-Threads.md`
- `Agent-Instructions/Skills/`

Run `Agent-Instructions/Setup-Plan.md` exactly as the setup checklist. Use the installed skills when the setup plan points to them.

Do not duplicate or improvise setup rules from memory. Follow the installed files.

Complete the technical setup steps from `Setup-Plan.md`, including local tools, local Git, secret scanning, source cache, heartbeat setup, optional private GitHub backup prompt, onboarding, feedback prompt, inbox/outbox cleanup, and deleting `Setup-Plan.md` after setup is complete.

Do not stop at "installation complete." Start the live onboarding conversation from `Setup-Plan.md` and adapt to my language.

Keep `.business-ai-kit/source/` ignored by Git. Do not add analytics, telemetry, tracking, or background reporting.
```

After installation, ongoing workspace behavior, update, safety, heartbeat, support, and project instructions live inside the copied workspace.
