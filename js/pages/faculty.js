(async function () {
  await Site.mount();
  const grid = document.getElementById('faculty-grid');
  const board = document.getElementById('class-teacher-board');
  const countEl = document.getElementById('class-teacher-count');
  const initials = name => String(name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const LEVELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Plus One Commerce', 'Plus Two Commerce'];
  const roomsOf = level => {
    const all = (window.SCHOOL_CLASSES || []);
    const split = all.filter(c => c.indexOf(level + ' ') === 0);
    return split.length ? split : [level];
  };
  const levelLabel = level => {
    if (/^Plus One/i.test(level)) return I18NS.pick('Plus One Commerce', 'പ്ലസ് വൺ കൊമേഴ്സ്');
    if (/^Plus Two/i.test(level)) return I18NS.pick('Plus Two Commerce', 'പ്ലസ് ടു കൊമേഴ്സ്');
    return I18NS.pick('Class ' + level, 'ക്ലാസ് ' + level);
  };
  const verifiedBadge = () => '<span class="badge badge-green" title="' +
    I18NS.pick('Verified by the school office', 'സ്കൂൾ ഓഫീസ് സ്ഥിരീകരിച്ചത്') + '">✓ ' +
    I18NS.pick('Verified', 'സ്ഥിരീകരിച്ചു') + '</span>';

  function peopleFor(list, room) {
    return list.filter(t => (t.classes || []).indexOf(room) !== -1);
  }

  function renderBoard(list) {
    if (!board) return;
    let assigned = 0;
    board.innerHTML = LEVELS.map(level => {
      const rooms = roomsOf(level);
      const rows = rooms.map(room => {
        const people = peopleFor(list, room);
        if (people.length) assigned += 1;
        const who = people.length
          ? people.map(t => '<div class="class-teacher-line">' +
              '<div class="avatar green sm">' + UI.esc(initials(t.full_name)) + '</div>' +
              '<div><strong>' + UI.esc(t.full_name) + '</strong> ' + verifiedBadge() +
              '<div class="person-meta">' + UI.esc([t.designation, t.subject].filter(Boolean).join(' · ')) + '</div></div></div>').join('')
          : '<p class="person-meta muted">' + I18NS.pick('Not published yet — the office is still assigning this class.',
              'ഇതുവരെ പ്രസിദ്ധീകരിച്ചിട്ടില്ല — ഓഫീസ് ഈ ക്ലാസിന് അധ്യാപകനെ നിയമിക്കുന്നു.') + '</p>';
        return (rooms.length > 1 ? '<div class="small muted">' + UI.esc(room) + '</div>' : '') + who;
      }).join('');
      return '<div class="card class-teacher-card"><h3>' + UI.esc(levelLabel(level)) + '</h3>' + rows + '</div>';
    }).join('');
    if (countEl) {
      countEl.textContent = I18NS.pick(
        assigned + ' of ' + LEVELS.length + ' classes have a verified class teacher.',
        LEVELS.length + ' ക്ലാസുകളിൽ ' + assigned + ' എണ്ണത്തിന് സ്ഥിരീകരിച്ച ക്ലാസ് അധ്യാപകനുണ്ട്.'
      );
    }
  }

  async function load() {
    let list = [];
    try {
      list = await API.teachersPublic();
    } catch (e) {
      grid.innerHTML = window.Components.emptyState('⚠️', API.errorText(e));
      if (board) board.innerHTML = window.Components.emptyState('⚠️', API.errorText(e));
      return;
    }
    renderBoard(list);
    grid.innerHTML = list.map(t => (
      '<div class="card person-card"><div class="avatar green">' + UI.esc(initials(t.full_name)) + '</div>' +
      '<h3>' + UI.esc(t.full_name) + '</h3> ' + verifiedBadge() +
      '<div class="person-role">' + UI.esc(t.designation || 'Teacher') + '</div>' +
      '<p class="person-meta">' + UI.esc(t.subject || '') +
      (t.classes && t.classes.length ? ' · ' + UI.esc(t.classes.join(', ')) : '') + '</p></div>'
    )).join('') || window.Components.emptyState('👩‍🏫', I18NS.t('misc.none'));
  }

  await load();
  window.addEventListener('langchange', load);
})();
