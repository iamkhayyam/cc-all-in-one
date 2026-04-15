/**
 * Spherical Cow — A floating menu component with personality.
 *
 * Features:
 *   - Mouse-following logo with slow lerp easing
 *   - Idle drift to bottom-center of viewport
 *   - Gold shimmer animation on idle
 *   - GSAP-powered fullscreen clip-path menu
 *   - Virtual fencing (repels from all clickable elements)
 *   - Click passthrough when overlapping interactive elements
 *   - Optional sequential prev/next page navigation
 *   - Nav glow when visible (mutually exclusive with cow shimmer)
 *   - Dark mode support via prefers-color-scheme
 *   - Responsive (48px mobile, 64px desktop)
 *
 * Usage (script tag):
 *   <script>
 *   var sphericalCowConfig = { menu: { brand: 'My Site', columns: [...] } };
 *   </script>
 *   <script src="spherical-cow.js" data-config="sphericalCowConfig"></script>
 *
 * Usage (ES module):
 *   import { SphericalCow } from './spherical-cow.js';
 *   SphericalCow.init({ menu: { brand: 'My Site', columns: [...] } });
 *
 * @version 1.0.0
 * @license MIT
 */

(function (root, factory) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    root.SphericalCow = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ── default logo SVG ── */
  var DEFAULT_LOGO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720"><defs><style>.st0{fill:none}.st1{fill:#010101}.st2{fill:#efa2bd}.st3{fill:#c0912d}.st4{fill:#fff}</style></defs><path class="st1" d="M445.6,623.2c17.7-14.5,35.2-18.2,55.4-30.9,16.9-10.7,31.3-23.9,45.6-37.8,5.8-5.7,10.3-11.2,15.3-17.6,17.9-22.6,31.4-47.2,40.5-74.6,13.4-40,13.8-93-14.5-126.6-23-27.2-56.9-21.3-81.1-.7-12.4,10.5-22.8,22.4-32.3,35.6l-35.5,49c-19.9,27.5-49.1,58.4-80.5,72.3-32.2,14.3-65.4,13.8-97.8,0-18.6-8-35.5-18.6-50.7-32-13.1-11.5-22.9-25-32.7-39.2-26.4-38.5-38.8-77.7-41.8-124.4-1.8-27.4,1.9-54.3,8.9-80.9,1.7-6.6,8.4-30,.2-32.4-4.5-1.3-9.6,2-12.3,5.5-13.6,17.5-23.5,36.5-32.1,57-16.3,38.9-23.4,79.8-22.4,122.1,1.2,53.2,16.4,101,43.9,146.2,10.7,17.7,23.6,33.3,37.6,48.4,21,22.6,44.9,40.6,71.9,55.4,20.9,11.5,42.6,18.9,65.7,25.1,24.4,6.5,53.7,9,78.9,7.8l15.3-.8c15.1-.7,29.4-4.2,44-8.1.9-7.9,4.5-13.5,10.3-18.3Z"/><g><path class="st4" d="M574.9,189.9c-3.5-4-5.1-10-1.2-14,14.3-14.8,31.1,19.1,37.9,27.6,25.5,10.7,49.9,2.3,70.6-16.1-15.3-13.7-32.5-22.6-51.7-26.6-25.5-5.4-39.3,4.5-70.9-2.5-7-1.6-12.4-5.3-17.5-9.9-1.7-1.5-3-2.3-3.5-5.2l7.1,3.9c7.4,4.1,15.9,5.4,23.6,6.5l-2.3-3.3c-.3-.5,1.2-1.9,1.7-2.3,12.2-8.3,23.8-22,29.5-36,5.3-13,8.6-26.7,7-40.7-1.5-12.4-3.7-23.4-9.2-35.1-.2,0-.9.3-1.5.5-.8,8.5-1.5,16.3-3.9,24.3-8.2,27.7-20.3,39.3-45.7,51.5-4.1,2-7.4,3.7-11.8,6.1-2.9-1.2,23,21.1,15.1,16.6-3.4-1.9-16.1-13.3-25.7-19.4-50.3-32.2-93.9-50.2-154.5-52.7-3.4-.1-6.4-.2-9.6-.1l-7.2.3c-58.4,2.2-114.1,22.5-159.5,59.2,3.4,15.2-5.5,29.6-19.6,34.5l-8.8,3.1-17.5,3.2c-9.9,1.8-20.2.6-30.2-.2-28.6-3.3-56.5,8.7-78.2,27.5,21.1,19.3,45.2,26.8,72.3,17.2,4.3-1.5,8.8-15.9,21.6-26.3,4.6-3.7,12.2-6.1,17.5-2.5,9.1,6.2,4.2,25.4,2,34.6-4,16.4-7.3,32.3-8.8,49.3-2.3,26.5.6,60.9,8.2,86.6,11.1,37.8,30.4,72.4,57.9,100.6,10.6,10.8,22.8,19.3,35.7,26.8,35.1,20.5,74,26.4,111.9,9.8,33.2-14.6,64.9-51.2,85.6-80.5,13.5-19.2,26.3-37.9,41.4-55.8,10.7-12.7,22.4-23.5,37.2-31.1,33.1-16.9,63.8-6,81.7,25.5,9.3,16.4,13.5,34.4,15.2,53.1,2.1,23.1-2.6,50.8-10.6,72.6-5.5,15-13,28.6-20.6,42.7-8.6,16-27.1,39-40.4,51.6-13.6,12.9-27.3,25-43.6,34.5-11.3,6.6-22.8,11.7-34.5,17.4-8.4,4.1-24.6,12.5-26,23.2,39.6-10,76.4-32.9,106.9-58.7,4.9-4.2,9.2-8.2,13.3-13.1,5.1-6,11.2-11.2,16.1-17.5l15-19.6c14.7-19.3,25.8-40.5,34.8-63.3,12.1-30.9,18.8-62.6,20.4-95.7,2.5-54.2-12.2-115.2-40.7-161.6-12.7-4.5-23.7-10.7-32.3-20.6Z"/><path class="st4" d="M521.8,438.9c1,.4,2.1.7,3.2,1.1,3.3,1,6.7,1.8,10.2,2.2.6,0,1.2.1,1.8.2,1.2.1,2.4.2,3.5.2.6,0,1.2,0,1.8,0,2.9,0,5.9-.4,8.7-1.1,3.4-.9,6.5-2.3,9.4-4.3,1-.7,1.9-1.4,2.8-2.3.4-.4.9-.8,1.3-1.3,2.5-2.7,4.6-6.1,6.2-10.4s2.5-9,2.8-14c0-.8,0-1.7.1-2.5,0-1.7,0-3.4,0-5.1-.4-9.4-2.6-19.1-6-27-.9-2.2-2-4.2-3.1-6.1-.8-1.3-1.5-2.4-2.4-3.6-2.9-3.9-6.2-6.7-9.8-8-1.5-.6-2.9-.9-4.2-.9-3.3,0-5.7,1.8-7.5,4.9-.5.8-.9,1.6-1.3,2.5-.6,1.4-1.1,2.9-1.6,4.6s-.3,1.1-.5,1.7c-1.1,4.1-2,8.8-3.1,13.7-1.3,5.6-2.7,11.6-4.8,17.3s-1.1,2.8-1.7,4.1-1.2,2.6-1.8,3.8c-.6,1.2-1.2,2.4-1.8,3.5-.6,1.1-1.2,2.2-1.8,3.3-.6,1-1.2,2-1.8,3-1.4,2.4-2.7,4.6-3.7,6.5-1.2,2.3-2.1,4.4-2.2,6.2s0,1.7.3,2.5c.7,2.1,2.8,3.8,7,5.4Z"/></g><path class="st4" d="M130.9,135.3h0s0,0,.1.1c3,3.3,6.3,6.2,9.8,9,12.7,10.8,16.7,10,16.7,10,25.5-2.3,28.9-19.7,28.9-19.7,3.4-12.8-8.6-17-8.6-17h0c-2-1.2-3.9-2.1-6.2-3.2-11.2-5.2-22.2-11.2-30.5-20.3-15-16.4-19.6-36.6-21.1-58.8-15.1,28.8-13.7,62.1,3,89.6,2.3,3.8,5,7.3,7.9,10.4Z"/><path d="M660.3,164c-20.1-10.9-42.1-13.8-64.7-10.5-7.1,1-14.6.4-22.2,0,7.8-7.2,14.9-12.7,20.5-20.6,14.9-20.8,20.3-46.1,16.4-71.5-2.3-15-8-28.6-15.4-41.7-.7-1.3-3.7-2.4-4.8-2-1,.4-2.4,2.7-2.3,4,2.6,26.1-4.2,55.9-25.6,73.2-15.8,12.7-27.3,10.2-33.7,21.4-1.5-1.5-3.2-3.7-4.7-4.8-49.2-39.2-115.2-58.4-178-54.9-59.9,3.3-110.4,23.4-158.2,59.7-12.6-10.1-25-11.1-37.6-22.6-15.5-14.3-22.6-34.1-23.5-54.9-.2-4.8-.5-9,.3-13.9.4-2.4-1.3-6.8-4.2-5.8-3.8,1.3-5.1,6-6.9,9.3-16.3,30-17.5,66.4-.6,96.4,3.5,6.2,7.7,12,12.7,17.1s5.2,4.9,8,7.1,2.9,2.1,4.4,3.1,3.6,1.6,4.1,2.6c1.7,3.7-17.8,2.5-19.6,2.3-2.8-.2-5.7-.4-8.5-.8-22-2.5-43.6,3.1-62.6,14.4-8.3,4.9-15.6,9.9-22.7,16.4-1.6,1.5-1,5.5.6,6.9,15.8,14,35.5,24.8,57.2,24.4,6.1-.1,11.8-1.9,18.4-2.6-24.9,45.5-36.4,95.2-36,146.5.3,32.4,4.9,64.2,15.4,94.9,12.9,37.4,33,71.3,59.1,100.8,3.6,4.1,7,8.2,10.8,12,9.3,9.2,18.4,17.6,28.8,25.8,50.9,40.2,111.4,61.8,176.5,62.3,25.2.2,49.5-2.4,74-9.4,7.5,11.1,14.1,12.9,25.5,18.3,3.2,5.8-6.4,16,1.8,26.2,3.1,3.9,8.4,4.3,13.4,3,3.3-.8,7-4.7,8.3-8.9,3.2-10.7,1.2-15.7,5.5-15.8,13.2-.4,18.3-4.1,19.9,1.7l3.4,13.1c2.5,9.7,13.6,16.3,22.8,10.9,5.4-3.2,7.4-10.9,6-16.8-2.7-10.9-9.1-17.3-6.8-21.4l14.5-13.5,9.6,8.5c4,3.6,9,4.9,14.2,3.1,3.8-1.3,8.1-5.2,8.3-10.5.2-5.1-2.9-9.9-6.9-12.9-19-14.6-3-11.6-4.6-46.2-.2-5.1-1.4-10.2-1.2-14.9.1-2.6,3.7-6.4,5.7-8.6,35.5-38.1,60.2-84.3,71.7-135.3,11.4-50.6,10.6-100.5-3.3-150.4-6.4-22.7-14.6-44.1-26.3-64.8,6.4.6,11.7,1.3,17.7,1.4,24.5.4,55.5-23.5,54.6-28.3-1.2-6.7-22.8-18.8-29.3-22.3ZM123,124.4c-16.7-27.5-18.1-60.8-3-89.6,1.4,22.2,6.1,42.5,21.1,58.8,8.4,9.1,19.4,15.1,30.5,20.3,2.3,1.1,4.3,2.1,6.5,3.4h0s.8.3,1.8,1.1c.9.6,1.9,1.2,3,2,0,0,0,0-.2.2,1.8,1.7,3.5,3.9,4,6.5,1.2,7.3-2.1,14-7.7,18.6-2.7,2.3-6.1,3.7-9.5,4.8s-7.3,2.4-10.9,2.7c-5.2.5-10.4-3.8-14.3-6.7-8.3-6.2-15.7-13.2-21.2-22.2ZM435.3,641.5c-14.6,3.9-29,7.4-44,8.1l-15.3.8c-25.2,1.2-54.6-1.3-78.9-7.8-23.1-6.1-44.8-13.6-65.7-25.1-27-14.9-50.8-32.9-71.9-55.4-14-15-26.9-30.7-37.6-48.4-27.5-45.2-42.7-93-43.9-146.2-.9-42.3,6.1-83.2,22.4-122.1,8.6-20.5,18.5-39.5,32.1-57,2.7-3.5,7.8-6.8,12.3-5.5,8.1,2.4,1.5,25.8-.2,32.4-7,26.6-10.7,53.4-8.9,80.9,3,46.7,15.4,85.9,41.8,124.4,9.8,14.3,19.6,27.7,32.7,39.2,15.2,13.4,32.1,24,50.7,32,32.4,13.9,65.6,14.4,97.8,0,31.4-13.9,60.6-44.8,80.5-72.3l35.5-49c9.6-13.2,20-25.1,32.3-35.6,24.2-20.6,58.2-26.5,81.1.7,28.3,33.6,27.9,86.6,14.5,126.6-9.2,27.4-22.6,52.1-40.5,74.6-5,6.4-9.5,11.9-15.3,17.6-14.2,13.9-28.6,27.1-45.6,37.8-20.2,12.7-37.7,16.4-55.4,30.9-5.9,4.8-9.4,10.4-10.3,18.3ZM575.3,643.3c1.7,2.5-1,6-2.9,7.4-2.1,1.5-5.9,1-8.1-1l-10.1-9.7c-3.4-3.2-7.7-2.2-10.3,1-4.7,5.8-10.1,10-16.1,14.8-.8,10.7,6.3,15.4,8.2,26.9.8,4.9-2.4,10.3-7.3,9.9-13.8-1.1-8.4-32.7-23.7-29.6-15.2,3.1-22.2-1.3-23.6,9.3-1,7.5-1.4,19.3-10.5,17.7-2.9-.5-5.2-4.2-4.7-7.7l2-12c2.4-14.8-14.5-8.9-25.4-23.1,41.1-14.1,75.7-31,107.8-59.6l12.2-10.9c1.8,10.6,2.1,20.7-.2,31.2-.9,4.1-3,8.3-3.4,12.5-.4,4.9,2.8,10.5,6.4,13.4,3.6,3,7.1,5.6,9.7,9.5ZM611.6,203c-6.9-8.5-23.6-42.4-37.9-27.6-3.8,4-2.2,10,1.2,14,8.6,10,19.6,16.1,32.3,20.6,28.5,46.4,43.2,107.4,40.7,161.6-1.5,33.1-8.3,64.8-20.4,95.7-8.9,22.8-20,44-34.8,63.3l-15,19.6c-4.8,6.3-11,11.5-16.1,17.5-4.1,4.9-8.4,9-13.3,13.1-30.5,25.7-67.4,48.7-106.9,58.7,1.4-10.7,17.6-19.1,26-23.2,11.7-5.7,23.2-10.8,34.5-17.4,16.3-9.5,30-21.6,43.6-34.5,13.3-12.6,31.8-35.7,40.4-51.6,7.6-14.1,15.1-27.7,20.6-42.7,7.9-21.8,12.7-49.5,10.6-72.6-1.7-18.8-5.9-36.8-15.2-53.1-17.9-31.5-48.6-42.4-81.7-25.5-14.8,7.6-26.5,18.4-37.2,31.1-15.1,17.9-27.9,36.6-41.4,55.8-20.7,29.3-52.3,65.9-85.6,80.5-37.9,16.7-76.8,10.7-111.9-9.8-12.9-7.5-25.1-16-35.7-26.8-27.5-28.2-46.9-62.9-57.9-100.6-7.5-25.8-10.4-60.1-8.2-86.6,1.5-16.9,4.8-32.9,8.8-49.3,2.2-9.2,7.1-28.4-2-34.6-5.3-3.7-13-1.3-17.5,2.5-12.9,10.4-17.4,24.8-21.6,26.3-27,9.6-51.1,2.1-72.3-17.2,21.7-18.8,49.6-30.8,78.2-27.5,8.6,1,17.5,1.7,26.1.8s15.9-2.4,23.4-4.5c7-2,14.1-4.8,19.2-10.2s7.4-10.9,8-17.5,0-6.2-.6-9.2Z"/><path class="st2" d="M559.1,620.4c.4-4.2,2.5-8.4,3.4-12.5,2.3-10.5,2-20.6.2-31.2l-12.2,10.9c-32.1,28.7-66.7,45.5-107.8,59.6,11,14.2,27.9,8.3,25.4,23.1l-2,12c-.6,3.5,1.7,7.2,4.7,7.7,9,1.6,9.4-10.2,10.5-17.7,1.4-10.5,8.4-6.2,23.6-9.3,15.3-3.1,9.9,28.5,23.7,29.6,5,.4,8.1-5,7.3-9.9-1.9-11.5-9-16.2-8.2-26.9,6-4.7,11.4-9,16.1-14.8,2.6-3.2,6.9-4.3,10.3-1l10.1,9.7c2.1,2.1,6,2.5,8.1,1,1.9-1.4,4.5-4.8,2.9-7.4-2.5-3.9-6-6.5-9.7-9.5-3.6-3-6.9-8.5-6.4-13.4Z"/><ellipse class="st1" cx="645.4" cy="182" rx="2.7" ry="3.2"/><g><path class="st3" d="M674.3,216c-.5-4.8-1.5-9.3-2.9-13.4-1.5.9-2.9,1.7-4.3,2.5,1.2,3.6,2.1,7.6,2.6,11.8,2.2,19-4.7,35.5-15.4,36.7-10.7,1.2-21.1-13.2-23.2-32.3-2.1-18.3,4.2-34.1,14.1-36.4,1.7-1.7,3.3-4.4-.1-6.1-11.2,3.2-18.2,21.4-15.9,42.4,2.5,22.2,14.7,39.1,27.1,37.7,12.4-1.4,20.5-20.6,18-42.8Z"/></g><ellipse class="st1" cx="80.8" cy="181.7" rx="2.2" ry="3.8" transform="translate(-105.8 113) rotate(-45.8)"/><path class="st1" d="M107.2,215.6s-18.2,33.3-22.4,52.6c0,0,27.8-17.6,22.4-52.6Z"/><path d="M403.1,82.9c-20.7,1.7-9.5-7.2-30.7-6.5-18,.9-35.7,3.4-53.4,4.6-16.9,1.1-33.8,1.2-47.9-1.6-3.2-.6-6.3-1.4-10.1-.9-3.9.5-7.7,2.2-11.2,3.9-17.9,8.6-35.9,21.2-36.1,31.6-.2,7.8,9.8,11.9,20.9,14,11.2,2,23.9,2.4,35.4,4.8,8.1,1.7,15.8,4.5,24.8,4.8,9.1.4,18.5-2,27.8-1.6,10,.3,19.3,4.1,24.9,10,6.2,6.6,7.8,15.1,13,22.4,3.7,5.3,11.3,10.8,18.8,11.2,12.4.7,16.2-3.2,22-11.7,2.5-3.7,6.4-7.4,11.8-7.5,1.5,0,3.2.3,4.1,1.4.7.8.7,1.8.8,2.8,1.5,15.1,10.7,30.5-5.2,41.6-1.9,1.4-4.3,3.1-3.6,5.5.4,1.2,1.4,2,2.4,2.8,6.3,4.9,12.5,9.9,18.2,15.3,3.1,2.9,6.1,5.9,8.3,9.6,3.7,6.4,4.4,14.5,8.2,20.7,5.8,9.2,17.7,10.9,26.7,4.9,18.7-12,19.3-42.7,9.6-61.8,4,8.2,9.3,18.1,15.7,24.6,7.4,7.4,18.8,11.7,28.1,6.7,22-11.4,7.8-45.7-4.4-60.6-7.8-10.5-17.8-19.7-29.3-27-11.7-7.5-25-12.4-38.1-17.4-.6-.2-1-.4-1-1,6.9-1.8,12-6.2,11.9-12.5,0-6.2-6.1-11.3-13.3-14-16.5-6-16.7-13.9-34.2-17.9"/><path d="M341.3,415.2c0,17.6-2.5,37.9-26.7,37.9s-43.8-14.3-43.8-31.9,1.5-40.9,25.6-40.9,44.8,17.3,44.8,34.9Z"/><path d="M203.5,207.8c1.5,6,5.5,10.3,7.9,15.9.8,2,1.3,4.1,1.8,6.2.1.5.2,1,.3,1.5.2,1.1.4,2.3.4,3.4,0,1.8-.8,3.3-1.2,5-.6,2.5-1.1,5.1-1.4,7.7-.6,5-.4,10.2,1.3,15,3,8.5,12.3,9.9,16.7,16.9,2.4,3.7.5,6.9.8,10.8.4,4.9,2.3,10.1,4.8,14.4,4.5,8,11.6,14.1,18.5,20.1,3.8,3.3,7.8,6.7,12.7,7.8,2.7.6,5.7.5,8.3-.4,4.6-1.5,7.8-5.2,11.7-7.9,5.6-3.9,15.2-3.8,19.5-8.3,1.3-1.4,2-3.3,2.6-5.2,2.9-9.1,7-18.9,7.5-28.6.5-8.5-2.9-16.9-.7-25.3,3.6-13.6,17.7-19.2,20.5-32.4,3.4-15.7-15.7-21.7-26.1-28-18.9-11.3-37.7-22.7-56.6-34-14.7-8.8-25.1-10.7-40.8-.9-15.6,10.3-12.3,30.7-8.5,46.4ZM255.8,265.4c10.5,2.1,13,12.8,15.6,21.7.6,2.2,6,18.8.2,17.7-8.2-1.7-20.2-12.3-22.6-20.2-1.5-4.8-1.6-20.9,6.8-19.2Z"/><g><path class="st3" d="M100.4,221.1c1.4-18.6-4.4-34.8-13.7-40.2l-.6,4.9c8.4,4.1,13.8,18.4,12.5,34.9-1.5,19.1-11.3,33.9-22,33.1-10.7-.8-18.2-17-16.7-36.1.1-1.6.3-3.2.6-4.8-1.4-.7-2.9-1.5-4.4-2.3-.4,2.3-.7,4.7-.9,7.1-1.7,22.3,7,41.2,19.5,42.1,12.5,1,24-16.3,25.7-38.6Z"/></g><g><path class="st3" d="M102.4,221.8c1.4-18.6-4.4-34.8-13.7-40.2l-.6,4.9c8.4,4.1,11.6,19.5,10.3,36-1.5,19.1-9.2,32.9-19.9,32-10.7-.8-18.2-17-16.7-36.1.1-1.6.3-3.2.6-4.8-1.4-.7-2.9-1.5-4.4-2.3-.4,2.3-.7,4.7-.9,7.1-1.7,22.3,7,41.2,19.5,42.1,12.5,1,24-16.3,25.7-38.6Z"/><path class="st3" d="M88.8,181.6c-1.1-.7-2.4-1.1-3.7-1.6-1.6-.6-3.3-1.1-5-1.1s-2.3-.1-2.3,1.3,1,2.5,1.5,3c.9.9,1.8,1,3,1.4s2.6.4,3.8,1h0c.8.2,1.5.5,2,.7,0,0,.6-4.9.6-4.9Z"/></g><g><path class="st3" d="M673.9,216.3c-.6-4.7-1.6-9.2-3-13.3-1,.6-2.6,1.5-4.5,2.5,1.2,3.6,2.2,7.5,2.7,11.6,2.3,19-5,35.5-16.2,36.7-1.1.1-2.1,0-3.1,0-10.1-1.5-19.3-14.9-21.3-32.2-2.2-18.3,4.4-34.1,14.9-36.4,1.7-1.7,5.1-4.6,1.4-6.3-11.8,3.2-20.8,21.6-18.2,42.6,2.7,22.2,15.4,39.1,28.5,37.7s21.5-20.6,18.9-42.8Z"/></g></svg>';

  /* ── CSS (all scoped via .sc- prefix) ── */
  var CSS = '\
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap");\
.sc-fab{position:fixed;width:64px;height:64px;cursor:pointer;z-index:9998;pointer-events:auto;filter:drop-shadow(0 2px 8px rgba(0,0,0,.18));will-change:transform;left:calc(50% - 32px);top:calc(100vh - 80px)}\
.sc-fab svg{width:100%;height:100%;display:block}\
.sc-fab:hover{filter:drop-shadow(0 4px 16px rgba(0,0,0,.28))}\
@keyframes sc-shimmer{0%{filter:drop-shadow(0 0 4px rgba(192,145,45,.2)) drop-shadow(0 2px 6px rgba(0,0,0,.12))}50%{filter:drop-shadow(0 0 24px rgba(192,145,45,.7)) drop-shadow(0 0 48px rgba(192,145,45,.35)) drop-shadow(0 0 8px rgba(239,162,189,.4))}100%{filter:drop-shadow(0 0 4px rgba(192,145,45,.2)) drop-shadow(0 2px 6px rgba(0,0,0,.12))}}\
.sc-fab.sc-shimmer{filter:none;animation:sc-shimmer 2s ease-in-out infinite}\
@media(max-width:700px){.sc-fab{width:48px;height:48px}}\
.sc-menu{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#1a1a18;display:flex;z-index:9999;clip-path:polygon(49.75% 49.75%,50.25% 49.75%,50.25% 50.25%,49.75% 50.25%);pointer-events:none;opacity:0}\
.sc-menu .sc-col{flex:1;display:flex;flex-direction:column;padding:2.5rem 2rem;overflow-y:auto}\
.sc-menu .sc-col-left{border-right:1px solid rgba(255,255,255,.1)}\
.sc-menu .sc-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2.5rem}\
.sc-menu .sc-brand{font-family:"Playfair Display",Georgia,serif;font-size:1.6rem;font-weight:600;color:#f0efe8}\
.sc-menu .sc-close{width:40px;height:40px;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:50%;border:1px solid rgba(255,255,255,.2);transition:border-color .2s;flex-shrink:0}\
.sc-menu .sc-close:hover{border-color:rgba(255,255,255,.5)}\
.sc-menu .sc-close svg{width:18px;height:18px}\
.sc-menu .sc-label{font-family:"DM Sans",sans-serif;font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,239,232,.35);margin-bottom:.75rem;margin-top:1.5rem}\
.sc-menu .sc-label:first-of-type{margin-top:0}\
.sc-menu .sc-link{display:block;text-decoration:none;font-family:"Playfair Display",Georgia,serif;font-size:clamp(1.4rem,3vw,2.2rem);font-weight:600;color:#f0efe8;line-height:1.3;padding:.35rem 0;transition:color .15s}\
.sc-menu .sc-link:hover{color:#a8a89e}\
.sc-menu .sc-sub{display:block;text-decoration:none;font-family:"DM Sans",sans-serif;font-size:15px;font-weight:400;color:#a8a89e;padding:.3rem 0;transition:color .15s}\
.sc-menu .sc-sub:hover{color:#f0efe8}\
.sc-menu .sc-tagline{font-family:"DM Sans",sans-serif;font-size:13px;color:rgba(240,239,232,.3);margin-top:auto;padding-top:2rem}\
.sc-menu .sc-divider{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:1px;height:0%;background:rgba(255,255,255,.1)}\
@media(max-width:700px){.sc-menu{flex-direction:column}.sc-menu .sc-col-left{border-right:none;border-bottom:1px solid rgba(255,255,255,.1)}.sc-menu .sc-divider{display:none}.sc-menu .sc-link{font-size:1.3rem}}\
.sc-nav{max-width:900px;margin:0 auto;display:flex;border-top:1px solid var(--border,rgba(26,26,24,.12))}\
.sc-nav a{flex:1;display:flex;flex-direction:column;padding:2rem 2.5rem;text-decoration:none;color:inherit;transition:background .15s}\
.sc-nav a:hover{background:var(--color-background-secondary,#f5f4f0);box-shadow:inset 0 0 24px rgba(192,145,45,.12),0 0 20px rgba(192,145,45,.15)}\
.sc-nav a:hover .sc-pn-title{color:var(--ink,var(--color-text-primary,#1a1a18))}\
.sc-nav a:hover .sc-pn-label{color:rgba(192,145,45,.8)}\
.sc-nav.sc-nav-glow a{animation:sc-nav-glow 2s ease-in-out infinite}\
.sc-nav.sc-nav-glow a:nth-child(2){animation-delay:.5s}\
.sc-nav.sc-nav-glow .sc-pn-label{animation:sc-nav-label-glow 2s ease-in-out infinite}\
.sc-nav.sc-nav-glow a:nth-child(2) .sc-pn-label{animation-delay:.5s}\
@keyframes sc-nav-glow{0%{filter:drop-shadow(0 0 4px rgba(192,145,45,.1))}50%{filter:drop-shadow(0 0 24px rgba(192,145,45,.7)) drop-shadow(0 0 48px rgba(192,145,45,.35))}100%{filter:drop-shadow(0 0 4px rgba(192,145,45,.1))}}\
@keyframes sc-nav-label-glow{0%{color:#9a9a94}50%{color:#c0912d}100%{color:#9a9a94}}\
.sc-nav a+a{border-left:1px solid var(--border,rgba(26,26,24,.12));text-align:right}\
.sc-nav .sc-pn-label{font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3,var(--color-text-tertiary,#9a9a94));margin-bottom:.4rem}\
.sc-nav .sc-pn-title{font-family:"Playfair Display",Georgia,serif;font-size:1.1rem;font-weight:600;line-height:1.3;color:var(--ink2,var(--color-text-secondary,#5a5a56))}\
@media(max-width:560px){.sc-nav a{padding:1.5rem 1.25rem}.sc-nav .sc-pn-title{font-size:.95rem}}\
@media(prefers-color-scheme:dark){.sc-nav a:hover{background:var(--color-background-secondary,#242420)}}';

  /* ── helpers ── */
  function loadGSAP(cb) {
    if (typeof gsap !== "undefined") return cb();
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js";
    s.onload = cb;
    document.head.appendChild(s);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* ── build menu HTML from config ── */
  function buildMenuHTML(cfg) {
    var cols = cfg.columns || [];
    var html = "";
    cols.forEach(function (col, i) {
      var cls = i === 0 && cols.length > 1 ? "sc-col sc-col-left" : "sc-col";
      html += '<div class="' + cls + '">';
      html += '<div class="sc-header">';
      if (i === 0) {
        html += '<span class="sc-brand">' + (cfg.brand || "") + "</span>";
      } else {
        html += '<span class="sc-brand" style="opacity:0">.</span>';
      }
      if (col.showClose) {
        html += '<div class="sc-close"><svg viewBox="0 0 24 24" fill="none" stroke="#f0efe8" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>';
      }
      html += "</div>";
      (col.sections || []).forEach(function (sec) {
        html += '<div class="sc-label">' + sec.label + "</div>";
        (sec.links || []).forEach(function (lnk) {
          var linkClass = sec.large !== false && cols.length > 1 && cols.indexOf(col) === 0 ? "sc-link" : "sc-sub";
          html += '<a class="' + linkClass + '" href="' + lnk.href + '">' + lnk.title + "</a>";
        });
      });
      if (col.tagline) {
        html += '<p class="sc-tagline">' + col.tagline + "</p>";
      }
      html += "</div>";
    });
    if (cols.length > 1) html += '<div class="sc-divider"></div>';
    return html;
  }

  /* ── main init ── */
  function init(opts) {
    opts = opts || {};
    var logoSvg = opts.logo || DEFAULT_LOGO;
    var idleMs = opts.idle || 5000;
    var menuCfg = opts.menu || null;
    var navPages = opts.nav || null;

    // inject CSS
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    loadGSAP(function () {
      ready(function () {
        _mount(logoSvg, idleMs, menuCfg, navPages);
      });
    });
  }

  function _mount(logoSvg, idleMs, menuCfg, navPages) {
    var fabW = 64, fabH = 64;

    // ── floating logo ──
    var fab = document.createElement("div");
    fab.className = "sc-fab";
    fab.innerHTML = logoSvg;
    fab.title = "Menu";
    document.body.appendChild(fab);

    // ── state ──
    var cx = window.innerWidth / 2 - fabW / 2;
    var cy = window.innerHeight - 80;
    var tx = cx, ty = cy;
    var lerp = 0.06;
    var idleTimer = null;
    var isIdle = true;
    var menuOpen = false;
    var isShimmering = false;

    function setIdleTarget() {
      isIdle = true;
      tx = window.innerWidth / 2 - fabW / 2;
      ty = window.innerHeight - fabH - 16;
    }

    function resetIdleTimer() {
      isIdle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(setIdleTarget, idleMs);
    }

    // ── input tracking ──
    document.addEventListener("mousemove", function (e) {
      if (menuOpen) return;
      tx = e.clientX - fabW / 2;
      ty = e.clientY - fabH / 2;
      resetIdleTimer();
    });
    document.addEventListener("scroll", resetIdleTimer, { passive: true });
    document.addEventListener("touchstart", function (e) {
      if (menuOpen) return;
      var t = e.touches[0];
      tx = t.clientX - fabW / 2;
      ty = t.clientY - fabH / 2;
      resetIdleTimer();
    }, { passive: true });
    window.addEventListener("resize", function () {
      if (isIdle) setIdleTarget();
    });

    // ── animation loop ──
    function tick() {
      if (!menuOpen) {
        cx += (tx - cx) * lerp;
        cy += (ty - cy) * lerp;

        // virtual fencing
        var fenceEls = document.querySelectorAll("a, button, [onclick]");
        var repelX = 0, repelY = 0;
        var cowCX = cx + fabW / 2, cowCY = cy + fabH / 2;
        for (var i = 0; i < fenceEls.length; i++) {
          var el = fenceEls[i];
          if (el.closest(".sc-menu") || el.closest(".sc-fab")) continue;
          var r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.bottom < 0 || r.top > window.innerHeight) continue;
          var nearX = Math.max(r.left, Math.min(cowCX, r.right));
          var nearY = Math.max(r.top, Math.min(cowCY, r.bottom));
          var dx = cowCX - nearX;
          var dy = cowCY - nearY;
          var dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
          if (dist < 140) {
            var force = (1 - dist / 140) * 35;
            repelX += (dx / dist) * force;
            repelY += (dy / dist) * force;
          }
        }
        cx += repelX;
        cy += repelY;

        // click passthrough
        var cowRect = { left: cx, top: cy, right: cx + fabW, bottom: cy + fabH };
        var overlapping = false;
        for (var j = 0; j < fenceEls.length; j++) {
          var el2 = fenceEls[j];
          if (el2.closest(".sc-menu") || el2.closest(".sc-fab")) continue;
          var r2 = el2.getBoundingClientRect();
          if (r2.width === 0 || r2.height === 0) continue;
          if (cowRect.right > r2.left && cowRect.left < r2.right &&
              cowRect.bottom > r2.top && cowRect.top < r2.bottom) {
            overlapping = true;
            break;
          }
        }
        fab.style.pointerEvents = overlapping ? "none" : "auto";

        fab.style.left = cx + "px";
        fab.style.top = cy + "px";

        // shimmer / nav glow
        var navEl = document.querySelector(".sc-nav");
        var navVisible = false;
        if (navEl) {
          var navRect = navEl.getBoundingClientRect();
          navVisible = navRect.top < window.innerHeight && navRect.bottom > 0;
        }
        if (navVisible) {
          if (!navEl.classList.contains("sc-nav-glow")) navEl.classList.add("sc-nav-glow");
          if (isShimmering) { fab.classList.remove("sc-shimmer"); isShimmering = false; }
        } else {
          if (navEl && navEl.classList.contains("sc-nav-glow")) navEl.classList.remove("sc-nav-glow");
          if (isIdle) {
            var idleX = window.innerWidth / 2 - fabW / 2;
            var idleY = window.innerHeight - fabH - 16;
            var d = Math.abs(cx - idleX) + Math.abs(cy - idleY);
            if (d < 30 && !isShimmering) { fab.classList.add("sc-shimmer"); isShimmering = true; }
          }
        }
        if (!isIdle && isShimmering) {
          fab.classList.remove("sc-shimmer");
          isShimmering = false;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // ── fullscreen menu ──
    if (menuCfg) {
      var menu = document.createElement("div");
      menu.className = "sc-menu";
      menu.innerHTML = buildMenuHTML(menuCfg);
      document.body.appendChild(menu);

      var tl = gsap.timeline({ paused: true });
      tl.to(menu, { duration: 0.3, opacity: 1 });
      tl.to(menu, { duration: 0.8, ease: "power3.inOut", clipPath: "polygon(49.75% 0%,50.25% 0%,50.25% 100%,49.75% 100%)" }, "-=0.25");
      tl.to(menu, { duration: 0.8, ease: "power3.inOut", clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)", pointerEvents: "all" });
      tl.to(".sc-divider", { duration: 0.8, ease: "power4.inOut", height: "100%" }, "-=0.6");

      function toggle() {
        if (menuOpen) {
          tl.reverse();
          menuOpen = false;
          fab.style.pointerEvents = "auto";
          resetIdleTimer();
        } else {
          tl.play();
          menuOpen = true;
          fab.style.pointerEvents = "none";
        }
      }

      fab.addEventListener("click", toggle);
      var closeBtn = menu.querySelector(".sc-close");
      if (closeBtn) closeBtn.addEventListener("click", toggle);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menuOpen) toggle();
      });
    }

    // ── sequential page nav ──
    if (navPages && navPages.length > 0) {
      var loc = window.location.pathname.replace(/\/$/, "");
      var idx = -1;
      for (var k = 0; k < navPages.length; k++) {
        if (loc.indexOf(navPages[k].path) !== -1) { idx = k; break; }
      }
      if (idx !== -1) {
        var prev = idx > 0 ? navPages[idx - 1] : null;
        var next = idx < navPages.length - 1 ? navPages[idx + 1] : null;
        if (prev || next) {
          var nav = document.createElement("div");
          nav.className = "sc-nav";
          var navHTML = "";
          if (prev) {
            navHTML += '<a href="' + prev.href + '"><span class="sc-pn-label">&larr; Previous</span><span class="sc-pn-title">' + prev.title + "</span></a>";
          }
          if (next) {
            navHTML += '<a href="' + next.href + '"><span class="sc-pn-label">Next &rarr;</span><span class="sc-pn-title">' + next.title + "</span></a>";
          }
          nav.innerHTML = navHTML;
          var footer = document.querySelector(".footer, .footer-bar");
          var wrap = document.querySelector(".wrap, .app");
          if (footer && footer.parentNode) {
            footer.parentNode.insertBefore(nav, footer);
          } else if (wrap) {
            wrap.appendChild(nav);
          } else {
            document.body.insertBefore(nav, fab);
          }
        }
      }
    }
  }

  /* ── auto-init from script tag ── */
  var scripts = document.getElementsByTagName("script");
  var thisScript = scripts[scripts.length - 1];
  var configName = thisScript.getAttribute("data-config");
  if (configName && typeof window[configName] !== "undefined") {
    init(window[configName]);
  }

  return { init: init };
});
