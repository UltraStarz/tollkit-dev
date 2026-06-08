# tollkit.dev

Static landing page for the **tollkit.dev** brand — a family of paid developer tools that AI agents call over the [x402](https://x402.org) protocol.

- **Live:** <https://tollkit.dev> (apex, hosted on Cloudflare Pages)
- **First product:** [x402-sms](https://sms.tollkit.dev) — transactional SMS, $0.03 USDC per message

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
