# G H S S Pandi — bilingual school website

Government Higher Secondary School, Pandi, Adoor, Kasaragod, Kerala 671543
Phone 9446553567 · 14101ghsspandi@gmail.com · ghsspandi.org.in

Static website (HTML, CSS, JavaScript) with a Supabase backend for accounts,
results, chat and moderation. Every page works in English, Malayalam and Kannada.

## Android app
`download/GHSS-PANDI-1.0.0.apk` is the website in a WebView shell, built from this
repository by `android/build-apk.sh` (no Gradle needed). The site is served inside
the app from an https origin so accounts, results and chat behave as they do on the
web. Rebuild with `cd android && ./build-apk.sh`; the signing key lives in
`android/.keystore/` and is git-ignored — back it up, or phones cannot install an
update. Details in `docs/ANDROID-APP.md`.

## Light and dark theme
The round button beside the language switch flips the site between the cream
daylight palette and a warm charcoal one. `js/theme.js` runs in `<head>`, so the
attribute is on `<html>` before the first paint and no page flashes the wrong
colours. The choice is stored in `localStorage` as `ghss-theme`; until a visitor
picks one, the page follows the operating system (`prefers-color-scheme`) and
keeps following it if the system flips at sunset. The button reports its state
with `aria-pressed`, and its label — "Switch to dark theme" / "Switch to light
theme" — follows the selected language (English, Malayalam, Kannada). Printing
always uses the light palette, and `color-scheme` is set so scrollbars and form
controls match.

Every surface colour is a token (`--surface`, `--surface-alt`, `--surface-soft`,
`--surface-sunken`, `--surface-tint`, `--line`, `--heading`, `--link`,
`--brand-text`, `--gold-ink` and the status tints), so a new component needs no
dark-specific rule as long as it uses them. Text contrast was measured with a
WCAG script across all public pages and every dashboard pane for all four roles:
0 failures below AA in dark.

## Look and motion
The two "Apply" buttons (header and hero) carry `.btn-venom`: gold at rest, with
a slow green pulse every seven seconds; on hover or keyboard focus a dark
symbiote liquid rises from the bottom with a wobbling edge, green veins rotate
under it, and the label turns mint and glows. It is pure CSS on two
pseudo-elements, stops under `prefers-reduced-motion`, and is hidden in print.


A loader curtain (logo, school name, gold progress line) covers the first paint
and lifts itself after about half a second; `js/loader.js` also removes it after
six seconds no matter what, so a slow page can never stay covered. Cards lift,
their images zoom and buttons sweep a highlight on hover; the nav draws a gold
underline; hero copy cascades in line by line and cards reveal as they scroll
into view, cascading across a grid. The hero glow, dot pattern and crest drift at
different rates as the page scrolls. Phones skip the parallax, and
`prefers-reduced-motion` turns every movement off while keeping the content
visible.

Glassmorphic surfaces over a slowly drifting aurora: cards, panels, the sign-in
card and the sticky header are frosted with `backdrop-filter`, cards catch a light
sweep on hover, and sections fade in as you scroll (`IntersectionObserver`).
Motion is skipped for `prefers-reduced-motion`, transparency for
`prefers-reduced-transparency`, and printing or Windows high-contrast fall back to
solid cards, so no content is ever hidden.

## Classes
Classes 1 to 7, high school 8 A/B to 10 A/B, and Plus One / Plus Two Commerce.
The list lives in `window.SCHOOL_CLASSES` in `js/config.js`.

## Pages
Home, About, Admissions, Photo gallery, Creative corner, Achievements, Faculty, Notices,
Exam results, Sign in, Register, Password reset, Dashboard, AI study buddy,
Class chat.

## Portals
- **Student** — own results, class chat, an AI study buddy with a nickname the
  student chooses, profile
- **Teacher** — publish results for assigned classes, notices, chat moderation,
  gallery photos, and a full achievements editor (add, edit, delete) — after admin approval
- **Parent** — results for school-verified children, child-link requests
- **Admin** — teacher approvals, parent verification, accounts, classes,
  admissions inbox, moderation history, content

Each dashboard section has its own CSV download — students, accounts, teacher
accounts, parent verification requests, school notices, admission enquiries
and moderation history. Files are named `ghss-pandi-<section>-<date>.csv`.
The export uses only the rows the signed-in role is allowed to read, so a
teacher's file contains only their own classes.

The student AI study buddy answers from the school study notes in the browser
(`js/ai.js`) — no outside AI service and no API key. Its chat history and chosen
nickname are stored per student in Supabase (`supabase/07-ai-buddy.sql`) and are
readable only by that student.

Roles live in the database and are enforced with Postgres row level security
and `security definer` functions, so they cannot be changed from the browser.

## Run locally
```bash
npm start          # Node 18+, no dependencies
```
Open http://localhost:8080 — without Supabase keys it runs in preview mode.
Pass another port with `npm start -- --port 8099`. `python3 -m http.server 8099`
works too if Node is not installed.

## Check the site
```bash
npm ci     # installs nothing; there are no dependencies
# or: yarn install --frozen-lockfile — both lock files are committed
npm test   # verifies every page reference resolves, every script parses and the sitemap is complete
```
The same check runs in GitHub Actions on every push to the site branch.

## GitHub Actions workflows
- `.github/workflows/node.js.yml` — builds and publishes the site to GitHub Pages.
- `docs/workflows/node-check.yml` — a separate Node.js job that runs `npm ci`,
  `npm test` and boots the preview server on Node 18, 20 and 22. Copy it to
  `.github/workflows/node-check.yml` to enable it (this project's automation
  login cannot create workflow files itself).

Registration sends a 6-digit code to the email address; in preview mode the
code is displayed on the page instead of being emailed.

Preview accounts (password `pandi2026`):
`student@ghsspandi.in`, `teacher@ghsspandi.in`, `parent@ghsspandi.in`,
`principal@ghsspandi.in`.

## Go live
1. Create a Supabase project and run `supabase/01-schema.sql`,
   `02-security.sql`, `03-rpc.sql`, `04-seed.sql`, `05-fix-students-unique.sql`,
   `06-security-hardening.sql`, `07-ai-buddy.sql`, `09-resources.sql`, `10-resource-roles.sql` in that order. (If your project already ran the older `01-schema.sql`, run
   only `05-fix-students-unique.sql` to repair student sign-up.)
   Then replace the two Supabase email templates so they send a 6-digit code
   instead of a link — see `docs/EMAIL-TEMPLATES.md`.
2. Put the project URL and anon public key in `js/config.js`
   (`demoFallback: false`). In Supabase → Authentication → Email Templates →
   Confirm signup keep `{{ .Token }}` in the body, and leave **Confirm email**
   on so registrations ask for the emailed code.
3. Register the school admin account, then run
   `select public.make_admin('14101ghsspandi@gmail.com');`
4. Host the folder on Netlify, Vercel or GitHub Pages and point
   `ghsspandi.org.in` at it.

Full instructions, security notes and the custom-domain checklist:
[docs/SETUP.md](docs/SETUP.md). How roles, rate limits and headers are
enforced: [docs/SECURITY.md](docs/SECURITY.md). What each account can do about
its own password, sessions and history: [docs/APP-SECURITY.md](docs/APP-SECURITY.md).
What the student AI buddy knows, how its feelings and friend replies work, and
how to add a chapter: [docs/AI-BUDDY.md](docs/AI-BUDDY.md).

The Android app is published from
[kobayashi-satsuki-debug/GHSS-PANDI-app](https://github.com/kobayashi-satsuki-debug/GHSS-PANDI-app);
`app.html` is the APK download page. The button links straight at the school's
Google Drive file (`drive.google.com/uc?export=download&id=...`), so families
never pass through a store or a GitHub page. When a new build is uploaded,
change that one file id in `app.html`; the source code stays on GitHub.

Dashboard work in one tick-list — Site URL, redirect URLs, email templates,
SMTP, the SQL files and the first administrator:
[docs/SUPABASE-CHECKLIST.md](docs/SUPABASE-CHECKLIST.md).

The crest in `assets/logo.svg` and the gallery images are placeholders —
replace them with the school's real photograph and photo set.
