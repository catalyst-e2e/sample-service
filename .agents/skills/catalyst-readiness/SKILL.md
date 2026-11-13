---
name: catalyst-readiness
description: One pass over a workspace's setup — reads readiness for every mapped team and repository, applies every repair that has a key-callable verb (adopt missing stages and labels, configure code reviewers), and hands the customer one list of what only they can do, each item a deep link to the exact settings page or an ask in their Waiting on me. Mutating; invoke it explicitly.
disable-model-invocation: true
---

# Catalyst Readiness

The customer's ask is "read every rule and expectation around my setup and fix what you can". This skill is that one pass: walk every mapped team and every repository, run the readiness evaluation, apply the repairs that have a verb, and hand back ONE list of what only the customer can do — never one settings page at a time. Label every verdict by how you got it: **read from the cloud**, **repaired**, or **could not check**.

## Which key this skill needs

Three credential truths, per verb:

1. The two scope-gated writes — `POST /api/v1/agent/tenant/readiness/re-evaluate` and `PUT /api/v1/agent/tenant/review-agents/write` — need an account key minted **with `mirror:write`**. An account key does not carry it by default; the refusal is `403 {"error":"forbidden","reason":"missing-scope","required":"mirror:write"}` and the remedy is an admin re-minting the key at Settings → Account keys. Never offer this remedy for adopt.
2. `POST /api/v1/agent/tenant/workflow-adopt` refuses **every** account key with `409 {"error":"requires_personal_grant"}`, *whatever its scopes* — adoption runs under a person's own Linear grant, and a scope cannot supply one. The remedy is a person: a personal key whose owner holds a workspace admin or owner seat **and** a connected personal Linear grant, or the admin's own browser. The `403 missing-scope` remedy must not be offered for this verb.
3. A personal key (`ctc_user_`) needs its owner to hold an admin or owner seat for every write; that refusal is `403 {"error":"forbidden","message":"…requires an admin or owner role"}` — a different body from `missing-scope`, and a different problem: the seat, not the key.

The reads (`GET …/readiness`, `GET …/review-agents`, `GET …/repositories`) take any admitted credential; `GET …/repositories` additionally requires an admin or owner seat for a personal key. `?account=` is never honored — the workspace is always the key's own.

## The pass, in order

1. **Read the contract.** `GET /api/v1/agent/contract` with the key as `Authorization: Bearer <key>`: `teams[]` (each with its stored `readiness`), `repositories` if present, `readinessChecks[]` (each carrying `severity`, `needsAnswer`, `fixedBy`, `fixedByLine` and `settingsPath`) and the `routes[]` inventory. The contract serves a **stored** verdict and never recomputes: a team reading `unchecked`, or stale against its `workflowRev`, needs a live call before you believe it.
2. **Per team, evaluate.** `GET /api/v1/agent/tenant/readiness?team=<teamId>` is the read-through evaluate; `POST /api/v1/agent/tenant/readiness/re-evaluate?team=<teamId>` recomputes now and returns what became of the per-team setup ask. When the stored verdict is stale, or the customer asked for a fresh pass, re-evaluate — and report the verdict BEFORE any repair next to the verdict after.
3. **Apply the repairs that have a verb.** Missing stages and labels via `POST /api/v1/agent/tenant/workflow-adopt?team=<teamId>` (body `{mode:"preview"}`, then `{mode:"apply", planHash}` from the preview — it provisions the standard labels on success and answers per-stage outcomes); reviewer configuration via `PUT /api/v1/agent/tenant/review-agents/write` (body names `repoId`, `agentKey`, `enabled`, `requestIdentity` as `membership:<id>`). Re-evaluate after each repair and report before/after.
4. **Handle each refusal by name.** `403 missing-scope` → an admin re-mints the **account key** with `mirror:write` (never for adopt). A `403` with the admin-or-owner seat message → the caller's own seat. `409 requires_personal_grant` → this needs the person; hand them `<base-url>/settings/linear-teams?team=<teamKey>`. A personal-grant refusal (`no-grant`, `expired`, …) → pass the body's own reason through verbatim; the remedy is the person reconnecting their Linear.
5. **Hand back one list.** Every still-failing check becomes one line: its `title`, its `fail` sentence, and its `settingsPath` (append `?team=<teamKey>` for team-scoped rows — the account-wide coding-account row takes no parameter, and it is one line and at most one ask for the whole workspace, never one per team). Each line lands in the customer's *Waiting on me* as an ask, and the ask the team's latest re-evaluate returned comes first, because a repair in step 3 can close an earlier one. When that latest re-evaluate answered `ask.outcome` `raised` or `created-but-relations-partial`, the team already has its one setup ask open: hand back its `ask.identifier` on that team's lines and never file a second ask for them. Raise an ask through `POST /api/v1/agent/ask` only for a team whose latest re-evaluate answered any other outcome (`not-needed`, `no-target`, `rejected`, `unavailable`); when that refuses, print the line instead. A team you only read with `GET` has no returned ask, so re-evaluate it before filing anything for it, since re-evaluate reuses the team's open setup ask rather than filing another; if that re-evaluate is refused, print the team's lines instead. ⛔ **Never synthesize a URL from a check id** — the `settingsPath` the contract carries IS the link; prefix it with the base URL you already hold and nothing else.

A check whose `state` is `unknown` is a question nobody answered (a probe that could not run), not a failure — list it separately and say "could not check", never as something the customer must fix.

## What this skill does not do

It holds no credential of its own and grants no access. Adoption that fails for grant reasons is the person's to give. It does not change merge policies, install the GitHub App, or turn off Linear automations — those rows arrive with their `settingsPath` and belong on the handback list.
