# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

The service runs with no database and calls no outside service.

## Start locally

With Bun installed, run this command from the repository root:

```sh
bun run start
```

The service listens on port 3000 by default. Check http://localhost:3000/health.

- `bun run start` — serves `GET /health` → `{ ok: true }` and `GET /greet?name=…`
  - `GET /health` is the health check; a healthy service replies `200 OK` with the JSON body `{"ok":true}`
  - `GET /greet` with no `name` returns `hello, world`; `GET /greet?name=Tony` returns `hello, Tony`
- Port: listens on `3000` by default (set `PORT` to override)
- `bun test` — runs the unit tests
- Versions: the service runs on Bun 1.4.2, the version CI uses (`.github/workflows/ci.yml`). Catalyst's build and test environment provisions Node 24.19.0, set in `.catalyst/catalyst.toml`.
- Report a bug: open an issue at https://github.com/catalyst-e2e/sample-service/issues

This repository is intentionally small: it exists so a fresh tenant has one real repo, one real PR,
and a couple of tickets to work — nothing here is production code.
