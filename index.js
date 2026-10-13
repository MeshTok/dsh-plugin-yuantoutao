import * as McpClient from '@deepseek-ai/dsh-mcp-client'

/**
 * Yuantoutao commerce plugin for DeepSeek Harness (电商插件).
 *
 * Works OUT OF THE BOX without any API key — read-only shopping tools
 * (search/compare 50k+ products on Taobao/JD/Pinduoduo) hit the local shelf
 * quota-free. Add a free API key to unlock live fan-out, orders & commission:
 *   config.apiKey, env YUANTOUTAO_API_KEY, or mint at https://yuantoutao.com/console/
 * Free keys never expire (no signup). Bind a developer account to withdraw
 * commissions: POST https://mcp.yuantoutao.com/mcp/trial/bind-code with your key.
 *
 * Config (all optional): apiKey, url, serverName, toolCallTimeoutMs, failOnStartupError
 */
export function apply(ctx, config = {}) {
  const apiKey = config.apiKey || process.env.YUANTOUTAO_API_KEY || ''
  const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {}
  const clientConfig = McpClient.Config({
    transport: 'streamable-http',
    serverName: config.serverName || 'yuantoutao',
    url: config.url || 'https://mcp.yuantoutao.com/mcp',
    headers,
    toolCallTimeoutMs: config.toolCallTimeoutMs ?? 30000,
    failOnStartupError: config.failOnStartupError ?? false,
  })
  const p = ctx.plugin(McpClient, clientConfig)
  if (!apiKey) {
    console.log('[dsh-plugin-yuantoutao] running KEYLESS (read-only shopping, no commission). ' +
      'Add a free key (never expires): https://yuantoutao.com/console/ or env YUANTOUTAO_API_KEY — unlocks live fan-out, orders & 3% commission. Pass client_ref on convert/search tools to tag your end-users and reward them yourself (orders come back via GET /v1/cps/attribution/orders).')
  }
  return p
}
