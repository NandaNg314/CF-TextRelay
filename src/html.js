// Liquid Glass UI for CF Info Worker
export function renderHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>TextRelay · 个人跨端文本中转</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <link rel="apple-touch-icon" href="/icon.svg">
  <meta name="theme-color" content="#07090e">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="TextRelay">
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
      background: rgba(56, 189, 248, 0.12) !important;
      box-shadow: 0 0 25px rgba(56, 189, 248, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
    }

    .composer-card:focus-within {
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 
        0 16px 36px -10px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(99, 102, 241, 0.3),
        inset 0 1px 1px 0 rgba(255, 255, 255, 0.2);
    }

    .composer-input {
      width: 100%;
      min-height: 88px;
      max-height: 360px;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-main);
      font-family: inherit;
      font-size: 15px;
      line-height: 1.6;
      resize: vertical;
    }

    .composer-input::placeholder {
      color: rgba(148, 163, 184, 0.6);
    }

    .composer-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .composer-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: var(--text-muted);
    }

    .shortcut-hint {
      display: none;
      align-items: center;
      gap: 4px;
    }

    @media (min-width: 640px) {
      .shortcut-hint {
        display: inline-flex;
      }
    }

    .kbd {
      padding: 2px 6px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 4px;
      font-family: var(--mono);
      font-size: 11px;
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .composer-btns {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    /* Filter & Controls Bar */
    .controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      padding: 0 4px;
    }

    .search-box {
      position: relative;
      flex: 1;
      max-width: 320px;
    }

    .search-input {
      width: 100%;
      padding: 8px 12px 8px 34px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-sm);
      color: var(--text-main);
      font-size: 13px;
      outline: none;
      transition: all 0.2s;
    }

    .search-input:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(99, 102, 241, 0.4);
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
      width: 15px;
      height: 15px;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Message Stream List */
    .stream-feed {
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-height: 160px;
    }

    /* Message Card */
    .msg-card {
      border-radius: var(--radius-md);
      padding: 16px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
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

    /* Modals */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 1000;
      display: none;
      place-content: center;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .modal-overlay.active {
      display: grid;
      opacity: 1;
    }

    .modal-card {
      width: 100%;
      max-width: 440px;
      border-radius: var(--radius-lg);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      transform: scale(0.95);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.active .modal-card {
      transform: scale(1);
    }

    .modal-title {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .modal-options-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .time-option-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      font-size: 14px;
      cursor: pointer;
      transition: all 0.18s;
      text-align: left;
    }

    .time-option-btn:hover {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.35);
      color: #fca5a5;
    }

    .time-option-btn .badge-danger {
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
    }

    /* Auth Screen */
    .auth-overlay {
      position: fixed;
      inset: 0;
      background: var(--bg);
      z-index: 2000;
      display: grid;
      place-content: center;
      padding: 20px;
    }

    .auth-card {
      width: 100%;
      max-width: 380px;
      border-radius: var(--radius-lg);
      padding: 32px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }

    .auth-icon {
      width: 64px;
      height: 64px;
      border-radius: 20px;
      background: var(--accent-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      box-shadow: 0 10px 30px var(--accent-glow);
    }

    .auth-input-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .auth-input {
      width: 100%;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--card-border);
      color: #fff;
      font-size: 15px;
      outline: none;
      text-align: center;
      letter-spacing: 2px;
      transition: all 0.2s;
    }

    .auth-input:focus {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-glow);
    }

    .auth-card.shake {
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
      z-index: 3000;
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    }

    .toast {
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 13.5px;
      font-weight: 500;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .toast.hide {
      animation: toastOut 0.25s forwards ease;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-16px) scale(0.9); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes toastOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(-16px) scale(0.9); }
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

  <!-- Auth Screen (Visible when not logged in) -->
  <div class="auth-overlay" id="authScreen" style="display: none;">
    <div class="auth-card glass">
      <div class="auth-icon">💧</div>
      <div>
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">TextRelay 文本中转站</h2>
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
          <h1>TextRelay</h1>
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
      <textarea id="composerInput" class="composer-input" placeholder="在此粘贴或输入需要跨端流转的文本... (支持快捷复制 / 快捷发送)"></textarea>
      <div class="composer-footer">
        <div class="composer-info">
          <span id="charCount">0 字符</span>
          <span class="shortcut-hint">
            <span class="kbd">Ctrl</span> + <span class="kbd">Enter</span> 发送
          </span>
        </div>
        <div class="composer-btns">
          <input type="file" id="fileUploadInput" accept="text/plain, text/*, .txt, .md, .log, .json, .csv, .js, .py, .html, .css, .sql, .xml, .yaml, .yml, application/json" style="display: none;">
          <button class="btn" id="btnUploadTxt" title="上传 TXT / 文本文件">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            上传 TXT
          </button>
          <button class="btn" id="btnPasteClipboard" title="从剪贴板粘贴">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            </svg>
            粘贴
          </button>
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
        <input type="text" id="searchInput" class="search-input" placeholder="搜索文本记录...">
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
        选择要删除的时间范围。此操作将为所有终端永久删除指定信息，请谨慎操作。
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
          <span style="color: #f87171; font-weight: 600;">清空全部信息 (一键重置)</span>
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
      isSubmitting: false
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
    const fileUploadInput = document.getElementById('fileUploadInput');
    const composerCard = document.querySelector('.composer-card');
    const btnInstallApp = document.getElementById('btnInstallApp');
    const btnTimeDeleteModal = document.getElementById('btnTimeDeleteModal');
    const timeDeleteModal = document.getElementById('timeDeleteModal');
    const btnCloseTimeModal = document.getElementById('btnCloseTimeModal');
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

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
      }, 2200);
    }

    // Auto-expanding textarea
    composerInput.addEventListener('input', () => {
      composerInput.style.height = 'auto';
      composerInput.style.height = Math.min(composerInput.scrollHeight, 360) + 'px';
      charCount.textContent = \`\${composerInput.value.length} 字符\`;
    });

    // Paste from clipboard helper
    btnPasteClipboard.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
          showToast('当前浏览器不支持直接读取剪贴板，请手动 Ctrl+V', 'error');
          return;
        }
        const text = await navigator.clipboard.readText();
        if (text) {
          composerInput.value = (composerInput.value ? composerInput.value + '\\n' : '') + text;
          composerInput.dispatchEvent(new Event('input'));
          showToast('已从剪贴板粘贴', 'success');
        } else {
          showToast('剪贴板为空', 'info');
        }
      } catch (err) {
        showToast('读取剪贴板失败，请允许剪贴板权限或手动粘贴', 'error');
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

    // Upload TXT / text file helper
    function handleTxtFile(file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('文件过大，支持不超过 2MB 的纯文本文件', 'error');
        return;
      }
      if (file.type && file.type.startsWith('image/')) {
        showToast('当前选择的是图片，请在文件列表中选择 .txt 文本文件', 'error');
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
      if (file) handleTxtFile(file);
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
          handleTxtFile(files[0]);
        }
      });
    }

    // API Helper with Auth
    async function apiRequest(endpoint, method = 'GET', body = null) {
      const headers = {
        'Content-Type': 'application/json'
      };
      if (STATE.token) {
        headers['Authorization'] = 'Bearer ' + STATE.token;
      }

      const res = await fetch(endpoint, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      });

      if (res.status === 401) {
        // Unauthorized
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

    // Send Message
    async function sendMessage() {
      const content = composerInput.value.trim();
      if (!content || STATE.isSubmitting) return;

      STATE.isSubmitting = true;
      btnSend.disabled = true;
      btnSend.style.opacity = '0.7';

      try {
        const data = await apiRequest('/api/messages', 'POST', { content });
        composerInput.value = '';
        composerInput.style.height = 'auto';
        charCount.textContent = '0 字符';
        showToast('已同步发送至流转流', 'success');
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

    // Render Stream Feed
    function renderFeed() {
      let filtered = STATE.messages;
      if (STATE.searchQuery) {
        const q = STATE.searchQuery.toLowerCase();
        filtered = filtered.filter(m => m.content.toLowerCase().includes(q));
      }

      if (filtered.length === 0) {
        streamFeed.innerHTML = \`
          <div class="empty-state glass" style="border-radius: var(--radius-lg);">
            <div class="empty-icon">📭</div>
            <div style="font-size: 15px; font-weight: 600; color: #cbd5e1;">暂无流转文本</div>
            <p style="font-size: 13px;">在上方输入或粘贴文本，将在手机、平板和电脑端实时显示</p>
          </div>
        \`;
        return;
      }

      streamFeed.innerHTML = filtered.map(msg => {
        const isSelected = STATE.selectedIds.has(msg.id);
        return \`
          <div class="msg-card glass \${isSelected ? 'selected' : ''}" data-id="\${msg.id}">
            <div class="msg-header">
              <div class="msg-meta">
                \${STATE.selectMode ? \`
                  <input type="checkbox" class="msg-checkbox item-select-cb" data-id="\${msg.id}" \${isSelected ? 'checked' : ''}>
                \` : ''}
                <span class="msg-time" title="\${new Date(msg.created_at).toLocaleString()}">\${formatTime(msg.created_at)}</span>
                <span class="msg-tag">\${msg.content.length} 字</span>
              </div>
              <div class="msg-actions">
                <button class="btn btn-copy-card" data-copy="\${encodeURIComponent(msg.content)}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>复制</span>
                </button>
                <button class="btn btn-icon btn-download-card" data-content="\${encodeURIComponent(msg.content)}" data-time="\${msg.created_at}" style="width: 28px; height: 28px; padding: 5px;" title="下载保存为 .txt">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
                <button class="btn btn-danger btn-icon btn-single-delete" data-id="\${msg.id}" style="width: 28px; height: 28px; padding: 5px;" title="删除这条">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="msg-content">\${escapeAndLinkify(msg.content)}</div>
          </div>
        \`;
      }).join('');

      bindCardEvents();
      updateSelectionBar();
    }

    // Card Event Listeners
    function bindCardEvents() {
      // Copy button
      document.querySelectorAll('.btn-copy-card').forEach(btn => {
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
            // Fallback for older devices / safari
            fallbackCopy(text);
          }
        });
      });

      // Download single message as TXT
      document.querySelectorAll('.btn-download-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const content = decodeURIComponent(btn.getAttribute('data-content'));
          const time = btn.getAttribute('data-time') || Date.now();
          const dateStr = new Date(Number(time)).toISOString().slice(0, 19).replace(/[-:T]/g, '');
          downloadTextAsFile(\`stream-\${dateStr}.txt\`, content);
        });
      });

      // Single Delete
      document.querySelectorAll('.btn-single-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          if (confirm('确认删除这条信息吗？')) {
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
        return \`[#\${idx + 1} - \${timeStr}]\\n\${m.content}\\n----------------------------------------\\n\`;
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

      if (!confirm(\`确认删除选中的 \${ids.length} 条信息吗？该操作不可撤销。\`, 'batch')) {
        return;
      }

      btnBatchDelete.disabled = true;
      try {
        await apiRequest('/api/messages/batch-delete', 'POST', { ids });
        showToast(\`成功删除 \${ids.length} 条信息\`, 'delete');
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
        if (range === '1h') promptText = '确认删除【最近 1 小时】内的所有信息吗？';
        if (range === '1d') promptText = '确认删除【最近 1 天 (24h)】内的所有信息吗？';
        if (range === '1w') promptText = '确认删除【最近 1 周 (7天)】内的所有信息吗？';
        if (range === '1y') promptText = '确认删除【最近 1 年】内的所有信息吗？';
        if (range === 'all') promptText = '⚠️ 极其危险警告：确认清空全部所有历史信息吗？此操作无法撤销！';

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
        navigator.serviceWorker.register('/sw.js').catch(err => {
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
      showToast('🎉 TextRelay 文本中转站已安装为独立应用', 'success');
    });

    // Start App
    checkAuth();
  </script>
</body>
</html>`;
}
