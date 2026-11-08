# App security — what each account controls

Three layers keep the portal safe, and only the last two can actually stop
anyone:

1. **The interface** hides what a role should not see.
2. **The database** refuses the request anyway (`supabase/02-security.sql` and the
   RPC functions).
3. **Supabase Auth** decides who is signed in at all.

This page covers the part a person touches: their own password, their own
sessions, and the record of what happened on their account.

## The Security pane (every signed-in person)

Dashboard → **Security**.

| What it does | How |
| --- | --- |
| Change password | Asks for the current password first, then sets the new one through Supabase. The old password stops working immediately. |
| Password strength | A line under the field reads `weak / fair / good / strong` while typing. The rule is at least 12 characters with a capital letter, a number and a symbol; the same check runs again before saving. |
| Sign out everywhere | Ends every session on every device through Supabase (`signOut({ scope: 'global' })`), then signs this one out too. Use it after losing a phone or using a shared computer. |
| Recent activity | The last 30 entries from the audit trail: password changes, code sign-ins, sign-outs and changes the office made. |

The page also reminds the person that it signs itself out after **30 minutes
idle**. Two minutes before that, a bar appears at the bottom with **Stay signed
in**; ignoring it ends the session and returns to the login page.

## The Security log (administrators)

Dashboard → **Security log**.

A table of every recorded event for every account — when, which address, what
happened, and the IP address Supabase saw. Two kinds matter most:

- **Password changed** — the person changed their own password.
- **Office changed an account** — a role, status or class was changed in the
  dashboard. The detail reads like `role student -> teacher; status active -> pending`, so the office can see who did what.

Students and parents never see this table, and the database itself refuses the
call (`admin_security_events()` raises *administrators only*).

## How the record is protected

`supabase/21-app-security.sql`:

- `security_events` has row-level security on. A person may `select` their own
  rows; an administrator may select all rows. There is no insert, update or
  delete policy, and the table's grants are revoked, so a browser cannot write
  to it directly.
- Writes go through `log_security_event(kind, detail)`, a `security definer`
  function that stamps the caller's own id and email, takes the address and
  browser from the request headers, and stops after 60 entries per person per
  hour so a page cannot flood the table.
- The event name must match `^[a-z_]{3,40}$`, so a caller cannot invent a kind
  that pretends to be something else.
- The trigger `profiles_audit_change` records role, status and class changes
  automatically — the office cannot change a role without leaving a trace.

## Settings worth turning on in Supabase

These are dashboard switches, not files in this repository:

| Setting | Where | Value |
| --- | --- | --- |
| Minimum password length | Authentication → Providers → Email | 12 |
| Password requirements | same screen | lower, upper, number, symbol |
| Email OTP expiry | same screen | 600 seconds |
| Email OTP length | same screen | 6 |
| Refresh token rotation | Authentication → Sessions | on |
| Session timebox | Authentication → Sessions | 7 days (or the school's choice) |
| Leaked password protection | Authentication → Sessions | on, if the plan includes it |
| Confirm email | Authentication → Providers → Email | on |

The site works without these, but the messages in the interface assume them:
"at least 12 characters" and "the code expires after 10 minutes" are only true
when the settings above match.

## What is still the school's job

- Teacher accounts stay `pending` until an administrator approves them; the
  role always comes from the database, never from the browser.
- Parents stay `pending` until the office verifies the relationship to the
  student.
- Exactly two office addresses hold the administrator role. Adding a third is a
  deliberate SQL change, not something the interface offers.

If a laptop is lost: sign in from another device, open **Security → Sign out
everywhere**, and change the password. Both actions are recorded in the log.
