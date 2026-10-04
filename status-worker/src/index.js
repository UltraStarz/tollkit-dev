/**
 * tollkit-status: probes every Tollkit hostname every 5 minutes and keeps a
 * 90-day daily record in one KV key (288 writes a day, inside the free tier).
 *
 *   GET /status.json   current state, last latency, uptime 24h / 7d / 30d,
 *                      and daily buckets, per hostname
 *
 * A probe is GET /health with a 10-second timeout; up means HTTP 200 and a
 * JSON body with status "ok". Nothing here can change what it measures.
 */
const HOSTS = ["extract.tollkit.dev", "web.tollkit.dev", "chain.tollkit.dev", "data.tollkit.dev", "attest.tollkit.dev"];
const KEEP_DAYS = 90;

async function probe(host) {
  const t0 = Date.now();
  try {
    const r = await fetch(`https://${host}/health`, { signal: AbortSignal.timeout(10_000), headers: { "user-agent": "tollkit-status/1" } });
    const ms = Date.now() - t0;
    if (r.status !== 200) return { up: false, ms, why: `HTTP ${r.status}` };
    const j = await r.json().catch(() => null);
    return j && j.status === "ok" ? { up: true, ms, version: j.version } : { up: false, ms, why: "bad body" };
  } catch (e) {
    return { up: false, ms: Date.now() - t0, why: String(e && e.message || e).slice(0, 80) };
  }
}

async function load(env) {
  return (await env.STATUS.get("state", "json")) ?? { days: {}, last: {}, incidents: [] };
}

async function tick(env) {
  const state = await load(env);
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const results = await Promise.all(HOSTS.map(probe));
  HOSTS.forEach((h, i) => {
    const r = results[i];
    const d = ((state.days[h] ??= {})[day] ??= [0, 0, 0]); // [up, total, sum of ms while up]
    d[1]++;
    if (r.up) { d[0]++; d[2] += r.ms; }
    const prev = state.last[h];
    if (prev && prev.up !== r.up) {
      state.incidents.unshift({ host: h, at: now.toISOString(), to: r.up ? "up" : "down", why: r.why ?? null });
      state.incidents = state.incidents.slice(0, 50);
    }
    state.last[h] = { ...r, at: now.toISOString() };
    for (const k of Object.keys(state.days[h])) if (Date.parse(k) < now - KEEP_DAYS * 86_400_000) delete state.days[h][k];
  });
  await env.STATUS.put("state", JSON.stringify(state));
}

function summarize(state) {
  const now = Date.now();
  const pct = (days, n) => {
    let up = 0, total = 0;
    for (const [k, v] of Object.entries(days ?? {})) if (Date.parse(k) > now - n * 86_400_000) { up += v[0]; total += v[1]; }
    return total ? Math.round((up / total) * 100000) / 1000 : null;
  };
  const hosts = {};
  for (const h of HOSTS) {
    const days = state.days[h] ?? {};
    hosts[h] = {
      up_now: state.last[h]?.up ?? null,
      last_checked: state.last[h]?.at ?? null,
      last_ms: state.last[h]?.ms ?? null,
      version: state.last[h]?.version ?? null,
      uptime_24h: pct(days, 1), uptime_7d: pct(days, 7), uptime_30d: pct(days, 30),
      daily: Object.entries(days).sort().map(([date, [up, total, ms]]) => ({ date, uptime: Math.round((up / total) * 1000) / 10, avg_ms: up ? Math.round(ms / up) : null, checks: total })),
    };
  }
  return { hosts, incidents: state.incidents, probe: "GET /health every 5 minutes from Cloudflare", generated_at: new Date().toISOString() };
}

export default {
  async scheduled(_event, env, ctx) { ctx.waitUntil(tick(env)); },
  async fetch(req, env) {
    const url = new URL(req.url);
    const headers = { "content-type": "application/json", "access-control-allow-origin": "*", "cache-control": "public, max-age=60" };
    if (url.pathname === "/status.json" || url.pathname === "/") return new Response(JSON.stringify(summarize(await load(env))), { headers });
    return new Response("Not found", { status: 404 });
  },
};
