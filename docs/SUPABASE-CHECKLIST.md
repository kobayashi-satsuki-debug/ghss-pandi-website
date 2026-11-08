# Supabase checklist for G H S S Pandi

Project: `ljpwzkmniocjpcijuuoq` — dashboard at
`https://supabase.com/dashboard/project/ljpwzkmniocjpcijuuoq`

Work down the list once. Everything is set in the dashboard or the SQL editor;
nothing here is done from the website code.

## 1. Authentication → Providers → Email

- [ ] Email provider: **on**
- [ ] Confirm email: **on** — or **off** as a temporary bridge while SMTP is broken
      (see `docs/EMAIL-TEMPLATES.md` §6b)
- [ ] Email OTP Length: `6`
- [ ] Email OTP Expiration: `600`

## 2. Authentication → URL Configuration

Site URL:

```
https://kobayashi-satsuki-debug.github.io/ghss-pandi-website/
```

Redirect URLs, one per line:

```
https://kobayashi-satsuki-debug.github.io/ghss-pandi-website/**
http://localhost:8080/**
http://localhost:8099/**
http://127.0.0.1:8080/**
```

Add these two after the custom domain points at Pages:

```
https://ghsspandi.org.in/**
https://www.ghsspandi.org.in/**
```

- [ ] Site URL saved
- [ ] Each redirect URL added with **Add URL** (no stray spaces)

## 3. Authentication → Emails

- [ ] **Confirm signup** and **Magic Link** templates carry both `{{ .ConfirmationURL }}` (click to sign in) and `{{ .Token }}` (the 6-digit code)
- [ ] **Reset password** template sends `{{ .Token }}` too

Ready-made templates: `docs/EMAIL-TEMPLATES.md` §1 and §2.

## 4. Authentication → SMTP Settings

- [ ] Custom SMTP added (Brevo / Resend / Zoho, or Gmail with an app password)
- [ ] Sender address is a verified mailbox, e.g. `14101ghsspandi@gmail.com`
- [ ] Test code arrives within a minute
- [ ] Rate limits → Emails per hour raised to about `100`

The built-in mailer allows only a few messages an hour; a class registering
together will hit "Error sending confirmation email".

## 5. SQL Editor — run in this order

- [ ] `01-schema.sql`
- [ ] `02-security.sql`
- [ ] `03-rpc.sql`
- [ ] `04-seed.sql`
- [ ] `05-fix-students-unique.sql`
- [ ] `06-security-hardening.sql`
- [ ] `07-ai-buddy.sql`
- [ ] `09-resources.sql`
- [ ] `10-resource-roles.sql`
- [ ] `11-signup-trigger-fix.sql`

Files 05–11 are safe to re-run.

## 6. First administrator

Register `14101ghsspandi@gmail.com` on the site, then run:

```sql
select public.make_admin('14101ghsspandi@gmail.com');
```

- [ ] Done, and the account shows the moderation dashboard

## 7. Storage

- [ ] Bucket `resources` exists
- [ ] It is **private**
- [ ] Allowed type `application/pdf`, limit 20 MB

## 8. One line in the site

- [ ] `js/config.js` → `demoFallback: false`

## 8b. The two administrator accounts

- [ ] Run `supabase/15-admin-allowlist.sql` (locks `role = 'admin'` to the
      listed office addresses)
- [ ] `select * from public.list_admins();` shows exactly the two accounts
- [ ] Both accounts can sign in at **admin.html** and land on the dashboard
- [ ] A teacher or student who tries **admin.html** is refused and signed out
- [ ] `register.html` offers no administrator option, and a sign-up asking for
      the admin role is rejected

### "You are signed in, but this account has no school profile yet"

The sign-in worked; the row in `public.profiles` is missing. It is created by the
trigger in `11-signup-trigger-fix.sql`, so an account made before that file was
run has none.

- Office accounts: run `supabase/12-set-admin-password.sql`. Section 3 creates the
  profile and makes both office addresses active administrators.
- Any other account: in the SQL Editor run `select * from public.repair_signup();`
  for every gap, or `select public.repair_signup('someone@example.com');` for one.
  `select * from public.signup_report;` lists what is missing.

### "Incorrect email or password" at admin.html

1. Run `supabase/17-why-cant-i-sign-in.sql` and read its four grids.
2. `password_matches = false` — the password is stale. Run
   `supabase/12-set-admin-password.sql` and copy from the **last** grid; each
   run mints new passwords.
3. `identities = 0` — run `12-set-admin-password.sql` again; it adds the email
   identity row.
4. `role` is not `admin`, or `status` is not `active` — section 4 of
   `12-set-admin-password.sql`.
5. `has_password = false` or an empty grid — the account is missing; create it
   in Authentication → Users with "Auto confirm user".
6. Still refused with `password_matches = true` — check Authentication →
   Providers → Email is enabled and `banned_until` is empty.

## 8b-ii. Only the Commerce stream

The school runs Plus One Commerce and Plus Two Commerce, nothing else. If an
older `04-seed.sql` created Plus One / Plus Two Science or Humanities, run
`supabase/18-remove-science-and-humanities.sql`. It removes each class only when
no student is still in it, clears their promotion rules and teacher assignments,
and prints the class list it left behind.

## 8c. The June rollover

- [ ] Ran `supabase/16-year-rollover.sql`
- [ ] **Year rollover** shows every class with its next class, and Class 10 /
      Plus Two marked "Account removed"
- [ ] A teacher signing in sees no Year rollover tab
- [ ] Decided whether to switch on the pg_cron line, or to press the button by
      hand on 1 June
- [ ] Database backup taken before the first real run

## 9. Prove it works

```sql
select * from public.signup_report();   -- expect zero rows
```

- [ ] Student registers, receives six digits, activates
- [ ] Teacher registers, lands in **pending** until approved
- [ ] Parent registers, then waits for verification in the dashboard
- [ ] Forgot password sends a code and the new password works
- [ ] A PDF uploaded by a teacher opens for a student and is refused for a parent

## 10. When the site says "Please sign in again."

That message now appears only when there really is no session. Two other cases have their own wording:

| What you see | What it means | What to do |
| --- | --- | --- |
| **"You are signed in, but this account has no school profile yet."** | The login itself worked, but no row in `public.profiles` matches this user, so the app has no role or status to work with. | Confirm the sign-up trigger is installed (`supabase/11-signup-trigger-fix.sql`), then check `select * from public.signup_report();`. An account made before the trigger was installed needs its profile row created once. |
| **"The school database is not set up yet, or a database update is missing."** | `get_my_profile` could not be found, so no page can load a role. | Run the SQL files in `supabase/` in order (see `docs/SETUP.md`), at minimum `01`–`03` and `13`. Then reload. |
| The note appears once on the login page, then normal pages work | A page was opened without a session; the login page now says so. | Sign in. |

The reason for a failed session check is carried to the login page once, so nobody has to guess.
