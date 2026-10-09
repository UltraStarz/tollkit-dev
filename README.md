# tollkit.dev

Static landing page for the **tollkit.dev** brand — a family of paid developer tools that AI agents call over the [x402](https://x402.org) protocol.

- **Live:** <https://tollkit.dev> (apex, hosted on Cloudflare Pages)
- **Products:** weigh-station (free) · tollkit-web — read a page as text $0.002, screenshot $0.003, page brief $0.007, PDF to text $0.005, search and read $0.015 · tollkit-chain — wallet balance, token info, transaction lookup $0.002, token price $0.001, token check $0.004, wallet portfolio $0.005, pre-trade check $0.01 (Base, Ethereum and Solana) · tollkit-data — SEC company $0.002, financials $0.004, company snapshot $0.006, due diligence $0.03, IP lookup $0.002 (DB-IP Lite), US weather $0.002 (NWS), exchange rates $0.002 (ECB) · [tollkit-extract](https://extract.tollkit.dev) — product data, $0.01 a page or $0.04 for up to five · tollkit-attest — signed page proof, $0.05 · [tollkit-sms](https://sms.tollkit.dev) — from $0.03 a message (coming soon) · Unlisted: /stats (paid-call tracker)

## Structure

Single static HTML file. No build step. Edit `index.html`, push, Cloudflare Pages auto-deploys.

```
tollkit-dev/
├── index.html      # entire site (HTML + inline CSS)
└── README.md
```

The dark palette and typography intentionally match `sms.tollkit.dev` so the brand feels coherent across subdomains.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to `main`. Cloudflare Pages is connected to this repo and auto-deploys.

## Adding a new product card

In `index.html`, find the `#products` section and copy one of the existing `.product` divs. Three pieces to update:

- `<h3>` — the product name (e.g. `x402-extract`)
- `.badge` — `live` (green) or `soon` (gray)
- `.product-body` — one-sentence pitch
- `.product-meta` — link to the product's live URL + npm + github
