# My AI Workspace

This is your private Business AI Starter Kit workspace.

Use it to organize business context, projects, workflows, research, documents, decisions, and AI-assisted work in one local folder.

You do not need to manage the files manually. Ask the AI for the outcome you want; it should keep the workspace organized and explain only what matters.

The AI should lead with the result and keep explanations practical. It should preserve important decisions, caveats, and next steps while trimming repetition and optional background.

## Start Here

Ask:

```text
Help me organize my current AI priorities and pick the first project.
```

or:

```text
Review my workspace and tell me the next useful step.
```

Good first inputs:

- your website or LinkedIn profile
- a messy note, transcript, or screenshot
- a business idea you want to turn into a project
- a workflow you repeat and want to make easier

This workspace works in both Codex and Claude Code (Cowork). If your AI tool itself feels unfamiliar, ask:

```text
Show me how to use this tool for this workspace in plain language.
```

The AI should explain only what helps the next step, such as voice or dictation, planning before building, reviewing changes, permissions, or using the tool from another device when available.

## What The AI Should Do

- ask only for real business decisions, missing context, or safety approvals
- create project folders only when real work starts
- keep decisions, memory, and next actions organized
- protect secrets and private notes
- suggest improvements, but ask before sharing anything outside the workspace
- record useful maintenance in inbox/outbox so you can see what happened while you were away
- coordinate focused AI workers for large tasks while one lead agent checks and integrates the result

## Main Areas

- `Agent-Instructions/` - the AI's operating context, memory, skills, safety notes, and workspace state.
- Project folders - created in the root when real work starts.
- `.business-ai-kit/` - internal source reference for updates and kit instructions.

## Useful Requests

Ask the AI:

```text
Help me set up my first business project in this workspace.
```

or:

```text
Review my workspace and tell me the next useful step.
```

You do not need to manage the files manually. The AI should keep the workspace organized, ask only for real business decisions or safety approvals, and turn useful context into project files, decisions, memory, or reusable workflows.

```text
Turn this rough idea into a project plan and first draft.
```

```text
Use orchestrator mode for this project. Split only the independent parts, protect parallel file changes, verify the work, and return one clear result.
```

```text
Review these notes and tell me what decisions I need to make.
```

```text
Draft feedback for Andrii about what worked or what was confusing.
```

## Updating The Kit

Ask the AI:

```text
Update my Business AI Starter Kit.
```

The AI will refresh `.business-ai-kit/source/`, review useful changes, and ask before changing your workspace files.

## Use Approved Context In Other Projects

You can optionally create a small, reviewed snapshot of reusable preferences and business context for Codex or Claude Code to use in other local projects. It does not expose this workspace, dossiers, private notes, secrets, or project folders.

Ask:

```text
Prepare my Portable Workspace Context and show me exactly what would be available in other projects.
```

The AI will help curate `Agent-Instructions/Portable-Context.md`, run a secret scan, and ask before installing or refreshing any user-level skill. Nothing is enabled automatically. In another project, explicitly ask:

```text
Use my Business AI workspace context for this task.
```

Codex and Claude Code can use managed local copies. Cowork requires a separate ZIP upload because its personal skills are managed in the app. Disable or uninstall the bridge from this source workspace when you no longer want future chats to load it; existing conversation history cannot be recalled.

The files are stored locally, but invoking the skill allows the active Codex or Claude service to process the approved context under that provider's data controls. Creating a Cowork ZIP stays local; uploading it is a separate external-sharing action and sends that detached copy to the user's Claude account.

## Privacy

This workspace is local-first. There is no analytics, telemetry, tracking, or background reporting.

If something here could improve the public kit for other users, the AI should ask before preparing feedback or a pull request.

## Feedback

Andrii welcomes practical feedback from early users.

Useful feedback:

- what you tried to build
- where setup or instructions were confusing
- what workflow, document, automation, app, or template would help you
- what the AI did well
- what made the workspace hard to use

Ask the AI:

```text
Draft feedback for Andrii about what I tried to build and what would make this kit more useful.
```

## Support

If you are stuck or frustrated after trying the AI's guidance, you can contact Andrii:

- LinkedIn: https://www.linkedin.com/in/andrii-veselov/
- Website: https://scalebound.app
