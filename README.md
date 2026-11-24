# sample-service

A tiny TypeScript HTTP service used to rehearse Catalyst Cloud onboarding end to end.

The service runs with no database and calls no outside service.

## Project status

This is a sample service for rehearsing Catalyst Cloud onboarding.

## Known issues

This onboarding sample has no database and calls no external services. The sample does not cover deployment.

## Contact

The catalyst-e2e organization maintains this service. For project questions, [open an issue in this repository](https://github.com/catalyst-e2e/sample-service/issues).

## Table of contents

- [Quick start](#quick-start)
- [Start locally](#start-locally)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Project layout](#project-layout)
- [Where each route lives](#where-each-route-lives)
- [Runtime](#runtime)
- [Testing](#testing)
- [Support](#support)
- [Branches](#branches)
- [Reporting problems](#reporting-problems)
- [License](#license)
- [Running locally](#running-locally)
- [Contributing](#contributing)
- [Getting help](#getting-help)
- [Testing](#testing-1)
- [Changelog](#changelog)
- [Security](#security)
- [Code of conduct](#code-of-conduct)
- [Versioning](#versioning)
- [Maintainers](#maintainers)
- [Roadmap](#roadmap)
- [Deployment](#deployment)
- [Acknowledgements](#acknowledgements)
- [FAQ](#faq)
- [Supported by](#supported-by)
- [Glossary](#glossary)

## Prerequisites

- Bun 1.4.2, the runtime and package manager. CI pins this version in `.github/workflows/ci.yml`.

## Dependencies

- Bun 1.4.2 to run the service and its tests. CI pins this version in `.github/workflows/ci.yml`.
- No packages to install.

## Setup check

The repository declares one setup step, `ctc-11131-setup-marker`, in `.catalyst/catalyst.toml`, and Catalyst runs it before an agent starts work.

## Quick start

1. Clone https://github.com/catalyst-e2e/sample-service and open the repository root.
2. Install Bun. The service has no packages to install, so there is no install command to run.
3. From the repository root, run `bun run start`, then open http://localhost:3000/health. A healthy service replies `200 OK` with `{"ok":true}`.

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

## Checking it works

After starting the service on the default port, open `http://localhost:3000/health`.
The service should respond with `200 OK` and the JSON body `{"ok":true}`.

## Stopping the service

Press Ctrl+C in the terminal where you ran `bun run start`.

## Logs

The service writes its startup log to standard output, so look in the terminal where you ran `bun run start`. It prints one line at startup, `sample-service listening on :3000` by default. If you set `PORT`, the line shows that port.

## Troubleshooting

If your local run fails, check the terminal where you ran `bun run start` for the `sample-service listening on` line, which shows the port.

## Scripts

- `start` (`bun run start`): Starts the HTTP service on port 3000 by default.
- `test` (`bun run test`): Runs the unit tests with Bun.

## Configuration

| Setting | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | Port the HTTP service listens on. |

To use a different port, set `PORT` when starting the service from the repository root.
For example, to listen on port 43174, run this command.

```sh
PORT=43174 bun run start
```

Open `http://localhost:43174/health` to check the service on that port.
It returns `200 OK` with `{"ok":true}`.

## Project layout

- `.catalyst/`: Catalyst project and environment settings.
- `.github/`: GitHub Actions workflow that runs the tests.
- `src/`: HTTP service code and colocated unit tests in `greet.test.ts`.

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

## Reporting issues

Report bugs in the sample service on the [repository's issue tracker](https://github.com/catalyst-e2e/sample-service/issues).

## License

No license file yet.

## Running locally

See the repository for setup steps.

## Contributing

Open a pull request against main.

## Code review

Changes go through a pull request against `main`. CI runs `bun test` on every pull request, as defined in `.github/workflows/ci.yml`.

## Code style

No formatter is configured yet.

## Editor setup

This repository provides no editor configuration.

## Getting help

Open an issue in this repository.

## Testing

See the repository for the test command.

## Changelog

Changes are listed in the repository history.

## Security

Contact the maintainers privately about security issues.

## Code of conduct

Please be respectful to everyone who takes part in this project.

## Versioning

This service follows semantic versioning.

## Upgrading

Pull the latest `main` into your clone. The service has no packages to install, so restart it with Ctrl+C and `bun run start`.

## Maintainers

The catalyst-e2e organization maintains this service.

## Roadmap

Planned work is tracked in the repository issues.

## Deployment

Deployment is not covered in this sample.

## Acknowledgements

Thanks to the open-source projects this sample uses, especially Bun and TypeScript, and to the people who maintain them.

## FAQ

**How do I start the service locally?**
With Bun installed, run `bun run start` from the repository root.

**How do I check whether the service is healthy?**
Open `http://localhost:3000/health` on the default port; a healthy service returns `200 OK` with `{"ok":true}`.

**How do I run the tests?**
Run `bun test` from the repository root.

## Supported by

- The catalyst-e2e organization owns the repository and maintains the service.
- Catalyst Cloud runs the onboarding rehearsal this repository exists for.
- GitHub Actions runs the tests on every pull request.

## Glossary

- **Route**: A URL path the service handles, such as `/health` or `/greet`.
- **Health check**: A request to `/health` that returns `200 OK` with `{"ok":true}` when the service is healthy.
- **CI**: Continuous integration, the automated checks GitHub Actions runs for pull requests and changes to main.
