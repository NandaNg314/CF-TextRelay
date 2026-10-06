// Liquid Glass UI for CF Info Worker with Full Image & Text Sync Support
export function renderHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>CF-TextRelay · 个人跨端文本与图片中转</title>
  <link rel="manifest" href="/manifest.json?v=2">
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <link rel="apple-touch-icon" href="/icon.svg">
  <meta name="theme-color" content="#07090e">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="CF-TextRelay">
  <style>
    :root {
      --bg: #07090e;
      --card-bg: rgba(255, 255, 255, 0.05);
      --card-bg-hover: rgba(255, 255, 255, 0.08);
      --card-border: rgba(255, 255, 255, 0.12);
      --card-border-highlight: rgba(255, 255, 255, 0.28);
      --glass-blur: 24px;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --accent: #6366f1;
      --accent-glow: rgba(99, 102, 241, 0.4);
      --accent-gradient: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
      --danger: #ef4444;
      --danger-glow: rgba(239, 68, 68, 0.4);
      --success: #10b981;
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --font: -apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", "Segoe UI", Roboto, sans-serif;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font);
      min-height: 100vh;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow-x: hidden;
      padding-bottom: max(40px, env(safe-area-inset-bottom, 40px));
      line-height: 1.5;
    }

    /* Ambient Liquid Gradient Blobs */
    .ambient-background {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.38;
      animation: float 20s infinite alternate ease-in-out;
    }

    .blob-1 {
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, #4f46e5 0%, #06b6d4 100%);
      top: -120px;
      left: -80px;
      animation-duration: 22s;
    }

    .blob-2 {
      width: 520px;
      height: 520px;
      background: radial-gradient(circle, #ec4899 0%, #8b5cf6 100%);
      bottom: -150px;
      right: -100px;
      animation-duration: 26s;
    }

    .blob-3 {
      width: 380px;
      height: 380px;
      background: radial-gradient(circle, #06b6d4 0%, #10b981 100%);
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-duration: 28s;
      opacity: 0.22;
    }

    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(40px, 30px) scale(1.08); }
      100% { transform: translate(-30px, -20px) scale(0.95); }
    }

    /* Liquid Glass Common Style */
    .glass {
      background: var(--card-bg);
      backdrop-filter: blur(var(--glass-blur)) saturate(190%);
      -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(190%);
      border: 1px solid var(--card-border);
      box-shadow: 
        0 16px 36px -10px rgba(0, 0, 0, 0.45),
        inset 0 1px 1px 0 rgba(255, 255, 255, 0.18);
    }

    .glass-pill {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
    }

    /* App Container */
    .app-container {
      width: 100%;
      max-width: 820px;
      padding: 16px 20px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Header */
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 20px;
      border-radius: var(--radius-lg);
      position: sticky;
      top: 14px;
      z-index: 100;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;
    }

    .brand-icon {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px var(--accent-glow);
      font-size: 18px;
      flex-shrink: 0;
    }

    .brand-title {
      display: flex;
      flex-direction: column;
    }

    .brand-title h1 {
      font-size: 17px;
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(120deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .brand-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-muted);
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 8px var(--success);
      animation: pulse 2.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 500;
      color: var(--text-main);
      cursor: pointer;
      border: 1px solid var(--card-border);
      background: rgba(255, 255, 255, 0.06);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--card-border-highlight);
      transform: translateY(-1px);
    }

    .btn:active {
      transform: translateY(1px) scale(0.98);
    }

    .btn-icon {
      padding: 8px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    .btn-primary {
      background: var(--accent-gradient);
      border: none;
      color: #ffffff;
      box-shadow: 0 4px 16px var(--accent-glow);
    }

    .btn-primary:hover {
      box-shadow: 0 6px 22px rgba(99, 102, 241, 0.6);
      background: linear-gradient(135deg, #4f46e5 0%, #0891b2 100%);
    }

    .btn-danger {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    .btn-danger:hover {
      background: rgba(239, 68, 68, 0.28);
      border-color: rgba(239, 68, 68, 0.5);
    }

    .btn-accent {
      color: #a5b4fc;
      border-color: rgba(99, 102, 241, 0.3);
      background: rgba(99, 102, 241, 0.12);
    }

    .btn-accent:hover {
      background: rgba(99, 102, 241, 0.22);
      border-color: rgba(99, 102, 241, 0.5);
    }

    /* Composer (Input Box) */
    .composer-card {
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
    }

    .composer-card.dragover {
      border-color: #38bdf8 !important;
      background: rgba(56, 189, 248, 0.08) !important;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.3);
    }

    .composer-input {
      width: 100%;
      min-height: 84px;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-main);
      font-family: inherit;
      font-size: 15px;
      line-height: 1.6;
      resize: none;
      scrollbar-width: thin;
    }

    .composer-input::placeholder {
      color: rgba(148, 163, 184, 0.7);
    }

    /* Pending Image Card in Composer */
    .pending-image-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 14px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: var(--radius-md);
      animation: fadeIn 0.25s ease-out;
    }

    .pending-image-info {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .pending-image-thumb {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(0, 0, 0, 0.2);
      flex-shrink: 0;
    }

    .pending-image-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }

    .pending-image-name {
      font-size: 13px;
      font-weight: 600;
      color: #f8fafc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pending-image-size {
      font-size: 11px;
      color: #94a3b8;
    }

    .composer-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      flex-wrap: wrap;
    }

    .composer-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: var(--text-muted);
    }

    .shortcut-hint {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .kbd {
      padding: 2px 6px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      font-family: var(--mono);
      font-size: 10px;
    }

    .composer-btns {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    /* Controls Bar */
    .controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 4px 2px;
    }

    .search-box {
      flex: 1;
      max-width: 320px;
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      width: 15px;
      height: 15px;
      color: var(--text-muted);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px 8px 36px;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      font-size: 13px;
      outline: none;
      transition: all 0.2s;
    }

    .search-input:focus {
      border-color: var(--accent);
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.25);
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Stream Feed */
    .stream-feed {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 100%;
    }

    .msg-card {
      border-radius: var(--radius-lg);
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.2s, border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
      position: relative;
      animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .msg-card:hover {
      background: var(--card-bg-hover);
      border-color: var(--card-border-highlight);
    }

    .msg-card.selected {
      background: rgba(99, 102, 241, 0.12);
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.4);
    }

    .msg-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .msg-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text-muted);
    }

    .msg-checkbox {
      appearance: none;
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border: 1.5px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.05);
      cursor: pointer;
      display: grid;
      place-content: center;
      transition: all 0.2s;
    }

    .msg-checkbox:checked {
      background: var(--accent);
      border-color: var(--accent);
    }

    .msg-checkbox:checked::before {
      content: "";
      width: 9px;
      height: 5px;
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      transform: rotate(-45deg) translate(1px, -1px);
    }

    .msg-time {
      font-variant-numeric: tabular-nums;
    }

    .msg-tag {
      padding: 2px 7px;
      font-size: 11px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
      color: var(--text-muted);
    }

    .msg-tag.image-tag {
      background: rgba(6, 182, 212, 0.15);
      color: #67e8f9;
      border: 1px solid rgba(6, 182, 212, 0.25);
    }

    .msg-tag.file-tag {
      background: rgba(56, 189, 248, 0.15);
      color: #7dd3fc;
      border: 1px solid rgba(56, 189, 248, 0.25);
    }

    .msg-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-copy-card {
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 7px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: #e2e8f0;
    }

    .btn-copy-card:hover {
      background: rgba(99, 102, 241, 0.25);
      border-color: rgba(99, 102, 241, 0.45);
      color: #ffffff;
    }

    .btn-copy-card.copied {
      background: rgba(16, 185, 129, 0.25);
      border-color: rgba(16, 185, 129, 0.5);
      color: #34d399;
    }

    .msg-content {
      font-size: 14.5px;
      line-height: 1.65;
      color: #f8fafc;
      white-space: pre-wrap;
      word-break: break-word;
      user-select: text;
    }

    /* Image Display in Message Card */
    .msg-image-wrap {
      margin-top: 4px;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: zoom-in;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      max-width: 100%;
    }

    .msg-image-wrap:hover {
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
    }

    .msg-image-img {
      max-width: 100%;
      max-height: 480px;
      height: auto;
      object-fit: contain;
      display: block;
      border-radius: var(--radius-md);
      transition: transform 0.3s;
    }

    .msg-image-wrap:hover .msg-image-img {
      transform: scale(1.015);
    }

    .msg-image-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      padding: 4px 8px;
      font-size: 11px;
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #e2e8f0;
      pointer-events: none;
    }

    .msg-url-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin: 3px 2px;
      padding: 2px 8px;
      font-size: 12px;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 6px;
      text-decoration: none;
      vertical-align: middle;
      transition: all 0.2s;
    }

    .msg-url-chip:hover {
      background: rgba(56, 189, 248, 0.22);
      border-color: rgba(56, 189, 248, 0.5);
      color: #7dd3fc;
    }

    /* Floating Multi-select Action Bar */
    .selection-bar {
      position: fixed;
      bottom: max(24px, env(safe-area-inset-bottom, 24px));
      left: 50%;
      transform: translateX(-50%) translateY(120px);
      z-index: 150;
      width: calc(100% - 32px);
      max-width: 620px;
      padding: 12px 18px;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15);
    }

    .selection-bar.active {
      transform: translateX(-50%) translateY(0);
    }

    .selection-count {
      font-size: 14px;
      font-weight: 600;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Fullscreen Image Lightbox */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(7, 9, 14, 0.88);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.2s ease-out;
    }

    .lightbox-overlay.active {
      display: flex;
    }

    .lightbox-container {
      max-width: 96vw;
      max-height: 92vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      position: relative;
    }

    .lightbox-img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: var(--radius-md);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.18);
    }

    .lightbox-toolbar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .lightbox-close-btn {
      position: absolute;
      top: -44px;
      right: 0;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      transition: all 0.2s;
    }

    .lightbox-close-btn:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: scale(1.05);
    }

    /* Modal Dialogs */
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(7, 9, 14, 0.75);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-card {
      width: 100%;
      max-width: 440px;
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modalPop {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-title {
      font-size: 17px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .modal-options-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .time-option-btn {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      font-size: 13.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.2s;
    }

    .time-option-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.4);
      transform: translateX(3px);
    }

    .badge-danger {
      padding: 2px 8px;
      font-size: 11px;
      border-radius: 9999px;
      background: rgba(239, 68, 68, 0.2);
      color: #fca5a5;
    }

    /* Auth Screen */
    .auth-overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      display: grid;
      place-items: center;
      padding: 20px;
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      background: rgba(7, 9, 14, 0.85);
    }

    .auth-card {
      width: 100%;
      max-width: 360px;
      border-radius: var(--radius-lg);
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
    }

    .auth-icon {
      width: 58px;
      height: 58px;
      border-radius: 18px;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 25px var(--accent-glow);
      font-size: 26px;
    }

    .auth-input-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .auth-input {
      width: 100%;
      padding: 13px 16px;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      font-size: 15px;
      text-align: center;
      outline: none;
      transition: all 0.2s;
      letter-spacing: 2px;
    }

    .auth-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 16px var(--accent-glow);
      background: rgba(255, 255, 255, 0.1);
    }

    .shake {
      animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    /* Toast Notification */
    .toast-container {
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      pointer-events: none;
    }

    .toast {
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 13.5px;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
      animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: auto;
      max-width: 90vw;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-16px) scale(0.9); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .toast.hide {
      opacity: 0;
      transform: translateY(-8px) scale(0.92);
      transition: all 0.25s;
    }

    /* Empty state */
    .empty-state {
      padding: 60px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: var(--text-muted);
    }

    .empty-icon {
      font-size: 40px;
      opacity: 0.5;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .app-container {
        padding: 12px 14px;
      }
      header {
        top: 8px;
        padding: 12px 16px;
      }
      .brand-title h1 {
        font-size: 15px;
      }
      .composer-card {
        padding: 14px 16px;
      }
      .composer-input {
        min-height: 76px;
        font-size: 14px;
      }
      .composer-footer {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
      .composer-info {
        justify-content: space-between;
      }
      .composer-btns {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.25fr;
        gap: 6px;
        width: 100%;
        margin-left: 0;
      }
      .composer-btns .btn {
        padding: 8px 4px;
        font-size: 12.5px;
        white-space: nowrap;
      }
      .controls-bar {
        flex-direction: column;
        align-items: stretch;
      }
      .search-box {
        max-width: 100%;
      }
      .toolbar-actions {
        justify-content: flex-end;
      }
    }
  </style>
</head>
<body>

  <!-- Background Glowing Liquid Orbs -->
  <div class="ambient-background">
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>
  </div>

  <!-- Toast Container -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Fullscreen Image Lightbox Modal -->
  <div class="lightbox-overlay" id="imageLightbox">
    <div class="lightbox-container" id="lightboxContainer">
      <button class="lightbox-close-btn" id="btnCloseLightbox" title="关闭预览">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <img src="" alt="大图预览" class="lightbox-img" id="lightboxImg">
      <div class="lightbox-toolbar">
        <button class="btn btn-primary" id="btnLightboxCopy">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span id="lightboxCopyText">复制图片到剪贴板</span>
        </button>
        <button class="btn" id="btnLightboxDownload">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          保存原图
        </button>
      </div>
    </div>
  </div>

  <!-- Auth Screen (Visible when not logged in) -->
  <div class="auth-overlay" id="authScreen" style="display: none;">
    <div class="auth-card glass">
      <div class="auth-icon">💧</div>
      <div>
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">CF-TextRelay</h2>
        <p style="font-size: 13px; color: var(--text-muted);">请输入专属访问密码解锁</p>
      </div>
      <div class="auth-input-group">
        <input type="password" id="authInput" class="auth-input" placeholder="输入密码" autofocus autocomplete="current-password">
        <button id="authBtn" class="btn btn-primary" style="padding: 12px; border-radius: var(--radius-md); font-size: 14px;">
          解锁进入
        </button>
      </div>
    </div>
  </div>

  <!-- Main App View -->
  <div class="app-container" id="appMain" style="display: none;">
    <!-- Top Header -->
    <header class="glass">
      <div class="brand">
        <div class="brand-icon">💧</div>
        <div class="brand-title">
          <h1>CF-TextRelay</h1>
          <div class="brand-status">
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">多端同步已就绪</span>
            <span id="msgCountBadge" class="glass-pill" style="padding: 1px 7px; font-size: 10px; margin-left: 2px;">0 条</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-icon btn-accent" id="btnInstallApp" style="display: none;" title="安装为手机应用 / 添加到桌面">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="5" y="2" width="14" height="20" rx="3"/>
            <path d="M12 18h.01"/>
          </svg>
        </button>
        <button class="btn btn-icon" id="btnRefresh" title="立即刷新">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
        </button>
        <button class="btn btn-danger btn-icon" id="btnTimeDeleteModal" title="按时段清理">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </button>
        <button class="btn btn-icon" id="btnLogout" title="退出锁定">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Composer Section -->
    <div class="composer-card glass">
      <!-- Pending Image Preview Bar -->
      <div id="pendingImageContainer" class="pending-image-container" style="display: none;">
        <div class="pending-image-info">
          <img id="pendingImageThumb" src="" alt="待发送图片" class="pending-image-thumb">
          <div class="pending-image-meta">
            <span id="pendingImageName" class="pending-image-name">image.png</span>
            <span id="pendingImageSize" class="pending-image-size">0 KB</span>
          </div>
        </div>
        <button class="btn btn-icon btn-danger" id="btnRemovePendingImage" title="移除图片" style="width: 32px; height: 32px; padding: 4px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <textarea id="composerInput" class="composer-input" placeholder="输入或粘贴文本，支持复制/拖拽图片直接发送..."></textarea>
      
      <div class="composer-footer">
        <div class="composer-info">
          <span id="charCount">0 字符</span>
          <span class="shortcut-hint">
            <span class="kbd">Ctrl</span> + <span class="kbd">Enter</span> 发送
          </span>
        </div>
        <div class="composer-btns">
          <!-- Hidden File Inputs -->
          <input type="file" id="fileUploadInput" accept="text/plain, text/*, .txt, .md, .log, .json, .csv, .js, .py, .html, .css, .sql, .xml, .yaml, .yml, application/json" style="display: none;">
          <input type="file" id="imageUploadInput" accept="image/*" style="display: none;">

          <!-- Upload Image (Photo / Album) Button -->
          <button class="btn btn-accent" id="btnUploadImage" title="发送图片 (支持拍照或相册选取)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            图片
          </button>

          <!-- Upload TXT Button -->
          <button class="btn" id="btnUploadTxt" title="上传 TXT / 文本文件">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            TXT
          </button>

          <!-- Paste Clipboard Button -->
          <button class="btn" id="btnPasteClipboard" title="从剪贴板粘贴文本或图片">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            粘贴
          </button>

          <!-- Send Button -->
          <button class="btn btn-primary" id="btnSend">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            发送
          </button>
        </div>
      </div>
    </div>

    <!-- Controls Bar -->
    <div class="controls-bar">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="searchInput" class="search-input" placeholder="搜索文本或输入 [图片]...">
      </div>
      <div class="toolbar-actions">
        <button class="btn" id="btnToggleSelectMode">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <span id="selectModeText">多选模式</span>
        </button>
      </div>
    </div>

    <!-- Stream Message List -->
    <div class="stream-feed" id="streamFeed">
      <!-- Cards rendered via JS -->
    </div>
  </div>

  <!-- Floating Selection Bar (Batch Actions) -->
  <div class="selection-bar glass" id="selectionBar">
    <div class="selection-count">
      <input type="checkbox" id="selectAllCheckbox" class="msg-checkbox">
      <span id="selectedCountText">已选 0 项</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="btn" id="btnBatchExportTxt" title="导出选中信息为 TXT 文件">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        导出 TXT
      </button>
      <button class="btn" id="btnCancelSelection">取消</button>
      <button class="btn btn-danger" id="btnBatchDelete">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
        批量删除
      </button>
    </div>
  </div>

  <!-- Time-based Deletion Modal -->
  <div class="modal-overlay" id="timeDeleteModal">
    <div class="modal-card glass">
      <div class="modal-title">
        <span style="color: #ef4444;">⏱️</span>
        按时段批量清理
      </div>
      <p class="modal-desc">
        选择要删除的时间范围。此操作将同时永久清理指定时段内的文本及 R2 图片，请谨慎操作。
      </p>

      <div class="modal-options-list">
        <button class="time-option-btn" data-range="1h">
          <span>删除最近 <strong>1 小时</strong> 内的信息</span>
          <span class="badge-danger">1 Hour</span>
        </button>
        <button class="time-option-btn" data-range="1d">
          <span>删除最近 <strong>1 天 (24h)</strong> 内的信息</span>
          <span class="badge-danger">1 Day</span>
        </button>
        <button class="time-option-btn" data-range="1w">
          <span>删除最近 <strong>1 周 (7天)</strong> 内的信息</span>
          <span class="badge-danger">1 Week</span>
        </button>
        <button class="time-option-btn" data-range="1y">
          <span>删除最近 <strong>1 年</strong> 内的信息</span>
          <span class="badge-danger">1 Year</span>
        </button>
        <button class="time-option-btn" data-range="all" style="border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08);">
          <span style="color: #f87171; font-weight: 600;">清空全部记录与文件 (一键重置)</span>
          <span class="badge-danger" style="background: rgba(239, 68, 68, 0.35);">CLEAR ALL</span>
        </button>
      </div>

      <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
        <button class="btn" id="btnCloseTimeModal">取消</button>
      </div>
    </div>
  </div>

  <script>
    // State management
    const STATE = {
      token: localStorage.getItem('sg_auth_token') || '',
      messages: [],
      selectedIds: new Set(),
      selectMode: false,
      searchQuery: '',
      pollingInterval: null,
      isSubmitting: false,
      pendingImage: null, // File object for image upload
      currentLightboxImage: null
    };

    // DOM Elements
    const authScreen = document.getElementById('authScreen');
    const authInput = document.getElementById('authInput');
    const authBtn = document.getElementById('authBtn');
    const appMain = document.getElementById('appMain');
    const composerInput = document.getElementById('composerInput');
    const charCount = document.getElementById('charCount');
    const btnSend = document.getElementById('btnSend');
    const btnPasteClipboard = document.getElementById('btnPasteClipboard');
    const streamFeed = document.getElementById('streamFeed');
    const searchInput = document.getElementById('searchInput');
    const btnRefresh = document.getElementById('btnRefresh');
    const btnLogout = document.getElementById('btnLogout');
    const msgCountBadge = document.getElementById('msgCountBadge');
    const btnToggleSelectMode = document.getElementById('btnToggleSelectMode');
    const selectModeText = document.getElementById('selectModeText');
    const selectionBar = document.getElementById('selectionBar');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const selectedCountText = document.getElementById('selectedCountText');
    const btnCancelSelection = document.getElementById('btnCancelSelection');
    const btnBatchDelete = document.getElementById('btnBatchDelete');
    const btnBatchExportTxt = document.getElementById('btnBatchExportTxt');
    const btnUploadTxt = document.getElementById('btnUploadTxt');
    const btnUploadImage = document.getElementById('btnUploadImage');
    const fileUploadInput = document.getElementById('fileUploadInput');
    const imageUploadInput = document.getElementById('imageUploadInput');
    const pendingImageContainer = document.getElementById('pendingImageContainer');
    const pendingImageThumb = document.getElementById('pendingImageThumb');
    const pendingImageName = document.getElementById('pendingImageName');
    const pendingImageSize = document.getElementById('pendingImageSize');
    const btnRemovePendingImage = document.getElementById('btnRemovePendingImage');
    const composerCard = document.querySelector('.composer-card');
    const btnInstallApp = document.getElementById('btnInstallApp');
    const btnTimeDeleteModal = document.getElementById('btnTimeDeleteModal');
    const timeDeleteModal = document.getElementById('timeDeleteModal');
    const btnCloseTimeModal = document.getElementById('btnCloseTimeModal');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    // Lightbox DOM
    const imageLightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const btnCloseLightbox = document.getElementById('btnCloseLightbox');
    const btnLightboxCopy = document.getElementById('btnLightboxCopy');
    const btnLightboxDownload = document.getElementById('btnLightboxDownload');
    const lightboxCopyText = document.getElementById('lightboxCopyText');

    // Toast helper
    function showToast(text, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast glass';
      
      let icon = '💧';
      if (type === 'success') icon = '✅';
      if (type === 'error') icon = '⚠️';
      if (type === 'delete') icon = '🗑️';

      toast.innerHTML = \`<span>\${icon}</span><span>\${text}</span>\`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 250);
      }, 2400);
    }

    // Auto-expanding textarea
    composerInput.addEventListener('input', () => {
      composerInput.style.height = 'auto';
      composerInput.style.height = Math.min(composerInput.scrollHeight, 360) + 'px';
      charCount.textContent = \`\${composerInput.value.length} 字符\`;
    });

    // Format bytes
    function formatBytes(bytes) {
      if (!bytes || bytes <= 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Handle Pending Attachment (Image or Document File)
    function setPendingAttachment(file) {
      if (!file) return;

      const isImg = file.type && file.type.startsWith('image/');
      STATE.pendingAttachment = file;
      pendingImageName.textContent = file.name || (isImg ? 'image.png' : 'file');
      pendingImageSize.textContent = formatBytes(file.size);

      if (isImg) {
        const previewUrl = URL.createObjectURL(file);
        pendingImageThumb.src = previewUrl;
        pendingImageThumb.style.display = 'block';
        showToast('已载入图片，可输入说明或直接点击发送', 'info');
      } else {
        // Document / Code / Text File
        pendingImageThumb.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%2338bdf8" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';
        pendingImageThumb.style.display = 'block';
        showToast(\`已载入原文件 \${file.name}，发送后支持原文件名下载\`, 'info');

        // 文本格式文件自动读取预览到输入框中
        const isTextLike = (file.type && file.type.startsWith('text/')) || /\\.(txt|md|json|js|ts|py|html|css|sql|log|csv|xml|yaml|yml)$/i.test(file.name);
        if (isTextLike && file.size <= 2 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target.result;
            composerInput.value = (composerInput.value ? composerInput.value + '\\n\\n' : '') + text;
            composerInput.dispatchEvent(new Event('input'));
          };
          reader.readAsText(file, 'utf-8');
        }
      }

      pendingImageContainer.style.display = 'flex';
    }

    function clearPendingAttachment() {
      STATE.pendingAttachment = null;
      imageUploadInput.value = '';
      fileUploadInput.value = '';
      pendingImageThumb.src = '';
      pendingImageContainer.style.display = 'none';
    }

    btnRemovePendingImage.addEventListener('click', clearPendingAttachment);

    // Trigger Image Input (Camera & Photo Gallery)
    btnUploadImage.addEventListener('click', () => {
      imageUploadInput.value = '';
      imageUploadInput.click();
    });

    imageUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) setPendingAttachment(file);
    });

    // Paste from clipboard helper (Supports image and text)
    btnPasteClipboard.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard) {
          showToast('当前浏览器不支持读取剪贴板，请手动 Ctrl+V', 'error');
          return;
        }

        // Try reading image from clipboard first
        if (navigator.clipboard.read) {
          try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
              const imageType = item.types.find(t => t.startsWith('image/'));
              if (imageType) {
                const blob = await item.getType(imageType);
                const file = new File([blob], \`clipboard-\${Date.now()}.png\`, { type: imageType });
                setPendingImage(file);
                showToast('已从剪贴板读取到图片', 'success');
                return;
              }
            }
          } catch (_) {
            // fallback to readText
          }
        }

        // Fallback to text reading
        if (navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text) {
            composerInput.value = (composerInput.value ? composerInput.value + '\\n' : '') + text;
            composerInput.dispatchEvent(new Event('input'));
            showToast('已从剪贴板粘贴文本', 'success');
          } else {
            showToast('剪贴板为空', 'info');
          }
        }
      } catch (err) {
        showToast('读取剪贴板失败，请允许权限或直接在页面按 Ctrl+V', 'error');
      }
    });

    // Helper to download text as file
    function downloadTextAsFile(filename, text) {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('已开始下载 ' + filename, 'success');
    }

    // Helper to download image as file
    async function downloadImageFile(imageUrl, filename) {
      try {
        showToast('正在准备下载...', 'info');
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || \`image-\${Date.now()}.png\`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('下载已开始: ' + (filename || '图片'), 'success');
      } catch (err) {
        // Direct link fallback
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename || 'image.png';
        a.target = '_blank';
        a.click();
      }
    }

    // Copy Image to Windows Clipboard (Converts to image/png for universal Ctrl+V paste)
    async function copyImageToClipboard(imageUrl) {
      try {
        showToast('正在转换并复制图片...', 'info');
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        // Convert blob to PNG Blob via Canvas for max Windows clipboard compatibility
        const pngBlob = await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((b) => {
              if (b) resolve(b);
              else reject(new Error('转换图片格式失败'));
            }, 'image/png');
          };
          img.onerror = () => reject(new Error('加载图片源数据失败'));
          img.src = URL.createObjectURL(blob);
        });

        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': pngBlob })
        ]);

        showToast('图片已复制到剪贴板！可直接在微信/QQ等按 Ctrl+V 粘贴', 'success');
        return true;
      } catch (err) {
        console.error('Copy image error:', err);
        showToast('复制图片失败，请检查浏览器剪贴板权限或使用下载保存', 'error');
        return false;
      }
    }

    // Upload TXT / text file helper
    function handleTxtFile(file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('文本文件过大，支持不超过 2MB 的文本', 'error');
        return;
      }
      if (file.type && file.type.startsWith('image/')) {
        setPendingImage(file);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        composerInput.value = (composerInput.value ? composerInput.value + '\\n\\n' : '') + text;
        composerInput.dispatchEvent(new Event('input'));
        showToast(\`已成功读取 \${file.name} (\${text.length} 字符)\`, 'success');
      };
      reader.onerror = () => {
        showToast('读取文件失败，请确保为可读文本格式', 'error');
      };
      reader.readAsText(file, 'utf-8');
    }

    btnUploadTxt.addEventListener('click', () => {
      fileUploadInput.value = '';
      fileUploadInput.click();
    });

    fileUploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) setPendingAttachment(file);
    });

    // Intercept Global Paste for Instant Image Upload on Windows
    window.addEventListener('paste', (e) => {
      const items = e.clipboardData && e.clipboardData.items;
      if (!items) return;

      for (const item of items) {
        if (item.type && item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            setPendingAttachment(file);
            showToast('已捕获剪贴板图片，点击发送即可同步！', 'success');
            return;
          }
        }
      }
    });

    // Drag and drop file to composer
    if (composerCard) {
      ['dragenter', 'dragover'].forEach(eventName => {
        composerCard.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          composerCard.classList.add('dragover');
        }, false);
      });

      ['dragleave', 'drop'].forEach(eventName => {
        composerCard.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          composerCard.classList.remove('dragover');
        }, false);
      });

      composerCard.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
          setPendingAttachment(files[0]);
        }
      });
    }

    // Lightbox Controls
    function openLightbox(imageUrl, filename) {
      STATE.currentLightboxImage = { url: imageUrl, filename };
      lightboxImg.src = imageUrl;
      imageLightbox.classList.add('active');
      lightboxCopyText.textContent = '复制图片到剪贴板';
      btnLightboxCopy.classList.remove('copied');
    }

    function closeLightbox() {
      imageLightbox.classList.remove('active');
      lightboxImg.src = '';
      STATE.currentLightboxImage = null;
    }

    btnCloseLightbox.addEventListener('click', closeLightbox);
    imageLightbox.addEventListener('click', (e) => {
      if (e.target === imageLightbox) closeLightbox();
    });

    btnLightboxCopy.addEventListener('click', async () => {
      if (!STATE.currentLightboxImage) return;
      const ok = await copyImageToClipboard(STATE.currentLightboxImage.url);
      if (ok) {
        lightboxCopyText.textContent = '已复制图片!';
        btnLightboxCopy.classList.add('copied');
        setTimeout(() => {
          lightboxCopyText.textContent = '复制图片到剪贴板';
          btnLightboxCopy.classList.remove('copied');
        }, 2000);
      }
    });

    btnLightboxDownload.addEventListener('click', () => {
      if (!STATE.currentLightboxImage) return;
      downloadImageFile(STATE.currentLightboxImage.url, STATE.currentLightboxImage.filename);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageLightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    // API Helper with Auth
    async function apiRequest(endpoint, method = 'GET', body = null, isFormData = false) {
      const headers = {};
      if (STATE.token) {
        headers['Authorization'] = 'Bearer ' + STATE.token;
      }
      if (!isFormData && body) {
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(endpoint, {
        method,
        headers,
        body: isFormData ? body : (body ? JSON.stringify(body) : null)
      });

      if (res.status === 401) {
        logout();
        throw new Error('未授权或密码错误');
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '请求失败');
      }
      return data;
    }

    // Auth & Init
    async function checkAuth() {
      if (!STATE.token) {
        showAuthScreen();
        return;
      }

      try {
        await fetchMessages();
        showAppMain();
        startPolling();
      } catch (err) {
        showAuthScreen();
      }
    }

    function showAuthScreen() {
      authScreen.style.display = 'grid';
      appMain.style.display = 'none';
      stopPolling();
    }

    function showAppMain() {
      authScreen.style.display = 'none';
      appMain.style.display = 'flex';
    }

    async function handleLogin() {
      const password = authInput.value.trim();
      if (!password) {
        authInput.focus();
        return;
      }

      authBtn.disabled = true;
      authBtn.textContent = '验证中...';

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          STATE.token = data.token || password;
          localStorage.setItem('sg_auth_token', STATE.token);
          authInput.value = '';
          showToast('登录成功，欢迎使用', 'success');
          await fetchMessages();
          showAppMain();
          startPolling();
        } else {
          shakeAuthCard();
          showToast(data.error || '密码错误', 'error');
        }
      } catch (err) {
        shakeAuthCard();
        showToast('连接错误，请重试', 'error');
      } finally {
        authBtn.disabled = false;
        authBtn.textContent = '解锁进入';
      }
    }

    function shakeAuthCard() {
      const card = document.querySelector('.auth-card');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }

    function logout() {
      STATE.token = '';
      localStorage.removeItem('sg_auth_token');
      stopPolling();
      showAuthScreen();
      showToast('已锁定退出', 'info');
    }

    authBtn.addEventListener('click', handleLogin);
    authInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
    btnLogout.addEventListener('click', logout);

    // Fetch Messages
    async function fetchMessages(silent = false) {
      if (!silent) {
        statusDot.style.background = '#6366f1';
        statusDot.style.boxShadow = '0 0 8px #6366f1';
        statusText.textContent = '正在同步...';
      }

      try {
        const data = await apiRequest('/api/messages');
        STATE.messages = data.messages || [];
        renderFeed();
        msgCountBadge.textContent = \`\${STATE.messages.length} 条\`;
        statusDot.style.background = '#10b981';
        statusDot.style.boxShadow = '0 0 8px #10b981';
        statusText.textContent = '多端同步已就绪';
      } catch (err) {
        statusDot.style.background = '#ef4444';
        statusDot.style.boxShadow = '0 0 8px #ef4444';
        statusText.textContent = '同步中断';
        if (!silent) showToast(err.message, 'error');
      }
    }

    // Polling & Visibility
    function startPolling() {
      stopPolling();
      STATE.pollingInterval = setInterval(() => {
        if (!document.hidden) {
          fetchMessages(true);
        }
      }, 7000);
    }

    function stopPolling() {
      if (STATE.pollingInterval) {
        clearInterval(STATE.pollingInterval);
        STATE.pollingInterval = null;
      }
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && STATE.token) {
        fetchMessages(true);
      }
    });

    window.addEventListener('focus', () => {
      if (STATE.token) fetchMessages(true);
    });

    btnRefresh.addEventListener('click', () => {
      btnRefresh.style.transform = 'rotate(180deg)';
      setTimeout(() => btnRefresh.style.transform = '', 300);
      fetchMessages(false);
    });

    // Send Message (Text, Image, or File)
    async function sendMessage() {
      const content = composerInput.value.trim();
      const hasAttachment = !!STATE.pendingAttachment;

      if (!content && !hasAttachment) return;
      if (STATE.isSubmitting) return;

      STATE.isSubmitting = true;
      btnSend.disabled = true;
      btnSend.style.opacity = '0.7';

      try {
        if (hasAttachment) {
          // Send FormData with file
          const formData = new FormData();
          formData.append('file', STATE.pendingAttachment);
          if (content) {
            formData.append('content', content);
          }
          await apiRequest('/api/messages', 'POST', formData, true);
          const isImg = STATE.pendingAttachment.type && STATE.pendingAttachment.type.startsWith('image/');
          showToast(isImg ? '图片已同步流转' : ('原文件 ' + STATE.pendingAttachment.name + ' 已同步流转'), 'success');
          clearPendingAttachment();
        } else {
          // Send plain text
          await apiRequest('/api/messages', 'POST', { content });
          showToast('已同步发送至流转流', 'success');
        }

        composerInput.value = '';
        composerInput.style.height = 'auto';
        charCount.textContent = '0 字符';
        await fetchMessages(true);
      } catch (err) {
        showToast('发送失败: ' + err.message, 'error');
      } finally {
        STATE.isSubmitting = false;
        btnSend.disabled = false;
        btnSend.style.opacity = '1';
      }
    }

    btnSend.addEventListener('click', sendMessage);
    composerInput.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    // Format Relative Time
    function formatTime(timestamp) {
      const now = Date.now();
      const diff = now - timestamp;
      const s = Math.floor(diff / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      const d = Math.floor(h / 24);

      if (s < 20) return '刚刚';
      if (s < 60) return \`\${s} 秒前\`;
      if (m < 60) return \`\${m} 分钟前\`;
      if (h < 24) return \`\${h} 小时前\`;
      if (d === 1) return '昨天 ' + new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (d < 7) return \`\${d} 天前\`;
      return new Date(timestamp).toLocaleString([], { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    // Auto-detect and render URL Chips
    function escapeAndLinkify(text) {
      if (!text) return '';
      const escaped = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

      const urlRegex = /(https?:\\/\\/[^\\s<>&"']+)/gi;
      return escaped.replace(urlRegex, (url) => {
        let cleanUrl = url;
        let suffix = '';
        while (/[.,;:!?)]$/.test(cleanUrl)) {
          suffix = cleanUrl.slice(-1) + suffix;
          cleanUrl = cleanUrl.slice(0, -1);
        }
        return \`<a href="\${cleanUrl}" target="_blank" rel="noopener noreferrer" class="msg-url-chip">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          \${cleanUrl.length > 36 ? cleanUrl.slice(0, 36) + '...' : cleanUrl}
        </a>\${suffix}\`;
      });
    }

    // Helper to get image URL for a message
    function getMessageImageUrl(msg) {
      if (msg.file_key) {
        return \`/api/files/\${encodeURIComponent(msg.file_key)}?token=\${encodeURIComponent(STATE.token)}\`;
      }
      if (msg.content && msg.content.startsWith('data:image/')) {
        return msg.content;
      }
      return '';
    }

    // Render Stream Feed
    function renderFeed() {
      let filtered = STATE.messages;
      if (STATE.searchQuery) {
        const q = STATE.searchQuery.toLowerCase();
        filtered = filtered.filter(m => {
          const isImg = m.type === 'image' || (m.content && m.content.startsWith('data:image/'));
          if (q === '图片' || q === '[图片]' || q === 'image') return isImg;
          const matchContent = m.content && m.content.toLowerCase().includes(q);
          const matchFileName = m.file_name && m.file_name.toLowerCase().includes(q);
          return matchContent || matchFileName;
        });
      }

      if (filtered.length === 0) {
        streamFeed.innerHTML = \`
          <div class="empty-state glass" style="border-radius: var(--radius-lg);">
            <div class="empty-icon">📭</div>
            <div style="font-size: 15px; font-weight: 600; color: #cbd5e1;">暂无流转记录</div>
            <p style="font-size: 13px;">在上方输入文本或直接粘贴/发送图片，将在手机与电脑端实时同步</p>
          </div>
        \`;
        return;
      }

      streamFeed.innerHTML = filtered.map(msg => {
        const isSelected = STATE.selectedIds.has(msg.id);
        const isImage = msg.type === 'image' || (msg.content && msg.content.startsWith('data:image/'));
        const isFile = !isImage && (msg.type === 'file' || msg.file_key);
        const imageUrl = isImage ? getMessageImageUrl(msg) : '';
        const fileUrl = isFile && msg.file_key ? ('/api/files/' + encodeURIComponent(msg.file_key) + '?token=' + encodeURIComponent(STATE.token) + '&download=' + encodeURIComponent(msg.file_name || 'download')) : '';

        let tagText = \`\${(msg.content || '').length} 字\`;
        if (isImage) {
          tagText = \`🖼️ 图片 \${msg.file_size ? '· ' + formatBytes(msg.file_size) : ''}\`;
        } else if (isFile) {
          tagText = \`📄 \${msg.file_name || '原文件'} \${msg.file_size ? '· ' + formatBytes(msg.file_size) : ''}\`;
        }
        const fileName = msg.file_name || (isImage ? 'image.png' : 'file.txt');

        return \`
          <div class="msg-card glass \${isSelected ? 'selected' : ''}" data-id="\${msg.id}">
            <div class="msg-header">
              <div class="msg-meta">
                \${STATE.selectMode ? \`
                  <input type="checkbox" class="msg-checkbox item-select-cb" data-id="\${msg.id}" \${isSelected ? 'checked' : ''}>
                \` : ''}
                <span class="msg-time" title="\${new Date(msg.created_at).toLocaleString()}">\${formatTime(msg.created_at)}</span>
                <span class="msg-tag \${isImage ? 'image-tag' : (isFile ? 'file-tag' : '')}">\${tagText}</span>
              </div>
              <div class="msg-actions">
                \${isImage ? \`
                  <button class="btn btn-copy-card btn-copy-image-card" data-img="\${encodeURIComponent(imageUrl)}" title="复制图片到系统剪贴板 (可在微信/QQ直接粘贴)">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>复制图片</span>
                  </button>
                  <button class="btn btn-icon btn-download-image-card" data-img="\${encodeURIComponent(imageUrl)}" data-name="\${encodeURIComponent(fileName)}" style="width: 28px; height: 28px; padding: 5px;" title="下载原图">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                \` : (isFile ? \`
                  <button class="btn btn-copy-card btn-copy-text-card" data-copy="\${encodeURIComponent(msg.content || '')}" title="复制文本内容">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>复制</span>
                  </button>
                  <button class="btn btn-icon btn-download-file-card" data-url="\${encodeURIComponent(fileUrl)}" data-name="\${encodeURIComponent(fileName)}" style="width: 28px; height: 28px; padding: 5px;" title="下载原始文件 (\${fileName})">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                \` : \`
                  <button class="btn btn-copy-card btn-copy-text-card" data-copy="\${encodeURIComponent(msg.content)}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>复制</span>
                  </button>
                  <button class="btn btn-icon btn-download-text-card" data-content="\${encodeURIComponent(msg.content)}" data-time="\${msg.created_at}" style="width: 28px; height: 28px; padding: 5px;" title="保存为 .txt">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                \`)}
                <button class="btn btn-danger btn-icon btn-single-delete" data-id="\${msg.id}" style="width: 28px; height: 28px; padding: 5px;" title="删除这条记录">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>

            \${!isImage || (msg.content && !msg.content.startsWith('data:image/')) ? \`
              <div class="msg-content">\${escapeAndLinkify(msg.content)}</div>
            \` : ''}

            \${isImage ? \`
              <div class="msg-image-wrap" data-img="\${encodeURIComponent(imageUrl)}" data-name="\${encodeURIComponent(fileName)}" title="点击全屏查看大图">
                <img src="\${imageUrl}" alt="流转图片" class="msg-image-img" loading="lazy">
                <div class="msg-image-badge">\${msg.file_size ? formatBytes(msg.file_size) : '查看大图'}</div>
              </div>
            \` : ''}
          </div>
        \`;
      }).join('');

      bindCardEvents();
      updateSelectionBar();
    }

    // Card Event Listeners
    function bindCardEvents() {
      // Copy Text button
      document.querySelectorAll('.btn-copy-text-card').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const text = decodeURIComponent(btn.getAttribute('data-copy'));
          try {
            await navigator.clipboard.writeText(text);
            const span = btn.querySelector('span');
            btn.classList.add('copied');
            span.textContent = '已复制!';
            showToast('已复制到剪贴板', 'success');
            setTimeout(() => {
              btn.classList.remove('copied');
              span.textContent = '复制';
            }, 1800);
          } catch (err) {
            fallbackCopy(text);
          }
        });
      });

      // Copy Image button (Directly to Windows / System Clipboard)
      document.querySelectorAll('.btn-copy-image-card').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const imgUrl = decodeURIComponent(btn.getAttribute('data-img'));
          const span = btn.querySelector('span');
          const ok = await copyImageToClipboard(imgUrl);
          if (ok) {
            btn.classList.add('copied');
            span.textContent = '已复制图片!';
            setTimeout(() => {
              btn.classList.remove('copied');
              span.textContent = '复制图片';
            }, 2000);
          }
        });
      });

      // Download single message as TXT
      document.querySelectorAll('.btn-download-text-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const content = decodeURIComponent(btn.getAttribute('data-content'));
          const time = btn.getAttribute('data-time') || Date.now();
          const dateStr = new Date(Number(time)).toISOString().slice(0, 19).replace(/[-:T]/g, '');
          downloadTextAsFile(\`stream-\${dateStr}.txt\`, content);
        });
      });

      // Download single message as Image
      document.querySelectorAll('.btn-download-image-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const imgUrl = decodeURIComponent(btn.getAttribute('data-img'));
          const name = decodeURIComponent(btn.getAttribute('data-name'));
          downloadImageFile(imgUrl, name);
        });
      });

      // Download single raw document / code file (MD, TXT, JSON, etc.)
      document.querySelectorAll('.btn-download-file-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const fileUrl = decodeURIComponent(btn.getAttribute('data-url'));
          const name = decodeURIComponent(btn.getAttribute('data-name'));
          const a = document.createElement('a');
          a.href = fileUrl;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          showToast('已开始下载 ' + name, 'success');
        });
      });

      // Click Image to open Fullscreen Lightbox
      document.querySelectorAll('.msg-image-wrap').forEach(wrap => {
        wrap.addEventListener('click', (e) => {
          if (STATE.selectMode) return;
          e.stopPropagation();
          const imgUrl = decodeURIComponent(wrap.getAttribute('data-img'));
          const name = decodeURIComponent(wrap.getAttribute('data-name'));
          openLightbox(imgUrl, name);
        });
      });

      // Single Delete
      document.querySelectorAll('.btn-single-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          if (confirm('确认删除这条记录（包括图片/文本）吗？')) {
            try {
              await apiRequest('/api/messages/' + id, 'DELETE');
              showToast('已删除', 'delete');
              STATE.selectedIds.delete(id);
              await fetchMessages(true);
            } catch (err) {
              showToast('删除失败: ' + err.message, 'error');
            }
          }
        });
      });

      // Card click in select mode
      if (STATE.selectMode) {
        document.querySelectorAll('.msg-card').forEach(card => {
          card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            const id = card.getAttribute('data-id');
            toggleSelectId(id);
          });
        });

        document.querySelectorAll('.item-select-cb').forEach(cb => {
          cb.addEventListener('change', (e) => {
            e.stopPropagation();
            const id = cb.getAttribute('data-id');
            if (cb.checked) {
              STATE.selectedIds.add(id);
            } else {
              STATE.selectedIds.delete(id);
            }
            renderFeed();
          });
        });
      }
    }

    function toggleSelectId(id) {
      if (STATE.selectedIds.has(id)) {
        STATE.selectedIds.delete(id);
      } else {
        STATE.selectedIds.add(id);
      }
      renderFeed();
    }

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('已复制到剪贴板', 'success');
      } catch (e) {
        showToast('复制失败，请手动选择复制', 'error');
      }
      document.body.removeChild(textarea);
    }

    // Search filter
    searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value.trim();
      renderFeed();
    });

    // Select Mode toggle
    btnToggleSelectMode.addEventListener('click', () => {
      STATE.selectMode = !STATE.selectMode;
      if (!STATE.selectMode) {
        STATE.selectedIds.clear();
      }
      selectModeText.textContent = STATE.selectMode ? '退出多选' : '多选模式';
      btnToggleSelectMode.classList.toggle('btn-accent', STATE.selectMode);
      renderFeed();
    });

    function updateSelectionBar() {
      if (!STATE.selectMode || STATE.selectedIds.size === 0) {
        selectionBar.classList.remove('active');
        return;
      }

      selectionBar.classList.add('active');
      selectedCountText.textContent = \`已选择 \${STATE.selectedIds.size} 项\`;
      selectAllCheckbox.checked = (STATE.selectedIds.size === STATE.messages.length && STATE.messages.length > 0);
    }

    // Select All
    selectAllCheckbox.addEventListener('change', () => {
      if (selectAllCheckbox.checked) {
        STATE.messages.forEach(m => STATE.selectedIds.add(m.id));
      } else {
        STATE.selectedIds.clear();
      }
      renderFeed();
    });

    // Batch Export TXT
    btnBatchExportTxt.addEventListener('click', () => {
      const selected = STATE.messages.filter(m => STATE.selectedIds.has(m.id));
      if (selected.length === 0) return;

      const combinedText = selected.map((m, idx) => {
        const timeStr = new Date(m.created_at).toLocaleString();
        const contentStr = (m.type === 'image' || (m.content && m.content.startsWith('data:image/')))
          ? \`[图片文件: \${m.file_name || 'image.png'}]\`
          : m.content;
        return \`[#\${idx + 1} - \${timeStr}]\\n\${contentStr}\\n----------------------------------------\\n\`;
      }).join('\\n');

      const dateStr = new Date().toISOString().slice(0, 10);
      downloadTextAsFile(\`stream-batch-export-\${dateStr}.txt\`, combinedText);
    });

    btnCancelSelection.addEventListener('click', () => {
      STATE.selectMode = false;
      STATE.selectedIds.clear();
      selectModeText.textContent = '多选模式';
      btnToggleSelectMode.classList.remove('btn-accent');
      renderFeed();
    });

    // Batch Delete Action
    btnBatchDelete.addEventListener('click', async () => {
      const ids = Array.from(STATE.selectedIds);
      if (ids.length === 0) return;

      if (!confirm(\`确认删除选中的 \${ids.length} 项记录吗？关联的 R2 图片与文本将一并清除，不可撤销。\`, 'batch')) {
        return;
      }

      btnBatchDelete.disabled = true;
      try {
        await apiRequest('/api/messages/batch-delete', 'POST', { ids });
        showToast(\`成功删除 \${ids.length} 条记录\`, 'delete');
        STATE.selectedIds.clear();
        await fetchMessages(true);
      } catch (err) {
        showToast('批量删除失败: ' + err.message, 'error');
      } finally {
        btnBatchDelete.disabled = false;
      }
    });

    // Time-based Deletion Modal
    btnTimeDeleteModal.addEventListener('click', () => {
      timeDeleteModal.classList.add('active');
    });

    btnCloseTimeModal.addEventListener('click', () => {
      timeDeleteModal.classList.remove('active');
    });

    timeDeleteModal.addEventListener('click', (e) => {
      if (e.target === timeDeleteModal) {
        timeDeleteModal.classList.remove('active');
      }
    });

    document.querySelectorAll('.time-option-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const range = btn.getAttribute('data-range');
        let promptText = '';
        if (range === '1h') promptText = '确认删除【最近 1 小时】内的所有记录与图片吗？';
        if (range === '1d') promptText = '确认删除【最近 1 天 (24h)】内的所有记录与图片吗？';
        if (range === '1w') promptText = '确认删除【最近 1 周 (7天)】内的所有记录与图片吗？';
        if (range === '1y') promptText = '确认删除【最近 1 年】内的所有记录与图片吗？';
        if (range === 'all') promptText = '⚠️ 极其危险警告：确认清空全部所有历史记录与存储文件吗？此操作无法撤销！';

        if (!confirm(promptText)) return;

        try {
          const res = await apiRequest('/api/messages/time-delete', 'POST', { range });
          showToast(res.message || '清理完成', 'delete');
          timeDeleteModal.classList.remove('active');
          STATE.selectedIds.clear();
          await fetchMessages(true);
        } catch (err) {
          showToast('清理失败: ' + err.message, 'error');
        }
      });
    });

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {
          reg.update();
        }).catch(err => {
          console.log('SW registration error:', err);
        });
      });
    }

    // Handle PWA Installation on Android & Desktop
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (btnInstallApp) {
        btnInstallApp.style.display = 'inline-flex';
      }
    });

    if (btnInstallApp) {
      btnInstallApp.addEventListener('click', async () => {
        if (!deferredPrompt) {
          showToast('如需添加到主屏幕，可在浏览器菜单点击「添加到主屏幕 / 安装应用」', 'info');
          return;
        }
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          showToast('已成功添加应用到主屏幕！', 'success');
          btnInstallApp.style.display = 'none';
        }
        deferredPrompt = null;
      });
    }

    window.addEventListener('appinstalled', () => {
      if (btnInstallApp) btnInstallApp.style.display = 'none';
      showToast('🎉 CF-TextRelay 已安装为独立应用', 'success');
    });

    // Start App
    checkAuth();
  </script>
</body>
</html>`;
}
