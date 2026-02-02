# Render Deployment Guide

## Service Settings
- Service Type: Web Service (Node)
- Root Directory: nextjs_space
- Recommended Node: 18 (LTS)
- Build Command: `yarn install --frozen-lockfile && npx prisma generate && yarn build`
- Start Command: `npx prisma migrate deploy && yarn start`

## Environment Variables (keys only)
Required:
- DATABASE_URL
- NEXTAUTH_URL
- NODE_VERSION=18

Also referenced in code (optional unless you set custom build/output paths):
- NEXT_DIST_DIR
- NEXT_OUTPUT_MODE

## Domain and DNS Cutover (Render + Cloudflare)
1. Add apex and `www` domains to the Render service.
2. Set DNS TTL to 300 seconds.
3. Create DNS record for apex (@): ALIAS/ANAME to `<your-service>.onrender.com` or use Render-provided A records.
4. Create DNS record for `www`: CNAME to `<your-service>.onrender.com`.
5. Keep records DNS-only until Render issues the TLS certificate.
6. Set Cloudflare SSL/TLS mode to Full (Strict).
7. Verify HTTPS works for apex and `www`.
8. After verification, optionally enable proxying.
