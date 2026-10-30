# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

- `bun run start` — serves `GET /health` → `{ ok: true }` and `GET /greet?name=…`

**Tests:** run `bun test` from the repository root.

This repository is intentionally small: it exists so a fresh tenant has one real repo, one real PR,
and a couple of tickets to work — nothing here is production code.
