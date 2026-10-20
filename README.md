# tollkit.dev

The TOLLkit website: a static site on Cloudflare Pages. Push to `main` and it deploys.

TOLLkit Wallet is the product: a self-custody wallet where Autopilot, bots or the owner's own AI trade inside limits only the owner can change. The pay-per-call tools (web pages, on-chain data, public data, product data, signed page proofs) are what the wallet's AI reaches for, and any other AI can connect to them at `https://api.tollkit.dev/mcp`.

The code behind the site lives elsewhere: the server in `x402-starter`, the wallet in `tollkit-wallet` (plus `tollkit-extension` and `tollkit-mobile`).

## Pages

| Path | What it is |
|---|---|
| `/` | Home: the wallet, the three ways it trades, the toolbox |
| `/wallet` | TOLLkit Wallet: download, limits, Autopilot (coming soon), bots, your AI |
| `/bots` | Bots: the rules you can pick, and results people chose to share |
| `/tools` | Every tool and price, plus `#connect`: the address and app steps for Claude, ChatGPT, Cursor, VS Code and the command line |
| `/weigh-station` | Free checks for any x402 endpoint; paid monitoring for sellers |
| `/command` | Live: calls, tools and uptime right now (owner view with the ops key) |
| `/report` | Weekly x402 market report |
| `/status` | Uptime history (data from `status-worker/`) |
| `/wallet/terms`, `/wallet/privacy` | Wallet legal pages |
| `/terms`, `/privacy` | API legal pages |
| `/treasury` | Operator only: the weekly fee sweep. Opens with the ops key; noindex |

Redirects (`_redirects`): `/connect` → `/tools#connect`, `/stats` → `/command`, `/fund` and `/authorize` → `/wallet`, `/tollkit-town` → `/wallet`.

## Shared files

- `nav.css`: the site nav (`TOLL<span>kit</span>` wordmark, links Wallet · Autopilot · Bots · Tools · Connect · Live). Every page includes it.
- `motion.css`, `motion.js`: the fade-in on scroll.
- `connect-widget.js`: the "Connect your AI" app picker. Any element with `data-connect` opens it as a dialog; `data-connect-inline` renders it in place.
- `wallet/img/`: wallet screenshots and the Autopilot render.
- `skills/`: the skill zips linked from Weigh Station.
- `treasury/`: the pinned ethers and solana-web3 builds and the token list the sweep page uses (see `NOTICE.txt`).
- `llms.txt`, `robots.txt`, `sitemap.xml`: for crawlers and AIs.

## Editing

No build step. Edit the HTML, check it locally, push.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

House rules: the name is styled **TOLLkit** on the site (the legal name stays Tollkit LLC); no city names; every price on `/tools` is read live from the service's `/health` so the tables stay honest; keep the skills command spelled one way, `npx skills add UltraStarz/tollkit-skills`.
