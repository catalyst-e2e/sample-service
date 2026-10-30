import { expect, test } from "bun:test";
import { greet } from "./greet";

test("greets by name", () => expect(greet("Tony")).toBe("hello, Tony"));
test("falls back to world", () => expect(greet(null)).toBe("hello, world"));
test("cuts a name longer than 40 characters to its first 40", () =>
  expect(greet("abcdefghijabcdefghijabcdefghijabcdefghijXYZ")).toBe("hello, abcdefghijabcdefghijabcdefghijabcdefghij"));
test("leaves a name of 40 characters or fewer unchanged", () => expect(greet("Ada")).toBe("hello, Ada"));
test("leaves a name of exactly 40 characters unchanged", () =>
  expect(greet("a".repeat(40))).toBe(`hello, ${"a".repeat(40)}`));
test("cuts after trimming, not before", () =>
  expect(greet(`  ${"a".repeat(45)}  `)).toBe(`hello, ${"a".repeat(40)}`));
