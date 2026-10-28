import { redis, KEY } from "./_redis.js";

export default async function handler(req, res) {
  if (!process.env.ADMIN_KEY || req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
    return res.status(401).json({ error: "Unauthorized" });
  const all = (await redis.hgetall(KEY)) || {};
  const responses = Object.entries(all).map(([id, v]) => ({ id, ...(typeof v === "string" ? JSON.parse(v) : v) }));
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ responses });
}
