# MCP Directory Listing — Yuantoutao Agent Mall

Standard listing materials for MCP directories (PulseMCP / mcp.so / Glama / Smithery /
MCPServers.org etc). Copy-paste per field. Last updated: 2026-10-13.

---

## Name

Yuantoutao Agent Mall (源头淘 Agent 商城)

## One-line description (EN)

Cross-border-ready shopping MCP for Chinese e-commerce: search and compare 50k+
curated products across Taobao, JD and Pinduoduo with explainable ranking, coupons,
and trackable affiliate buy links.

## One-line description (CN)

源头淘 Agent 商城：一个 MCP 接入淘宝/京东/拼多多 5 万+ 精选商品，可解释排序、券后价、
带归因购买链接。

## Full description (EN)

Yuantoutao Agent Mall is a commerce MCP server backed by a 50,000+ item curated shelf
covering Taobao/Tmall, JD and Pinduoduo official affiliate channels. Highlights:

- **Explainable smart search** — natural-language + budget + three modes
  (balanced/quality/price); every item carries a score and per-factor reasons you can
  quote verbatim to your user. Optional `live=1` fans out to all three platforms in
  parallel (~1s).
- **Comparison matrix** — 2–6 items vs category average price, coupons, shop tier,
  review signals and Chinese spec lines.
- **Affiliate conversion** — Taobao click URLs / taobao-password, JD affiliate links,
  Pinduoduo goods_sign links; commissions tracked automatically (3% developer share, effective 2026-10-14).
- **Fulfillment flow** — server-computed pricing, idempotent ordering (Idempotency-Key),
  WeChat pay QR / redirect, waybill tracking, free-return pickups.

Auth: `Authorization: Bearer ak_...` — free developer key, self-serve at the console.
Protocol: MCP Streamable HTTP (JSON-RPC), 20 tools.

## Endpoint

- MCP (Streamable HTTP): `https://mcp.yuantoutao.com/mcp`
- REST (same semantics): `https://api.yuantoutao.com/v1`
- Console (free key): `https://api.yuantoutao.com/console/`
- Machine-readable docs: `https://yuantoutao.com/llms.txt`

## Categories / tags

shopping, e-commerce, china, taobao, jd, pinduoduo, affiliate, cps, price-comparison

## Requirements

- Free API key (`ak_...`) from the developer console
- Any MCP 2025-03-26+ Streamable HTTP client (headers: `Authorization`)

## Pricing

Free developer tier (rate-limited). 3% commission share on attributed purchases ("user buys, you earn 3%"),
settled monthly.

---

## WorkBuddy connector config (paste into MCP servers JSON)

```json
{
  "mcpServers": {
    "yuantoutao": {
      "type": "http",
      "url": "https://mcp.yuantoutao.com/mcp",
      "headers": {
        "Authorization": "Bearer ak_YOUR_KEY"
      }
    }
  }
}
```

## Claude Desktop / generic stdio-less clients (mcp-remote)

```json
{
  "mcpServers": {
    "yuantoutao": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.yuantoutao.com/mcp",
               "--header", "Authorization: Bearer ak_YOUR_KEY"]
    }
  }
}
```
