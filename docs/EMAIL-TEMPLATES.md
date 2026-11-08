# Email templates — a one-click link, and a 6-digit code

Every email Supabase sends carries **both**: a link that signs the person in
when it is clicked, and a six-digit code for anyone who would rather type it.
Nothing to remember, no password to type after clicking.

Clicking the link is the whole sign-in. It lands on `login.html`, the site reads
the session from the address, and the dashboard opens. A link that has expired
(or was already used) says so and offers the code instead.

The templates below must be changed, once, in the Supabase dashboard.

## Where the three templates are

The text is kept as files, so nothing has to be retyped:

| Supabase screen | File | Subject |
| --- | --- | --- |
| Authentication → Emails → **Confirm signup** | `supabase/email-templates/confirm-signup.html` | `Confirm your G H S S Pandi account` |
| Authentication → Emails → **Magic Link** | `supabase/email-templates/magic-link.html` | `Your G H S S Pandi sign-in link` |
| Authentication → Emails → **Reset password** | `supabase/email-templates/reset-password.html` | `Reset your G H S S Pandi password` |

Open the file, copy everything, paste it into the **Message body (HTML)** box for
that screen, put the subject in, and press Save. Do the same for all three; the
site offers all three paths — signing in by link, verifying a new account, and
resetting a forgotten password.

## 1. Confirm signup

`supabase/email-templates/confirm-signup.html`

```html
<h2>G H S S Pandi</h2>
<p>Welcome to the school portal. Open this link and your new account is confirmed
and signed in — no password to type:</p>
<p><a href="{{ .ConfirmationURL }}"
      style="display:inline-block;padding:12px 20px;background:#0f5132;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">
   Confirm my account</a></p>
<p>Or type this 6-digit code on the website instead:</p>
<p style="font-size:28px;font-weight:700;letter-spacing:8px;margin:16px 0">{{ .Token }}</p>
<p>The code can be used once and expires after 10 minutes.</p>
<p>If you did not create this account, you can ignore this email.</p>
<p>— Government Higher Secondary School, Pandi, Adoor, Kasaragod, Kerala<br>
14101ghsspandi@gmail.com · 9446553567</p>
```

## 2. Magic Link — the one-time sign-in link and code

`supabase/email-templates/magic-link.html`

This is the email the **Send a one-time sign-in link or one-time password**
button on `login.html` produces. One template serves both: the button carries
the link, and the same message shows the six digits for anyone who would rather
type them.

```html
<h2>G H S S Pandi</h2>
<p>Welcome. Open this link and you are signed in — no password to type:</p>
<p><a href="{{ .ConfirmationURL }}"
      style="display:inline-block;padding:12px 20px;background:#0f5132;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">
   Sign in to G H S S Pandi</a></p>
<p>Or type this 6-digit code on the website instead:</p>
<p style="font-size:28px;font-weight:700;letter-spacing:8px;margin:16px 0">{{ .Token }}</p>
<p>The code can be used once and expires after 10 minutes.</p>
<p>If you did not ask for this, you can ignore this email.</p>
<p>— Government Higher Secondary School, Pandi, Adoor, Kasaragod, Kerala<br>
14101ghsspandi@gmail.com · 9446553567</p>
```

## 3. Reset password

`supabase/email-templates/reset-password.html`

```html
<h2>G H S S Pandi</h2>
<p>Someone asked to reset the password for this address. Open this link and you
are signed in, ready to choose a new password:</p>
<p><a href="{{ .ConfirmationURL }}"
      style="display:inline-block;padding:12px 20px;background:#0f5132;color:#fff;border-radius:6px;text-decoration:none;font-weight:600">
   Choose a new password</a></p>
<p>Or type this 6-digit code on the website instead:</p>
<p style="font-size:28px;font-weight:700;letter-spacing:8px;margin:16px 0">{{ .Token }}</p>
<p>The code can be used once and expires after 10 minutes.</p>
<p>If you did not ask to reset your password, ignore this email and your password
stays the same.</p>
<p>— Government Higher Secondary School, Pandi, Adoor, Kasaragod, Kerala<br>
14101ghsspandi@gmail.com · 9446553567</p>
```

## The two placeholders, and what they do

Both go in the same template — they do not conflict:

| Placeholder | What Supabase puts there | Where the person uses it |
| --- | --- | --- |
| `{{ .ConfirmationURL }}` | the full one-time address, already carrying the token | clicking it lands on `login.html` and signs in |
| `{{ .Token }}` | the six digits, nothing else | typing them into the code box on `login.html`, `register.html` or `reset.html` |

Spelling matters: `{{ .Token }}` with the dots and spaces exactly as shown. An
email that arrives with the words `{{ .Token }}` left visible means the template
was saved in the plain-text box instead of the HTML box.

Both are single-use and expire after 10 minutes (**Authentication → Providers →
Email → Email OTP Expiration = 600**, **Email OTP Length = 6**).

## 4. The address list that makes the link work

The link returns to the website, so Supabase must be told that the website is
allowed. **Authentication → URL Configuration**:

- Site URL: `https://kobayashi-satsuki-debug.github.io/ghss-pandi-website/`
- Redirect URLs: the same address, and
  `https://kobayashi-satsuki-debug.github.io/ghss-pandi-website/login.html`

On your own domain, add both addresses there instead. If a link reports
"redirect_uri_mismatch" or lands on the home page with nothing happening, this
list is the reason.

## 5. Settings to check

| Where | Setting | Value |
| --- | --- | --- |
| Authentication → Providers → Email | Enable email provider | on |
| Authentication → Providers → Email | Confirm email | on |
| Authentication → Providers → Email | Email OTP Expiration | `600` seconds (10 minutes) |
| Authentication → Providers → Email | Email OTP Length | `6` |
| Authentication → Rate limits | Emails sent per hour | raise it if a whole class registers together (e.g. `100`) |

## 6. How the site uses the code

* **Registration** (`register.html`) — `signUp` sends the email, the page shows a
  "6-digit code" box, and it calls `verifyOtp({ type: 'signup' })`.
* **Password reset** (`reset.html`) — the page asks for the email, sends the
  reset email, then asks for the code plus a new password and calls
  `verifyOtp({ type: 'recovery' })` followed by `updateUser({ password })`.
* Wrong or expired codes show "the code is wrong or has expired" and are tried
  at most five times before the code is thrown away.

## 7. Checking it works

1. Register with a real address. The email should arrive within a minute with a
   green **Confirm my account** button *and* six digits below it.
2. Press the button: it should land on `login.html` and sign the person in.
3. Sign out, register another address, and this time type the six digits — the
   account should become active (teachers stay pending).
3. Sign out, open `reset.html`, ask for a code, and set a new password.
4. Sign in with the new password.

If the email has only a link and no digits, the `{{ .Token }}` line is missing
   from the template; if it has only digits and no button, `{{ .ConfirmationURL }}
   is missing. Both belong in the same message.

## 8. When confirmation fails

The website now explains each of these in English, Malayalam and Kannada
instead of showing Supabase's raw text, but the cause is always on the
Supabase side. Check them in this order.

| What the person sees | Cause | Fix |
| --- | --- | --- |
| "That confirmation link has expired or was already used" | The link was opened twice, or it is older than 10 minutes | Ask for a new link, or type the six digits from the same email |
| "This email address is not confirmed yet" on sign-in | The account exists but no code was ever entered | Register again with the same address and press Resend code |
| "This email already has an account" | Supabase hides duplicates by returning a user with no identities | Sign in, or use Forgot password |
| "The address this site is opened from is not allowed" | The page was opened from `file://` or a host that is not in the allow-list | Add the host under Authentication → URL Configuration → Redirect URLs |
| "New sign-ups are turned off" | Sign-ups are disabled on the project | Authentication → Providers → Email → Enable sign-ups |
| "Error sending confirmation email" | Supabase could not hand the message to a mail server: the built-in mailer hit its hourly cap, or the SMTP password / sender address is wrong | See §8a below |

Also check, on the same Authentication page:

1. **Email OTP Length** is 6 and **Email OTP Expiration** is 600 seconds, so the
   six digits in the template match what the form accepts.
2. **Confirm email** stays on — with it off no code is sent at all.
3. Once `ghsspandi.org.in` is live, add both `https://ghsspandi.org.in` and
   `https://www.ghsspandi.org.in` to Redirect URLs, plus your preview address
   while you are still testing.

## 8a. "Error sending confirmation email"

This message comes from the mail server, never from the website, and the account
**is still created** — Supabase stores the user first and only then tries to send.
So do not register again; it will answer "already registered". Instead:

1. Open `confirm-email.html` (linked from the sign-in page as *Verify a new
   account*), type the same address and press **Resend code**.
2. If resend also fails, read **Logs → Auth** and look for the mail line:

| Log text | Meaning | Fix |
| --- | --- | --- |
| `over_email_send_rate_limit` / `email rate limit exceeded` | The free built-in mailer allows only a few messages per hour | Add custom SMTP in Authentication → SMTP Settings, then raise *Emails per hour* under Rate limits |
| `535 Authentication failed` / `Invalid login` | Wrong SMTP username or password | Gmail needs an **app password**, not the normal one; regenerate it and paste it again |
| `553` / `sender address rejected` | The From address is not allowed by the mail provider | Verify the sender domain at Brevo / Resend / Zoho, and use exactly that address in the sender field |
| `connection timed out`, `ENOTFOUND` | Wrong host or port | Use port 587 with STARTTLS (or 465 with TLS) and the host your provider lists |
| `Email template not found` | The template was cleared | Paste the templates from §1, §2 and §3 again |

3. After any SMTP change, send one test code and confirm it arrives inside a
   minute. Gmail's SMTP also has a daily cap of roughly 500 recipients, so a
   school that registers several classes a day should use a transactional
   provider instead.

The website translates this failure into a plain-language message in all three
languages and tells the person their account already exists, so a student does
not create a duplicate address while the office fixes SMTP.

### Is it the website or Supabase?

It is Supabase. A direct call to the project answers the same way, without the
site involved at all:

```
POST /auth/v1/signup  ->  500 {"error_code":"unexpected_failure",
                               "msg":"Error sending confirmation email",
                               "error_id":"…"}
```

That `error_id` is the handle to quote: paste it into **Logs → Auth** (or into a
support ticket) and the SMTP line behind it appears.

Two things this proves, both worth knowing:

- the browser code is not at fault, so no page change can make mail leave;
- when the send fails with a 500, GoTrue rolls the sign-up back. Signing in
  afterwards answers `invalid_credentials`, not `email_not_confirmed`, so **no
  half-made account is left behind** and the person can simply try again.

A `429` or "email rate limit exceeded" is the opposite case — the account is
kept, and only the message is missing.

## 8b. Running without email at all

If SMTP cannot be fixed today and classes are waiting to register, confirmation
can be switched off so no mail is needed:

**Authentication → Providers → Email → Confirm email: off → Save**

What happens then:

- `signUp` returns a session straight away, so the register page skips the code
  step and takes the student to the dashboard.
- The teacher still lands in **pending** and cannot open teacher pages until an
  administrator approves, because that is enforced by the database, not by the
  email.
- Roles are still server-enforced by row-level security, so nothing in the
  browser can turn a student into a teacher.

What is lost: the address is not proven to belong to the person, and **Forgot
password still needs email**. Until then, the office can remove the account in
**Authentication → Users** and ask the person to register again.

Turn confirmation back on once SMTP delivers a test code — the code page and the
templates above keep working unchanged.

## 9. Completing verification on its own page

`confirm-email.html` takes an email address plus the 6-digit code and calls
`verifyOtp({ type: 'signup' })`. Link to it as `confirm-email.html?email=…` from
anywhere that needs a verification step; the code field only accepts digits and
the page offers a resend button with a 60-second cool-down. After a successful
check it points the visitor at `login.html`. Teacher accounts still show the
"waiting for school approval" notice instead of promising access.

## 10. Students sign in with a password, or a six-digit code

A student chooses their own password at registration (12 characters or more,
with the same policy every other role follows) and signs in with email +
password. The **six-digit code is still there as the way back in**: the
"Sign in with a six-digit code instead" link opens the code form, so a student
who forgets the password is never locked out and never needs the office.

Registration also emails a six-digit code, because Supabase confirms the address
either way; the student types it on the register page before the account goes
to the office for approval.

**Older accounts.** Students registered before passwords were added have a
password nobody knows (32 random characters, `Security.randomPassword`). Those
students sign in with a code, or use *Forgot password* once to set a real one.
Nothing breaks if you leave them as they are.

**Which template carries that code:** not *Confirm signup*. A returning student's
code and link come from the **Magic Link** template, because the site calls
`signInWithOtp`. So both templates need both pieces:

| Template | Must contain |
| --- | --- |
| Confirm signup | `{{ .ConfirmationURL }}` **and** `{{ .Token }}` |
| Magic Link | `{{ .ConfirmationURL }}` **and** `{{ .Token }}` |
| Reset password | `{{ .Token }}` **and** `{{ .ConfirmationURL }}` |

**Confirm signup needs both on purpose.** Students use the six digits; parents
read the same email and click the link instead. If the template only has
`{{ .Token }}`, a parent receives a code with no link and the parent screen
(which asks them to click) looks like "no email arrived". If it only has
`{{ .ConfirmationURL }}`, students get a link and no digits.

A safe Confirm signup body:

```html
<h2>Confirm your GHSS Pandi account</h2>
<p>Open this link and you are signed in:
   <a href="{{ .ConfirmationURL }}">sign in to G H S S Pandi</a></p>
<p>Or type this code on the site: <strong>{{ .Token }}</strong></p>
```

## 11. Parents: the confirmation email

Parents register with their own password, so unlike students they finish by
clicking a link. After submitting, the register page shows a **Check your email**
panel naming the address, with:

- **Send it again** — calls `auth.resend({ type: 'signup' })`, one minute apart;
- **I confirmed — sign in** — goes to the parent sign-in form;
- **I have a 6-digit code instead** — opens the code screen, for anyone who
  reads the digits from the same email;
- the school phone (9446553567) and address (14101ghsspandi@gmail.com) as a
  fallback when the message never arrives.

### If the mail still does not arrive

Check the order below; each step rules one cause out.

1. **Did Supabase accept the message?** A direct sign-up probe answers
   `200` with `"confirmation_sent_at": "..."` — that means Supabase handed the
   mail to SMTP. A `500 "Error sending confirmation email"` means it did not
   reach SMTP at all: fix Authentication → SMTP Settings first.
2. **Is it in Spam or Promotions?** A school-domain sender that has no SPF/DKIM
   record lands there. Add the records your SMTP provider lists.
3. **Did the SMTP provider accept it?** Signs of silent loss: wrong port
   (587 STARTTLS vs 465 SSL), a sender address that is not verified with the
   provider (SendGrid/Resend/Brevo all require this), or a free-mail sender
   (Gmail SMTP is capped at a few hundred a day and often blocks scripted use).
4. **Authentication → Logs** in Supabase shows the request; your provider's
   dashboard shows whether the message was delivered, bounced or dropped.
5. **A parent who already tried to sign in** is unconfirmed but exists. Sending
   a new code/link is fine; `auth.resend` handles that case.

Nothing in the website can confirm an account without the person clicking the
link or typing the code — that is what makes the address verified.

If Magic Link only holds `{{ .ConfirmationURL }}`, the student receives a link
with no digits and the sign-in page asks for a code that does not exist.

**Dashboard settings that matter:**

- Authentication → Providers → Email → **Confirm email: on** (a new student
  proves the address before the account works)
- Providers → Email → **Email OTP length 6**, expiration 600
- The site asks Supabase *not* to create unknown accounts on sign-in, so a
  mistyped address answers "No account uses this email address" instead of
  quietly making a new account.

**Where it is enforced:** teachers and parents still use a password, and every
session ends at the same profile check, so a pending teacher or a disabled
account cannot get past the dashboard gate by using a code instead.
