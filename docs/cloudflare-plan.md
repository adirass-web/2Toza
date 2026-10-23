# Cloudflare plan (free tier)

**Historical plan:** the analytics, contact-click logging and callback instructions below are superseded by the current no-tracking specification and latest owner decisions. Do not activate them. Current release planning is in `docs/superpowers/plans/2026-10-23-2toza-roadmap-improvements.md`; preview and release indexing policies must be validated separately before P10 cut-over.

Project: Cloudflare Pages `toza-v2`, in Dr. Tabansky's account. No Access (V-012).

## Turn on, in order

| # | Feature | When | Why | Notes |
|---|---|---|---|---|
| 1 | **Web Analytics** (cookieless) | Now, on the preview | Visitor stats without cookies or a consent banner; fits the no-trackers rule (V-005) | Enable for the Pages project. No script edits needed when enabled from Pages; otherwise one beacon tag in the base layout. |
| 2 | **Pages Functions** for `/go/whatsapp`, `/go/signal`, `/go/callback`, `/go/TZ-xxxx` | Phase 4 build | Log each contact click (page, source/UTM, referral code), then redirect straight to the channel | Free allowance ~100k requests/day. No personal data stored. Spec in `strategy/2b-referral-model.md` §7. |
| 3 | **Custom domain** | After copy and design approval (V-002) | Credibility; required for ads and SEO later | Add domain to Cloudflare, attach to the project; HTTPS automatic. Add HSTS header and a `www` → apex redirect. Remove `noindex` only at launch. |
| 4 | **Bot Fight Mode** + default DDoS protection | With the domain | Basic abuse protection at no cost | Zone-level settings; need the custom domain. |

Not needed: Turnstile (no forms), Access (declined), Zero Trust.

## Secrets (set)
`CLOUDFLARE_API_TOKEN` (Pages edit only) and `CLOUDFLARE_ACCOUNT_ID` in GitHub Actions secrets. The deploy workflow validates their format before use.
