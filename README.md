# CF-TextRelay 💧

> **极速、优雅、零成本的个人跨端文本与图片剪贴板中转站**  
> 基于 **Cloudflare Workers + Cloudflare D1 (SQLite) + Cloudflare R2 (对象存储)**，采用 **液态玻璃 (Liquid Glass)** 拟物美学与完整 **PWA** 原生应用体验。

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![Cloudflare D1](https://img.shields.io/badge/Database-Cloudflare%20D1%20(SQLite)-0051C3?style=flat&logo=sqlite)](https://developers.cloudflare.com/d1/)
[![Cloudflare R2](https://img.shields.io/badge/Storage-Cloudflare%20R2-F38020?style=flat&logo=cloudflare)](https://developers.cloudflare.com/r2/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ 核心特性

- 💎 **液态玻璃美学 (Liquid Glass UI)**：深度暗黑底色、呼吸式柔和流动渐变光晕、晶体透光毛玻璃卡片（Apple visionOS 质感）。
- 🖼️ **全能图片跨端流转 (全新支持)**：
  - **Windows 复制图片到剪贴板**：图片卡片专属「复制图片」按钮，自动转为原生 PNG 格式写入系统剪贴板，可直接在 **微信、QQ、Word、飞书、钉钉** 按 `Ctrl + V` 粘贴出图片！
  - **Windows 快捷截图上传**：在 Windows 端任意截屏后（如 `Win+Shift+S` 或微信截图），在网页端直接按 `Ctrl + V` 瞬间捕获图片；同时支持从电脑直接拖拽图片文件上传；
  - **手机拍照 / 相册发送**：输入框专属「📷 图片」按钮，手机端一键唤起相机拍摄或相册选取；
  - **全屏大图预览灯箱 (Lightbox)**：点击图片卡片弹出毛玻璃全屏高清大图查看，支持快捷关闭、复制或另存原图；
  - **原图一键下载保存**：图片卡片支持一键另存为图片源文件。
- 💸 **100% 永久零成本**：全 Serverless 边缘架构，利用 Cloudflare 免费套餐（Workers 每天 10 万次请求，D1 每天 500 万次读，R2 存储 10GB 免费空间），无需购买任何 VPS 云服务器。
- 📱 **原生 PWA 支持**：配置完整 `manifest.json` 与 `ServiceWorker`，在安卓手机、iPhone、iPad 或 PC 浏览器上一键安装为独立桌面 App（纯净全屏、无浏览器网址栏）。
- 📋 **多端瞬时同步**：
  - 支持手机、平板、电脑多端文本与图片流转；
  - 切换到页面前台时自动秒级静默同步最新内容；
  - 智能识别 URL 链接并渲染为精致的玻璃芯片标签。
- 📄 **TXT 文档深度流转**：
  - 输入框支持选择并解析 `.txt` / `.md` / 代码等文本文件；
  - 电脑端支持直接将文本文件拖拽至输入框解析；
  - 文本卡片支持一键下载为 `.txt`；
  - 多选模式支持批量合并导出 `.txt`。
- ⏱️ **全能删除与时段清理 (联动清理 R2)**：
  - **单条删除**：卡片快捷删除，自动同步清理关联的 R2 图片对象；
  - **多选批量删除**：自由勾选多条文本或图片，一键批量清理；
  - **时段一键清理**：支持一键删除 **最近 1小时 / 1天 / 1周 / 1年** 或清空全部历史记录与存储文件。
- 🔒 **安全与自动记住设备**：
  - 密码守卫鉴权，拒绝未授权访问；
  - 首次输入密码成功后自动安全保存在本地，跨端访问免重复输入，随时可一键锁定。

---

## 🛠️ 技术栈

- **Compute Runtime**: Cloudflare Workers (V8 JavaScript Edge Runtime)
- **Database**: Cloudflare D1 (Serverless Distributed SQLite at Edge)
- **Object Storage**: Cloudflare R2 (S3-compatible Edge Object Storage)
- **Frontend**: Vanilla Modern JS (ES Modules) + CSS3 Backdrop Filter + SVG Icons (零冗余第三方库，纯原生高性能)
- **Build & Deploy Tool**: Wrangler & esbuild

---

## 🚀 部署配置指南

### 1. 配置 `wrangler.toml`

在项目根目录编辑 `wrangler.toml`，确保包含 D1 与 R2 存储桶配置：

```toml
name = "cf-text-relay"
main = "src/index.js"
compatibility_date = "2024-03-20"

[vars]
AUTH_PASSWORD = "your_secure_password" # 改为你自己的专属访问密码

[[d1_databases]]
binding = "DB"
database_name = "info-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # 填入你的 D1 ID

# 配置你的 R2 存储桶（绑定名固定为 BUCKET）
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "your-r2-bucket-name" # 改为你实际的 R2 存储桶名称
```

> **提示**：若暂未配置 R2，代码会自动平滑降级（以 Base64 方式存入 D1 数据库），系统依然 100% 正常运行。

### 2. 编译并部署

```bash
# 构建单文件 Worker
npm run build

# 部署至 Cloudflare Workers
npm run deploy
```

---

## 📱 使用小技巧

1. **Windows 端截图后秒传**：
   - 使用快捷键 `Win + Shift + S` 或微信/QQ截图后，切换到本网页直接按 `Ctrl + V`，立刻出现待发送图片预览，回车或点击“发送”即传至手机！
2. **手机传图到电脑后直接粘贴微信/QQ**：
   - 手机拍照或选图发送后，电脑端卡片上点击 **「复制图片」**，直接切到微信/QQ聊天窗口按 `Ctrl + V` 即可直接粘贴图片！
3. **添加为手机桌面独立 App (PWA)**：
   - **安卓手机**：使用 Chrome / Edge 访问，点击菜单里的 **「添加到主屏幕 / 安装应用」**；
   - **苹果 iPhone**：在 Safari 浏览器打开，点击底部 **「分享」图标 ➔ 「添加到主屏幕」**。

---

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源，欢迎自由使用与改进。
