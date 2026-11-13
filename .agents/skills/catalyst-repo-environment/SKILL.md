---
name: catalyst-repo-environment
description: Work out which environment variables and secrets this repository needs at run time, from the files that already say so — .env.example, CI workflow env blocks, and the README's setup section — and report them as a named list with the source of each.
---

# Catalyst Repo Environment

Catalyst runs this repository's builds and tests inside a container. The container comes with a toolchain and the agent's own credentials already in place; what it does **not** know is the environment your code reads — database URLs, API tokens, feature flags, registry credentials.

This skill works out which ones those are from the files in this repository that already name them, and reports the list with a source for each so nobody has to guess.

## What the platform already provides

- **The image and its toolchain** — pinned, installed, and not yours to supply.
- **The agent's own coding-account credential** — issued per run, separate from your repository's secrets.
- **`CATALYST_MERGE_EVIDENCE_POLICY`** — a Catalyst-defined variable controlling what evidence a merge requires. Left unset it accepts a Codex clean pass, or a resolved Codex review from an earlier head with checks green; set it to `codex-attestation-strict` to require a clean pass at the current head always, or to `checks-and-threads` for this repository to drop the reviewer requirement entirely.

Everything else your build reads is yours to supply.

## Process

1. **Read the sources that already name variables**, in this order of confidence:
   - `.env.example` (also `.env.sample`, `.env.template`) — the most direct statement. **Never read `.env` itself**; it holds live values.
   - `.github/workflows/*.yml` — `env:` blocks at workflow, job and step level. A value written as a `secrets.` expression means CI cannot run without it: treat that name as required.
   - `README.md` — fenced shell blocks under an Environment / Setup / Configuration heading. Weakest evidence; report it as such.
2. **Report NAMES, never values.** Do not copy, quote, echo or summarize the value half of any line, even from an example file — example files do sometimes hold a real credential, and a declaration that carries one is refused outright.
3. **Cite every name.** One line per variable: the name, whether it looks required, and the file and line it came from. A name you cannot cite is a guess — say so rather than listing it as a finding.
4. **Say where the values go.** Plain configuration goes in the Catalyst web app under Settings → Environment; anything you would not want read back goes under Settings → Secrets. Both can be scoped to this repository or to the whole workspace, and repository scope wins.
5. **Do not enter the values yourself.** You will not have them, and the pages that hold them are behind a human's session.

## What this skill does not do

It reads and reports. It writes no file, sets no value, and cannot verify that a variable is actually set — only a human with access to the Catalyst settings pages can do that.

## Account-level skills and plugins

The developer's machine may have user-level skills and installed plugins that are useful across repositories. Use the setup inventory's evidence for Claude, Codex and OpenCode, decide which portable assets the workspace should carry, and review the decision with the person — code checks the decision, it does not make it for you.

**What you may propose, and how it is declared.** Two kinds, both referenced rather than copied. A marketplace plugin entry carries `"kind": "plugin"`, its `name` inside that marketplace, a `"marketplace"` of `{name, url, ref}`, and a pin — an exact published `version`, a full 40-character `marketplace.ref`, or both. Most marketplace plugins publish no version in their own manifest: for those, set `marketplace.ref` to the marketplace commit and leave `version` out, and never call a CLI placeholder such as `unknown` or `local` a verified release. A skill entry carries `"source"` — `{repository, path, commit}` — naming the git repository, the directory inside it holding the skill's `SKILL.md`, and its pinned `"commit"`.

**Why each carried entry.** Give one sentence explaining the skill that uses it, the declared MCP server that needs it, or the workflow used in every repository.

**Review every discovered item.** Use the literal headings `Carry`, `Left local`, and `Project copy wins`. An item without a recoverable Git source and full commit cannot be carried. Label an OpenCode npm plugin as an npm plugin in the inventory; do not invent a marketplace identity for it.

**The project layer always wins.** A skill or plugin already checked into the repository (`.agents/skills/`, `.claude/skills/`, the repo's own declaration) is never re-declared at the account level, and your proposal must not offer it. The project copy wins; propose nothing that shadows one.

**Credentials are named, never carried.** A skill or plugin that needs a credential names its environment variable or vault reference in `requiredEnvNames`, exactly as an MCP server does. Never quote, copy or embed a value — a declaration that carries one is refused.

## Load on demand

- [references/account-assets.md](references/account-assets.md) — the exact JSON declaration shapes, the carry and left-local inventory review, and the propose-and-approve sequence over the CLI and raw HTTP, with revision and hash pinning.
