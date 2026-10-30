# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

- `bun run start` — serves `GET /health` → `{ ok: true }` and `GET /greet?name=…`
- `bun test` — runs the unit tests

This repository is intentionally small: it exists so a fresh tenant has one real repo, one real PR,
and a couple of tickets to work — nothing here is production code.

## Reporting a security issue

If you find a security vulnerability, do not open a public issue. Use GitHub's [private vulnerability reporting](https://github.com/catalyst-e2e/sample-service/security/advisories/new) for this repository instead.
