# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

- `bun run start` — serves `GET /health` → `{ ok: true }` and `GET /greet?name=…`
- `bun test` — runs the unit tests

This repository is intentionally small: it exists so a fresh tenant has one real repo, one real PR,
and a couple of tickets to work — nothing here is production code.

## Importing data

`sample-service` keeps no data: it has no database, file store, or queue, and every response is
computed from the request alone. There is nothing to import into it, export from it, or migrate.

If you are moving work-tracking data into Linear from another tool, use Linear's own guides:

- [Pitch Linear](https://linear.app/switch/pitch-guide) — build the business case and get buy-in
- [Run a pilot](https://linear.app/switch/pilot-guide) — trial Linear with a small team first
- [Migration guide](https://linear.app/switch/migration-guide) — import data and roll Linear out
