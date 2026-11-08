(async function () {
  const session = await Site.mount();
  const L = (en, ml) => I18NS.pick(en, ml);
  const form = document.getElementById('admin-form');
  const msg = document.getElementById('admin-msg');
  const demo = document.getElementById('admin-demo');
  if (demo && !API.isLive) demo.hidden = false;

  if (session) {
    if (session.profile.role === 'admin') { location.replace('dashboard.html#registrations'); return; }
    location.replace('dashboard.html');
    return;
  }

  document.querySelectorAll('.pw-toggle').forEach(b => {
    b.addEventListener('click', () => {
      const input = document.getElementById(b.dataset.target);
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      b.textContent = show ? L('HIDE', 'മറയ്ക്കുക') : L('SHOW', 'കാണിക്കുക');
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    UI.hideMsg(msg);
    const email = document.getElementById('admin-email').value.trim();
    const pw = document.getElementById('admin-password').value;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return UI.showMsg(msg, I18NS.t('err.email'), 'error');
    if (!pw) return UI.showMsg(msg, I18NS.t('err.required'), 'error');

    const wait = window.Security ? Security.signInWaitMinutes(email) : 0;
    if (wait > 0) return UI.showMsg(msg, I18NS.t('err.tooManyTries').replace('{n}', wait), 'error');

    const btn = form.querySelector('button[type=submit]');
    UI.busy(btn, true);
    try {
      const s = await API.signIn(email, pw);
      const prof = s && (s.profile || s);
      if (!prof || prof.role !== 'admin') {
        await API.signOut();
        UI.showMsg(msg, L('That account is not an administrator. Use the teacher / staff or student sign-in instead.', 'ആ അക്കൗണ്ടിന് അഡ്മിനിസ്ട്രേറ്റർ അനുമതി ഇല്ല. അധ്യാപക / സ്റ്റാഫ് അല്ലെങ്കിൽ വിദ്യാർത്ഥി ലോഗിൻ ഉപയോഗിക്കുക.'), 'error');
        UI.busy(btn, false);
        return;
      }
      if (window.Security) Security.clearSignInTries(email);
      location.href = 'dashboard.html#registrations';
    } catch (err) {
      if (window.Security) {
        const left = Security.noteFailedSignIn(email);
        if (left > 0) {
          UI.showMsg(msg, I18NS.t('err.tooManyTries').replace('{n}', left), 'error');
          UI.busy(btn, false);
          return;
        }
      }
      const text = API.errorText(err);
      let hint = '';
      if (/incorrect/i.test(text)) {
        hint = ' ' + L('If the office reset the password, use the newest one printed by 12-set-admin-password.sql.',
                       'ഓഫീസ് പാസ്‌വേഡ് പുതുക്കിയെങ്കിൽ, 12-set-admin-password.sql അവസാനം കാണിച്ച പുതിയ പാസ്‌വേഡ് ഉപയോഗിക്കുക.');
      } else if (/no school profile/i.test(text)) {
        hint = ' ' + L('The site creates it automatically — run supabase/19-self-healing-profile.sql once if it keeps happening.',
                       'സൈറ്റ് അത് തനിയെ ഉണ്ടാക്കും — വീണ്ടും സംഭവിച്ചാൽ supabase/19-self-healing-profile.sql ഒരിക്കൽ ഓടിക്കുക.');
      }
      UI.showMsg(msg, text + hint, 'error');
      UI.busy(btn, false);
    }
  });
})();
