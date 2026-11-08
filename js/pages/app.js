/* APK download page — the button points at the school's Google Drive file.
   Only the site chrome and the language switch need JavaScript here. */
(async function () {
  const btn = document.getElementById('app-download');
  if (btn) {
    btn.setAttribute('download', 'ghss-pandi.apk');
    btn.addEventListener('click', () => {
      if (window.UI && window.UI.toast) {
        window.UI.toast(window.I18NS && window.I18NS.getLang() === 'ml'
          ? 'ഡൗൺലോഡ് തുടങ്ങുന്നു. ഗൂഗിൾ ചോദിച്ചാൽ Download anyway അമർത്തുക.'
          : 'Download starting. If Google asks, press Download anyway.');
      }
    });
  }
  if (window.Site) await window.Site.mount();
  if (window.I18NS) window.I18NS.apply();
})();
