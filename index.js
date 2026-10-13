import * as McpClient from '@deepseek-ai/dsh-mcp-client'

/**
 * Yuantoutao commerce bridge for DeepSeek Harness.
 *
 * Composes one @deepseek-ai/dsh-mcp-client instance (Streamable HTTP) pointed
 * at the yuantoutao MCP server. Tools land in the model namespace as
 * `mcp__yuantoutao__<tool>` — search/compare 50k+ curated products across
 * Taobao/JD/Pinduoduo, get trackable affiliate buy links, query orders.
 *
 * Config (all optional unless noted):
 *  - apiKey            Bearer token; falls back to env YUANTOUTAO_API_KEY.
 *                      Free developer key: https://yuantoutao.com/console/
 *  - url               MCP endpoint; default https://mcp.yuantoutao.com/mcp
 *  - serverName        tool namespace; default 'yuantoutao'
 *  - toolCallTimeoutMs per-call timeout; default 30000
 *  - failOnStartupError default false (degrade gracefully when offline)
 */
export function apply(ctx, config = {}) {
  const apiKey = config.apiKey || process.env.YUANTOUTAO_API_KEY
  if (!apiKey) {
    throw new Error('[dsh-plugin-yuantoutao] API key missing. Set YUANTOUTAO_API_KEY (env) or apiKey in config. Free developer key: https://yuantoutao.com/console/')
  }
  const clientConfig = McpClient.Config({
    transport: 'streamable-http',
    serverName: config.serverName || 'yuantoutao',
    url: config.url || 'https://mcp.yuantoutao.com/mcp',
    headers: { Authorization: `Bearer ${apiKey}` },
    toolCallTimeoutMs: config.toolCallTimeoutMs ?? 30000,
    failOnStartupError: config.failOnStartupError ?? false,
  })
  return ctx.plugin(McpClient, clientConfig)
}
