/* Download page — reads the latest published build from the app repository.
   Nothing is hard-coded, so a new release appears here on its own. */
(async function () {
  const REPO = 'kobayashi-satsuki-debug/GHSS-PANDI-app';
  const box = document.getElementById('app-release');
  const btn = document.getElementById('app-download');
  const versions = document.getElementById('app-versions');
  if (!box || !btn) return;

  const L = (en, ml) => '<span data-en="' + en + '" data-ml="' + ml + '">' + en + '</span>';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const size = b => (b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB');
  const day = d => { try { return new Date(d).toLocaleDateString(); } catch (e) { return ''; } };

  function paint(html) {
    box.innerHTML = html;
    if (window.I18NS) window.I18NS.apply();
  }

  function noBuild() {
    paint('<p class="small muted">' + L('No build has been published yet. The buttons open the repository, where the download will appear.', 'ഇതുവരെ ബിൽഡ് പ്രസിദ്ധീകരിച്ചിട്ടില്ല. ബട്ടണുകൾ റിപോസിറ്ററി തുറക്കും; ഡൗൺലോഡ് അവിടെ പ്രത്യക്ഷപ്പെടും.') + '</p>');
  }

  async function load() {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    let list;
    try {
      const res = await fetch('https://api.github.com/repos/' + REPO + '/releases?per_page=10', {
        headers: { Accept: 'application/vnd.github+json' },
        signal: ctl.signal,
        cache: 'no-store'
      });
      if (!res.ok) { clearTimeout(timer); noBuild(); return; }
      list = await res.json();
    } catch (e) {
      clearTimeout(timer);
      paint('<p class="small muted">' + L('The school server could not be reached. Use the buttons below to open the download page directly.', 'സ്കൂൾ സെർവറിൽ എത്താനായില്ല. താഴെയുള്ള ബട്ടണുകൾ ഉപയോഗിച്ച് ഡൗൺലോഡ് പേജ് നേരിട്ട് തുറക്കുക.') + '</p>');
      return;
    }
    clearTimeout(timer);
    if (!Array.isArray(list) || !list.length) { noBuild(); return; }

    const apkOf = rel => (Array.isArray(rel.assets) ? rel.assets : [])
      .filter(a => /\.apk$/i.test(a.name || ''))
      .sort((a, b) => (b.size || 0) - (a.size || 0))[0];

    const rel = list.find(r => apkOf(r)) || list[0];
    const apk = apkOf(rel);

    if (apk && apk.browser_download_url) {
      btn.href = apk.browser_download_url;
      btn.setAttribute('download', apk.name);
      const label = btn.querySelector('[data-en]');
      if (label) {
        label.setAttribute('data-en', 'Download APK ' + (rel.tag_name || ''));
        label.setAttribute('data-ml', 'APK ഡൗൺലോഡ് ' + (rel.tag_name || ''));
        label.textContent = 'Download APK ' + (rel.tag_name || '');
      }
    }

    const when = day(rel.published_at || rel.created_at);
    const rows = [
      [L('Version', 'പതിപ്പ്'), esc(rel.tag_name || rel.name || '—')],
      [L('Published', 'പ്രസിദ്ധീകരിച്ചത്'), esc(when)],
      [L('File', 'ഫയൽ'), apk ? esc(apk.name) + ' · ' + size(apk.size || 0) : L('see the release page', 'റിലീസ് പേജ് കാണുക')],
      [L('Downloaded', 'ഡൗൺലോഡുകൾ'), apk ? String(apk.download_count || 0) : '—']
    ];
    paint(
      '<div class="app-release-facts">' +
      rows.map(r => '<div><span class="small muted">' + r[0] + '</span><strong>' + r[1] + '</strong></div>').join('') +
      '</div>' +
      (apk
        ? '<p class="small muted">' + L('This is the newest .apk the school has published. Installing it over an older one keeps your sign-in.', 'സ്കൂൾ പ്രസിദ്ധീകരിച്ച ഏറ്റവും പുതിയ .apk ഇതാണ്. പഴയതിന് മുകളിൽ ഇൻസ്റ്റാൾ ചെയ്താലും സൈൻ ഇൻ നിലനിൽക്കും.') + '</p>'
        : '<p class="small muted">' + L('This release has no .apk attached yet — open it and check the assets.', 'ഈ റിലീസിൽ .apk ചേർത്തിട്ടില്ല — തുറന്ന് assets പരിശോധിക്കുക.') + '</p>')
    );
  }

  if (versions) versions.href = 'https://github.com/' + REPO + '/releases';
  await load();
  if (window.Site) await window.Site.mount();
  if (window.I18NS) window.I18NS.apply();
})();
