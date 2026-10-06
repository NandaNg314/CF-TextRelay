# CF-TextRelay 💧

> **极速、优雅、零成本的个人跨端文本、图片与文档剪贴板中转站**  
> 基于 **Cloudflare Workers + Cloudflare D1 (SQLite) + Cloudflare R2 (对象存储)**，采用 **液态玻璃 (Liquid Glass)** 拟物美学与完整 **PWA** 原生应用体验。

[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat&logo=cloudflare)](https://workers.cloudflare.com/)
[![Cloudflare D1](https://img.shields.io/badge/Database-Cloudflare%20D1%20(SQLite)-0051C3?style=flat&logo=sqlite)](https://developers.cloudflare.com/d1/)
[![Cloudflare R2](https://img.shields.io/badge/Storage-Cloudflare%20R2-F38020?style=flat&logo=cloudflare)](https://developers.cloudflare.com/r2/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ 核心特性

### 🖼️ 1. 全能图片跨端流转
- **Windows / macOS 双端直通剪贴板**：图片卡片专属「复制图片」按钮，自动转为原生 PNG 格式写入系统剪贴板。点击后在 Windows 直接按 `Ctrl + V`、在 Mac 直接按 `Cmd + V (⌘V)` 即可在 **微信、QQ、飞书、Slack、钉钉、Word、Keynote、PhotoShop** 中粘贴出图片！
- **电脑截图秒传 (Win & Mac)**：电脑截屏（`Win + Shift + S` 或 Mac `Cmd + Shift + 4` 或微信/QQ截图）后，在网页任意位置直接按快捷键（`Ctrl + V` / `Cmd + V`）瞬间捕获图片预览并发送；同时支持桌面图片直接拖拽上传；
- **手机拍照 / 相册发送**：输入框专属「📷 图片」按钮，手机端一键唤起系统相机拍照或相册选取照片；
- **全屏大图预览灯箱 (Lightbox)**：点击图片卡片弹出毛玻璃全屏高清大图查看，支持快捷关闭、复制或另存原图；移动端可长按直接呼出系统菜单拷贝或存储；
- **原图一键下载保存**：图片卡片支持一键另存为图片原始文件。

### 📄 2. TXT / Markdown / 代码文档深度流转
- **原文件直传与下载**：输入框支持选择或拖拽 `.txt` / `.md` / `.json` / `.py` 等各类文档与代码文件，完整上传至 R2，**保留真实文件名与扩展名**；
- **免下载直接阅读**：文档在消息卡片中直接渲染排版文本内容，在电脑和手机上无需下载即可即时浏览和一键复制文本；
- **原文件名一键下载**：卡片右侧下载按钮自动原汁原味下载原始文件（如 `notes.md`），绝不改变文件名或扩展名；
- **批量合并导出**：多选模式支持将多条选中的记录一键合并打包导出为 `.txt` 文档。

### 💎 3. 液态玻璃美学 (Liquid Glass UI) & PWA 原生体验
- 深度暗黑底色、呼吸式柔和流动渐变光晕、晶体透光毛玻璃卡片（Apple visionOS 质感）；
- 配置完整 `manifest.json` 与 `ServiceWorker`，在安卓手机、iPhone、iPad 或 PC 浏览器上一键安装为独立桌面 App（纯净全屏、无浏览器网址栏）。

### ⏱️ 4. 全能删除与时段清理 (联动清理 R2 存储)
- **单条删除**：卡片快捷删除，自动同步清理关联的 R2 存储桶对象；
- **多选批量删除**：自由勾选多条记录，一键批量清理；
- **时段一键清理**：支持一键删除 **最近 1小时 / 1天 / 1周 / 1年** 或清空全部历史记录，R2 存储桶同步物理清理干净，绝不残留孤立垃圾。

### 🔒 5. 安全与设备自记住
- 密码守卫鉴权，拒绝未授权访问；
- 首次输入密码成功后安全保存在本地，跨端访问免重复输入，随时可一键锁定。

---

## 📊 与同类项目的全方位对比

| 对比维度 | **CF-TextRelay (本项目)** | **传统轻量 Worker 剪贴板** | **微信 / QQ 文件传输助手** | **Snapdrop / 局域网传输** | **Nextcloud / 私有网盘** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **部署成本** | **100% 永久零成本** (Serverless) | 零成本 | 商业软件内置 | 需自建或公网公共中继 | 需租用 VPS 服务器，维护成本高 |
| **Windows 剪贴板直通** | **独创支持：直接复制图片到系统剪贴板，微信/QQ直接按 Ctrl+V 粘贴** | ❌ 仅支持文字复制 | ❌ 需在微信内右键转发或另存 | ❌ 只能先下载保存为本地文件 | ❌ 只能下载为文件 |
| **Windows 截图秒传** | **支持直接按 Ctrl+V 拦截截图直传** | ❌ 仅支持粘贴纯文本 | 需切到微信聊天窗口发送 | ❌ 不支持直接粘贴截图 | ❌ 需先保存成图片文件再上传 |
| **原文件传输与下载** | **支持 .txt / .md 等原文件上传并保留原文件名下载** | ❌ 仅存纯文本字符串，丢失文件名与后缀 | 有文件大小与保存期限限制 | 必须双端同时保持亮屏在线 | 操作繁琐，缺乏即时剪贴板体验 |
| **文本免下载即看** | **文档内容卡片内直接预览并高亮链接** | 普通文本 | 消息气泡 | ❌ 必须先下载 | 需加载专用文档预览插件 |
| **手机原生 App (PWA)** | **完整支持 PWA，全屏无地址栏** | 简陋网页 | 依赖微信客户端 | 普通网页 | 客户端体积庞大，占用运存高 |
| **历史清理与联动** | **支持按时段 (1h/1d/1w/1y) 一键清理，并联动删除 R2 存储** | 仅单条或清空 | 杂乱无章，难以批量管理 | ❌ 无云端历史记录 | 垃圾文件容易堆积 |
| **隐私安全性** | **私有密码守卫，数据独享在自己的 Cloudflare 账号中** | 多数无权限隔离 | 数据托管于商业厂商服务器 | 临时握手 | 取决于私有服务器安全维护 |

---

## 🛠️ 技术栈

- **Compute Runtime**: Cloudflare Workers (V8 JavaScript Edge Runtime)
- **Database**: Cloudflare D1 (Serverless Distributed SQLite at Edge)
- **Object Storage**: Cloudflare R2 (S3-compatible Edge Object Storage)
- **Frontend**: Vanilla Modern JS (ES Modules) + CSS3 Backdrop Filter + SVG Icons (零第三方冗余依赖，纯原生高性能)
- **Build & Deploy Tool**: Wrangler & esbuild

---

## 🚀 极速部署指南

### 1. 克隆代码并安装依赖
```bash
git clone https://github.com/your-username/CF-TextRelay.git
cd CF-TextRelay
npm install
```

### 2. 创建 Cloudflare D1 数据库与 R2 存储桶
```bash
# 创建 D1 数据库
npx wrangler d1 create info-db

# 创建 R2 存储桶
npx wrangler r2 bucket create your-r2-bucket-name
```

### 3. 配置 `wrangler.toml`
复制配置模板：
```bash
cp wrangler.toml.example wrangler.toml
```
编辑 `wrangler.toml`，填入生成的 `database_id`，并设置你的专属访问密码：
```toml
name = "cf-text-relay"
main = "src/index.js"
compatibility_date = "2024-03-20"

# 自定义域名（可选）
# routes = [
#   { pattern = "your-domain.com", custom_domain = true }
# ]

[vars]
AUTH_PASSWORD = "your_secure_password" # 改为你自己的专属访问密码

[[d1_databases]]
binding = "DB"
database_name = "info-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" # 填入生成的 D1 ID

# Cloudflare R2 存储桶绑定（用于存放原图与文档文件）
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "your-r2-bucket-name" # 填入你的 R2 存储桶名称
```

### 4. 一键部署上线
```bash
npm run deploy
```
部署完成后，终端会输出你的专属访问链接（如 `https://cf-text-relay.xxx.workers.dev`）！

---

## 📱 使用小技巧

1. **Windows 截图秒传**：
   - 电脑使用 `Win + Shift + S` 或微信/QQ截图后，切换到本网页直接按 `Ctrl + V`，瞬间捕获图片并生成待发预览，回车或点“发送”即同步给手机！
2. **手机传图到电脑后直接粘贴微信/QQ**：
   - 手机拍照或相册选图发送后，电脑端卡片上点击 **「复制图片」**，直接切到微信/QQ/Word按 `Ctrl + V` 即可直接粘贴图片！
3. **TXT / Markdown 原文件互传**：
   - 选择或拖入 `.md`、`.txt`、代码文件，既能在页面直接看文字内容，点击下载图标又能原汁原味下载保留原文件名的文件。
4. **添加为手机桌面独立 App (PWA)**：
   - **安卓手机**：使用 Chrome / Edge 访问，点击菜单里的 **「添加到主屏幕 / 安装应用」**；
   - **苹果 iPhone**：在 Safari 浏览器打开，点击底部 **「分享」图标 ➔ 「添加到主屏幕」**。

---

## 📄 开源协议

本项目基于 [MIT](LICENSE) 协议开源，欢迎自由使用与改进。
