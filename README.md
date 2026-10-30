# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

- `bun run start` — serves `GET /health` → `{ ok: true }` and `GET /greet?name=…`
- `bun test` — runs the unit tests

This repository is intentionally small: it exists so a fresh tenant has one real repo, one real PR,
and a couple of tickets to work — nothing here is production code.

## Team setup

Teams, members and roles for this tenant are managed in Linear, not in this repository.
Members hold one of three roles — Admin, Member or Guest — and are invited either by CSV import or
with a unique invite link from [Linear settings → Members](https://linear.app/settings/members).

- [Workspaces](https://linear.app/docs/workspaces) — workspace settings and workflows
- [Teams](https://linear.app/docs/teams) — structuring teams and their workflows
- [Members](https://linear.app/docs/invite-members) — inviting people and assigning roles

`sample-service` has no notion of users, teams or roles (no auth, no persistence), so setting up
teams needs no change here.
