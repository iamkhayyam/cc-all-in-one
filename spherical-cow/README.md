# Spherical Cow

A floating menu component with personality. Drop a cow on any website — it follows your cursor, opens a fullscreen GSAP menu, respects virtual fencing around all clickable elements, and shimmers gold when idle.

## Quick start

```html
<script>
var myConfig = {
  menu: {
    brand: 'My Brand',
    columns: [
      {
        sections: [
          { label: 'Pages', links: [
            { title: 'Home', href: '/' },
            { title: 'About', href: '/about' }
          ]}
        ],
        tagline: 'Built with Spherical Cow'
      },
      {
        sections: [
          { label: 'More', links: [
            { title: 'Blog', href: '/blog' }
          ]}
        ],
        showClose: true
      }
    ]
  }
};
</script>
<script src="spherical-cow.js" data-config="myConfig"></script>
```

## ES module

```js
import { SphericalCow } from './spherical-cow.js';

SphericalCow.init({
  logo: '<svg>...</svg>',     // optional — defaults to CacheCow logo
  idle: 5000,                  // ms before idle drift (default 5000)
  menu: { ... },               // fullscreen menu config
  nav: [ ... ]                 // sequential page navigation
});
```

## Config reference

### `logo` (string, optional)
SVG string for the floating icon. Defaults to the CacheCow spherical cow.

### `idle` (number, optional)
Milliseconds before the cow drifts to its idle position. Default: `5000`.

### `menu` (object, optional)
Fullscreen overlay menu config. If omitted, clicking the cow does nothing.

```js
{
  brand: 'Site Name',          // top-left brand text
  columns: [
    {
      sections: [
        {
          label: 'Section Label',
          links: [
            { title: 'Link Title', href: '/path' }
          ]
        }
      ],
      tagline: 'Footer text',   // optional, sticks to bottom
      showClose: false           // show X close button in this column
    }
  ]
}
```

First column links render large (serif). Subsequent column links render smaller (sans-serif). Add `showClose: true` to one column for the close button.

### `nav` (array, optional)
Sequential prev/next page navigation. If provided, a nav bar is inserted before the page footer.

```js
[
  { path: 'page1.html', href: '/page1.html', title: 'Page One' },
  { path: 'page2.html', href: '/page2.html', title: 'Page Two' },
  { path: 'page3.html', href: '/page3.html', title: 'Page Three' }
]
```

- `path` — matched against `window.location.pathname` to find the current page
- `href` — the link destination
- `title` — display text in the nav bar

## Features

- **Mouse following** — slow lerp easing, feels organic
- **Idle drift** — settles to bottom-center of viewport after configurable timeout
- **Gold shimmer** — pulsing `drop-shadow` animation when idle (ear-tag gold `#c0912d`)
- **GSAP fullscreen menu** — clip-path reveal animation with divider
- **Virtual fencing** — repels from all `<a>`, `<button>`, and `[onclick]` elements (140px radius, 35px peak force)
- **Click passthrough** — if the cow overlaps a link, `pointer-events: none` lets clicks through
- **Nav glow** — prev/next buttons glow gold when visible in viewport (mutually exclusive with cow shimmer)
- **Dark mode** — respects `prefers-color-scheme: dark`
- **Responsive** — 64px desktop, 48px mobile
- **Zero dependencies** — loads GSAP from CDN automatically

## License

MIT
