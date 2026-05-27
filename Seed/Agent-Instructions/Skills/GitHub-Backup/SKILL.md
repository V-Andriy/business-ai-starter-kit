---
name: github-backup
description: Use when the user wants to sync this local workspace to a private GitHub repository for backup, rollback, or multi-device continuity.
---

# GitHub Backup

Use this skill only after the user asks for cloud backup or approves a backup prompt.

The default is local Git. GitHub backup is optional.

## Rules

- Create private repositories only.
- Do not create a public repository unless the user explicitly asks for public.
- Explain GitHub in plain language: it is a cloud backup and history for the workspace.
- Keep the user out of terminal details where possible.
- Ask before pushing workspace content to GitHub.
- Run the secret scanner before the first push.
- Do not push `.env`, `.business-ai-kit/source/`, local caches, private raw exports, or credentials.

## Setup Flow

1. Check whether Git is initialized and the working tree is understandable.
2. Check whether `gh` is installed with `gh --version`.
3. If `gh` is missing, explain that GitHub CLI is needed and help install it when possible:
   - macOS with Homebrew: `brew install gh`
   - Windows with winget: `winget install GitHub.cli`
   - otherwise send the user to `https://cli.github.com/`
4. Check authentication with `gh auth status`.
5. If not authenticated, run `gh auth login` and guide the user through the browser/OAuth step.
6. Confirm the repository name.
7. Run the secret scanner.
8. Create a private GitHub repository.
9. Add the remote.
10. Push the current branch.
11. Record the remote URL and backup status in `Agent-State.md`, `Decisions.md`, and `Outbox.md`.

## User Prompt

Use this after setup is complete:

```text
Do you want me to set up a private GitHub backup for this workspace?

Simple version: it keeps a private cloud copy and Git history, so the workspace is easier to recover if something is deleted or this computer has a problem.

If you want it, I will guide you through GitHub sign-in, create a private repository, scan for secrets, and push the workspace. I will not make anything public unless you explicitly ask.
```

## If The User Does Not Have GitHub

Explain:

```text
You will need a GitHub account first. Go to https://github.com/signup, create an account, then come back here.

After that, I can handle the local setup and open the login flow for you.
```

## Done Criteria

- The user approved GitHub backup.
- GitHub authentication works.
- Secret scan passes.
- The remote repository is private.
- The workspace is pushed.
- The backup status is recorded.
