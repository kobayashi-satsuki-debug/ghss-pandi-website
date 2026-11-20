(function () {
  'use strict';

  var active = null;

  function light(el, x, y) {
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var px = Math.min(1, Math.max(0, (x - r.left) / r.width));
    var py = Math.min(1, Math.max(0, (y - r.top) / r.height));
    el.style.setProperty('--lg-x', (px * 100).toFixed(1) + '%');
    el.style.setProperty('--lg-y', (py * 100).toFixed(1) + '%');
  }

  function panelOf(node) {
    return node && node.closest ? node.closest('.liquid-glass') : null;
  }

  function onMove(e) {
    if (e.pointerType === 'touch') return;
    var el = panelOf(e.target);
    if (active && active !== el) active.classList.remove('is-lit');
    active = el;
    if (!el) return;
    el.classList.add('is-lit');
    light(el, e.clientX, e.clientY);
  }

  function onDown(e) {
    var el = panelOf(e.target);
    if (el) light(el, e.clientX, e.clientY);
  }

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('pointerleave', function () {
    if (active) active.classList.remove('is-lit');
    active = null;
  }, true);
})();
