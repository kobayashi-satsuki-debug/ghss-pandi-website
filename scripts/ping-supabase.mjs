#!/usr/bin/env node
/* Keeps the Supabase project awake.
 *
 * A free Supabase project is paused after about a week with no activity, and a
 * paused project answers every request with an error until someone restores it
 * from the dashboard. This makes one read-only request so the project counts as
 * active, and exits non-zero when the project is unreachable or paused.
 *
 *   node scripts/ping-supabase.mjs
 *
 * Values come from js/config.js; SUPABASE_URL and SUPABASE_ANON_KEY override it.
 */
import { readFile } from 'node:fs/promises';

async function readConfig() {
  const text = await readFile(new URL('../js/config.js', import.meta.url), 'utf8');
  const url = (text.match(/url:\s*'([^']+)'/) || [])[1]
    || (text.match(/url:\s*"([^"]+)"/) || [])[1];
  const key = (text.match(/anonKey:\s*'([^']+)'/) || [])[1]
    || (text.match(/anonKey:\s*"([^"]+)"/) || [])[1];
  return { url, key };
}

const cfg = await readConfig();
const url = (process.env.SUPABASE_URL || cfg.url || '').replace(/\/+$/, '');
const key = process.env.SUPABASE_ANON_KEY || cfg.key || '';

if (!/^https?:\/\//.test(url) || !key) {
  console.error('No Supabase project configured: set the url and anonKey in js/config.js, or SUPABASE_URL and SUPABASE_ANON_KEY.');
  process.exit(2);
}

const targets = [
  ['database', url + '/rest/v1/class_rooms?select=id&limit=1'],
  ['auth', url + '/auth/v1/health']
];

let failed = 0;
for (const [label, target] of targets) {
  const started = Date.now();
  try {
    const res = await fetch(target, {
      headers: { apikey: key, Authorization: 'Bearer ' + key },
      signal: AbortSignal.timeout(20000)
    });
    const ms = Date.now() - started;
    if (res.ok) {
      console.log(`${label}: ${res.status} in ${ms} ms`);
    } else {
      failed += 1;
      const body = (await res.text().catch(() => '')).slice(0, 200);
      console.error(`${label}: ${res.status} in ${ms} ms — ${body}`);
      if (res.status === 540 || /paused|project is paused|restore/i.test(body)) {
        console.error('The project looks paused: open the Supabase dashboard and press Restore project.');
      }
    }
  } catch (err) {
    failed += 1;
    console.error(`${label}: ${err.name === 'TimeoutError' ? 'timed out' : err.message}`);
  }
}

process.exit(failed ? 1 : 0);
