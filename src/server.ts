import { greet } from "./greet";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/health") return Response.json({ ok: true });
    if (url.pathname === "/greet") return new Response(greet(url.searchParams.get("name")));
    return new Response("not found", { status: 404 });
  },
});

console.log(`sample-service listening on :${port}`);
