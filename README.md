# CommerceLabs Tool Survey

- `/` – the survey
- `/results.html` – results (password protected)

## Deploy on Vercel
1. Push this folder to a GitHub repo and import it in Vercel (no build settings needed).
2. In the project: **Storage → Marketplace → Upstash (Redis)** → create and connect it. This adds the Redis env vars automatically.
3. **Settings → Environment Variables** → add `ADMIN_KEY` = a password for the results page.
4. Redeploy.
