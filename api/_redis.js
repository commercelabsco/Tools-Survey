import { Redis } from "@upstash/redis";
// Works with the Upstash Redis integration from the Vercel Marketplace
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});
export const KEY = "tool-survey:responses";
