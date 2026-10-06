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

// Auto ensure D1 table exists & smooth migration for new columns
async function ensureTable(db) {
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        type TEXT DEFAULT 'text',
        file_key TEXT,
        file_name TEXT,
        file_size INTEGER,
        mime_type TEXT,
        created_at INTEGER NOT NULL
      )
    `).run();
    await db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC)
    `).run();

    // 平滑升级：对旧表添加新增字段（若已存在会忽略错误）
    const migrationColumns = [
      `ALTER TABLE messages ADD COLUMN type TEXT DEFAULT 'text'`,
      `ALTER TABLE messages ADD COLUMN file_key TEXT`,
      `ALTER TABLE messages ADD COLUMN file_name TEXT`,
      `ALTER TABLE messages ADD COLUMN file_size INTEGER`,
      `ALTER TABLE messages ADD COLUMN mime_type TEXT`
    ];
    for (const sql of migrationColumns) {
      try {
        await db.prepare(sql).run();
      } catch (_) {
        // column already exists
      }
    }
  } catch (e) {
    console.error('Failed to auto-init schema:', e);
  }
}

// Auth verification helper (supports Bearer header and ?token= query parameter)
function verifyAuth(request, env) {
  const expectedPassword = env.AUTH_PASSWORD || DEFAULT_PASSWORD;

  const authHeader = request.headers.get('Authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token === expectedPassword) return true;
  }

  const url = new URL(request.url);
  const queryToken = url.searchParams.get('token');
  if (queryToken && queryToken === expectedPassword) {
    return true;
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
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // PWA Manifest
    if (path === '/manifest.json') {
      const manifest = {
        id: '/?v=2',
        name: 'CF-TextRelay',
        short_name: 'CF-TextRelay',
        description: '极速、优雅的个人跨端文本与图片剪贴板中转站',
        start_url: '/?v=2',
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
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
        },
      });
    }

    // PWA Service Worker (Auto-bust cache on version upgrade)
    if (path === '/sw.js') {
      const swCode = `
        const SW_VERSION = 'v2.2.0-img-sync';
        self.addEventListener('install', (e) => {
          self.skipWaiting();
        });
        self.addEventListener('activate', (e) => {
          e.waitUntil(
            caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.clients.claim())
          );
        });
        self.addEventListener('fetch', (e) => {
          e.respondWith(fetch(e.request));
        });
      `;
      return new Response(swCode, {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
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

    // File download & stream endpoint (R2 Object Serving)
    if (path.startsWith('/api/files/')) {
      if (!verifyAuth(request, env)) {
        return jsonResponse({ success: false, error: '未授权或密码失效' }, 401);
      }

      const bucket = env.BUCKET || env.R2;
      if (!bucket) {
        return jsonResponse({ success: false, error: '未检测到 R2 存储桶绑定 (BUCKET)' }, 500);
      }

      const fileKey = decodeURIComponent(path.slice('/api/files/'.length));
      if (!fileKey) {
        return jsonResponse({ success: false, error: '缺少文件 key' }, 400);
      }

      try {
        const object = await bucket.get(fileKey);
        if (!object) {
          return jsonResponse({ success: false, error: '文件不存在或已被删除' }, 404);
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'private, max-age=604800, immutable');
        headers.set('Access-Control-Allow-Origin', '*');

        const downloadName = url.searchParams.get('download');
        if (downloadName) {
          const encodedName = encodeURIComponent(downloadName);
          headers.set('Content-Disposition', `attachment; filename="${encodedName}"; filename*=UTF-8''${encodedName}`);
        }

        return new Response(object.body, { headers });
      } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 500);
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
            error: '未检测到 D1 数据库绑定。请检查 wrangler.toml 或 Cloudflare 后台配置。',
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
            'SELECT id, content, type, file_key, file_name, file_size, mime_type, created_at FROM messages ORDER BY created_at DESC LIMIT ?'
          )
            .bind(limit)
            .all();

          return jsonResponse({ messages: results || [] });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }

      // POST /api/messages - Send new message (Supports text & file/image)
      if (path === '/api/messages' && method === 'POST') {
        try {
          const contentType = request.headers.get('content-type') || '';
          const id = crypto.randomUUID();
          const createdAt = Date.now();
          const bucket = env.BUCKET || env.R2;

          let content = '';
          let type = 'text';
          let fileKey = null;
          let fileName = null;
          let fileSize = 0;
          let mimeType = null;

          if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            content = (formData.get('content') || '').toString().trim();
            const file = formData.get('file');

            if (file && typeof file === 'object' && file.name) {
              mimeType = file.type || 'application/octet-stream';
              const isImage = mimeType.startsWith('image/');
              type = isImage ? 'image' : 'file';
              fileName = file.name;
              fileSize = file.size;

              if (bucket) {
                // 上传到 Cloudflare R2
                const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
                const ext = extMatch ? extMatch[1].toLowerCase() : (isImage ? 'png' : 'bin');
                const folder = isImage ? 'images' : 'files';
                fileKey = `${folder}/${createdAt}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
                await bucket.put(fileKey, file.stream(), {
                  httpMetadata: { contentType: mimeType }
                });
              } else {
                // 无 R2 时平滑兼容：Base64 存入 D1 content 字段
                const arrayBuffer = await file.arrayBuffer();
                const bytes = new Uint8Array(arrayBuffer);
                let binary = '';
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                  binary += String.fromCharCode(bytes[i]);
                }
                content = `data:${mimeType};base64,${btoa(binary)}`;
              }
            } else {
              // 纯文本表单
              if (!content) {
                return jsonResponse({ success: false, error: '内容不能为空' }, 400);
              }
              type = 'text';
            }
          } else {
            // application/json
            const body = await request.json();
            content = (body.content || '').trim();
            type = body.type || (content.startsWith('data:image/') ? 'image' : 'text');

            if (!content) {
              return jsonResponse({ success: false, error: '内容不能为空' }, 400);
            }
          }

          if (type === 'text' && content.length > 500000) {
            return jsonResponse({ success: false, error: '单条文本长度不能超过 500,000 字符' }, 400);
          }

          await db.prepare(`
            INSERT INTO messages (id, content, type, file_key, file_name, file_size, mime_type, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            id,
            content,
            type,
            fileKey,
            fileName,
            fileSize,
            mimeType,
            createdAt
          ).run();

          return jsonResponse({
            success: true,
            message: {
              id,
              content,
              type,
              file_key: fileKey,
              file_name: fileName,
              file_size: fileSize,
              mime_type: mimeType,
              created_at: createdAt
            },
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
          // 查询是否存在关联的 R2 存储对象
          const msg = await db.prepare('SELECT file_key FROM messages WHERE id = ?').bind(id).first();
          if (msg && msg.file_key) {
            const bucket = env.BUCKET || env.R2;
            if (bucket) {
              try { await bucket.delete(msg.file_key); } catch (_) {}
            }
          }

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

          const bucket = env.BUCKET || env.R2;
          const chunkSize = 50;

          for (let i = 0; i < ids.length; i += chunkSize) {
            const chunk = ids.slice(i, i + chunkSize);
            const placeholders = chunk.map(() => '?').join(',');

            // 查出这批消息的 file_key 并清理 R2
            if (bucket) {
              const { results } = await db.prepare(`SELECT file_key FROM messages WHERE id IN (${placeholders}) AND file_key IS NOT NULL`)
                .bind(...chunk)
                .all();
              if (results && results.length > 0) {
                const keysToDelete = results.map(r => r.file_key).filter(Boolean);
                if (keysToDelete.length > 0) {
                  try {
                    await bucket.delete(keysToDelete);
                  } catch (_) {
                    for (const k of keysToDelete) {
                      try { await bucket.delete(k); } catch (_) {}
                    }
                  }
                }
              }
            }

            // 删除 D1 记录
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
          const bucket = env.BUCKET || env.R2;

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
            // 清空全部
            if (bucket) {
              const { results } = await db.prepare('SELECT file_key FROM messages WHERE file_key IS NOT NULL').all();
              if (results && results.length > 0) {
                const keysToDelete = results.map(r => r.file_key).filter(Boolean);
                for (let i = 0; i < keysToDelete.length; i += 50) {
                  const slice = keysToDelete.slice(i, i + 50);
                  try { await bucket.delete(slice); } catch (_) {}
                }
              }
            }
            await db.prepare('DELETE FROM messages').run();
            return jsonResponse({ success: true, message: '已清空所有历史信息与文件' });
          } else {
            return jsonResponse({ success: false, error: '无效的时间范围参数' }, 400);
          }

          // 查出该范围内的 R2 文件并清理
          if (bucket) {
            const { results } = await db.prepare('SELECT file_key FROM messages WHERE created_at >= ? AND file_key IS NOT NULL')
              .bind(cutoff)
              .all();
            if (results && results.length > 0) {
              const keysToDelete = results.map(r => r.file_key).filter(Boolean);
              for (let i = 0; i < keysToDelete.length; i += 50) {
                const slice = keysToDelete.slice(i, i + 50);
                try { await bucket.delete(slice); } catch (_) {}
              }
            }
          }

          // 删除 D1 记录
          await db.prepare('DELETE FROM messages WHERE created_at >= ?')
            .bind(cutoff)
            .run();

          return jsonResponse({
            success: true,
            message: `已成功删除 ${label} 的所有信息与文件`,
          });
        } catch (err) {
          return jsonResponse({ success: false, error: err.message }, 500);
        }
      }
    }

    return jsonResponse({ error: 'Not Found' }, 404);
  },
};
