import { redis, KEY } from "./_redis.js";

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const id = clean(b.id, 64);
  const name = clean(b.name, 120);
  const department = clean(b.department, 60);
  const tools = Array.isArray(b.tools) ? b.tools.map(t => clean(t, 60)).filter(Boolean).slice(0, 100) : [];
  const other = Array.isArray(b.other) ? b.other.map(t => clean(t, 60)).filter(Boolean).slice(0, 30) : [];
  if (!id || !name || !department) return res.status(400).json({ error: "Name and department are required" });
  if (!tools.length && !other.length) return res.status(400).json({ error: "Select at least one tool" });
  await redis.hset(KEY, { [id]: JSON.stringify({ name, department, tools, other, submittedAt: Date.now() }) });
  res.status(200).json({ ok: true });
}
