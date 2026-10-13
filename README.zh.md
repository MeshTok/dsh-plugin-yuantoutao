# dsh-plugin-yuantoutao

[English](README.md) | [中文](#中文)

<a id="中文"></a>

**源头淘商业工具接入 DeepSeek Harness。** 一个 Streamable HTTP MCP 服务，搜索/对比
5 万+ 精选商品（淘宝 / 京东 / 拼多多官方渠道），获取带归因的购买链接，查询订单。

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
