# Install Business AI Starter Kit

Paste this whole block into Codex from the folder where you want your private AI workspace. You do not need to run the commands yourself; Codex should do the setup, explain what is happening in plain language, and then start the first real onboarding conversation.

```text
Set up my Business AI Starter Kit workspace from this repository.

Source repository: https://github.com/V-Andriy/business-ai-starter-kit

Use the source repository's Seed/ folder as the workspace starter. If the source repository is not already available locally, clone it first into a temporary location or into .business-ai-kit/source/ after confirming the target workspace folder is safe.

First inspect the current folder. If it is not empty or not clearly safe, ask me where to create the workspace before copying anything. Do not overwrite existing files unless I explicitly approve it. Keep the explanation plain and non-technical.

If the target folder is inside iCloud Drive, Desktop, Documents, or another cloud-synced folder, warn me first: cloud storage may optimize the folder, remove local copies from this computer, and make Codex unable to access workspace files. Recommend a local folder that stays on this computer, or tell me to keep the workspace downloaded locally.

During setup, give me short progress updates in human language:
- "I am checking that this folder is safe."
- "I am copying the starter workspace."
- "I am adding local safety checks so secrets are harder to commit by accident."
- "I am setting up the source cache so this workspace can receive kit updates later."
- "After the files are ready, I will ask a few questions so I can adapt this workspace to you."

Use a simple, practical, step-by-step tone. Start with the simple version, then the next useful action. Do not give long technical explanations unless I ask or the decision affects privacy, money, publishing, deletion, customer promises, or external accounts.

Check whether Node.js, npm, and pnpm are available by running node --version, npm --version, and pnpm --version. If Node.js or npm is missing, install Node.js LTS first. On Windows, try winget install OpenJS.NodeJS.LTS. On macOS, try brew install node if Homebrew is available. If terminal install is unavailable or blocked, ask me to install Node.js LTS from https://nodejs.org/ and then continue. After Node.js works, enable pnpm with corepack enable and corepack prepare pnpm@latest --activate. If corepack is unavailable, use npm install -g pnpm only as a bootstrap fallback.

Copy the contents of Seed/ into the workspace, including hidden files like .gitignore and .env.example. Then initialize local Git on main, run pnpm hooks:install, and run pnpm kit:update so .business-ai-kit/source/ exists as an ignored source cache.

Read the copied AGENTS.md and Agent-Instructions files. Then run first-run onboarding in plain business language. Do not stop at "installation complete." Start a real conversation that helps me use the workspace, with short steps instead of a lecture.

Open with a short welcome in this spirit, adapted to my language:

"Hi, I am here to help you understand how to use AI for real business work and build this workspace with you.

First, I need a little context. You do not have to explain everything from scratch. You can give me your website, LinkedIn profile, company page, business account, a document, screenshots, or use the voice recording button and explain in your own words what you do and what you want help with. I will inspect what I can, summarize what I understood, and you can correct me."

Also give a short optional Codex orientation for first-time users. Explain in plain text that this chat is where I ask for work, the project folder is what Codex can read and organize, the voice recording button may help with long explanations, Plan mode can help with unclear tasks, and Codex may ask for approval before privacy-sensitive or risky actions. Use the installed Codex-Learner skill for this and check official OpenAI Codex documentation before giving specific current UI steps.

Ask in small groups:
- What is your name, and how should I address you?
- What would you like to call me? Default: Bob.
- What style should I use: calm business partner, chief of staff, operator, creative strategist, or coach?
- How much technical detail should I show?
- Which sources should I inspect first: website, LinkedIn, company profile, notes, screenshots, files, or a voice recording where you explain things in your own words?
- What should stay private or sensitive?
- What would make this workspace useful soon?

After inspecting sources, show a short dossier preview with facts, assumptions, gaps, communication style, likely AI opportunities, and recommended first project. Ask what is wrong or missing. Only after I confirm or correct it, update the workspace files and adapt your assistant identity.

Update the workspace state files and set up the hourly workspace heartbeat automation when available. Explain that the heartbeat is local workspace maintenance, not analytics.

Explain that this is an alpha kit and Andrii is actively looking for feedback from early users. If I get stuck, find something confusing, or want the kit to support a workflow/template/app, offer to draft a short LinkedIn message to Andrii.

Do not copy repository maintenance files into the workspace unless they are inside Seed/. Do not store secrets in markdown files. Keep .business-ai-kit/source/ ignored by Git. Do not add analytics, telemetry, tracking, or background reporting.
```

After installation, all ongoing setup, update, safety, heartbeat, and support instructions live inside the copied workspace.
