# Contributing to sample-service

## Running the tests

The unit tests use Bun's built-in test runner (`bun:test`), so you need Bun installed.
There is nothing to install first: `package.json` declares no dependencies.

From the repository root:

```sh
bun test
```

That is the `test` script in `package.json`, so `bun run test` and `npm test` run the same thing.
`npm test` still needs Bun on your `PATH`, because the script calls `bun test`.

Test files sit next to the code they cover and end in `.test.ts` (for example `src/greet.test.ts`).
A passing run reports `0 fail` and exits with status 0. The tests need no environment variables,
network access or running services.
