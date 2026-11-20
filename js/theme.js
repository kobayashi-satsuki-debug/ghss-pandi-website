/* =========================================================
   Light / dark theme. Loaded in <head> so the attribute is set
   before the first paint; the header button toggles it later.
   The choice is remembered per browser and falls back to the
   operating system preference until the visitor picks one.
   ========================================================= */
(function () {
  var KEY = 'ghss-theme';
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function label(theme) {
    var lang = root.getAttribute('data-lang') || 'en';
    var dark = theme === 'dark';
    if (lang === 'ml') return dark ? 'വെളുത്ത രൂപത്തിലേക്ക് മാറ്റുക' : 'ഇരുണ്ട രൂപത്തിലേക്ക് മാറ്റുക';
    if (lang === 'kn') return dark ? 'ಬೆಳಕಿನ ನೋಟಕ್ಕೆ ಬದಲಿಸಿ' : 'ಕಪ್ಪು ನೋಟಕ್ಕೆ ಬದಲಿಸಿ';
    return dark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  function sync() {
    var theme = current();
    var text = label(theme);
    var btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', text);
      btn.setAttribute('title', text);
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#14100f' : '#7d1024');
  }

  function paint(theme) {
    root.setAttribute('data-theme', theme);
    sync();
  }

  paint(stored() || (media && media.matches ? 'dark' : 'light'));

  function set(theme, remember) {
    paint(theme);
    if (remember) {
      try { localStorage.setItem(KEY, theme); } catch (e) { /* private mode */ }
    }
    root.classList.add('is-theme-switching');
    setTimeout(function () { root.classList.remove('is-theme-switching'); }, 400);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    e.preventDefault();
    set(current() === 'dark' ? 'light' : 'dark', true);
  });

  if (media && media.addEventListener) {
    media.addEventListener('change', function (e) {
      if (!stored()) paint(e.matches ? 'dark' : 'light');
    });
  }

  // the language switch rewrites the page, so refresh the button label too
  if (window.MutationObserver) {
    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-lang'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync, { once: true });
  } else {
    sync();
  }

  window.SiteTheme = { current: current, set: set };
})();
