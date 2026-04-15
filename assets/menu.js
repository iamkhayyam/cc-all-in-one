(function () {
  /* ── detect base path from script src ── */
  const scripts = document.getElementsByTagName("script");
  const thisScript = scripts[scripts.length - 1];
  const src = thisScript.getAttribute("src") || "";
  const base = src.replace(/assets\/menu\.js.*$/, "");

  /* ── inject GSAP ── */
  const gsapScript = document.createElement("script");
  gsapScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js";
  gsapScript.onload = function () {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  };
  document.head.appendChild(gsapScript);

  /* ── inject styles ── */
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    /* floating logo trigger */
    .cc-menu-fab {
      position: fixed;
      width: 64px;
      height: 64px;
      cursor: pointer;
      z-index: 9998;
      pointer-events: auto;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.18));
      will-change: transform;
      /* start bottom-center until first mouse move */
      left: calc(50% - 32px);
      top: calc(100vh - 80px);
    }
    .cc-menu-fab svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .cc-menu-fab:hover {
      filter: drop-shadow(0 4px 16px rgba(0,0,0,0.28));
    }

    /* shimmer when cow reaches the nav crosshairs */
    @keyframes cc-shimmer {
      0%   { filter: drop-shadow(0 0 4px rgba(192,145,45,0.2)) drop-shadow(0 2px 6px rgba(0,0,0,0.12)); }
      50%  { filter: drop-shadow(0 0 24px rgba(192,145,45,0.7)) drop-shadow(0 0 48px rgba(192,145,45,0.35)) drop-shadow(0 0 8px rgba(239,162,189,0.4)); }
      100% { filter: drop-shadow(0 0 4px rgba(192,145,45,0.2)) drop-shadow(0 2px 6px rgba(0,0,0,0.12)); }
    }
    .cc-menu-fab.cc-shimmer {
      filter: none;
      animation: cc-shimmer 2s ease-in-out infinite;
    }

    @media (max-width: 700px) {
      .cc-menu-fab { width: 48px; height: 48px; }
    }

    /* fullscreen overlay menu */
    .cc-fs-menu {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: #1a1a18;
      display: flex;
      z-index: 9999;
      clip-path: polygon(49.75% 49.75%, 50.25% 49.75%, 50.25% 50.25%, 49.75% 50.25%);
      pointer-events: none;
      opacity: 0;
    }

    .cc-fs-menu .cc-menu-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 2.5rem 2rem;
      overflow-y: auto;
    }

    .cc-fs-menu .cc-menu-col-left {
      border-right: 1px solid rgba(255,255,255,0.1);
    }

    .cc-fs-menu .cc-menu-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2.5rem;
    }

    .cc-fs-menu .cc-menu-brand {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.6rem;
      font-weight: 600;
      color: #f0efe8;
    }

    .cc-fs-menu .cc-menu-close {
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      transition: border-color 0.2s;
      flex-shrink: 0;
    }
    .cc-fs-menu .cc-menu-close:hover {
      border-color: rgba(255,255,255,0.5);
    }
    .cc-fs-menu .cc-menu-close svg {
      width: 18px;
      height: 18px;
    }

    .cc-fs-menu .cc-menu-section-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(240,239,232,0.35);
      margin-bottom: 0.75rem;
      margin-top: 1.5rem;
    }
    .cc-fs-menu .cc-menu-section-label:first-of-type {
      margin-top: 0;
    }

    .cc-fs-menu .cc-menu-link {
      display: block;
      text-decoration: none;
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.4rem, 3vw, 2.2rem);
      font-weight: 600;
      color: #f0efe8;
      line-height: 1.3;
      padding: 0.35rem 0;
      transition: color 0.15s;
    }
    .cc-fs-menu .cc-menu-link:hover {
      color: #a8a89e;
    }

    .cc-fs-menu .cc-menu-sub {
      display: block;
      text-decoration: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 400;
      color: #a8a89e;
      padding: 0.3rem 0;
      transition: color 0.15s;
    }
    .cc-fs-menu .cc-menu-sub:hover {
      color: #f0efe8;
    }

    .cc-fs-menu .cc-menu-tagline {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: rgba(240,239,232,0.3);
      margin-top: auto;
      padding-top: 2rem;
    }

    .cc-fs-menu .cc-menu-divider {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 0%;
      background: rgba(255,255,255,0.1);
    }

    @media (max-width: 700px) {
      .cc-fs-menu { flex-direction: column; }
      .cc-fs-menu .cc-menu-col-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .cc-fs-menu .cc-menu-divider { display: none; }
      .cc-fs-menu .cc-menu-link { font-size: 1.3rem; }
    }

    /* ── sequential page nav ── */
    .cc-page-nav {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      border-top: 1px solid var(--border, rgba(26,26,24,0.12));
    }
    .cc-page-nav a {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 2rem 2.5rem;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s;
    }
    .cc-page-nav a:hover {
      background: var(--color-background-secondary, #f5f4f0);
      box-shadow: inset 0 0 24px rgba(192,145,45,0.12), 0 0 20px rgba(192,145,45,0.15);
    }
    .cc-page-nav a:hover .cc-pn-title {
      color: var(--ink, var(--color-text-primary, #1a1a18));
    }
    .cc-page-nav a:hover .cc-pn-label {
      color: rgba(192,145,45,0.8);
    }
    .cc-page-nav.cc-nav-glow a {
      animation: cc-nav-glow 2s ease-in-out infinite;
    }
    .cc-page-nav.cc-nav-glow a:nth-child(2) {
      animation-delay: 0.5s;
    }
    .cc-page-nav.cc-nav-glow .cc-pn-label {
      animation: cc-nav-label-glow 2s ease-in-out infinite;
    }
    .cc-page-nav.cc-nav-glow a:nth-child(2) .cc-pn-label {
      animation-delay: 0.5s;
    }
    @keyframes cc-nav-glow {
      0%   { filter: drop-shadow(0 0 4px rgba(192,145,45,0.1)); }
      50%  { filter: drop-shadow(0 0 24px rgba(192,145,45,0.7)) drop-shadow(0 0 48px rgba(192,145,45,0.35)); }
      100% { filter: drop-shadow(0 0 4px rgba(192,145,45,0.1)); }
    }
    @keyframes cc-nav-label-glow {
      0%   { color: #9a9a94; }
      50%  { color: #c0912d; }
      100% { color: #9a9a94; }
    }
    .cc-page-nav a + a {
      border-left: 1px solid var(--border, rgba(26,26,24,0.12));
      text-align: right;
    }
    .cc-page-nav .cc-pn-label {
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink3, var(--color-text-tertiary, #9a9a94));
      margin-bottom: 0.4rem;
    }
    .cc-page-nav .cc-pn-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.3;
      color: var(--ink2, var(--color-text-secondary, #5a5a56));
    }
    @media (max-width: 560px) {
      .cc-page-nav a { padding: 1.5rem 1.25rem; }
      .cc-page-nav .cc-pn-title { font-size: 0.95rem; }
    }

    @media (prefers-color-scheme: dark) {
      .cc-page-nav a:hover {
        background: var(--color-background-secondary, #242420);
      }
    }
  `;
  document.head.appendChild(style);

  /* ── build menu HTML ── */
  function init() {
    const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720"><defs><style>.st0{fill:none}.st1{fill:#010101}.st2{fill:#efa2bd}.st3{fill:#c0912d}.st4{fill:#fff}</style></defs><path class="st1" d="M445.6,623.2c17.7-14.5,35.2-18.2,55.4-30.9,16.9-10.7,31.3-23.9,45.6-37.8,5.8-5.7,10.3-11.2,15.3-17.6,17.9-22.6,31.4-47.2,40.5-74.6,13.4-40,13.8-93-14.5-126.6-23-27.2-56.9-21.3-81.1-.7-12.4,10.5-22.8,22.4-32.3,35.6l-35.5,49c-19.9,27.5-49.1,58.4-80.5,72.3-32.2,14.3-65.4,13.8-97.8,0-18.6-8-35.5-18.6-50.7-32-13.1-11.5-22.9-25-32.7-39.2-26.4-38.5-38.8-77.7-41.8-124.4-1.8-27.4,1.9-54.3,8.9-80.9,1.7-6.6,8.4-30,.2-32.4-4.5-1.3-9.6,2-12.3,5.5-13.6,17.5-23.5,36.5-32.1,57-16.3,38.9-23.4,79.8-22.4,122.1,1.2,53.2,16.4,101,43.9,146.2,10.7,17.7,23.6,33.3,37.6,48.4,21,22.6,44.9,40.6,71.9,55.4,20.9,11.5,42.6,18.9,65.7,25.1,24.4,6.5,53.7,9,78.9,7.8l15.3-.8c15.1-.7,29.4-4.2,44-8.1.9-7.9,4.5-13.5,10.3-18.3Z"/><g><path class="st4" d="M574.9,189.9c-3.5-4-5.1-10-1.2-14,14.3-14.8,31.1,19.1,37.9,27.6,25.5,10.7,49.9,2.3,70.6-16.1-15.3-13.7-32.5-22.6-51.7-26.6-25.5-5.4-39.3,4.5-70.9-2.5-7-1.6-12.4-5.3-17.5-9.9-1.7-1.5-3-2.3-3.5-5.2l7.1,3.9c7.4,4.1,15.9,5.4,23.6,6.5l-2.3-3.3c-.3-.5,1.2-1.9,1.7-2.3,12.2-8.3,23.8-22,29.5-36,5.3-13,8.6-26.7,7-40.7-1.5-12.4-3.7-23.4-9.2-35.1-.2,0-.9.3-1.5.5-.8,8.5-1.5,16.3-3.9,24.3-8.2,27.7-20.3,39.3-45.7,51.5-4.1,2-7.4,3.7-11.8,6.1-2.9-1.2,23,21.1,15.1,16.6-3.4-1.9-16.1-13.3-25.7-19.4-50.3-32.2-93.9-50.2-154.5-52.7-3.4-.1-6.4-.2-9.6-.1l-7.2.3c-58.4,2.2-114.1,22.5-159.5,59.2,3.4,15.2-5.5,29.6-19.6,34.5l-8.8,3.1-17.5,3.2c-9.9,1.8-20.2.6-30.2-.2-28.6-3.3-56.5,8.7-78.2,27.5,21.1,19.3,45.2,26.8,72.3,17.2,4.3-1.5,8.8-15.9,21.6-26.3,4.6-3.7,12.2-6.1,17.5-2.5,9.1,6.2,4.2,25.4,2,34.6-4,16.4-7.3,32.3-8.8,49.3-2.3,26.5.6,60.9,8.2,86.6,11.1,37.8,30.4,72.4,57.9,100.6,10.6,10.8,22.8,19.3,35.7,26.8,35.1,20.5,74,26.4,111.9,9.8,33.2-14.6,64.9-51.2,85.6-80.5,13.5-19.2,26.3-37.9,41.4-55.8,10.7-12.7,22.4-23.5,37.2-31.1,33.1-16.9,63.8-6,81.7,25.5,9.3,16.4,13.5,34.4,15.2,53.1,2.1,23.1-2.6,50.8-10.6,72.6-5.5,15-13,28.6-20.6,42.7-8.6,16-27.1,39-40.4,51.6-13.6,12.9-27.3,25-43.6,34.5-11.3,6.6-22.8,11.7-34.5,17.4-8.4,4.1-24.6,12.5-26,23.2,39.6-10,76.4-32.9,106.9-58.7,4.9-4.2,9.2-8.2,13.3-13.1,5.1-6,11.2-11.2,16.1-17.5l15-19.6c14.7-19.3,25.8-40.5,34.8-63.3,12.1-30.9,18.8-62.6,20.4-95.7,2.5-54.2-12.2-115.2-40.7-161.6-12.7-4.5-23.7-10.7-32.3-20.6Z"/><path class="st4" d="M521.8,438.9c1,.4,2.1.7,3.2,1.1,3.3,1,6.7,1.8,10.2,2.2.6,0,1.2.1,1.8.2,1.2.1,2.4.2,3.5.2.6,0,1.2,0,1.8,0,2.9,0,5.9-.4,8.7-1.1,3.4-.9,6.5-2.3,9.4-4.3,1-.7,1.9-1.4,2.8-2.3.4-.4.9-.8,1.3-1.3,2.5-2.7,4.6-6.1,6.2-10.4s2.5-9,2.8-14c0-.8,0-1.7.1-2.5,0-1.7,0-3.4,0-5.1-.4-9.4-2.6-19.1-6-27-.9-2.2-2-4.2-3.1-6.1-.8-1.3-1.5-2.4-2.4-3.6-2.9-3.9-6.2-6.7-9.8-8-1.5-.6-2.9-.9-4.2-.9-3.3,0-5.7,1.8-7.5,4.9-.5.8-.9,1.6-1.3,2.5-.6,1.4-1.1,2.9-1.6,4.6s-.3,1.1-.5,1.7c-1.1,4.1-2,8.8-3.1,13.7-1.3,5.6-2.7,11.6-4.8,17.3s-1.1,2.8-1.7,4.1-1.2,2.6-1.8,3.8c-.6,1.2-1.2,2.4-1.8,3.5-.6,1.1-1.2,2.2-1.8,3.3-.6,1-1.2,2-1.8,3-1.4,2.4-2.7,4.6-3.7,6.5-1.2,2.3-2.1,4.4-2.2,6.2s0,1.7.3,2.5c.7,2.1,2.8,3.8,7,5.4Z"/></g><path class="st4" d="M130.9,135.3h0s0,0,.1.1c3,3.3,6.3,6.2,9.8,9,12.7,10.8,16.7,10,16.7,10,25.5-2.3,28.9-19.7,28.9-19.7,3.4-12.8-8.6-17-8.6-17h0c-2-1.2-3.9-2.1-6.2-3.2-11.2-5.2-22.2-11.2-30.5-20.3-15-16.4-19.6-36.6-21.1-58.8-15.1,28.8-13.7,62.1,3,89.6,2.3,3.8,5,7.3,7.9,10.4Z"/><path class="st0" d="M559.6,157.8c-7-1.6-12.4-5.3-17.5-9.9-1.7-1.5-3-2.3-3.5-5.2l7.1,3.9c7.4,4.1,15.9,5.4,23.6,6.5l-2.3-3.3c-.3-.5,1.2-1.9,1.7-2.3,12.2-8.3,23.8-22,29.5-36,5.3-13,8.6-26.7,7-40.7-1.5-12.4-3.7-23.4-9.2-35.1-.2,0-.9.3-1.5.5-.8,8.5-1.5,16.3-3.9,24.3-8.2,27.7-20.3,39.3-45.7,51.5-4.1,2-7.4,3.7-11.8,6.1-2.9-1.2,23,21.1,15.1,16.6-3.4-1.9-16.1-13.3-25.7-19.4-50.3-32.2-93.9-50.2-154.5-52.7-3.4-.1-6.4-.2-9.6-.1l-7.2.3c-58.4,2.2-114.1,22.5-159.5,59.2,3.4,15.2-5.5,29.6-19.6,34.5l-8.8,3.1-17.5,3.2c-9.9,1.8-20.2.6-30.2-.2-28.6-3.3-56.5,8.7-78.2,27.5,21.1,19.3,45.2,26.8,72.3,17.2,4.3-1.5,8.8-15.9,21.6-26.3,4.6-3.7,12.2-6.1,17.5-2.5,9.1,6.2,4.2,25.4,2,34.6-4,16.4-7.3,32.3-8.8,49.3-2.3,26.5.6,60.9,8.2,86.6,11.1,37.8,30.4,72.4,57.9,100.6,10.6,10.8,22.8,19.3,35.7,26.8,35.1,20.5,74,26.4,111.9,9.8,33.2-14.6,64.9-51.2,85.6-80.5,13.5-19.2,26.3-37.9,41.4-55.8,10.7-12.7,22.4-23.5,37.2-31.1,33.1-16.9,63.8-6,81.7,25.5,9.3,16.4,13.5,34.4,15.2,53.1,2.1,23.1-2.6,50.8-10.6,72.6-5.5,15-13,28.6-20.6,42.7-8.6,16-27.1,39-40.4,51.6-13.6,12.9-27.3,25-43.6,34.5-11.3,6.6-22.8,11.7-34.5,17.4-8.4,4.1-24.6,12.5-26,23.2,39.6-10,76.4-32.9,106.9-58.7,4.9-4.2,9.2-8.2,13.3-13.1,5.1-6,11.2-11.2,16.1-17.5l15-19.6c14.7-19.3,25.8-40.5,34.8-63.3,12.1-30.9,18.8-62.6,20.4-95.7,2.5-54.2-12.2-115.2-40.7-161.6-12.7-4.5-23.7-10.7-32.3-20.6-3.5-4-5.1-10-1.2-14,14.3-14.8,31.1,19.1,37.9,27.6,25.5,10.7,49.9,2.3,70.6-16.1-15.3-13.7-32.5-22.6-51.7-26.6-25.5-5.4-39.3,4.5-70.9-2.5Z"/><path d="M660.3,164c-20.1-10.9-42.1-13.8-64.7-10.5-7.1,1-14.6.4-22.2,0,7.8-7.2,14.9-12.7,20.5-20.6,14.9-20.8,20.3-46.1,16.4-71.5-2.3-15-8-28.6-15.4-41.7-.7-1.3-3.7-2.4-4.8-2-1,.4-2.4,2.7-2.3,4,2.6,26.1-4.2,55.9-25.6,73.2-15.8,12.7-27.3,10.2-33.7,21.4-1.5-1.5-3.2-3.7-4.7-4.8-49.2-39.2-115.2-58.4-178-54.9-59.9,3.3-110.4,23.4-158.2,59.7-12.6-10.1-25-11.1-37.6-22.6-15.5-14.3-22.6-34.1-23.5-54.9-.2-4.8-.5-9,.3-13.9.4-2.4-1.3-6.8-4.2-5.8-3.8,1.3-5.1,6-6.9,9.3-16.3,30-17.5,66.4-.6,96.4,3.5,6.2,7.7,12,12.7,17.1s5.2,4.9,8,7.1,2.9,2.1,4.4,3.1,3.6,1.6,4.1,2.6c1.7,3.7-17.8,2.5-19.6,2.3-2.8-.2-5.7-.4-8.5-.8-22-2.5-43.6,3.1-62.6,14.4-8.3,4.9-15.6,9.9-22.7,16.4-1.6,1.5-1,5.5.6,6.9,15.8,14,35.5,24.8,57.2,24.4,6.1-.1,11.8-1.9,18.4-2.6-24.9,45.5-36.4,95.2-36,146.5.3,32.4,4.9,64.2,15.4,94.9,12.9,37.4,33,71.3,59.1,100.8,3.6,4.1,7,8.2,10.8,12,9.3,9.2,18.4,17.6,28.8,25.8,50.9,40.2,111.4,61.8,176.5,62.3,25.2.2,49.5-2.4,74-9.4,7.5,11.1,14.1,12.9,25.5,18.3,3.2,5.8-6.4,16,1.8,26.2,3.1,3.9,8.4,4.3,13.4,3,3.3-.8,7-4.7,8.3-8.9,3.2-10.7,1.2-15.7,5.5-15.8,13.2-.4,18.3-4.1,19.9,1.7l3.4,13.1c2.5,9.7,13.6,16.3,22.8,10.9,5.4-3.2,7.4-10.9,6-16.8-2.7-10.9-9.1-17.3-6.8-21.4l14.5-13.5,9.6,8.5c4,3.6,9,4.9,14.2,3.1,3.8-1.3,8.1-5.2,8.3-10.5.2-5.1-2.9-9.9-6.9-12.9-19-14.6-3-11.6-4.6-46.2-.2-5.1-1.4-10.2-1.2-14.9.1-2.6,3.7-6.4,5.7-8.6,35.5-38.1,60.2-84.3,71.7-135.3,11.4-50.6,10.6-100.5-3.3-150.4-6.4-22.7-14.6-44.1-26.3-64.8,6.4.6,11.7,1.3,17.7,1.4,24.5.4,55.5-23.5,54.6-28.3-1.2-6.7-22.8-18.8-29.3-22.3ZM123,124.4c-16.7-27.5-18.1-60.8-3-89.6,1.4,22.2,6.1,42.5,21.1,58.8,8.4,9.1,19.4,15.1,30.5,20.3,2.3,1.1,4.3,2.1,6.5,3.4h0s.8.3,1.8,1.1c.9.6,1.9,1.2,3,2,0,0,0,0-.2.2,1.8,1.7,3.5,3.9,4,6.5,1.2,7.3-2.1,14-7.7,18.6-2.7,2.3-6.1,3.7-9.5,4.8s-7.3,2.4-10.9,2.7c-5.2.5-10.4-3.8-14.3-6.7-8.3-6.2-15.7-13.2-21.2-22.2ZM435.3,641.5c-14.6,3.9-29,7.4-44,8.1l-15.3.8c-25.2,1.2-54.6-1.3-78.9-7.8-23.1-6.1-44.8-13.6-65.7-25.1-27-14.9-50.8-32.9-71.9-55.4-14-15-26.9-30.7-37.6-48.4-27.5-45.2-42.7-93-43.9-146.2-.9-42.3,6.1-83.2,22.4-122.1,8.6-20.5,18.5-39.5,32.1-57,2.7-3.5,7.8-6.8,12.3-5.5,8.1,2.4,1.5,25.8-.2,32.4-7,26.6-10.7,53.4-8.9,80.9,3,46.7,15.4,85.9,41.8,124.4,9.8,14.3,19.6,27.7,32.7,39.2,15.2,13.4,32.1,24,50.7,32,32.4,13.9,65.6,14.4,97.8,0,31.4-13.9,60.6-44.8,80.5-72.3l35.5-49c9.6-13.2,20-25.1,32.3-35.6,24.2-20.6,58.2-26.5,81.1.7,28.3,33.6,27.9,86.6,14.5,126.6-9.2,27.4-22.6,52.1-40.5,74.6-5,6.4-9.5,11.9-15.3,17.6-14.2,13.9-28.6,27.1-45.6,37.8-20.2,12.7-37.7,16.4-55.4,30.9-5.9,4.8-9.4,10.4-10.3,18.3ZM575.3,643.3c1.7,2.5-1,6-2.9,7.4-2.1,1.5-5.9,1-8.1-1l-10.1-9.7c-3.4-3.2-7.7-2.2-10.3,1-4.7,5.8-10.1,10-16.1,14.8-.8,10.7,6.3,15.4,8.2,26.9.8,4.9-2.4,10.3-7.3,9.9-13.8-1.1-8.4-32.7-23.7-29.6-15.2,3.1-22.2-1.3-23.6,9.3-1,7.5-1.4,19.3-10.5,17.7-2.9-.5-5.2-4.2-4.7-7.7l2-12c2.4-14.8-14.5-8.9-25.4-23.1,41.1-14.1,75.7-31,107.8-59.6l12.2-10.9c1.8,10.6,2.1,20.7-.2,31.2-.9,4.1-3,8.3-3.4,12.5-.4,4.9,2.8,10.5,6.4,13.4,3.6,3,7.1,5.6,9.7,9.5ZM611.6,203c-6.9-8.5-23.6-42.4-37.9-27.6-3.8,4-2.2,10,1.2,14,8.6,10,19.6,16.1,32.3,20.6,28.5,46.4,43.2,107.4,40.7,161.6-1.5,33.1-8.3,64.8-20.4,95.7-8.9,22.8-20,44-34.8,63.3l-15,19.6c-4.8,6.3-11,11.5-16.1,17.5-4.1,4.9-8.4,9-13.3,13.1-30.5,25.7-67.4,48.7-106.9,58.7,1.4-10.7,17.6-19.1,26-23.2,11.7-5.7,23.2-10.8,34.5-17.4,16.3-9.5,30-21.6,43.6-34.5,13.3-12.6,31.8-35.7,40.4-51.6,7.6-14.1,15.1-27.7,20.6-42.7,7.9-21.8,12.7-49.5,10.6-72.6-1.7-18.8-5.9-36.8-15.2-53.1-17.9-31.5-48.6-42.4-81.7-25.5-14.8,7.6-26.5,18.4-37.2,31.1-15.1,17.9-27.9,36.6-41.4,55.8-20.7,29.3-52.3,65.9-85.6,80.5-37.9,16.7-76.8,10.7-111.9-9.8-12.9-7.5-25.1-16-35.7-26.8-27.5-28.2-46.9-62.9-57.9-100.6-7.5-25.8-10.4-60.1-8.2-86.6,1.5-16.9,4.8-32.9,8.8-49.3,2.2-9.2,7.1-28.4-2-34.6-5.3-3.7-13-1.3-17.5,2.5-12.9,10.4-17.4,24.8-21.6,26.3-27,9.6-51.1,2.1-72.3-17.2,21.7-18.8,49.6-30.8,78.2-27.5,8.6,1,17.5,1.7,26.1.8s15.9-2.4,23.4-4.5c7-2,14.1-4.8,19.2-10.2s7.4-10.9,8-17.5,0-6.2-.6-9.2c45.4-36.6,101.1-57,159.5-59.2l7.2-.3c3.2-.1,6.2,0,9.6.1,60.6,2.5,104.2,20.5,154.5,52.7,9.6,6.1,22.3,17.5,25.7,19.4,7.9,4.5-18-17.9-15.1-16.6,4.3-2.4,7.7-4.1,11.8-6.1,25.4-12.2,37.5-23.8,45.7-51.5,2.4-8,3.1-15.8,3.9-24.3.6-.2,1.3-.5,1.5-.5,5.5,11.7,7.7,22.7,9.2,35.1,1.6,14-1.7,27.7-7,40.7-5.8,14-17.3,27.8-29.5,36-.5.3-2,1.8-1.7,2.3l2.3,3.3c-7.7-1.1-16.3-2.5-23.6-6.5l-7.1-3.9c.6,2.9,1.8,3.7,3.5,5.2,5,4.6,10.5,8.3,17.5,9.9,31.5,7.1,45.4-2.8,70.9,2.5,19.2,4,36.4,12.9,51.7,26.6-20.7,18.5-45,26.8-70.6,16.1ZM600.6,200.2c-5.4-.9-27.1-16.3-22-21.2,1.3-1.2,3.9-1.1,5.7,0,6.4,6.1,12,12.2,16.3,21.1Z"/><path class="st2" d="M559.1,620.4c.4-4.2,2.5-8.4,3.4-12.5,2.3-10.5,2-20.6.2-31.2l-12.2,10.9c-32.1,28.7-66.7,45.5-107.8,59.6,11,14.2,27.9,8.3,25.4,23.1l-2,12c-.6,3.5,1.7,7.2,4.7,7.7,9,1.6,9.4-10.2,10.5-17.7,1.4-10.5,8.4-6.2,23.6-9.3,15.3-3.1,9.9,28.5,23.7,29.6,5,.4,8.1-5,7.3-9.9-1.9-11.5-9-16.2-8.2-26.9,6-4.7,11.4-9,16.1-14.8,2.6-3.2,6.9-4.3,10.3-1l10.1,9.7c2.1,2.1,6,2.5,8.1,1,1.9-1.4,4.5-4.8,2.9-7.4-2.5-3.9-6-6.5-9.7-9.5-3.6-3-6.9-8.5-6.4-13.4Z"/><ellipse class="st1" cx="645.4" cy="182" rx="2.7" ry="3.2"/><g><path class="st0" d="M660.6,208.6s2.9-1.5,6.6-3.5c0,0,0-.2,0-.3l-6.5,3.8Z"/><path class="st0" d="M667.1,204.8c-4.2-12.7-12.3-21.1-20.6-20.2-.4,0-.8.2-1.2.3-.9,1-1.9,1.6-1.9,1.6,0,0,.9-.7,1.9-1.6-9.9,2.3-16.2,18.1-14.1,36.4,2.2,19,12.6,33.5,23.2,32.3,10.7-1.2,17.6-17.6,15.4-36.7-.5-4.2-1.4-8.2-2.6-11.8-3.7,2-6.6,3.5-6.6,3.5l6.5-3.8Z"/><path class="st3" d="M674.3,216c-.5-4.8-1.5-9.3-2.9-13.4-1.5.9-2.9,1.7-4.3,2.5,1.2,3.6,2.1,7.6,2.6,11.8,2.2,19-4.7,35.5-15.4,36.7-10.7,1.2-21.1-13.2-23.2-32.3-2.1-18.3,4.2-34.1,14.1-36.4,1.7-1.7,3.3-4.4-.1-6.1-11.2,3.2-18.2,21.4-15.9,42.4,2.5,22.2,14.7,39.1,27.1,37.7,12.4-1.4,20.5-20.6,18-42.8Z"/></g><path class="st3" d="M53.9,211.1"/><ellipse class="st1" cx="80.8" cy="181.7" rx="2.2" ry="3.8" transform="translate(-105.8 113) rotate(-45.8)"/><path class="st1" d="M107.2,215.6s-18.2,33.3-22.4,52.6c0,0,27.8-17.6,22.4-52.6Z"/><g><path d="M479.2,381.8h0c0,0,.1,0,0,0Z"/><path d="M390.5,192.1s0,0,0,0c0,0,0,0,0,0Z"/></g><g><path class="st0" d="M649.8,253.7c1,.2,2.1.2,3.1,0-1,.1-2.1,0-3.1,0Z"/><path class="st0" d="M666.3,205.2c0,0,0-.1,0-.2l-6.8,3.8,6.9-3.6Z"/><path class="st0" d="M630,221.7c2.1,17.3,10,30.6,19.8,32,1,.1,2.1.2,3.1,0,11.2-1.2,18.5-17.6,16.2-36.7-.5-4.1-1.4-8.1-2.7-11.6-2,1.1-4.4,2.3-7,3.4l6.8-3.8c-4.5-12.7-12.9-21.1-21.6-20.2-.4,0-.9.2-1.3.3-1,1-2,1.6-2,1.6,0,0,1-.7,2-1.6-10.5,2.3-15.5,18.3-13.3,36.6Z"/><path class="st3" d="M673.9,216.3c-.6-4.7-1.6-9.2-3-13.3-1,.6-2.6,1.5-4.5,2.5,1.2,3.6,2.2,7.5,2.7,11.6,2.3,19-5,35.5-16.2,36.7-1.1.1-2.1,0-3.1,0-10.1-1.5-19.3-14.9-21.3-32.2-2.2-18.3,4.4-34.1,14.9-36.4,1.7-1.7,5.1-4.6,1.4-6.3-11.8,3.2-20.8,21.6-18.2,42.6,2.7,22.2,15.4,39.1,28.5,37.7s21.5-20.6,18.9-42.8Z"/><path class="st3" d="M628.5,221.5c2.1,17.3,11.3,30.8,21.3,32.2-9.8-1.5-17.7-14.8-19.8-32-2.2-18.3,2.9-34.3,13.3-36.6-10.5,2.3-17.1,18.1-14.9,36.4Z"/></g><path d="M403.1,82.9c-20.7,1.7-9.5-7.2-30.7-6.5-18,.9-35.7,3.4-53.4,4.6-16.9,1.1-33.8,1.2-47.9-1.6-3.2-.6-6.3-1.4-10.1-.9-3.9.5-7.7,2.2-11.2,3.9-17.9,8.6-35.9,21.2-36.1,31.6-.2,7.8,9.8,11.9,20.9,14,11.2,2,23.9,2.4,35.4,4.8,8.1,1.7,15.8,4.5,24.8,4.8,9.1.4,18.5-2,27.8-1.6,10,.3,19.3,4.1,24.9,10,6.2,6.6,7.8,15.1,13,22.4,3.7,5.3,11.3,10.8,18.8,11.2,12.4.7,16.2-3.2,22-11.7,2.5-3.7,6.4-7.4,11.8-7.5,1.5,0,3.2.3,4.1,1.4.7.8.7,1.8.8,2.8,1.5,15.1,10.7,30.5-5.2,41.6-1.9,1.4-4.3,3.1-3.6,5.5.4,1.2,1.4,2,2.4,2.8,6.3,4.9,12.5,9.9,18.2,15.3,3.1,2.9,6.1,5.9,8.3,9.6,3.7,6.4,4.4,14.5,8.2,20.7,5.8,9.2,17.7,10.9,26.7,4.9,18.7-12,19.3-42.7,9.6-61.8,4,8.2,9.3,18.1,15.7,24.6,7.4,7.4,18.8,11.7,28.1,6.7,22-11.4,7.8-45.7-4.4-60.6-7.8-10.5-17.8-19.7-29.3-27-11.7-7.5-25-12.4-38.1-17.4-.6-.2-1-.4-1-1,6.9-1.8,12-6.2,11.9-12.5,0-6.2-6.1-11.3-13.3-14-16.5-6-16.7-13.9-34.2-17.9"/><path d="M341.3,415.2c0,17.6-2.5,37.9-26.7,37.9s-43.8-14.3-43.8-31.9,1.5-40.9,25.6-40.9,44.8,17.3,44.8,34.9Z"/><path d="M203.5,207.8c1.5,6,5.5,10.3,7.9,15.9.8,2,1.3,4.1,1.8,6.2.1.5.2,1,.3,1.5.2,1.1.4,2.3.4,3.4,0,1.8-.8,3.3-1.2,5-.6,2.5-1.1,5.1-1.4,7.7-.6,5-.4,10.2,1.3,15,3,8.5,12.3,9.9,16.7,16.9,2.4,3.7.5,6.9.8,10.8.4,4.9,2.3,10.1,4.8,14.4,4.5,8,11.6,14.1,18.5,20.1,3.8,3.3,7.8,6.7,12.7,7.8,2.7.6,5.7.5,8.3-.4,4.6-1.5,7.8-5.2,11.7-7.9,5.6-3.9,15.2-3.8,19.5-8.3,1.3-1.4,2-3.3,2.6-5.2,2.9-9.1,7-18.9,7.5-28.6.5-8.5-2.9-16.9-.7-25.3,3.6-13.6,17.7-19.2,20.5-32.4,3.4-15.7-15.7-21.7-26.1-28-18.9-11.3-37.7-22.7-56.6-34-14.7-8.8-25.1-10.7-40.8-.9-15.6,10.3-12.3,30.7-8.5,46.4ZM255.8,265.4c10.5,2.1,13,12.8,15.6,21.7.6,2.2,6,18.8.2,17.7-8.2-1.7-20.2-12.3-22.6-20.2-1.5-4.8-1.6-20.9,6.8-19.2Z"/><g><path class="st0" d="M81.9,184.5c-9.7-.7-18.8,11.6-21.4,28.2,1.4.8,2.9,1.5,4.2,2.2,1.3.7,2.2,1.1,2.2,1.1-.7-.3-1.4-.7-2.2-1.1-1.2-.6-2.6-1.3-4.3-2.1-.2,1.6-.5,3.1-.6,4.8-1.5,19.1,6,35.3,16.7,36.1,10.7.8,20.6-14,22-33.1,1.3-16.5-4.1-30.8-12.5-34.9l-.2,1.7c-1.6-1.1-3-2.1-4-2.9Z"/><path class="st3" d="M100.4,221.1c1.4-18.6-4.4-34.8-13.7-40.2l-.6,4.9c8.4,4.1,13.8,18.4,12.5,34.9-1.5,19.1-11.3,33.9-22,33.1-10.7-.8-18.2-17-16.7-36.1.1-1.6.3-3.2.6-4.8-1.4-.7-2.9-1.5-4.4-2.3-.4,2.3-.7,4.7-.9,7.1-1.7,22.3,7,41.2,19.5,42.1,12.5,1,24-16.3,25.7-38.6Z"/><path class="st3" d="M60.5,212.7c-1.5-.8-3-1.7-4.3-2.4,0,0,0,0,0,.1,1.4.8,2.9,1.6,4.4,2.3,0,0,0,0,0,0Z"/></g><g><path class="st0" d="M83.9,185.2c-9.7-.7-18.8,11.6-21.4,28.2,1.4.8,2.9,1.5,4.2,2.2,1.3.7,2.2,1.1,2.2,1.1-.7-.3-1.4-.7-2.2-1.1-1.2-.6-2.6-1.3-4.3-2.1-.2,1.6-.5,3.1-.6,4.8-1.5,19.1,6,35.3,16.7,36.1,10.7.8,20.6-14,22-33.1,1.3-16.5-4.1-30.8-12.5-34.9l-.2,1.7c-1.6-1.1-3-2.1-4-2.9Z"/><path class="st3" d="M102.4,221.8c1.4-18.6-4.4-34.8-13.7-40.2l-.6,4.9c8.4,4.1,11.6,19.5,10.3,36-1.5,19.1-9.2,32.9-19.9,32-10.7-.8-18.2-17-16.7-36.1.1-1.6.3-3.2.6-4.8-1.4-.7-2.9-1.5-4.4-2.3-.4,2.3-.7,4.7-.9,7.1-1.7,22.3,7,41.2,19.5,42.1,12.5,1,24-16.3,25.7-38.6Z"/><path class="st3" d="M88.8,181.6c-1.1-.7-2.4-1.1-3.7-1.6-1.6-.6-3.3-1.1-5-1.1s-2.3-.1-2.3,1.3,1,2.5,1.5,3c.9.9,1.8,1,3,1.4s2.6.4,3.8,1h0c.8.2,1.5.5,2,.7,0,0,.6-4.9.6-4.9Z"/><path class="st3" d="M62.5,213.5c-1.5-.8-3-1.7-4.3-2.4,0,0,0,0,0,.1,1.4.8,2.9,1.6,4.4,2.3,0,0,0,0,0,0Z"/></g></svg>`;

    // floating logo — no container, just the SVG
    const fab = document.createElement("div");
    fab.className = "cc-menu-fab";
    fab.innerHTML = logoSvg;
    fab.title = "Menu";
    document.body.appendChild(fab);

    /* ── mouse-follow + idle drift ── */
    const fabW = 64;
    const fabH = 64;
    // current rendered position
    let cx = window.innerWidth / 2 - fabW / 2;
    let cy = window.innerHeight - 80;
    // target position (where mouse is, or idle home)
    let tx = cx;
    let ty = cy;
    // lerp factor — slow ease
    const lerp = 0.06;
    let idleTimer = null;
    let isIdle = true;
    let menuOpen = false;

    function setIdleTarget() {
      isIdle = true;
      tx = window.innerWidth / 2 - fabW / 2;
      ty = window.innerHeight - fabH - 16;
    }

    function resetIdleTimer() {
      isIdle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(setIdleTarget, 5000);
    }

    // track mouse — offset so cow is beside cursor, not under it
    document.addEventListener("mousemove", function (e) {
      if (menuOpen) return;
      tx = e.clientX - fabW / 2;
      ty = e.clientY - fabH / 2;
      resetIdleTimer();
    });

    // also reset idle on scroll/touch
    document.addEventListener("scroll", resetIdleTimer, { passive: true });
    document.addEventListener("touchstart", function (e) {
      if (menuOpen) return;
      const t = e.touches[0];
      tx = t.clientX - fabW / 2;
      ty = t.clientY - fabH / 2;
      resetIdleTimer();
    }, { passive: true });

    // keep idle target fresh on resize
    window.addEventListener("resize", function () {
      if (isIdle) setIdleTarget();
    });

    // animation loop
    var isShimmering = false;
    function tick() {
      if (!menuOpen) {
        cx += (tx - cx) * lerp;
        cy += (ty - cy) * lerp;
        fab.style.left = cx + "px";
        fab.style.top = cy + "px";

        // nav glows when visible in viewport; cow shimmers only when nav is NOT visible
        var navEl = document.querySelector(".cc-page-nav");
        var navVisible = false;
        if (navEl) {
          var navRect = navEl.getBoundingClientRect();
          navVisible = navRect.top < window.innerHeight && navRect.bottom > 0;
        }

        if (navVisible) {
          // nav is on screen — glow the buttons, no cow shimmer
          if (!navEl.classList.contains("cc-nav-glow")) navEl.classList.add("cc-nav-glow");
          if (isShimmering) { fab.classList.remove("cc-shimmer"); isShimmering = false; }
        } else {
          // nav is off screen — remove nav glow
          if (navEl && navEl.classList.contains("cc-nav-glow")) navEl.classList.remove("cc-nav-glow");
          // cow shimmers when idle and settled
          if (isIdle) {
            var idleX = window.innerWidth / 2 - fabW / 2;
            var idleY = window.innerHeight - fabH - 16;
            var dist = Math.abs(cx - idleX) + Math.abs(cy - idleY);
            if (dist < 30 && !isShimmering) { fab.classList.add("cc-shimmer"); isShimmering = true; }
          }
        }
        if (!isIdle && isShimmering) {
          fab.classList.remove("cc-shimmer");
          isShimmering = false;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // fullscreen menu
    const menu = document.createElement("div");
    menu.className = "cc-fs-menu";
    menu.innerHTML = `
      <div class="cc-menu-col cc-menu-col-left">
        <div class="cc-menu-header">
          <span class="cc-menu-brand">CacheCow</span>
        </div>
        <div class="cc-menu-section-label">Foundation</div>
        <a class="cc-menu-link" href="${base}primer/technical-primer.html">Technical Primer</a>
        <div class="cc-menu-section-label">Architecture</div>
        <a class="cc-menu-link" href="${base}architecture/index.html">Convergence Brief</a>
        <div class="cc-menu-section-label">Strategy</div>
        <a class="cc-menu-link" href="${base}accelerators/dashboard.html">Accelerator Pipeline</a>
        <p class="cc-menu-tagline">ForcedField Technologies &middot; Confidential</p>
      </div>
      <div class="cc-menu-col">
        <div class="cc-menu-header">
          <span class="cc-menu-brand" style="opacity:0;">.</span>
          <div class="cc-menu-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="#f0efe8" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
        <div class="cc-menu-section-label">Campaigns</div>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_rancher.html">For Ranchers</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_investor.html">Investor Thesis</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_hardware.html">Hardware + Subscription</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_data.html">Data Licensing</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_platform.html">Movement Intelligence Platform</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_mii.html">Motion Intelligence Index</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_weather.html">Weather Intelligence</a>
        <div class="cc-menu-section-label">Analysis</div>
        <a class="cc-menu-sub" href="${base}campaigns/wearables_vs_cattle_isomorphism.html">Wearables vs. Cattle Isomorphism</a>
        <a class="cc-menu-sub" href="${base}campaigns/cachecow_investor_revenue_pages.html">Revenue Model (Combined)</a>
        <div class="cc-menu-section-label">Home</div>
        <a class="cc-menu-sub" href="${base}index.html">Back to Library</a>
        <p class="cc-menu-tagline">April 2026</p>
      </div>
      <div class="cc-menu-divider"></div>
    `;
    document.body.appendChild(menu);

    /* ── GSAP timeline ── */
    const tl = gsap.timeline({ paused: true });

    tl.to(menu, { duration: 0.3, opacity: 1 });
    tl.to(
      menu,
      {
        duration: 0.8,
        ease: "power3.inOut",
        clipPath: "polygon(49.75% 0%, 50.25% 0%, 50.25% 100%, 49.75% 100%)",
      },
      "-=0.25"
    );
    tl.to(menu, {
      duration: 0.8,
      ease: "power3.inOut",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      pointerEvents: "all",
    });
    tl.to(
      ".cc-menu-divider",
      { duration: 0.8, ease: "power4.inOut", height: "100%" },
      "-=0.6"
    );

    function toggle() {
      if (menuOpen) {
        tl.reverse();
        menuOpen = false;
        // resume follow after closing
        fab.style.pointerEvents = "auto";
        resetIdleTimer();
      } else {
        tl.play();
        menuOpen = true;
        // hide fab behind overlay
        fab.style.pointerEvents = "none";
      }
    }

    fab.addEventListener("click", toggle);
    menu.querySelector(".cc-menu-close").addEventListener("click", toggle);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuOpen) toggle();
    });

    /* ── sequential page navigation ── */
    const pages = [
      { path: "primer/technical-primer.html", title: "Technical Primer" },
      { path: "architecture/index.html", title: "Convergence Architecture" },
      { path: "campaigns/cachecow_rancher.html", title: "For Ranchers" },
      { path: "campaigns/cachecow_investor.html", title: "Investor Thesis" },
      { path: "campaigns/cachecow_hardware.html", title: "Hardware + Subscription" },
      { path: "campaigns/cachecow_data.html", title: "Data Licensing" },
      { path: "campaigns/cachecow_platform.html", title: "Movement Intelligence" },
      { path: "campaigns/cachecow_mii.html", title: "Motion Intelligence Index" },
      { path: "campaigns/cachecow_weather.html", title: "Weather Intelligence" },
      { path: "campaigns/wearables_vs_cattle_isomorphism.html", title: "Wearables Isomorphism" },
      { path: "campaigns/cachecow_investor_revenue_pages.html", title: "Revenue Model" },
      { path: "accelerators/dashboard.html", title: "Accelerator Pipeline" },
    ];

    // find current page in sequence
    const loc = window.location.pathname.replace(/\/$/, "");
    let idx = pages.findIndex(function (p) {
      return loc.indexOf(p.path) !== -1;
    });

    if (idx !== -1) {
      const prev = idx > 0 ? pages[idx - 1] : null;
      const next = idx < pages.length - 1 ? pages[idx + 1] : null;

      if (prev || next) {
        const nav = document.createElement("div");
        nav.className = "cc-page-nav";
        let html = "";

        if (prev) {
          html += '<a href="' + base + prev.path + '">' +
            '<span class="cc-pn-label">&larr; Previous</span>' +
            '<span class="cc-pn-title">' + prev.title + '</span></a>';
        }
        if (next) {
          html += '<a href="' + base + next.path + '">' +
            '<span class="cc-pn-label">Next &rarr;</span>' +
            '<span class="cc-pn-title">' + next.title + '</span></a>';
        }

        nav.innerHTML = html;

        // insert before footer, or before the menu script, or at end of body
        const footer = document.querySelector(".footer, .footer-bar");
        const wrap = document.querySelector(".wrap, .app");
        if (footer && footer.parentNode) {
          footer.parentNode.insertBefore(nav, footer);
        } else if (wrap) {
          wrap.appendChild(nav);
        } else {
          // fallback: insert before the floating menu elements
          document.body.insertBefore(nav, fab);
        }
      }
    }
  }
})();
