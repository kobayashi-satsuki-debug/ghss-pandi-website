/* =========================================================
   Page loader. Loaded in <head> so the curtain exists before
   the first paint; js/site.js lifts it once the page is ready.
   It removes itself after six seconds even if nothing else runs,
   so a failure can never leave the site covered.
   ========================================================= */
(function () {
  var root = document.documentElement;
  var el = document.createElement('div');
  el.className = 'page-loader';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML =
    '<div class="loader-inner">' +
      '<img class="loader-mark" src="assets/logo.svg" alt="" width="96" height="96">' +
      '<span class="loader-name">G H S S Pandi</span>' +
      '<span class="loader-bar"><i></i></span>' +
    '</div>';

  root.classList.add('is-loading');
  (document.body || root).appendChild(el);
  window.__loaderStartedAt = Date.now();

  document.addEventListener('DOMContentLoaded', function () {
    if (document.body && el.parentNode !== document.body) document.body.appendChild(el);
  }, { once: true });

  setTimeout(function () {
    root.classList.remove('is-loading');
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 6000);
})();
