import { renderHTML } from './html.js';

const DEFAULT_PASSWORD = 'your_secure_password';

// Helper to send JSON responses
function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...headers,
    },
  });
}

// Auto ensure D1 table exists
async function ensureTable(db) {
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL
      )
    `).run();
    await db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC)
    `).run();
  } catch (e) {
    console.error('Failed to auto-init schema:', e);
  }
}

// Auth verification helper
function verifyAuth(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  const expectedPassword = env.AUTH_PASSWORD || DEFAULT_PASSWORD;

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    return token === expectedPassword;
  }
  return false;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Serve Frontend HTML SPA
    if (path === '/' || path === '/index.html') {
      return new Response(renderHTML(), {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // PWA Manifest
    if (path === '/manifest.json') {
      const manifest = {
        name: 'TextRelay 文本中转站',
        short_name: 'TextRelay',
        description: '极速、优雅的个人跨端文本与剪贴板中转站',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#07090e',
        theme_color: '#07090e',
        icons: [
          {
            src: '/icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      };
      return new Response(JSON.stringify(manifest), {
        headers: {
          'Content-Type': 'application/manifest+json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // PWA Service Worker
    if (path === '/sw.js') {
      const swCode = `
        self.addEventListener('install', (e) => self.skipWaiting());
        self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
        self.addEventListener('fetch', (e) => {
          // Let network handle dynamic API and pages
          e.respondWith(fetch(e.request));
        });
      `;
      return new Response(swCode, {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // App Icon SVG
    if (path === '/icon.svg') {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
          <linearGradient id="drop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="50%" stop-color="#06b6d4" />
            <stop offset="100%" stop-color="#10b981" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="24" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <rect width="512" height="512" rx="128" fill="url(#bg)" />
        <rect width="510" height="510" x="1" y="1" rx="127" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2" />
        <g transform="translate(136, 116)" filter="url(#glow)">
          <path d="M120 0 C120 0 0 160 0 230 C0 296 54 350 120 350 C186 350 240 296 240 230 C240 160 120 0 120 0 Z" fill="url(#drop)" opacity="0.95" />
          <path d="M75 190 C60 215 60 245 75 270 C85 285 100 295 105 295 C100 290 85 275 85 250 C85 225 100 205 105 195 Z" fill="#ffffff" opacity="0.65" />
          <circle cx="150" cy="180" r="14" fill="#ffffff" opacity="0.8" />
        </g>
      </svg>`;
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml; charset=utf-8',
          'Cache-Control': 'public, max-age=604800',
        },
      });
    }

    // Health check
    if (path === '/api/health') {
      return jsonResponse({ status: 'ok', time: Date.now() });
    }

    // Login endpoint
    if (path === '/api/auth/login' && method === 'POST') {
      try {
        const body = await request.json();
        const inputPassword = (body.password || '').trim();
        const expectedPassword = env.AUTH_PASSWORD || DEFAULT_PASSWORD;

        if (inputPassword === expectedPassword) {
          return jsonResponse({
            success: true,
            token: expectedPassword,
          });
        }
        return jsonResponse({ success: false, error: '访问密码错误' }, 401);
      } catch (err) {
        return jsonResponse({ success: false, error: '请求格式错误' }, 400);
      }
    }

    // All below endpoints require authorization
    if (path.startsWith('/api/messages')) {
      if (!verifyAuth(request, env)) {
        return jsonResponse({ success: false, error: '未授权或密码失效' }, 401);
      }

      const db = env.DB || env.info_db;
      if (!db) {
        return jsonResponse(
          {
            success: false,
            error: '未检测到 D1 数据库绑定。请检查 wrangler.toml 或 Cloudflare 网页后台中的 D1 绑定配置 (DB 或 info_db)。',
          },
          500
        );
      }

      // Ensure table exists on first query
      await ensureTable(db);

      // GET /api/messages - Fetch all recent messages
      if (path === '/api/messages' && method === 'GET') {
        try {
          const limit = Math.min(parseInt(url.searchParams.get('limit') || '200', 10), 500);
          const { results } = await db.prepare(
            'SELECT id, content, created_at FROM messages ORDER BY created_at DESC LIMIT ?'
          )
            .bind(limit)
            .all();

          return jsonResponse({ messages: results || [] });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // POST /api/messages - Send new text message
      if (path === '/api/messages' && method === 'POST') {
        try {
          const body = await request.json();
          const content = (body.content || '').trim();

          if (!content) {
            return jsonResponse({ success: false, error: '内容不能为空' }, 400);
          }

          if (content.length > 200000) {
            return jsonResponse({ success: false, error: '单条信息长度不能超过 200,000 字符 (约 200KB 纯文本)' }, 400);
          }

          const id = crypto.randomUUID();
          const createdAt = Date.now();

          await db.prepare(
            'INSERT INTO messages (id, content, created_at) VALUES (?, ?, ?)'
          )
            .bind(id, content, createdAt)
            .run();

          return jsonResponse({
            success: true,
            message: { id, content, created_at: createdAt },
          });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // DELETE /api/messages/:id - Delete single message
      if (path.startsWith('/api/messages/') && method === 'DELETE') {
        const id = path.split('/')[3];
        if (!id) {
          return jsonResponse({ success: false, error: '缺少消息 ID' }, 400);
        }

        try {
          await db.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
          return jsonResponse({ success: true });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // POST /api/messages/batch-delete - Delete multiple messages
      if (path === '/api/messages/batch-delete' && method === 'POST') {
        try {
          const body = await request.json();
          const ids = body.ids;

          if (!Array.isArray(ids) || ids.length === 0) {
            return jsonResponse({ success: true, count: 0 });
          }

          // D1 batch delete
          const chunkSize = 50;
          for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);
            const placeholders = chunk.map(() => '?').join(',');
            await db.prepare(`DELETE FROM messages WHERE id IN (${placeholders})`)
              .bind(...chunk)
              .run();
          }

          return jsonResponse({ success: true, count: ids.length });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // POST /api/messages/time-delete - Delete messages within recent time ranges
      if (path === '/api/messages/time-delete' && method === 'POST') {
        try {
          const body = await request.json();
          const range = body.range; // '1h' | '1d' | '1w' | '1y' | 'all'
          const now = Date.now();

          let cutoff = null;
          let label = '';

          if (range === '1h') {
            cutoff = now - 60 * 60 * 1000;
            label = '最近 1 小时内';
          } else if (range === '1d') {
            cutoff = now - 24 * 60 * 60 * 1000;
            label = '最近 1 天内';
          } else if (range === '1w') {
            cutoff = now - 7 * 24 * 60 * 60 * 1000;
            label = '最近 1 周内';
          } else if (range === '1y') {
            cutoff = now - 365 * 24 * 60 * 60 * 1000;
            label = '最近 1 年内';
          } else if (range === 'all') {
            await db.prepare('DELETE FROM messages').run();
            return jsonResponse({ success: true, message: '已清空所有历史信息' });
          } else {
            return jsonResponse({ success: false, error: '无效的时间范围参数' }, 400);
          }

          // "删除最近 X 时间段的信息" -> created_at >= cutoff
          await db.prepare('DELETE FROM messages WHERE created_at >= ?')
            .bind(cutoff)
            .run();

          return jsonResponse({
            success: true,
            message: `已成功删除 ${label} 的所有信息`,
          });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }
    }

    return jsonResponse({ error: 'Not Found' }, 404);
  },
};
