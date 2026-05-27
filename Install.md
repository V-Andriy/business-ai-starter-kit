# Install Business AI Starter Kit

Paste this whole block into Codex from the folder where you want your private AI workspace. You do not need to run the commands yourself; Codex should do the setup and explain only what matters.

```text
Set up my Business AI Starter Kit workspace from this repository.

Source repository: https://github.com/V-Andriy/business-ai-starter-kit

Use the source repository's Seed/ folder as the workspace starter. If the source repository is not already available locally, clone it first into a temporary location or into .business-ai-kit/source/ after confirming the target workspace folder is safe.

First inspect the current folder. If it is not empty or not clearly safe, ask me where to create the workspace before copying anything. Do not overwrite existing files unless I explicitly approve it. Keep the explanation plain and non-technical.

If the target folder is inside iCloud Drive, Desktop, Documents, or another cloud-synced folder, warn me first: cloud storage may optimize the folder, remove local copies from this computer, and make Codex unable to access workspace files. Recommend a local folder that stays on this computer, or tell me to keep the workspace downloaded locally.

Check whether Node.js, npm, and pnpm are available by running node --version, npm --version, and pnpm --version. If Node.js or npm is missing, install Node.js LTS first. On Windows, try winget install OpenJS.NodeJS.LTS. On macOS, try brew install node if Homebrew is available. If terminal install is unavailable or blocked, ask me to install Node.js LTS from https://nodejs.org/ and then continue. After Node.js works, enable pnpm with corepack enable and corepack prepare pnpm@latest --activate. If corepack is unavailable, use npm install -g pnpm only as a bootstrap fallback.

Copy the contents of Seed/ into the workspace, including hidden files like .gitignore and .env.example. Then initialize local Git on main, run pnpm hooks:install, and run pnpm kit:update so .business-ai-kit/source/ exists as an ignored source cache.

Read the copied AGENTS.md and Agent-Instructions files. Complete first-run onboarding in plain business language. Ask only for the few details needed to make the workspace useful: assistant name/style, business context sources, privacy boundaries, and the first useful project or workflow.

Update the workspace state files and set up the hourly workspace heartbeat automation when available. Explain that the heartbeat is local workspace maintenance, not analytics.

Explain that this is an alpha kit and Andrii is actively looking for feedback from early users. If I get stuck, find something confusing, or want the kit to support a workflow/template/app, offer to draft a short LinkedIn message to Andrii.

Do not copy repository maintenance files into the workspace unless they are inside Seed/. Do not store secrets in markdown files. Keep .business-ai-kit/source/ ignored by Git. Do not add analytics, telemetry, tracking, or background reporting.
```

After installation, all ongoing setup, update, safety, heartbeat, and support instructions live inside the copied workspace.
