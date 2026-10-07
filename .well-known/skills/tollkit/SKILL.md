---
name: tollkit
description: Tollkit's pay-per-call tools for agents, paid in USDC on Base or Solana with x402 (no account, no API key). Use when a task needs to read, summarize or screenshot a web page in a real browser; get a product's price from a store page; search the web and read the results; read a PDF; check a wallet balance, token, transaction or token price on Base, Ethereum or Solana, or vet a token before buying or trading; get SEC filings or a company's financials; geolocate an IP; get a US weather forecast, airport delays or an address's coordinates; convert currencies; find the best paid x402 tool for a job; or produce signed proof of what a web page said.
license: Proprietary. Free to install and use; each tool call is paid per call.
compatibility: Needs outbound HTTPS and an x402-capable wallet holding USDC on Base or Solana (for example Coinbase's Agentic Wallet, `npx awal`). No account or API key.
metadata:
  author: tollkit.dev
  version: "1.0"
---

# Tollkit: web, on-chain and public-data tools, paid per call

Every tool is one HTTPS POST with a JSON body. Call it without payment and it answers HTTP 402 with the exact price, once for each network you can pay on (USDC on Base, or USDC on Solana). Pay, retry, get the answer. **A call that fails is never charged.**

## Pay with the Agentic Wallet CLI

```bash
npx awal@latest x402 pay https://web.tollkit.dev/read -X POST \
  -d '{"url":"https://example.com"}' --max-amount 2000 --json
```

`--max-amount` is in USDC atomic units (1000 = $0.001). Set it to the tool's price below. Any x402 v2 client works the same way (`@x402/fetch`, Coinbase's payments MCP, your own signer).

## Tools

Prices are what each call costs today; the live price is always in the 402 quote.

| Task | POST | Body | Price |
|---|---|---|---|
| Read a page as clean text (real browser) | `https://web.tollkit.dev/read` | `{"url"}` | $0.002 |
| Read **and** summarize a page | `https://web.tollkit.dev/web/brief` | `{"url", "max_words"?}` | $0.007 |
| Screenshot a page (1280x800 JPEG) | `https://web.tollkit.dev/screenshot` | `{"url"}` | $0.003 |
| Summarize text you have | `https://web.tollkit.dev/summarize` | `{"text", "max_words"?}` | $0.005 |
| **PDF to text**, page by page | `https://web.tollkit.dev/pdf` | `{"url", "max_pages"?}` | $0.005 |
| Search the web and read the top 1-3 pages | `https://web.tollkit.dev/search/read` | `{"query", "num"?}` | $0.015 |
| Product price, stock, brand from a store page | `https://extract.tollkit.dev/extract` | `{"url"}` | $0.01 |
| Same for up to 5 stores, one payment | `https://extract.tollkit.dev/extract/batch` | `{"urls": [...]}` | $0.04 |
| Wallet balance (native, USDC, USDT, tokens) | `https://chain.tollkit.dev/chain/balance` | `{"address", "chain"?, "tokens"?}` | $0.002 |
| Token info (name, symbol, supply) | `https://chain.tollkit.dev/chain/token` | `{"token", "chain"?}` | $0.002 |
| Transaction lookup | `https://chain.tollkit.dev/chain/tx` | `{"hash", "chain"?}` | $0.002 |
| Token USD price from on-chain pools | `https://chain.tollkit.dev/chain/price` | `{"token", "chain"?}` | $0.002 |
| **Token check** before buying or accepting a token | `https://chain.tollkit.dev/chain/check` | `{"token", "chain"?}` | $0.004 |
| **Wallet portfolio** in USD with liquidity warnings | `https://chain.tollkit.dev/chain/portfolio` | `{"address", "chain"?, "tokens"?}` | $0.008 |
| **Pre-trade check**: price, liquidity, price impact of your size, your holding, recent news | `https://chain.tollkit.dev/chain/pretrade` | `{"token", "chain"?, "wallet"?, "amount_usd"?}` | $0.01 |
| SEC company profile and filings | `https://data.tollkit.dev/sec/company` | `{"ticker"}` or `{"cik"}` | $0.002 |
| SEC key financials | `https://data.tollkit.dev/sec/financials` | `{"ticker"}` | $0.005 |
| **Company snapshot** (profile + key filings + financials) | `https://data.tollkit.dev/data/company` | `{"ticker"}` | $0.006 |
| **Company due diligence** (ratios, filings, 8-K event summaries) | `https://data.tollkit.dev/data/diligence` | `{"ticker"}` | $0.03 |
| IP geolocation | `https://data.tollkit.dev/ip` | `{"ip"}` | $0.002 |
| US weather forecast and alerts | `https://data.tollkit.dev/weather` | `{"lat", "lon"}` or `{"address"}` | $0.002 |
| US airport delays and ground stops (FAA) | `https://data.tollkit.dev/airport/status` | `{"airport"?}` (e.g. `"JFK"`; omit for all) | $0.003 |
| US address to latitude/longitude | `https://data.tollkit.dev/geocode` | `{"address"}` | $0.002 |
| **Best x402 tools for a task** (ranked by repeat buyers) | `https://data.tollkit.dev/market/best` | `{"task", "limit"?}` | $0.01 |
| x402 seller lookup | `https://data.tollkit.dev/market/seller` | `{"host"}` | $0.02 |
| Whole x402 market dataset (weekly) | `https://data.tollkit.dev/market/dataset` | `{}` | $0.10 |
| Currency conversion (ECB rates) | `https://data.tollkit.dev/fx` | `{"from", "to", "amount"?}` | $0.002 |
| Signed proof of what a page said | `https://attest.tollkit.dev/attest` | `{"url"}` | $0.25 |

`chain` is `"base"` (default), `"ethereum"` or `"solana"`. Solana addresses and mints are base58; for a Solana price you can pass `"token": "SOL"`.

## Good to know

- **Failures are free.** Anything answered with HTTP 400 or above settled nothing. Bad input, a page that won't load, an unknown ticker, a token with no pool: no charge.
- **Token check** returns facts read from the chain as `warnings` (no pool, thin liquidity; on Base and Ethereum the contract's owner and whether it is upgradeable or has mint, pause, blacklist or fee-setting functions, in `controls`; on Solana an active mint or freeze authority). It is not a rating; no warnings does not mean safe.
- **Page brief** says `input_truncated: true` when the page was longer than the part it summarized.
- **Attest** results can be verified by anyone, free: `POST https://attest.tollkit.dev/attest/verify` with the attestation.
- Full schemas: each hostname's own `/openapi.json` (`https://web.tollkit.dev/openapi.json`, `https://data.tollkit.dev/openapi.json`, `https://chain.tollkit.dev/openapi.json`, `https://extract.tollkit.dev/openapi.json`, `https://attest.tollkit.dev/openapi.json`). Plain-language guide: `https://api.tollkit.dev/llms.txt`. Live prices: `https://extract.tollkit.dev/health`.
- Prefer MCP? Add `https://api.tollkit.dev/mcp` as a remote MCP server; paid tools return the payment quote as their result. Through MCP the everyday tools (read, screenshot, PDF, weather, airport delays, geocoding, FX, IP, wallet/token/transaction lookups, SEC company) give 3 free calls a day with no wallet.
