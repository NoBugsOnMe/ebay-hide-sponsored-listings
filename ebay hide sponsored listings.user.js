// ==UserScript==
// @name         eBay: hide sponsored listings
// @namespace    https://github.com/NoBugsOnMe/ebay-hide-sponsored-listings
// @version      1.0.0
// @description  Hides sponsored results on eBay search pages by checking whether each listing's "Sponsored" label image is actually visible.
// @author       NoBugsOnMe
// @license      MIT
// @homepageURL  https://github.com/NoBugsOnMe/ebay-hide-sponsored-listings
// @supportURL   https://github.com/NoBugsOnMe/ebay-hide-sponsored-listings/issues
// @downloadURL  https://raw.githubusercontent.com/NoBugsOnMe/ebay-hide-sponsored-listings/main/ebay-hide-sponsored.user.js
// @updateURL    https://raw.githubusercontent.com/NoBugsOnMe/ebay-hide-sponsored-listings/main/ebay-hide-sponsored.user.js
// @match        https://www.ebay.com/sch/*
// @match        https://www.ebay.com/b/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function () {
  'use strict';
  const num = v => parseFloat(v) || 0;

  // Every listing carries a label drawn as an embedded SVG image. On sponsored
  // listings the word is positioned inside the label box; on ordinary listings
  // it is pushed far outside it, so nothing shows. Work out where the text lands.
  function labelIsVisible(b) {
    const m = /base64,([A-Za-z0-9+/=]+)/.exec(b.getAttribute('style') || '');
    if (!m) return false;
    let svg;
    try { svg = atob(m[1]); } catch (e) { return false; }
    const t = new DOMParser().parseFromString(svg, 'image/svg+xml').querySelector('text');
    if (!t) return false;
    const tr = /translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/.exec(t.getAttribute('transform') || '');
    const x = num(t.getAttribute('x')) + num(t.getAttribute('dx')) + (tr ? num(tr[1]) : 0);
    const y = num(t.getAttribute('y')) + num(t.getAttribute('dy')) + (tr ? num(tr[2]) : 0);
    return x > -5 && x < 60 && y > 0 && y < 25;
  }

  function sweep() {
    document.querySelectorAll('li.s-card:not([data-sp-checked])').forEach(li => {
      const b = li.querySelector('.s-card__sep b[style*="background-image"]');
      if (!b) return;
      li.setAttribute('data-sp-checked', '1');
      if (labelIsVisible(b)) li.style.display = 'none';
    });
  }

  sweep();
  new MutationObserver(sweep).observe(document.documentElement, { childList: true, subtree: true });
})();
