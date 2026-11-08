-- 17-why-cant-i-sign-in.sql — read-only checks for the two office accounts.
--
-- Run it when the site says "Incorrect email or password". It changes nothing
-- except the one commented statement at the end. Read the four grids in order.

-- ---------- 1. does the account exist, and can it sign in? ----------
select u.email,
       (u.encrypted_password is not null) as has_password,
       (u.email_confirmed_at is not null)  as address_confirmed,
       u.banned_until,
       u.deleted_at,
       u.last_sign_in_at
  from auth.users u
 where lower(u.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by u.email;

-- An empty grid here means the account itself is missing: create it in
-- Authentication -> Users -> Add user, tick "Auto confirm user", then run
-- 12-set-admin-password.sql again.
-- banned_until in the future blocks every sign-in; clear it in
-- Authentication -> Users (or set it to null).

-- ---------- 2. does the account have its email identity? ----------
select u.email, count(i.id) as identities, string_agg(i.provider, ', ') as providers
  from auth.users u
  left join auth.identities i on i.user_id = u.id
 where lower(u.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 group by u.email
 order by u.email;

-- Zero identities is a real cause of "Invalid login credentials" for an account
-- inserted straight into the database. 12-set-admin-password.sql adds the row.

-- ---------- 3. is the school profile there, with the admin role? ----------
select p.email, p.role, p.status
  from public.profiles p
 where lower(p.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by p.email;

-- role must be admin, status must be active. The password script does not
-- change the role; 12-set-admin-password.sql section 4 does.

-- ---------- 4. does the password you typed match the stored one? ----------
-- Replace TYPE-THE-PASSWORD-YOU-TYPED-HERE with the password as you typed it,
-- keep the quotes, press Run. Keep this copy out of the repository.
select u.email,
       extensions.crypt('TYPE-THE-PASSWORD-YOU-TYPED-HERE', u.encrypted_password) = u.encrypted_password
         as password_matches
  from auth.users u
 where lower(u.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by u.email;

-- false for both  -> the password in your hand is not the current one. Run
--                    12-set-admin-password.sql and copy from the LAST grid.
-- true            -> the password is right, so the refusal comes from the
--                    account itself (banned, deleted, missing profile), or from
--                    Authentication -> Providers -> Email being switched off.
