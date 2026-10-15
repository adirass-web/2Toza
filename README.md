# Toza v2

Competing rebuild of the Toza website (front end and message architecture). The approved site (`adirass-web/VIP`) is untouched and stays live until v2 passes its gates and the owner chooses.

- **Approver:** Dr. Lior Tabansky. Hebrew-first market; English copy is drafted first, Hebrew after copy and design are approved.
- **Preview only:** every page is `noindex`; host is the Cloudflare Pages project `toza-v2`, behind Cloudflare Access. No custom domain until approval.

## Branches
| Branch | Purpose |
|---|---|
| `main` | Integrated v2. PR-only. Deploys to the `toza-v2` preview. |
| `upstream-baseline` | Frozen copy of `adirass-web/VIP` @ `ed9ba06`. Never edited. |
| `design/*` | Competing design directions, one preview URL each. |
| `copy/*`, `build/*`, `research/*` | Work branches. |

## Rules
1. **Facts are locked** in `src/_data/facts.json` (from the approved site's `llms.txt`). Templates read prices from it; `npm run check` fails on any ₪ amount not listed there. Change only on an owner decision.
2. **Prose is free but reviewed:** independent review plus owner approval before merge.
3. Boundaries and pre-message warnings live in the FAQ only (see `strategy/BRIEF.md`).
4. Read-only watch on upstream facts: `npm run check:upstream` (weekly workflow).
5. No third-party trackers. Measurement is cookieless analytics plus first-party `/go/*` click logging (to be built).

## Commands
`npm ci` · `npm run build` · `npm run check` · `npm start`

## Deploy (owner side, one-time)
Repository secrets: `CLOUDFLARE_API_TOKEN` (scope: Pages edit, nothing else) and `CLOUDFLARE_ACCOUNT_ID`. Then in Cloudflare Zero Trust, add an Access policy on `toza-v2.pages.dev` and `*.toza-v2.pages.dev` allowing only named emails. Without the secrets, the workflow builds and checks but skips the deploy.

## Layout
`strategy/` message architecture, referral model, brief · `research/` phase 1 · `docs/decisions.md` decision log · `reference/` frozen upstream facts.
