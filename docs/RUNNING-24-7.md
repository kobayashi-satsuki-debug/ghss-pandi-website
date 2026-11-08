# Running 24/7

Two separate things have to stay up, and they behave differently.

| Part | Who runs it | Does it stop on its own? |
| --- | --- | --- |
| The website (HTML, CSS, JS) | GitHub Pages | No. It is static and answers every visitor. |
| Accounts, results, chat, uploads | Your Supabase project | On the free plan, yes — it pauses after about 7 days with no activity |

So "24/7" in practice means: keep the Supabase project from going quiet. The
website itself needs no attention.

## What a paused project looks like

- The site loads, then says "Incorrect email or password", or nothing at all.
- Supabase's dashboard shows the project as **Paused**, with a **Restore project** button.
- `node scripts/ping-supabase.mjs` fails with `540` or a timeout.

## Three ways to keep it awake

### 1. A free uptime monitor (easiest, nothing to install)

Create a monitor at UptimeRobot, cron-job.org or similar, checking this address
every 5–10 minutes from anywhere in the world:

```
https://ljpwzkmniocjpcijuuoq.supabase.co/auth/v1/health
```

It answers `{"date":...}` with no key and counts as activity. Choose a 5-minute
interval and enable email alerts, and you learn about an outage before a parent does.

### 2. The daily ping in this repository

`scripts/ping-supabase.mjs` reads your project address and publishable key from
`js/config.js` and makes two read-only requests — the database and the auth
service. It needs no secret, because both values are already public.

Run it by hand any time:

```
npm run ping
```

To run it on its own every day, copy `docs/workflows/keep-supabase-awake.yml` to
`.github/workflows/keep-supabase-awake.yml` in the repository (the office account
must have permission to add workflow files). It runs at 03:17 UTC daily and can
also be started from the Actions tab.

A daily ping is enough to prevent the 7-day inactivity pause.

### 3. Upgrade the plan

A paid Supabase plan never pauses, and adds daily backups. If the school can
afford it, that is the only option that needs no watcher. Nothing in the website
has to change.

## Checking it right now

```
npm run ping
```

A healthy project answers:

```
database: 200 in 1420 ms
auth: 200 in 836 ms
```

The project was checked on 4 November 2026 and both answered 200, so it is awake
today.

## Unpausing

In the Supabase dashboard open the project and press **Restore project**. It takes
a few minutes and nothing is lost. Then run `npm run ping` to confirm, and fix
whichever watcher above was missing.

## The June rollover needs it awake

The optional pg_cron line in `supabase/16-year-rollover.sql` runs at 02:00 on
1 June. A paused project cannot run it. Keep a watcher running through the year,
or run **Year rollover** from the dashboard by hand on 1 June — it does the same
work and asks for the year typed as confirmation.
