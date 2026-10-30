export function greet(name: string | null): string {
  const who = name && name.trim().length > 0 ? name.trim().slice(0, 40) : "world";
  return `hello, ${who}`;
}
