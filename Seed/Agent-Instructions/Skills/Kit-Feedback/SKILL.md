---
name: kit-feedback
description: Use when the user wants to send feedback to Andrii or propose an improvement back to the public Business AI Starter Kit.
---

# Kit Feedback

Use this skill to turn real user experience into useful feedback without
analytics, telemetry, or background reporting.

Nothing leaves the private workspace unless the user explicitly approves it.

This kit is in alpha. Andrii wants practical feedback from early users and is
willing to help shape workflows, instructions, and future templates around what
they are trying to build.

## When To Use

Use this workflow when:

- the user asks to send feedback to Andrii
- setup instructions are confusing, stale, or wrong
- the workspace discovers a bug in the starter kit
- a local skill, template, or instruction improvement could help other users
- the user wants to contribute a small fix upstream
- the user describes something they wish the kit helped them build

Do not use this for private business context, client material, secrets, or raw
project files.

## Feedback Paths

Choose the smallest useful path.

### Simple Message

Use when the feedback is a note, question, bug report, or testimonial.

1. Summarize the feedback in 3-6 bullets.
2. Remove private business details, client names, secrets, and internal numbers.
3. Draft a short LinkedIn message to Andrii:
   `https://www.linkedin.com/in/andrii-veselov/`
4. Ask the user to approve or edit it before they send it.

Useful message shape:

```text
Hi Andrii, I tried Business AI Starter Kit for ...

What worked:
- ...

What was confusing:
- ...

What I want to build next:
- ...

What would make the kit more useful:
- ...
```

### Upstream Improvement

Use when there is a concrete public-kit improvement.

1. Identify the exact reusable lesson.
2. Check that it is generic enough for other users.
3. Separate unrelated changes into separate proposals.
4. Explain the proposed change in plain language.
5. Ask the user before creating a branch, fork, commit, push, or pull request.
6. Make the smallest change that solves the issue.
7. Run the secret scanner on the changed files.
8. Create one focused pull request per issue when GitHub access is available.

If GitHub access is unavailable, prepare a concise patch summary and LinkedIn
message instead.

## PR Rules

- One pull request should solve one problem.
- Prefer documentation and seed instruction fixes before new machinery.
- Do not include private workspace context.
- Do not add analytics, telemetry, tracking, or hidden reporting.
- Do not change safety hooks or secret-scanning behavior unless the proposed
  improvement is explicitly about that safety layer.
- Keep the PR title concrete, for example:
  `Clarify iCloud install warning`
  `Fix Secrets Vault scanner instructions`
  `Add checklist for first project setup`

## Approval Prompt

Use plain language like this:

```text
This looks like something that could improve the starter kit for other users.

The proposed public change is:
- ...

Private details I will leave out:
- ...

Do you want me to prepare a small contribution for the public project, or would
you rather send Andrii a short LinkedIn message?
```

## Done Criteria

- The user approved the feedback path.
- Private details were removed.
- Simple feedback is ready as a LinkedIn message, or the upstream change is a
  small focused branch/PR.
- The secret scanner was run on any files being contributed.
- Any follow-up is recorded in `Agent-Instructions/Outbox.md` or the relevant
  project notes.
