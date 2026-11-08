#!/usr/bin/env node
/* Static checks for the G H S S Pandi site: no build step, no dependencies.
   Run with: node scripts/check.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const problems = [];
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const exists = p => fs.existsSync(path.join(root, p));
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html')).sort();
const jsFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(rel);
    else if (entry.name.endsWith('.js')) jsFiles.push(rel);
  }
})('js');

if (!htmlFiles.length) problems.push('no HTML pages found');
if (!jsFiles.length) problems.push('no JavaScript files found');

/* 1. every local reference in a page resolves */
const skip = /^(#|mailto:|tel:|data:|javascript:|https?:|\/\/)/i;
for (const page of htmlFiles) {
  const html = read(page);
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (const ref of refs) {
    if (skip.test(ref)) continue;
    const target = decodeURI(ref.split('#')[0].split('?')[0]);
    if (!target || target === './') continue;
    const rel = target.startsWith('/') ? target.slice(1) : path.join(path.dirname(page), target);
    if (!exists(rel)) problems.push(`${page}: missing ${target}`);
  }
  if (!/<title>[^<]{8,}<\/title>/.test(html)) problems.push(`${page}: no title`);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html) && !/name="robots" content="noindex/.test(html)) {
    problems.push(`${page}: no meta description and not marked noindex`);
  }
  if (!/js\/site\.js/.test(html)) problems.push(`${page}: does not load js/site.js`);
  if (!/Content-Security-Policy/.test(html)) problems.push(`${page}: no Content-Security-Policy`);
}

/* 2. every script parses */
for (const file of jsFiles) {
  try {
    execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'pipe' });
  } catch (e) {
    problems.push(`${file}: syntax error ${String(e.stderr || e.message).split('\n')[0]}`);
  }
}

/* 3. sitemap lists real pages, and every public page is listed */
const privatePages = ['dashboard.html', 'login.html', 'register.html', 'reset.html', 'confirm-email.html', 'staff.html', 'admin.html', 'results.html', 'upload.html', 'resources.html', 'chat.html', 'ai.html'];
const publicPages = htmlFiles.filter(f => !privatePages.includes(f));
if (exists('sitemap.xml')) {
  const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (!locs.length) problems.push('sitemap.xml: no <loc> entries');
  for (const loc of locs) {
    const page = loc.replace(/^https?:\/\/[^/]+\/?/, '');
    if (!page) continue;
    const rel = page.split('#')[0].split('?')[0] || 'index.html';
    if (!exists(rel.endsWith('.html') ? rel : rel + '.html')) problems.push(`sitemap.xml: ${loc} has no page`);
  }
  for (const page of publicPages) {
    const wanted = page === 'index.html' ? /\/$/ : new RegExp('\\/' + page.replace('.', '\\.') + '$');
    if (!locs.some(l => wanted.test(l))) problems.push(`sitemap.xml: ${page} not listed`);
  }
} else {
  problems.push('sitemap.xml is missing');
}

/* 4. the three email templates carry both a link and a code */
const templates = ['magic-link', 'confirm-signup', 'reset-password'];
for (const name of templates) {
  const rel = `supabase/email-templates/${name}.html`;
  if (!exists(rel)) { problems.push(`${rel}: missing`); continue; }
  const body = read(rel);
  if (!body.includes('{{ .ConfirmationURL }}')) problems.push(`${rel}: no {{ .ConfirmationURL }} — the email would have no working link`);
  if (!body.includes('{{ .Token }}')) problems.push(`${rel}: no {{ .Token }} — the email would have no six-digit code`);
  if (!/14101ghsspandi@gmail\.com/.test(body)) problems.push(`${rel}: school email address missing`);
  if (!/9446553567/.test(body)) problems.push(`${rel}: school phone number missing`);
  if (/\{\{[^}]*[Ss]ite[Uu]rl/.test(body)) problems.push(`${rel}: uses a placeholder Supabase does not fill in this template`);
  if (!/^<!--/.test(body.trim())) problems.push(`${rel}: no note saying which Supabase screen it belongs to`);
}
if (exists('docs/EMAIL-TEMPLATES.md')) {
  const doc = read('docs/EMAIL-TEMPLATES.md');
  for (const name of templates) {
    if (!doc.includes(`supabase/email-templates/${name}.html`)) problems.push(`docs/EMAIL-TEMPLATES.md: does not point at ${name}.html`);
  }
}

for (const p of problems) console.error('FAIL ' + p);
console.log(`checked ${htmlFiles.length} pages and ${jsFiles.length} scripts — ${problems.length ? problems.length + ' problem(s)' : 'all good'}`);
process.exit(problems.length ? 1 : 0);
