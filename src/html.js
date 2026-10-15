// Raycast / Linear / macOS Sequoia UI for CF-TextRelay
export function renderHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>CF-TextRelay · 个人跨端文本与图片中转站</title>
  <link rel="manifest" href="/manifest.json?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="/apple-touch-icon.png">
  <link rel="icon" type="image/svg+xml" href="/icon.svg">
  <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png">
  <meta name="theme-color" content="#F2F2F7" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#161618" media="(prefers-color-scheme: dark)">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="CF-TextRelay">
  <style>
    /* ============================================================
       CF-TextRelay · macOS Sequoia Native Design System
       Liquid Glass · Vibrancy · Apple System Colors
       ============================================================ */

    :root {
      /* Apple System Colors */
      --sys-blue: #007AFF;
      --sys-blue-hover: #0A84FF;
      --sys-green: #34C759;
      --sys-red: #FF3B30;
      --sys-orange: #FF9F0A;
      --sys-label-secondary: #8E8E93;

      /* Light Mode (macOS Native) */
      --bg: #F2F2F7;
      --card-bg: rgba(255, 255, 255, 0.78);
      --card-bg-hover: rgba(255, 255, 255, 0.9);
      --card-bg-solid: rgba(255, 255, 255, 0.72);
      --card-border: rgba(255, 255, 255, 0.85);
      --card-border-hover: rgba(255, 255, 255, 1);
      --card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03);
      --card-shadow-hover: 0 18px 40px -8px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04);
      --glass-inset: inset 0 1px 0 rgba(255, 255, 255, 0.9);
      --text-main: #1D1D1F;
      --text-muted: #6E6E73;
      --text-subtle: #8E8E93;
      --accent: #007AFF;
      --accent-glow: rgba(0, 122, 255, 0.28);
      --fill-quaternary: rgba(120, 120, 128, 0.08);
      --fill-tertiary: rgba(120, 120, 128, 0.12);
      --separator: rgba(60, 60, 67, 0.12);
      --danger: #FF3B30;
      --danger-bg: rgba(255, 59, 48, 0.1);
      --danger-border: rgba(255, 59, 48, 0.28);
      --success: #34C759;
      --blur-amount: 30px;
      --sat-amount: 190%;
      --cloud-1: rgba(0, 122, 255, 0.35);
      --cloud-2: rgba(175, 82, 222, 0.28);
      --cloud-3: rgba(90, 200, 250, 0.25);

      /* Radii (Sequoia generous rounding) */
      --radius-xs: 6px;
      --radius-sm: 10px;
      --radius-md: 14px;
      --radius-lg: 18px;
      --radius-xl: 20px;
      --radius-2xl: 22px;
      --radius-3xl: 26px;

      --font: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "PingFang SC", "Helvetica Neue", "Segoe UI", Roboto, sans-serif;
      --mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace;
      --ease-apple: cubic-bezier(0.22, 1, 0.36, 1);
      --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        /* macOS Dark Mode (Deep space blue-gray, never pure black) */
        --bg: #161618;
        --card-bg: rgba(38, 38, 42, 0.72);
        --card-bg-hover: rgba(48, 48, 53, 0.8);
        --card-bg-solid: rgba(38, 38, 42, 0.68);
        --card-border: rgba(255, 255, 255, 0.09);
        --card-border-hover: rgba(255, 255, 255, 0.18);
        --card-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.45);
        --card-shadow-hover: 0 22px 48px -8px rgba(0, 0, 0, 0.6);
        --glass-inset: inset 0 1px 0 0 rgba(255, 255, 255, 0.18);
        --text-main: #F5F5F7;
        --text-muted: #A1A1A6;
        --text-subtle: #8E8E93;
        --accent: #0A84FF;
        --accent-glow: rgba(10, 132, 255, 0.35);
        --fill-quaternary: rgba(120, 120, 128, 0.16);
        --fill-tertiary: rgba(120, 120, 128, 0.24);
        --separator: rgba(255, 255, 255, 0.1);
        --danger: #FF453A;
        --danger-bg: rgba(255, 69, 58, 0.12);
        --danger-border: rgba(255, 69, 58, 0.3);
        --success: #30D158;
        --blur-amount: 30px;
        --sat-amount: 180%;
        --cloud-1: rgba(10, 132, 255, 0.22);
        --cloud-2: rgba(94, 92, 230, 0.2);
        --cloud-3: rgba(191, 90, 242, 0.16);
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    html, body {
      min-height: 100vh;
      min-height: 100dvh;
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding-bottom: max(48px, env(safe-area-inset-bottom, 48px));
      line-height: 1.5;
      letter-spacing: -0.01em;
    }

    /* ========= Ambient Vibrancy Background (Soft color clouds) ========= */
    .ambient-background {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .ambient-cloud {
      position: absolute;
      border-radius: 50%;
      opacity: 0.35;
      filter: blur(90px);
      will-change: transform;
    }

    .ambient-cloud.c1 {
      width: 640px;
      height: 640px;
      top: -220px;
      left: -160px;
      background: var(--cloud-1);
      animation: floatA 22s ease-in-out infinite;
    }

    .ambient-cloud.c2 {
      width: 560px;
      height: 560px;
      top: -140px;
      right: -180px;
      background: var(--cloud-2);
      animation: floatB 26s ease-in-out infinite;
    }

    .ambient-cloud.c3 {
      width: 520px;
      height: 520px;
      bottom: -240px;
      left: 30%;
      background: var(--cloud-3);
      animation: floatA 30s ease-in-out infinite reverse;
    }

    @keyframes floatA {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(40px, 30px) scale(1.08); }
    }

    @keyframes floatB {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(-50px, 40px) scale(1.1); }
    }

    /* ========= Liquid Glass Material ========= */
    .glass {
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), var(--card-shadow);
    }

      /* ========= App Container (max-w-6xl / 1120px) ========= */
    .app-container {
      width: 100%;
      max-width: 1120px;
      padding: 20px 24px 48px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
      margin: 0 auto;
    }

    /* Header: macOS Control Center floating bar */
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 60px;
      width: 100%;
      align-self: stretch;
      box-sizing: border-box;
      border-radius: var(--radius-xl);
      position: sticky;
      top: 14px;
      z-index: 40;
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), var(--card-shadow);
      transition: box-shadow 0.25s var(--ease-apple), border-color 0.25s var(--ease-apple);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 11px;
      text-decoration: none;
      color: inherit;
      user-select: none;
    }

    /* macOS App Icon (Superellipse with top highlight) */
    .brand-icon {
      width: 34px;
      height: 34px;
      border-radius: 22.5%;
      background: linear-gradient(180deg, #4DA3FF 0%, #007AFF 55%, #0062CC 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 122, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 2px rgba(0, 0, 0, 0.15);
      position: relative;
    }

    .brand-icon::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 22.5%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 45%);
      pointer-events: none;
    }

    .brand-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .brand-title h1 {
      font-size: 15px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--text-main);
      line-height: 1.2;
    }

    .brand-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--text-subtle);
      white-space: nowrap;
      line-height: 1;
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 8px var(--success);
      animation: pulse 2.5s infinite;
      flex-shrink: 0;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(0.85); }
    }

    .badge-capsule {
      padding: 1px 7px;
      font-size: 10px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      color: var(--text-subtle);
      background: var(--fill-quaternary);
      border: none;
      border-radius: 9999px;
      margin-left: 2px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* ========= Buttons ========= */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 0 13px;
      height: 32px;
      border-radius: var(--radius-sm);
      font-size: 12.5px;
      font-weight: 500;
      color: var(--text-main);
      cursor: pointer;
      border: 1px solid transparent;
      background: var(--fill-quaternary);
      transition: all 0.18s var(--ease-apple);
      user-select: none;
      outline: none;
      -webkit-appearance: none;
      appearance: none;
      font-family: inherit;
    }

    .btn:hover {
      background: var(--fill-tertiary);
      color: var(--text-main);
    }

    .btn:active {
      transform: scale(0.97);
    }

    /* Header icon buttons (superellipse matte) */
    .btn-header-icon {
      width: 34px;
      height: 34px;
      padding: 0;
      border-radius: 22.5%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      background: var(--fill-quaternary);
      border: 1px solid var(--card-border);
      transition: all 0.15s var(--ease-apple);
    }

    .btn-header-icon:hover {
      color: var(--text-main);
      background: var(--fill-tertiary);
      border-color: var(--card-border-hover);
    }

    .btn-header-icon:active {
      transform: scale(0.92);
    }

    .btn-primary {
      background: var(--accent);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      box-shadow: 0 4px 12px var(--accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.28);
      font-weight: 500;
    }

    .btn-primary:hover {
      background: var(--sys-blue-hover);
      box-shadow: 0 6px 18px var(--accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.35);
      color: #FFFFFF;
    }

    .btn-danger {
      background: var(--danger-bg);
      border-color: var(--danger-border);
      color: var(--danger);
    }

    .btn-danger:hover {
      background: rgba(255, 59, 48, 0.18);
      border-color: var(--danger);
      color: var(--danger);
      box-shadow: 0 0 12px rgba(255, 59, 48, 0.2);
    }

    .btn-accent {
      color: var(--accent);
      border-color: rgba(0, 122, 255, 0.28);
      background: rgba(0, 122, 255, 0.1);
    }

    .btn-accent:hover {
      background: rgba(0, 122, 255, 0.18);
      border-color: var(--accent);
      color: var(--accent);
    }

    /* ========= Desktop Split-View Workbench ========= */
    .workbench {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      align-items: start;
      width: 100%;
    }

    @media (min-width: 1024px) {
      .workbench {
        grid-template-columns: 360px 1fr;
        gap: 24px;
      }
    }

    /* ========= Left: Quick Note Composer (Sticky) ========= */
    .composer-column {
      width: 100%;
    }

    @media (min-width: 1024px) {
      .composer-column {
        position: sticky;
        top: 24px;
      }
    }

    .composer-card {
      border-radius: var(--radius-2xl);
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), var(--card-shadow);
      transition: border-color 0.25s var(--ease-apple), box-shadow 0.25s var(--ease-apple);
    }

    .composer-card:focus-within,
    .composer-card.dragover {
      border-color: rgba(0, 122, 255, 0.5);
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.14), var(--glass-inset), 0 18px 40px -8px rgba(0, 0, 0, 0.12);
    }

    .composer-input {
      width: 100%;
      min-height: 200px;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-main);
      font-family: var(--font);
      font-size: 15px;
      line-height: 1.6;
      resize: none;
      scrollbar-width: thin;
      -webkit-appearance: none;
      appearance: none;
    }

    .composer-input::placeholder {
      color: var(--text-subtle);
      font-size: 14.5px;
    }

    /* Pending attachment banner */
    .pending-image-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 14px;
      background: rgba(0, 122, 255, 0.08);
      border: 1px solid rgba(0, 122, 255, 0.24);
      border-radius: var(--radius-md);
      animation: fadeIn 0.25s var(--ease-apple);
    }

    .pending-image-info {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .pending-image-thumb {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      object-fit: cover;
      border: 1px solid var(--card-border);
      background: var(--fill-quaternary);
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
      font-weight: 500;
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pending-image-size {
      font-size: 11px;
      color: var(--text-subtle);
    }

    .composer-meta-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 11px;
      color: var(--text-subtle);
      white-space: nowrap;
      min-height: 14px;
    }

    .composer-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--separator);
      flex-wrap: nowrap;
    }

    .composer-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      color: var(--text-subtle);
      white-space: nowrap;
    }

    .shortcut-hint {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      color: var(--text-subtle);
    }

    .kbd {
      padding: 1px 5px;
      border-radius: 5px;
      background: var(--fill-quaternary);
      border: 1px solid var(--card-border);
      font-family: var(--font);
      font-size: 10.5px;
      color: var(--text-muted);
    }

    .composer-btns {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
      flex-wrap: nowrap;
      white-space: nowrap;
    }

    /* iOS Pill buttons */
    .composer-btns .btn {
      height: 32px;
      border-radius: 9999px;
      font-size: 12.5px;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* Send button pinned to the right edge */
    .composer-btns #btnSend {
      margin-left: auto;
    }

    /* ========= Right Column ========= */
    .content-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 0;
      width: 100%;
    }

    /* Spotlight-style search & controls */
    .controls-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
    }

    .search-box {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      height: 42px;
    }

    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: var(--text-subtle);
      pointer-events: none;
    }

    .search-input {
      width: 100%;
      height: 42px;
      padding: 0 16px 0 38px;
      border-radius: var(--radius-md);
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset);
      color: var(--text-main);
      font-size: 14px;
      font-family: var(--font);
      outline: none;
      transition: all 0.2s var(--ease-apple);
      -webkit-appearance: none;
      appearance: none;
    }

    .search-input:focus {
      border-color: rgba(0, 122, 255, 0.5);
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.14), var(--glass-inset);
    }

    .search-input::placeholder {
      color: var(--text-subtle);
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      height: 42px;
    }

    .btn-select-mode {
      height: 42px;
      padding: 0 16px;
      border-radius: var(--radius-md);
      white-space: nowrap;
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset);
    }

    /* ========= Bento History — Masonry (CSS Columns) ========= */
    /* Mobile-first: single column flex stack */
    .stream-feed {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }

    /* Desktop: seamless masonry columns (no vertical gaps) */
    @media (min-width: 768px) {
      .stream-feed {
        display: block;
        column-count: 2;
        column-gap: 16px;
      }
    }

    /* Anti-break rules keep each card intact & flowing tightly */
    .stream-feed .msg-card {
      break-inside: avoid;
      -webkit-column-break-inside: avoid;
      page-break-inside: avoid;
      margin-bottom: 16px;
      width: 100%;
      display: inline-block;
      vertical-align: top;
    }

    /* Empty state spans full width */
    .stream-feed > .empty-state {
      width: 100%;
      break-inside: avoid;
      column-span: all;
      -webkit-column-span: all;
    }

    /* ========= Clip Card (iOS Notes / Paste feel) ========= */
    .msg-card {
      border-radius: var(--radius-xl);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), var(--card-shadow);
      transition: transform 0.25s var(--ease-apple), box-shadow 0.25s var(--ease-apple), border-color 0.25s var(--ease-apple), background-color 0.25s var(--ease-apple);
      position: relative;
      animation: fadeIn 0.3s var(--ease-apple);
      min-width: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .msg-card:hover {
      transform: translateY(-2px);
      background: var(--card-bg-hover);
      border-color: var(--card-border-hover);
      box-shadow: var(--glass-inset), var(--card-shadow-hover);
    }

    .msg-card.selected {
      border-color: rgba(0, 122, 255, 0.6);
      box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.28), var(--glass-inset), var(--card-shadow);
    }

    .msg-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: nowrap;
      margin-bottom: 10px;
    }

    .msg-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text-subtle);
      min-width: 0;
      flex-wrap: nowrap;
      overflow: hidden;
    }

    .msg-checkbox {
      appearance: none;
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border: 1.5px solid var(--card-border-hover);
      border-radius: 6px;
      background: var(--fill-quaternary);
      cursor: pointer;
      display: grid;
      place-content: center;
      transition: all 0.15s var(--ease-apple);
      flex-shrink: 0;
    }

    .msg-checkbox:checked {
      background: var(--accent);
      border-color: var(--accent);
    }

    .msg-checkbox:checked::before {
      content: "";
      width: 8px;
      height: 4px;
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      transform: rotate(-45deg) translate(1px, -1px);
    }

    .msg-time {
      font-variant-numeric: tabular-nums;
      color: var(--sys-label-secondary);
      white-space: nowrap;
    }

    .msg-tag {
      padding: 2px 10px;
      font-size: 11px;
      font-weight: 500;
      border-radius: 999px;
      background: var(--fill-quaternary);
      border: none;
      color: var(--text-muted);
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .msg-tag.image-tag {
      background: rgba(0, 122, 255, 0.12);
      color: var(--accent);
    }

    .msg-tag.file-tag {
      background: rgba(175, 82, 222, 0.12);
      color: #AF52DE;
    }

    /* Pill Group for card actions */
    .msg-actions {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 3px;
      border-radius: 9999px;
      background: var(--fill-quaternary);
      border: 1px solid var(--card-border);
      flex-shrink: 0;
    }

    .btn-card-action {
      height: 26px;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 9999px;
      background: transparent;
      border: none;
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: all 0.16s var(--ease-apple);
      user-select: none;
      font-family: inherit;
    }

    .btn-card-action:hover {
      background: var(--fill-tertiary);
      color: var(--text-main);
    }

    .btn-card-action:active {
      transform: scale(0.95);
    }

    .btn-copy-card {
      background: transparent;
      border: none;
      color: var(--text-main);
      font-weight: 500;
    }

    .btn-copy-card:hover {
      background: rgba(0, 122, 255, 0.15);
      color: var(--accent);
    }

    .btn-copy-card.copied {
      background: rgba(52, 199, 89, 0.18);
      color: var(--success);
    }

    .btn-card-icon {
      width: 26px;
      height: 26px;
      padding: 0;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: opacity 0.2s var(--ease-apple), color 0.15s var(--ease-apple), background-color 0.15s var(--ease-apple), transform 0.15s var(--ease-apple);
      font-family: inherit;
      opacity: 0.55;
    }

    @media (hover: none) {
      .btn-card-icon {
        opacity: 1;
      }
    }

    .msg-card:hover .btn-card-icon {
      opacity: 1;
    }

    .btn-card-icon:hover {
      color: var(--text-main);
      background: var(--fill-tertiary);
      opacity: 1;
    }

    .btn-card-icon:active {
      transform: scale(0.92);
    }

    .btn-card-icon.btn-single-delete:hover {
      background: rgba(255, 59, 48, 0.15);
      color: var(--danger);
    }

    /* Message Typography */
    .msg-content {
      font-size: 14.5px;
      line-height: 1.6;
      color: var(--text-main);
      letter-spacing: -0.01em;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: anywhere;
      user-select: text;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      line-clamp: 8;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Image framing (macOS floating window thumbnail) */
    .msg-image-wrap {
      margin-top: 4px;
      border-radius: 12px;
      overflow: hidden;
      background: var(--fill-quaternary);
      border: none;
      outline: 1px solid rgba(128, 128, 128, 0.15);
      outline-offset: -1px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      position: relative;
      cursor: zoom-in;
      transition: all 0.25s var(--ease-apple);
      width: 100%;
      max-height: 220px;
    }

    .msg-image-wrap:hover {
      outline-color: rgba(0, 122, 255, 0.4);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
    }

    .msg-image-img {
      width: 100%;
      height: 220px;
      max-height: 220px;
      object-fit: cover;
      object-position: top;
      display: block;
      transition: transform 0.35s var(--ease-apple);
    }

    .msg-image-wrap:hover .msg-image-img {
      transform: scale(1.02);
    }

    .msg-image-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      padding: 3px 9px;
      font-size: 10.5px;
      font-weight: 500;
      border-radius: 9999px;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      pointer-events: none;
      letter-spacing: 0.01em;
    }

    /* URL Chip */
    .msg-url-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin: 2px 0;
      padding: 3px 10px;
      font-size: 12px;
      color: var(--accent);
      background: rgba(0, 122, 255, 0.1);
      border: none;
      border-radius: 999px;
      text-decoration: none;
      vertical-align: middle;
      transition: all 0.15s var(--ease-apple);
      max-width: min(100%, 420px);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .msg-url-chip:hover {
      background: rgba(0, 122, 255, 0.18);
      color: var(--accent);
    }

    /* ========= Floating Multi-select Action Bar ========= */
    .selection-bar {
      position: fixed;
      bottom: max(24px, env(safe-area-inset-bottom, 24px));
      left: 50%;
      transform: translateX(-50%) translateY(120px);
      z-index: 150;
      width: calc(100% - 32px);
      max-width: 620px;
      padding: 10px 16px;
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), 0 20px 40px rgba(0, 0, 0, 0.25);
      transition: transform 0.32s var(--ease-apple);
    }

    .selection-bar.active {
      transform: translateX(-50%) translateY(0);
    }

    .selection-count {
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* ========= Lightbox Modal ========= */
    .lightbox-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(10, 10, 12, 0.72);
      backdrop-filter: blur(32px) saturate(180%);
      -webkit-backdrop-filter: blur(32px) saturate(180%);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.25s ease-out;
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
      gap: 14px;
      position: relative;
    }

    .lightbox-img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: var(--radius-lg);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.14);
    }

    .lightbox-toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: var(--card-bg);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset);
    }

    .lightbox-close-btn {
      position: absolute;
      top: -42px;
      right: 0;
      background: var(--fill-tertiary);
      border: 1px solid var(--card-border);
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.15s var(--ease-apple);
    }

    .lightbox-close-btn:hover {
      background: var(--fill-tertiary);
      transform: scale(1.06);
    }

    /* ========= Modal Dialogs ========= */
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(10, 10, 12, 0.5);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
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
      border-radius: var(--radius-2xl);
      padding: 22px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: modalPop 0.28s var(--ease-apple);
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), 0 24px 50px rgba(0, 0, 0, 0.3);
    }

    @keyframes modalPop {
      from { transform: scale(0.94); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-title {
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-main);
    }

    .modal-desc {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .modal-options-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .time-option-btn {
      padding: 11px 14px;
      border-radius: var(--radius-md);
      background: var(--fill-quaternary);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      font-size: 13px;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
      transition: all 0.15s var(--ease-apple);
      text-align: left;
    }

    .time-option-btn:hover {
      background: var(--danger-bg);
      border-color: var(--danger-border);
      transform: translateX(2px);
    }

    .badge-danger {
      padding: 2px 8px;
      font-size: 10.5px;
      border-radius: 9999px;
      background: var(--danger-bg);
      color: var(--danger);
      border: 1px solid var(--danger-border);
      white-space: nowrap;
    }

    /* ========= Auth Screen ========= */
    .auth-overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      display: grid;
      place-items: center;
      padding: 20px;
      backdrop-filter: blur(32px) saturate(180%);
      -webkit-backdrop-filter: blur(32px) saturate(180%);
      background: rgba(242, 242, 247, 0.6);
    }

    @media (prefers-color-scheme: dark) {
      .auth-overlay {
        background: rgba(16, 16, 18, 0.7);
      }
    }

    .auth-card {
      width: 100%;
      max-width: 360px;
      border-radius: var(--radius-3xl);
      padding: 34px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 18px;
      background: var(--card-bg);
      backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      -webkit-backdrop-filter: blur(var(--blur-amount)) saturate(var(--sat-amount));
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), 0 30px 60px rgba(0, 0, 0, 0.22);
    }

    .auth-icon {
      width: 56px;
      height: 56px;
      border-radius: 22.5%;
      background: linear-gradient(180deg, #4DA3FF 0%, #007AFF 55%, #0062CC 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      box-shadow: 0 8px 24px var(--accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .auth-input-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .auth-input {
      width: 100%;
      height: 44px;
      padding: 0 16px;
      border-radius: var(--radius-md);
      background: var(--card-bg-solid);
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset);
      color: var(--text-main);
      font-size: 15px;
      font-family: var(--font);
      text-align: center;
      outline: none;
      transition: all 0.2s var(--ease-apple);
      letter-spacing: 2px;
      -webkit-appearance: none;
      appearance: none;
    }

    .auth-input:focus {
      border-color: rgba(0, 122, 255, 0.5);
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.14), var(--glass-inset);
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

    /* ========= macOS Dynamic HUD Toast ========= */
    .toast-container {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      pointer-events: none;
    }

    .toast {
      padding: 8px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--card-bg);
      backdrop-filter: blur(24px) saturate(180%);
      -webkit-backdrop-filter: blur(24px) saturate(180%);
      border: 1px solid var(--card-border);
      box-shadow: var(--glass-inset), 0 12px 28px rgba(0, 0, 0, 0.2);
      animation: toastIn 0.3s var(--ease-apple);
      pointer-events: auto;
      max-width: 90vw;
      white-space: nowrap;
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateY(-14px) scale(0.94); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .toast.hide {
      opacity: 0;
      transform: translateY(-8px) scale(0.95);
      transition: all 0.2s;
    }

    /* ========= Empty state ========= */
    .empty-state {
      padding: 56px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      color: var(--text-muted);
      border-radius: var(--radius-2xl);
    }

    .empty-icon {
      width: 48px;
      height: 48px;
      color: var(--text-subtle);
      opacity: 0.6;
      margin-bottom: 4px;
    }

    /* ========= Responsive Overrides (< 640px) ========= */
    @media (max-width: 640px) {
      .app-container {
        padding: 12px 14px 32px;
        gap: 12px;
      }
      header {
        top: 8px;
        padding: 8px 10px !important;
        gap: 6px !important;
        justify-content: space-between;
        overflow: hidden;
        height: 54px;
        box-sizing: border-box;
        border-radius: var(--radius-lg);
      }
      .brand {
        gap: 8px;
        min-width: 0;
        flex-shrink: 1;
        overflow: hidden;
      }
      .brand-icon {
        width: 34px !important;
        height: 34px !important;
        flex-shrink: 0;
      }
      .brand-title {
        min-width: 0;
        overflow: hidden;
      }
      .brand-title h1 {
        font-size: 14px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .brand-status {
        font-size: 11px;
        gap: 4px;
        white-space: nowrap;
        overflow: hidden;
      }
      #statusText {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .badge-capsule {
        padding: 1px 6px;
        flex-shrink: 0;
      }
      .header-actions {
        display: flex;
        align-items: center;
        gap: 4px !important;
        flex-shrink: 0;
        background: rgba(118, 118, 128, 0.08);
        padding: 3px;
        border-radius: 12px;
      }
      .btn-header-icon {
        width: 30px !important;
        height: 30px !important;
        min-width: 30px !important;
        padding: 0 !important;
        border-radius: 8px !important;
        border: none;
      }
      .btn-header-icon svg {
        width: 15px;
        height: 15px;
      }
      .composer-card {
        padding: 14px;
        border-radius: var(--radius-xl);
      }
      .composer-input {
        min-height: 120px;
        font-size: 15px;
      }
      .shortcut-hint {
        display: none !important;
      }
      .composer-meta-row {
        min-height: 12px;
      }
      .composer-footer {
        flex-direction: row;
        align-items: center;
        gap: 6px;
        flex-wrap: nowrap;
      }
      .composer-btns {
        margin-left: 0;
        gap: 6px;
        flex: 1;
        flex-wrap: nowrap;
      }
      .composer-btns .btn {
        height: 34px;
        flex: 1;
        padding: 0 8px;
      }
      .composer-btns #btnSend {
        flex: 1.4;
      }
      .controls-bar {
        gap: 8px;
      }
      .search-box, .search-input, .btn-select-mode {
        height: 40px;
      }
      .search-input {
        font-size: 13px;
        padding-left: 38px;
      }
      .search-icon {
        left: 13px;
        width: 15px;
        height: 15px;
      }
      .btn-select-mode {
        padding: 0 12px;
        font-size: 12px;
      }
      .msg-card {
        padding: 14px;
        border-radius: var(--radius-lg);
      }
      .msg-content {
        font-size: 14px;
        -webkit-line-clamp: 6;
        line-clamp: 6;
      }
      .btn-card-action {
        height: 26px;
        padding: 0 8px;
        font-size: 11.5px;
      }
      .btn-card-icon {
        width: 26px;
        height: 26px;
      }
      .msg-image-img {
        height: 180px;
        max-height: 180px;
      }
      .msg-image-wrap {
        max-height: 180px;
      }
    }

    /* ========= Mobile / Tablet (< 768px): symmetric layout, no overflow ========= */
    @media (max-width: 767px) {
      .app-container {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 14px !important;
        padding-right: 14px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        box-sizing: border-box !important;
      }
      header {
        width: 100% !important;
        box-sizing: border-box !important;
      }
      /* History list: single column stacked, symmetric */
      .stream-feed {
        display: flex !important;
        flex-direction: column !important;
        column-count: 1 !important;
        gap: 12px !important;
        width: 100% !important;
      }
      .stream-feed .msg-card {
        margin-bottom: 0 !important;
        width: 100% !important;
      }
      .workbench,
      .composer-column,
      .content-column,
      .composer-card {
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      /* Guard against any stray wide child blowing out the viewport */
      .app-container,
      .content-column,
      .stream-feed,
      .msg-card {
        overflow-x: clip;
      }
    }

    /* ========= Very narrow phones (< 480px): terse status + tight cards ========= */
    @media (max-width: 480px) {
      /* Status collapses to just ● + count badge, freeing header width */
      #statusText {
        display: none;
      }
      .brand-status {
        gap: 5px;
      }
      /* Card action pill keeps symmetric breathing room from card edge */
      .msg-card {
        padding: 12px !important;
      }
      .msg-header {
        gap: 6px;
      }
      .msg-actions {
        gap: 3px;
      }
    }
  </style>
</head>
<body>

  <!-- Ambient Vibrancy Background (Soft floating color clouds) -->
  <div class="ambient-background">
    <div class="ambient-cloud c1"></div>
    <div class="ambient-cloud c2"></div>
    <div class="ambient-cloud c3"></div>
  </div>

  <!-- Toast Container -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Fullscreen Image Lightbox Modal -->
  <div class="lightbox-overlay" id="imageLightbox">
    <div class="lightbox-container" id="lightboxContainer">
      <button class="lightbox-close-btn" id="btnCloseLightbox" title="关闭预览">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <img src="" alt="大图预览" class="lightbox-img" id="lightboxImg">
      <div class="lightbox-toolbar">
        <button class="btn btn-primary" id="btnLightboxCopy">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span id="lightboxCopyText">复制图片到剪贴板</span>
        </button>
        <button class="btn" id="btnLightboxDownload">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          保存原图
        </button>
      </div>
    </div>
  </div>

  <!-- Auth Screen (Visible when locked) -->
  <div class="auth-overlay" id="authScreen" style="display: none;">
    <div class="auth-card">
      <div class="auth-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div>
        <h2 style="font-size: 19px; font-weight: 600; color: var(--text-main); margin-bottom: 4px; letter-spacing: -0.02em;">CF-TextRelay</h2>
        <p style="font-size: 13px; color: var(--text-muted);">请输入专属访问密码解锁</p>
      </div>
      <div class="auth-input-group">
        <input type="password" id="authInput" class="auth-input" placeholder="访问密码" autofocus autocomplete="current-password">
        <button id="authBtn" class="btn btn-primary" style="height: 40px; border-radius: var(--radius-md); font-size: 14px;">
          解锁进入
        </button>
      </div>
    </div>
  </div>

  <!-- Main App View (Expanded Container) -->
  <div class="app-container" id="appMain" style="display: none;">
    <!-- Top Header -->
    <header>
      <div class="brand">
        <div class="brand-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
            <path d="m9 14 2 2 4-4"/>
          </svg>
        </div>
        <div class="brand-title">
          <h1>CF-TextRelay</h1>
          <div class="brand-status">
            <span class="status-dot" id="statusDot"></span>
            <span id="statusText">多端同步已就绪</span>
            <span id="msgCountBadge" class="badge-capsule">0 条</span>
          </div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn btn-header-icon btn-accent" id="btnInstallApp" style="display: none;" title="安装为手机应用 / 添加到桌面">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
            <rect x="5" y="2" width="14" height="20" rx="3"/>
            <path d="M12 18h.01"/>
          </svg>
        </button>
        <button class="btn btn-header-icon" id="btnRefresh" title="立即刷新">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
        </button>
        <button class="btn btn-header-icon" id="btnTimeDeleteModal" title="按时段清理">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        </button>
        <button class="btn btn-header-icon" id="btnLogout" title="退出锁定">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- Desktop Split-View Workbench -->
    <div class="workbench">
      <!-- Left Column: Quick Note Composer (Sticky on desktop) -->
      <div class="composer-column">
        <div class="composer-card">
          <!-- Pending Attachment Bar -->
          <div id="pendingImageContainer" class="pending-image-container" style="display: none;">
            <div class="pending-image-info">
              <img id="pendingImageThumb" src="" alt="待发送文件" class="pending-image-thumb">
              <div class="pending-image-meta">
                <span id="pendingImageName" class="pending-image-name">image.png</span>
                <span id="pendingImageSize" class="pending-image-size">0 KB</span>
              </div>
            </div>
            <button class="btn btn-card-icon btn-danger" id="btnRemovePendingImage" title="移除附件">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <textarea id="composerInput" class="composer-input" placeholder="输入或粘贴文本，支持复制/拖拽图片直接发送..."></textarea>

          <!-- Compact meta row: char count + shortcut hint (above separator) -->
          <div class="composer-meta-row">
            <span id="charCount">0 字符</span>
            <span class="shortcut-hint">
              <span class="kbd">Ctrl</span> + <span class="kbd">Enter</span> 发送
            </span>
          </div>

          <div class="composer-footer">
            <div class="composer-btns">
              <!-- Hidden File Inputs -->
              <input type="file" id="fileUploadInput" accept="text/plain, text/*, .txt, .md, .log, .json, .csv, .js, .py, .html, .css, .sql, .xml, .yaml, .yml, application/json" style="display: none;">
              <input type="file" id="imageUploadInput" accept="image/*" style="display: none;">

              <!-- Upload Image Button -->
              <button class="btn btn-accent" id="btnUploadImage" title="发送图片 (支持拍照或相册选取)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                图片
              </button>

              <!-- Upload TXT Button -->
              <button class="btn" id="btnUploadTxt" title="上传 TXT / 文本文件">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                TXT
              </button>

              <!-- Paste Clipboard Button -->
              <button class="btn" id="btnPasteClipboard" title="从剪贴板粘贴文本或图片">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                </svg>
                粘贴
              </button>

              <!-- Send Button -->
              <button class="btn btn-primary" id="btnSend">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                发送
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Spotlight Search + Bento History Grid -->
      <div class="content-column">
        <!-- Controls Bar: Spotlight Search & Select Mode Aligned -->
        <div class="controls-bar">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" id="searchInput" class="search-input" placeholder="搜索文本或输入 [图片]...">
          </div>
          <div class="toolbar-actions">
            <button class="btn btn-select-mode" id="btnToggleSelectMode">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span id="selectModeText">多选模式</span>
            </button>
          </div>
        </div>

        <!-- Stream Message Bento Grid -->
        <div class="stream-feed" id="streamFeed">
          <!-- Cards rendered via JS -->
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Selection Bar (Batch Actions) -->
  <div class="selection-bar" id="selectionBar">
    <div class="selection-count">
      <input type="checkbox" id="selectAllCheckbox" class="msg-checkbox">
      <span id="selectedCountText">已选 0 项</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="btn" id="btnBatchExportTxt" title="导出选中信息为 TXT 文件">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        导出 TXT
      </button>
      <button class="btn" id="btnCancelSelection">取消</button>
      <button class="btn btn-danger" id="btnBatchDelete">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
        批量删除
      </button>
    </div>
  </div>

  <!-- Time-based Deletion Modal -->
  <div class="modal-overlay" id="timeDeleteModal">
    <div class="modal-card">
      <div class="modal-title">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="1.75">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        按时段批量清理
      </div>
      <p class="modal-desc">
        选择要删除的时间范围。此操作将同时永久清理指定时段内的文本及 R2 文件/图片，请谨慎操作。
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
        <button class="time-option-btn" data-range="all" style="border-color: var(--danger-border); background: var(--danger-bg);">
          <span style="color: var(--danger); font-weight: 600;">清空全部记录与文件 (一键重置)</span>
          <span class="badge-danger">CLEAR ALL</span>
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
      pendingAttachment: null,
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

    // Toast helper with Linear-style Monochromatic SVG Icons (Zero Emoji)
    function showToast(text, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast';
      
      let iconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A84FF" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
      if (type === 'success') {
        iconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34C759" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
      } else if (type === 'error') {
        iconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF453A" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
      } else if (type === 'delete') {
        iconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF453A" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      }

      toast.innerHTML = \`<span style="display:flex;align-items:center;">\${iconSvg}</span><span>\${escapeHtml(text)}</span>\`;
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
        pendingImageThumb.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="%2338bdf8" stroke-width="1.75"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
        pendingImageThumb.style.display = 'block';
        showToast(\`已载入原文件 \${file.name}，发送后支持原文件名下载\`, 'info');

        // Text format files auto read preview to input box
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
                setPendingAttachment(file);
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

    // Convert Image URL to PNG Blob via Canvas for max cross-platform clipboard compatibility
    async function fetchImageAsPngBlob(imageUrl) {
      const res = await fetch(imageUrl);
      if (!res.ok) throw new Error('获取图片数据失败: ' + res.status);
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
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
    }

    // Copy Image to System Clipboard (Universal: Windows, macOS, iOS, Android)
    async function copyImageToClipboard(imageUrl) {
      try {
        showToast('正在转换并复制图片...', 'info');

        const isMac = /Macintosh|Mac OS X/i.test(navigator.userAgent);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const pasteShortcut = isMac ? 'Cmd+V (⌘V)' : (isMobile ? '长按粘贴' : 'Ctrl+V');

        if (!navigator.clipboard || !navigator.clipboard.write || typeof ClipboardItem === 'undefined') {
          throw new Error('当前浏览器环境不支持图片写入剪贴板API');
        }

        const pngPromise = fetchImageAsPngBlob(imageUrl);

        let writePromise;
        try {
          const item = new ClipboardItem({ 'image/png': pngPromise });
          writePromise = navigator.clipboard.write([item]);
        } catch (itemErr) {
          const resolvedBlob = await pngPromise;
          const item = new ClipboardItem({ 'image/png': resolvedBlob });
          writePromise = navigator.clipboard.write([item]);
        }

        await writePromise;

        showToast(\`图片已复制到剪贴板！可直接按 \${pasteShortcut} 粘贴\`, 'success');
        return true;
      } catch (err) {
        console.error('Copy image error:', err);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          showToast('手机剪贴板写权限受限：可点击图片打开大图，长按直接拷贝或存储', 'info');
        } else {
          showToast('复制图片失败，请检查浏览器剪贴板权限或使用下载保存', 'error');
        }
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
        setPendingAttachment(file);
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
      if (card) {
        card.classList.remove('shake');
        void card.offsetWidth;
        card.classList.add('shake');
      }
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
        statusDot.style.background = '#0A84FF';
        statusDot.style.boxShadow = '0 0 8px #0A84FF';
        statusText.textContent = '正在同步...';
      }

      try {
        const data = await apiRequest('/api/messages');
        STATE.messages = data.messages || [];
        renderFeed();
        msgCountBadge.textContent = \`\${STATE.messages.length} 条\`;
        statusDot.style.background = '#34C759';
        statusDot.style.boxShadow = '0 0 8px #34C759';
        statusText.textContent = '多端同步已就绪';
      } catch (err) {
        statusDot.style.background = '#FF3B30';
        statusDot.style.boxShadow = '0 0 8px #FF3B30';
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

    // Helper to safely escape HTML special characters
    function escapeHtml(text) {
      if (!text) return '';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Auto-detect and render URL Chips (Truncated single-line)
    function escapeAndLinkify(text) {
      if (!text) return '';
      const escaped = escapeHtml(text);

      const urlRegex = /(https?:\\/\\/[^\\s<>&"']+)/gi;
      return escaped.replace(urlRegex, (url) => {
        let cleanUrl = url;
        let suffix = '';
        while (/[.,;:!?)]$/.test(cleanUrl)) {
          suffix = cleanUrl.slice(-1) + suffix;
          cleanUrl = cleanUrl.slice(0, -1);
        }
        return \`<a href="\${cleanUrl}" target="_blank" rel="noopener noreferrer" class="msg-url-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="flex-shrink:0;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">\${cleanUrl.length > 36 ? cleanUrl.slice(0, 36) + '...' : cleanUrl}</span>
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

    // Render Stream Feed (Zero Emoji, Clean Monochromatic SVGs)
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
          <div class="empty-state glass">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
            <div style="font-size: 15px; font-weight: 600; color: var(--text-main);">暂无流转记录</div>
            <p style="font-size: 13px; color: var(--text-muted);">在上方输入文本或直接粘贴/发送图片，将在手机与电脑端实时同步</p>
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

        let tagHtml = \`<span>\${(msg.content || '').length} 字</span>\`;
        if (isImage) {
          tagHtml = \`
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>图片</span>
          \`;
        } else if (isFile) {
          tagHtml = \`
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span>\${escapeHtml(msg.file_name) || '原文件'} \${msg.file_size ? '· ' + formatBytes(msg.file_size) : ''}</span>
          \`;
        }
        const fileName = msg.file_name || (isImage ? 'image.png' : 'file.txt');
        const safeFileName = escapeHtml(fileName);

        return \`
          <div class="msg-card \${isSelected ? 'selected' : ''}" data-id="\${msg.id}">
            <div class="msg-header">
              <div class="msg-meta">
                \${STATE.selectMode ? \`
                  <input type="checkbox" class="msg-checkbox item-select-cb" data-id="\${msg.id}" \${isSelected ? 'checked' : ''}>
                \` : ''}
                <span class="msg-time" title="\${new Date(msg.created_at).toLocaleString()}">\${formatTime(msg.created_at)}</span>
                <span class="msg-tag \${isImage ? 'image-tag' : (isFile ? 'file-tag' : '')}">\${tagHtml}</span>
              </div>
              <div class="msg-actions">
                \${isImage ? \`
                  <button class="btn-card-action btn-copy-card btn-copy-image-card" data-img="\${encodeURIComponent(imageUrl)}" title="复制图片到系统剪贴板 (Win: Ctrl+V / Mac: ⌘+V / 微信等直接粘贴)">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>复制</span>
                  </button>
                  <button class="btn-card-icon btn-download-image-card" data-img="\${encodeURIComponent(imageUrl)}" data-name="\${encodeURIComponent(fileName)}" title="下载原图">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                \` : (isFile ? \`
                  <button class="btn-card-action btn-copy-card btn-copy-text-card" data-copy="\${encodeURIComponent(msg.content || '')}" title="复制文本内容">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>复制</span>
                  </button>
                  <button class="btn-card-icon btn-download-file-card" data-url="\${encodeURIComponent(fileUrl)}" data-name="\${encodeURIComponent(fileName)}" title="下载原始文件 (\${safeFileName})">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                \` : \`
                  <button class="btn-card-action btn-copy-card btn-copy-text-card" data-copy="\${encodeURIComponent(msg.content)}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>复制</span>
                  </button>
                  <button class="btn-card-icon btn-download-text-card" data-content="\${encodeURIComponent(msg.content)}" data-time="\${msg.created_at}" title="保存为 .txt">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                \`)}
                <button class="btn-card-icon btn-single-delete" data-id="\${msg.id}" title="删除此条记录">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
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
            span.textContent = '已复制';
            setTimeout(() => {
              btn.classList.remove('copied');
              span.textContent = '复制';
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

      // Download single raw document / code file
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
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          showToast('已复制到剪贴板', 'success');
        } else {
          throw new Error('execCommand returned false');
        }
      } catch (e) {
        showToast('复制失败，请手动长按选择复制', 'error');
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
        if (range === 'all') promptText = '【高危操作警告】确认清空全部所有历史记录与存储文件吗？此操作无法撤销！';

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
      showToast('CF-TextRelay 已安装为独立应用', 'success');
    });

    // Start App
    checkAuth();
  </script>
</body>
</html>`;
}
