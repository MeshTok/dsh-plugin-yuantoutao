# dsh-plugin-yuantoutao

[English](README.md) | [中文](#中文)

<a id="中文"></a>

**DeepSeek Harness 的电商插件。** 一个 MCP 服务，给你的 AI 加上完整电商能力：商品搜索、
券后比价、带归因购买链接、订单履约——覆盖淘宝 / 京东 / 拼多多 5 万+ 精选商品。

**关键词**：电商插件 · MCP 服务 · DeepSeek Harness 插件 · AI 购物 · 对话购物 ·
商品搜索 · 全网比价 · 历史价格 · 优惠券 · 购物返现入口 · 淘宝 · 天猫 · 京东 · 拼多多 ·
淘宝客 · 京东联盟 · 多多进宝 · 带归因购买链接 · 订单履约 · 源头淘

## 亮点 功能一览

- **对话购物**：自然语言搜商品，支持预算与偏好（「500 元内的礼物」「要便宜还要正品」）
- **可解释排序**：每件商品带评分与逐因子理由（价格 vs 类目均价、店铺层级、销量、券），可直接引用
- **三平台实时扇出**：淘宝/京东/拼多多官方联盟渠道并行查询
- **变现能力**：购买链接全自动归因，用户下单你拿 3%（有效订单成交额分成，按月结算，满 10 元提现）
- **履约闭环**：幂等下单、微信支付、物流轨迹、免费上门取件

## 零门槛：不需要任何 API key

装完即用。只读购物工具（5 万+ 商品搜索、对比、购买链接）**免 key 直连**——
无需注册、无需 token，本地货架不占平台配额。
需要**佣金**时（实时扇出、下单、3% 开发者分成、提现）再加免费 key：
[控制台领取](https://yuantoutao.com/console/) 或请求 `POST https://mcp.yuantoutao.com/mcp/trial`（免注册），key 永久有效。

## 安装

```sh
dsh plugin add github:yuantoutao/dsh-plugin-yuantoutao
# 然后重启：dsh web （或 dsh headless）
```

## 配置

设置 API key（免费开发者 key：[yuantoutao.com/console](https://yuantoutao.com/console/)）：

```sh
export YUANTOUTAO_API_KEY=ak_your_key
```

或在 profile 配置里设置插件项 `apiKey`；可选 `url`、`serverName`、
`toolCallTimeoutMs`、`failOnStartupError`。

## 工具（命名空间 `mcp__yuantoutao__*`）

| 工具 | 能力 |
|---|---|
| `cps_smart_search` | 旗舰购物搜索：自然语言 + 预算 + 均衡/品质/低价三种模式，每件商品带可解释三因子评分，可选实时扇出淘宝/京东/拼多多 |
| `cps_compare` | 2–6 件商品对比矩阵（价 vs 类目均价、券、店铺层级、规格行） |
| `shelf_search` / `shelf_item` | 本地精选货架（不耗平台配额），相关性/销量/价格/最新排序 |
| `cps_search_shops` / `cps_item_info` / `cps_tpwd` | 淘宝：店铺搜索、商品详情、淘口令（站外分享） |
| `cps_jd_goods_search` / `cps_jd_convert` / `cps_jd_orders` | 京东：关键词搜索（含评价数）、联盟转链、订单明细 |
| `cps_pdd_goods_search` / `cps_pdd_convert` / `cps_pdd_orders` | 拼多多：关键词搜索、goods_sign 转链、订单明细 |
| `cps_eleme_convert` | 饿了么官方活动链接（外卖红包） |
| `search_goods` / `get_goods_detail` / `create_order` / `get_order_status` / `get_logistics` / `request_aftersale` | 履约流程（服务端计价、幂等下单、物流轨迹、免费上门取件） |

完整文档：[llms.txt](https://yuantoutao.com/llms.txt) · [开发者控制台](https://yuantoutao.com/console/)

## License

MIT
