# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

The service runs with no database and calls no outside service.

## Start locally

With Bun installed, run this command from the repository root:

```sh
bun run start
```

The service listens on port 3000 by default. Check http://localhost:3000/health.
To stop the service, press Ctrl+C in the terminal running it.

- `bun run start` — serves `GET /health` → `{ ok: true }` and `GET /greet?name=…`
  - `GET /health` is the health check; a healthy service replies `200 OK` with the JSON body `{"ok":true}`
  - `GET /greet` with no `name` returns `hello, world`; `GET /greet?name=Tony` returns `hello, Tony`
- Port: listens on `3000` by default (set `PORT` to override)
- `bun test` — runs the unit tests
  - `bun test ./src/greet.test.ts` runs one test file on its own; keep the leading `./` so Bun reads it as a path
- Runtime: the service is run and tested with Bun 1.4.2, the version CI pins in `.github/workflows/ci.yml`.
  - Run the tests from the repository root with `bun test`.
  - CI runs the tests on every pull request and on each push to main, as defined in `.github/workflows/ci.yml`.
  - The service source code is in `src/`.
- Node cannot run the service or its tests. The Node toolchain in `.catalyst/catalyst.toml` belongs to Catalyst's container.
- Report a bug: open an issue at https://github.com/catalyst-e2e/sample-service/issues

This repository is intentionally small: it exists so a fresh tenant has one real repo, one real PR,
and a couple of tickets to work — nothing here is production code.

## Where each route lives

- `GET /health`: `src/server.ts`
- `GET /greet`: `src/server.ts`, which calls `greet()` in `src/greet.ts` to build the reply
- The unit tests are in `src/greet.test.ts`

## Runtime

Tested on Bun 1.4.2, the version `.github/workflows/ci.yml` pins.

## Testing

Run tests with `bun test`.

## Support

Open an issue in this repository.

## Branches

main is the default branch.

## Reporting problems

Open an issue in this repository.

## License

No license file yet.

## Running locally

See the repository for setup steps.

## Contributing

Open a pull request against main.

## Getting help

Open an issue in this repository.

## Testing

See the repository for the test command.
