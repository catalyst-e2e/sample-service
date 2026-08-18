export function greet(name: string | null): string {
  const who = name && name.trim().length > 0 ? name.trim() : "world";
  return `hello, ${who}`;
}
