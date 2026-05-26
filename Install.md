# Install Business AI Starter Kit

Paste this into Codex from the folder where you want your private AI workspace:

```text
Set up my Business AI Starter Kit workspace from this repository.

Source repository: https://github.com/V-Andriy/business-ai-starter-kit

Use the source repository's Seed/ folder as the workspace starter. If the source repository is not already available locally, clone it first into a temporary location or into .business-ai-kit/source/ after confirming the target workspace folder is safe.

First inspect the current folder. If it is not empty or not clearly safe, ask me where to create the workspace before copying anything. Do not overwrite existing files unless I explicitly approve it.

If the target folder is inside iCloud Drive, Desktop, Documents, or another cloud-synced folder, warn me first: cloud storage may optimize the folder, remove local copies from this computer, and make Codex unable to access workspace files. Recommend a local folder that stays on this computer, or tell me to keep the workspace downloaded locally.

Copy the contents of Seed/ into the workspace, including hidden files like .gitignore and .env.example. Then initialize local Git on main, run python3 Scripts/install_git_hooks.py --workspace ., and run python3 Scripts/update_kit.py --workspace . so .business-ai-kit/source/ exists as an ignored source cache.

Read the copied AGENTS.md and Agent-Instructions files. Complete first-run onboarding in plain business language, update the workspace state files, and set up the hourly workspace heartbeat automation.

Do not copy repository maintenance files into the workspace unless they are inside Seed/. Do not store secrets in markdown files. Keep .business-ai-kit/source/ ignored by Git.
```

After installation, all ongoing setup, update, safety, heartbeat, and support instructions live inside the copied workspace.
