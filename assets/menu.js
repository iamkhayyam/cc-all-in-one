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
  gsapScript.onload = init;
  document.head.appendChild(gsapScript);

  /* ── inject styles ── */
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    /* floating logo trigger */
    .cc-menu-fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #fff;
      border: 1.5px solid rgba(26,26,24,0.15);
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      cursor: pointer;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      padding: 6px;
    }
    .cc-menu-fab:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 32px rgba(0,0,0,0.18);
    }
    .cc-menu-fab img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @media (prefers-color-scheme: dark) {
      .cc-menu-fab {
        background: #242420;
        border-color: rgba(240,239,232,0.15);
        box-shadow: 0 4px 24px rgba(0,0,0,0.35);
      }
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
      .cc-menu-fab { width: 52px; height: 52px; bottom: 1.25rem; right: 1.25rem; }
    }
  `;
  document.head.appendChild(style);

  /* ── build menu HTML ── */
  function init() {
    const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
      <!-- horns -->
      <path d="M58 52 Q45 20 32 28 Q22 35 38 55" fill="#c0c0c0" stroke="#1a1a18" stroke-width="2.5"/>
      <path d="M142 52 Q155 20 168 28 Q178 35 162 55" fill="#c0c0c0" stroke="#1a1a18" stroke-width="2.5"/>
      <!-- main circle -->
      <circle cx="100" cy="108" r="82" fill="#fff" stroke="#1a1a18" stroke-width="3"/>
      <!-- black patch - sweeping from left around bottom -->
      <path d="M30 80 Q18 120 30 155 Q50 195 100 190 Q130 188 140 160 Q150 130 120 110 Q90 90 60 120 Q35 145 55 100 Q60 85 45 78 Z" fill="#1a1a18"/>
      <!-- ear tags -->
      <ellipse cx="38" cy="82" rx="7" ry="9" fill="none" stroke="#d4a843" stroke-width="2"/>
      <ellipse cx="162" cy="82" rx="7" ry="9" fill="none" stroke="#d4a843" stroke-width="2"/>
      <!-- udder -->
      <path d="M110 182 Q115 198 120 195 Q125 198 127 192 Q130 198 135 195 Q138 198 140 188" fill="#f5b0c0" stroke="#1a1a18" stroke-width="1.5"/>
    </svg>`;

    // floating button
    const fab = document.createElement("div");
    fab.className = "cc-menu-fab";
    fab.innerHTML = logoSvg;
    fab.title = "Menu";
    document.body.appendChild(fab);

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
    let isOpen = false;
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
      if (isOpen) {
        tl.reverse();
      } else {
        tl.play();
      }
      isOpen = !isOpen;
    }

    fab.addEventListener("click", toggle);
    menu.querySelector(".cc-menu-close").addEventListener("click", toggle);

    // close on escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) toggle();
    });
  }
})();
