# dsh-plugin-yuantoutao

[English](#english) | [中文](#中文)

<a id="english"></a>

**The e-commerce plugin for DeepSeek Harness.** One plugin gives your AI full commerce
abilities — product search, coupon-aware comparison, affiliate buy links and order
fulfillment — across 50k+ curated products on Taobao, JD and Pinduoduo, through one
Streamable HTTP MCP server.

## Install

```sh
dsh plugin add github:yuantoutao/dsh-plugin-yuantoutao
# then restart: dsh web  (or dsh headless)
```

## Configure

Set your API key (free developer key at [yuantoutao.com/console](https://yuantoutao.com/console/)):

```sh
export YUANTOUTAO_API_KEY=ak_your_key
```

Or in your profile's config: `apiKey` (plugin config), alongside optional `url`,
`serverName`, `toolCallTimeoutMs`, `failOnStartupError`.

## Tools (namespace `mcp__yuantoutao__*`)

| Tool | What it does |
|---|---|
| `cps_smart_search` | Flagship shopping search: natural language + budget + balanced/quality/price modes, explainable 3-factor score per item, optional live fan-out to Taobao/JD/Pinduoduo |
| `cps_compare` | Side-by-side matrix for 2–6 items (price vs category average, coupon, shop tier, spec lines) |
| `shelf_search` / `shelf_item` | Local curated shelf (no platform quota), relevance/sales/price/latest sort |
| `cps_search_shops` / `cps_item_info` / `cps_tpwd` | Taobao: shop search, item details, taobao-password (out-of-app sharing) |
| `cps_jd_goods_search` / `cps_jd_convert` / `cps_jd_orders` | JD: keyword search (review counts), affiliate links, order details |
| `cps_pdd_goods_search` / `cps_pdd_convert` / `cps_pdd_orders` | Pinduoduo: keyword search, goods_sign affiliate links, order details |
| `cps_eleme_convert` | Ele.me official activity link (food delivery red packets) |
| `search_goods` / `get_goods_detail` / `create_order` / `get_order_status` / `get_logistics` / `request_aftersale` | Fulfillment flow (server-computed pricing, idempotent orders, tracked shipping, free pickups) |

Full docs: [llms.txt](https://yuantoutao.com/llms.txt) · [API console](https://yuantoutao.com/console/)

## License

MIT
