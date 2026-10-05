# CF-TextRelay 💧

> **极速、优雅、零成本的个人跨端文本与剪贴板中转站**  
> 基于 **Cloudflare Workers + Cloudflare D1 (边缘 SQLite)**，采用 **液态玻璃 (Liquid Glass)** 拟物美学与完整 **PWA** 原生应用体验。

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![Cloudflare D1](https://img.shields.io/badge/Database-Cloudflare%20D1%20(SQLite)-0051C3?style=flat&logo=sqlite)](https://developers.cloudflare.com/d1/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ 核心特性

- 💎 **液态玻璃美学 (Liquid Glass UI)**：深度暗黑底色、呼吸式柔和流动渐变光晕、晶体透光毛玻璃卡片（Apple visionOS 质感）。
- 💸 **100% 永久零成本**：全 Serverless 边缘架构，利用 Cloudflare 免费套餐（Workers 每天 10 万次请求，D1 每天 500 万次读），无需购买任何 VPS 云服务器。
- 📱 **原生 PWA 支持**：配置完整 `manifest.json` 与 `ServiceWorker`，在安卓手机、iPhone、iPad 或 PC 浏览器上一键安装为独立桌面 App（纯净全屏、无浏览器网址栏）。
- 📋 **多端瞬时同步**：
  - 支持手机、平板、电脑多端流转；
  - 切换到页面前台时自动秒级静默同步最新内容；
  - 智能识别 URL 链接并渲染为精致的玻璃芯片标签。
- 📄 **TXT 文档深度流转**：
  - 输入框支持选择并解析 `.txt` / `.md` / 代码等文本文件；
  - 电脑端支持直接将 `.txt` 文件**拖拽**至输入框瞬间解析；
  - 每条消息卡片支持**一键另存为 `.txt`**；
  - 多选模式支持**批量合并导出 `.txt`**。
- ⏱️ **全能删除与时段清理**：
  - **单条删除**：卡片右侧快捷垃圾桶；
  - **多选批量删除**：自由勾选多条或一键全选批量清理；
  - **时段一键清理**：支持一键删除 **最近 1小时 / 1天 / 1周 / 1年** 或清空全部历史记录。
- 🔒 **安全与自动记住设备**：
  - 密码守卫鉴权，拒绝未授权访问；
  - 首次输入密码成功后自动安全保存在本地，跨端访问免重复输入，随时可一键锁定。

---

## 🛠️ 技术栈

- **Compute Runtime**: Cloudflare Workers (V8 JavaScript Edge Runtime)
- **Database**: Cloudflare D1 (Serverless Distributed SQLite at Edge)
- **Frontend**: Vanilla Modern JS (ES Modules) + CSS3 Backdrop Filter + SVG Icons (零冗余第三方库，纯原生高性能)
- **Build & Deploy Tool**: Wrangler & esbuild

---

## 🚀 极速部署指南

### 方式一：命令行一键部署（推荐）

#### 1. 克隆代码并安装依赖
```bash
git clone https://github.com/your-username/CF-TextRelay.git
cd CF-TextRelay
npm install
```

#### 2. 创建 Cloudflare D1 数据库
```bash
npx wrangler d1 create info-db
```
执行后终端会输出一段数据库配置，例如：
```toml
[[d1_databases]]
binding = "DB"
database_name = "info-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

#### 3. 配置 `wrangler.toml`
复制配置模板文件：
```bash
cp wrangler.toml.example wrangler.toml
```
编辑 `wrangler.toml`，将刚才生成的 `database_id` 填入，并设置你的专属访问密码 `AUTH_PASSWORD`：
```toml
name = "cf-text-relay"
main = "src/index.js"
compatibility_date = "2024-03-20"

[vars]
AUTH_PASSWORD = "your_secure_password" # 改为你自己的专属密码

[[d1_databases]]
binding = "DB"
database_name = "info-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # 填入生成的 ID
```

#### 4. 一键部署上线
```bash
npx wrangler deploy
```
部署完成后，终端会直接输出你的公开访问链接（如 `https://cf-text-relay.xxx.workers.dev`）！

---

### 方式二：Cloudflare 网页后台部署

1. **创建 D1 数据库**：
   - 登录 Cloudflare 控制台 ➔ **Storage & Databases ➔ D1** ➔ 创建数据库名为 `info-db`。
2. **打包单文件代码**：
   - 在本地运行 `npm run build` 生成 `dist/worker.js`。
3. **新建 Worker**：
   - Cloudflare 控制台 ➔ **Workers & Pages ➔ Create Worker**；
   - 点击 **Edit code**，将 `dist/worker.js` 中的全部内容粘贴进去并部署。
4. **绑定 D1 数据库与设置密码**：
   - 进入该 Worker ➔ **Settings ➔ Bindings**：
     - 添加 **D1 Database Binding**：变量名必须填 `DB`，数据库选择 `info-db`；
     - 添加 **Environment Variable**：变量名 `AUTH_PASSWORD`，填入你的访问密码。
   - 点击保存并部署即可。

---

## 📱 添加为手机桌面 App (PWA)

1. **安卓手机**：使用 Chrome / Edge 访问你的部署域名，登录后点击右上角小手机图标（或浏览器菜单里的 **「添加到主屏幕 / 安装应用」**），即可生成独立无地址栏 App。
2. **苹果 iPhone / iPad**：在 Safari 浏览器中打开，点击底部 **「分享」图标 ➔ 「添加到主屏幕」** 即可。

---

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源，欢迎自由使用与改进。
