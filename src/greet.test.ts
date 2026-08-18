import { expect, test } from "bun:test";
import { greet } from "./greet";

test("greets by name", () => expect(greet("Tony")).toBe("hello, Tony"));
test("falls back to world", () => expect(greet(null)).toBe("hello, world"));
