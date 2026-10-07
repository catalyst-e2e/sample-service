# Account-level assets: declaration shapes and the review sequence

The full detail behind the account-level section of this skill: the two declaration shapes, the pinning rules, the inventory review, and the proposal and approval sequence. The short rules live in `SKILL.md`; this page carries what you copy or run.

## What you may propose, and how it is declared

Two kinds, both referenced rather than copied:

A **marketplace plugin**, by its marketplace and its name there, pinned — never by copying its files:

```json
{
  "kind": "plugin",
  "id": "agent-sdk-dev",
  "name": "agent-sdk-dev",
  "version": "1.1.0",
  "marketplace": {
    "name": "claude-plugins-official",
    "url": "https://github.com/anthropics/claude-plugins-official",
    "ref": "c447c3207a425bc4e2a0d068435f64b0477ae981"
  },
  "requiredEnvNames": [],
  "provenanceIds": []
}
```

A **skill**, by the git repository, the directory inside it holding the skill's `SKILL.md`, and a pinned commit:

```json
{
  "kind": "skill",
  "id": "unslop",
  "tier": "te\u006eant-channel",
  "reference": "unslop",
  "source": {
    "repository": "cursor/plugins",
    "path": "skills/unslop",
    "commit": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "requiredEnvNames": [],
  "provenanceIds": []
}
```

**Pin before proposing.** Use an exact published version and a marketplace commit when both are known. Most marketplace plugins publish no version in their own manifest. For those, set `marketplace.ref` to the full 40-character marketplace commit and leave `version` out. Never call a CLI placeholder such as `unknown` or `local` a verified release.

## Inventory review and approval

1. Read the setup inventory. Record each discovered item with `identity`, `origin` (`user` or `project`), `harness`, `kind`, and its declared `name`. A portable user item also has a complete `entry` using the JSON shapes above. A plugin may list the names of skills it registers in `skillNames`. Add known checked-in plugins to `projectAssets` and inspect `.agents/skills` and `.claude/skills` for project skills, including symlinked copies. The CLI checks their SKILL.md names. `rawPlugins` can hold Claude's `installed_plugins.json` object, Codex's plugin list, or OpenCode's `plugin` array; these produce identity evidence only. Add a verified source and pin before choosing `carry`.
2. Read the current account state with `GET /api/v1/agent/account-environment` using a personal key with admin access. Save the full JSON response as `account-state.json`, including `current` when an unapproved draft exists. A first declaration has `current: null`; still save that explicit empty state. Use the current draft as the base, not the older approved delivery. Do not read a developer's home from a cloud phase; consume the normalized setup inventory evidence.
3. For each user item, choose `carry` or `left-local` and write its reason. A project copy wins even if the project has no environment declaration. The CLI also reads this repository's `.catalyst/catalyst.toml` for declared project plugins. Run `catalyst-env env propose-account-assets --inventory inventory.json --decisions decisions.json` in the repository for a preview. Add `--json` for a machine-readable review. This offline command sends nothing to Catalyst.
4. Show the complete result to the person, including left-local items without a portable source. Have them edit the carries by writing `selected.json`, such as `{ "selected": ["claude:skill:unslop"] }`. Run the same command with `--selected selected.json --base account-state.json --output account-environment-draft.json`. The output is a submission body with `expectedRevision` and the merged `declaration`; inspect its preserved, added, and replaced entries with the person. An omitted carry or left-local discovery does not remove an existing account entry. This step has no approval effect.
5. Send the reviewed `account-environment-draft.json` body to `POST /api/v1/agent/account-environment/propose`. A stale `expectedRevision` returns a conflict: read current state and review again. Read the returned `state.revision` and `state.canonicalHash`. Only after the person reviews that exact state, send `{ "revision": <revision>, "canonicalHash": "<returned hash>" }` to `POST /api/v1/agent/account-environment/approve`. A stale hash also conflicts. Do not auto-approve. Until approval, the preceding approved declaration remains the one delivered to phases. For raw HTTP without the CLI, merge the selected entries by `(kind,id)` into the current declaration while retaining its `environment`, `provenance`, MCP servers, CLIs, and other skills/plugins; include the current revision as `expectedRevision` (zero for first use). Removing an account entry requires a separate explicit full-declaration edit and review.

## A minimal inventory and decision pair

```json
{"assets":[{"identity":"claude:skill:unslop","origin":"user","harness":"claude","kind":"skill","name":"unslop","entry":{"kind":"skill","id":"unslop","tier":"te\u006eant-channel","reference":"unslop","source":{"repository":"cursor/plugins","path":"skills/unslop","commit":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"requiredEnvNames":[],"provenanceIds":[]}},{"identity":"opencode:npm:local-helper","origin":"user","harness":"opencode","kind":"plugin","name":"local-helper"}],"projectAssets":[]}
```

```json
{"decisions":[{"identity":"claude:skill:unslop","action":"carry","reason":"Used in every repository."},{"identity":"opencode:npm:local-helper","action":"left-local","reason":"This npm plugin has no verified marketplace source."}]}
```
