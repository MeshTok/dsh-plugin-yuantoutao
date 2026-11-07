import * as McpClient from '@deepseek-ai/dsh-mcp-client'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const VERSION = '0.2.0'
// 渠道识别 UA（2026-11-07）：服务端按 UA 记录 mcp_calls / cps_clicks，源头淘后台可区分 DSH 插件渠道
const UA = `dsh-plugin-yuantoutao/${VERSION} (+https://github.com/yuantoutao/dsh-plugin-yuantoutao; DeepSeek-Harness)`
const TRIAL_URL = 'https://mcp.yuantoutao.com/mcp/trial'
const KEY_FILE = path.join(os.homedir() || os.tmpdir(), '.dsh-yuantoutao-key.json')

/**
 * 无 key 时自动领免费 key（POST /mcp/trial：免注册、永不过期、全 20 工具）并缓存本地。
 * 好处（2026-11-07）：keyless 只搜本地货架且无归因；带 key 解锁 live 全网扇出（结果质量↑）+
 * 每个安装一个可追踪 agent 位（佣金/点击/漏斗全归因，绑定开发者账号后历史佣金全量可提现）。
 * 用户零配置：配置过 apiKey / 环境变量则完全不触碰本地文件。
 */
async function ensureApiKey(config) {
  const configured = config.apiKey || process.env.YUANTOUTAO_API_KEY || ''
  if (configured) return { key: configured, source: 'config' }
  try {
    const j = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'))
    if (j && typeof j.key === 'string' && j.key.startsWith('ak_')) return { key: j.key, source: 'cache' }
  } catch { /* 无缓存 → 领新 */ }
  try {
    const r = await fetch(TRIAL_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'user-agent': UA },
      body: '{}',
      signal: AbortSignal.timeout(6000),
    })
    if (r.ok) {
      const j = await r.json().catch(() => null)
      if (j && typeof j.key === 'string' && j.key.startsWith('ak_')) {
        try { fs.writeFileSync(KEY_FILE, JSON.stringify({ key: j.key, agent_id: j.agent_id, minted_at: new Date().toISOString() })) } catch { /* 缓存失败不影响本次使用 */ }
        return { key: j.key, source: 'minted' }
      }
    }
  } catch { /* 网络/服务不可用 → keyless 兜底（只读货架仍可用） */ }
  return { key: '', source: 'keyless' }
}

/**
 * Yuantoutao commerce plugin for DeepSeek Harness (电商插件).
 *
 * Works OUT OF THE BOX: if no apiKey is configured, the plugin auto-mints a free key
 * (POST /mcp/trial, no signup, never expires) and caches it at ~/.dsh-yuantoutao-key.json —
 * unlocking live 3-platform fan-out and full commission attribution per install.
 * Pin your own key via config.apiKey or env YUANTOUTAO_API_KEY to skip local caching.
 * Bind a developer account to withdraw commissions: POST /mcp/trial/bind-code with your key.
 *
 * Config (all optional): apiKey, url, serverName, toolCallTimeoutMs, failOnStartupError
 */
export async function apply(ctx, config = {}) {
  const { key, source } = await ensureApiKey(config)
  const headers = {
    'user-agent': UA,
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  }
  const clientConfig = McpClient.Config({
    transport: 'streamable-http',
    serverName: config.serverName || 'yuantoutao',
    url: config.url || 'https://mcp.yuantoutao.com/mcp',
    headers,
    toolCallTimeoutMs: config.toolCallTimeoutMs ?? 30000,
    failOnStartupError: config.failOnStartupError ?? false,
  })
  const p = ctx.plugin(McpClient, clientConfig)
  if (!key) {
    console.log('[dsh-plugin-yuantoutao] running KEYLESS (read-only shelf search, no commission). ' +
      'Add a free key (never expires): https://yuantoutao.com/console/ or env YUANTOUTAO_API_KEY — unlocks live fan-out, orders & 3% commission. Pass client_ref on convert/search tools to tag your end-users and reward them yourself (orders come back via GET /v1/cps/attribution/orders).')
  } else if (source === 'minted') {
    console.log(`[dsh-plugin-yuantoutao/${VERSION}] auto-minted a free API key (cached at ${KEY_FILE}). ` +
      'Bind a developer account at https://yuantoutao.com/console/ to withdraw commissions earned by this install.')
  }
  return p
}
