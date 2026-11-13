---
name: catalyst-onboarding
description: What Catalyst is now wired to do for this repository — the Linear-GitHub mirror, the "Waiting on me" inbox, which credential reads it, and what to try first.
---

# Catalyst Onboarding

This repository is connected to Catalyst. Here's exactly what that means today, and what's worth trying first.

## What's connected

- **This repository belongs to a Catalyst project.** A project is one Linear team and the GitHub repositories registered to it. Catalyst keeps an always-on mirror of both sides — issues, comments, labels, and PRs stay in sync without anyone polling either API by hand.
- **Every agent and host working in this repo reads from that same mirror.** An agent running as a person — your own Claude Code or Codex session on your own machine — reads it with that person's **personal key** (`ctc_user_…`, minted at Settings → API keys); a host or unattended service reads it with the tenant's **account key** (`ctc_acct_…`). Either way you were most likely handed that credential already; it's what lets you read ticket state, comments, and repo/PR activity without hitting Linear's or GitHub's rate limits directly.
- **There's a "Waiting on me" inbox** for the humans on this team — not everything assigned to them, specifically the things that are structurally blocked on their next action (an approval, an answer, a decision). If you're an agent and you get stuck needing a human call, that's the right place to surface it, not a comment nobody's watching.

## What to try first

1. **File a ticket the outcome-first way.** Use the `catalyst-file-ticket` skill in this pack instead of writing an implementation-first bug report — it turns a vague ask into something scannable and testable before anyone starts building.
2. **Ask before you assume.** If a ticket is ambiguous or a design choice isn't obvious from the code, that's a "waiting on me" moment for the ticket's owner — don't guess and hope.
3. **Read this repo's own conventions before touching it.** If this repo doesn't yet have an `AGENTS.md`, run the `catalyst-repo-conventions` skill in this pack to draft one from what's actually in the codebase.
4. **Work out what this repository needs from its environment.** Catalyst's container supplies the toolchain and the agent's own credential, not your database URL or your API tokens. Run the `catalyst-repo-environment` skill in this pack to get a cited list of the variables and secrets this repository reads, and where to enter them.

## What this pack does NOT do

This pack does not grant you tools, credentials, or write access on its own — it's guidance, not plumbing. It reflects what's true about a brand-new connection: one project, its repositories, a working mirror, and an inbox. As you connect more of Catalyst, more will be true, and that's outside what a starter pack can describe in advance.
