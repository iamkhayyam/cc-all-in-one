/**
 * CacheCow menu — thin wrapper around Spherical Cow component.
 * Loads the standalone component and passes CacheCow-specific config.
 */
(function () {
  /* ── detect base path from this script's src ── */
  var scripts = document.getElementsByTagName("script");
  var thisScript = scripts[scripts.length - 1];
  var src = thisScript.getAttribute("src") || "";
  var base = src.replace(/assets\/menu\.js.*$/, "");

  /* ── load the standalone component ── */
  var sc = document.createElement("script");
  sc.src = base + "spherical-cow/spherical-cow.js";
  sc.onload = function () {
    if (typeof SphericalCow === "undefined") return;

    SphericalCow.init({
      idle: 5000,
      menu: {
        brand: "CacheCow",
        columns: [
          {
            sections: [
              { label: "Foundation", links: [
                { title: "Technical Primer", href: base + "primer/technical-primer.html" }
              ]},
              { label: "Architecture", links: [
                { title: "Convergence Brief", href: base + "architecture/index.html" }
              ]},
              { label: "Strategy", links: [
                { title: "Accelerator Pipeline", href: base + "accelerators/dashboard.html" }
              ]}
            ],
            tagline: "ForcedField Technologies \u00b7 Confidential"
          },
          {
            sections: [
              { label: "Campaigns", links: [
                { title: "For Ranchers", href: base + "campaigns/cachecow_rancher.html" },
                { title: "Investor Thesis", href: base + "campaigns/cachecow_investor.html" },
                { title: "Hardware + Subscription", href: base + "campaigns/cachecow_hardware.html" },
                { title: "Data Licensing", href: base + "campaigns/cachecow_data.html" },
                { title: "Movement Intelligence Platform", href: base + "campaigns/cachecow_platform.html" },
                { title: "Motion Intelligence Index", href: base + "campaigns/cachecow_mii.html" },
                { title: "Weather Intelligence", href: base + "campaigns/cachecow_weather.html" }
              ]},
              { label: "Analysis", links: [
                { title: "Wearables vs. Cattle Isomorphism", href: base + "campaigns/wearables_vs_cattle_isomorphism.html" },
                { title: "Revenue Model (Combined)", href: base + "campaigns/cachecow_investor_revenue_pages.html" }
              ]},
              { label: "Home", links: [
                { title: "Back to Library", href: base + "index.html" }
              ]}
            ],
            showClose: true,
            tagline: "April 2026"
          }
        ]
      },
      nav: [
        { path: "primer/technical-primer.html", href: base + "primer/technical-primer.html", title: "Technical Primer" },
        { path: "architecture/index.html", href: base + "architecture/index.html", title: "Convergence Architecture" },
        { path: "campaigns/cachecow_rancher.html", href: base + "campaigns/cachecow_rancher.html", title: "For Ranchers" },
        { path: "campaigns/cachecow_investor.html", href: base + "campaigns/cachecow_investor.html", title: "Investor Thesis" },
        { path: "campaigns/cachecow_hardware.html", href: base + "campaigns/cachecow_hardware.html", title: "Hardware + Subscription" },
        { path: "campaigns/cachecow_data.html", href: base + "campaigns/cachecow_data.html", title: "Data Licensing" },
        { path: "campaigns/cachecow_platform.html", href: base + "campaigns/cachecow_platform.html", title: "Movement Intelligence" },
        { path: "campaigns/cachecow_mii.html", href: base + "campaigns/cachecow_mii.html", title: "Motion Intelligence Index" },
        { path: "campaigns/cachecow_weather.html", href: base + "campaigns/cachecow_weather.html", title: "Weather Intelligence" },
        { path: "campaigns/wearables_vs_cattle_isomorphism.html", href: base + "campaigns/wearables_vs_cattle_isomorphism.html", title: "Wearables Isomorphism" },
        { path: "campaigns/cachecow_investor_revenue_pages.html", href: base + "campaigns/cachecow_investor_revenue_pages.html", title: "Revenue Model" },
        { path: "accelerators/dashboard.html", href: base + "accelerators/dashboard.html", title: "Accelerator Pipeline" }
      ]
    });
  };
  document.head.appendChild(sc);
})();
