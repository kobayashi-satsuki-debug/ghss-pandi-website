-- 12-set-admin-password.sql — give the two office accounts a password so they can
-- sign in while the school's mail server is not sending codes.
--
-- This file works when you simply paste it and press Run. It invents a strong
-- password, sets it on both office accounts, confirms their addresses, and
-- prints the password in the result grid. Copy it from there and give it to the
-- second admin by phone or in person.
--
-- Nothing secret is written into this file: only a bcrypt hash is stored in the
-- database, and the invented password is shown once, in your own SQL Editor.
-- Run it again any time to mint a fresh password.
--
-- It sets a password only; it does not change anyone's role. The statement for
-- that is further down, commented out on purpose.

-- ---------- 1. the password ----------
-- One invented password per account, printed once:
with target as (
  select u.id, u.email, u.email_confirmed_at,
         'Ghss-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 10) || '-26' as p
    from auth.users u
   where lower(u.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
)
update auth.users u
   set encrypted_password = extensions.crypt(t.p, extensions.gen_salt('bf')),
       email_confirmed_at = coalesce(u.email_confirmed_at, now()),
       updated_at = now()
  from target t
 where u.id = t.id
returning u.email as account, t.p as new_password;

-- If that grid came back empty, neither office address has an account yet.
-- Fix that first: Authentication -> Users -> Add user, tick "Auto confirm user",
-- save, then run this file again.

-- ---------- 2. what the two accounts look like now ----------
select p.email,
       p.role,
       p.status,
       (u.email_confirmed_at is not null) as address_confirmed,
       (u.encrypted_password is not null)  as has_password
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(p.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by p.email;

-- ---------- 3. optional: make them full administrators ----------
-- Uncomment these two lines only if the office accounts cannot open the
-- administrator dashboard yet. The trigger in 15-admin-allowlist.sql permits
-- exactly these two addresses to hold the role.
--
--   update public.profiles set role = 'admin', status = 'active', updated_at = now()
--    where lower(email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com');

-- ---------- 4. optional: choose the password yourself ----------
-- If you would rather pick the password than have one invented, copy the block
-- below into the editor, replace CHANGE-ME-WITH-YOUR-OWN-PASSWORD with your own
-- (12 characters or more, quotes kept), then Run it. Do not save it back into
-- this file: the file is published on GitHub, and a password written here
-- would be shared by every administrator.
--
-- do $$
-- declare
--   v_password text := 'CHANGE-ME-WITH-YOUR-OWN-PASSWORD';
--   v_hit integer;
-- begin
--   if length(v_password) < 12 or v_password = 'CHANGE-ME-WITH-YOUR-OWN-PASSWORD' then
--     raise exception 'Choose a real password of 12 or more characters first.';
--   end if;
--
--   update auth.users
--      set encrypted_password = extensions.crypt(v_password, extensions.gen_salt('bf')),
--          email_confirmed_at = coalesce(email_confirmed_at, now()),
--          updated_at = now()
--    where lower(email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com');
--
--   get diagnostics v_hit = row_count;
--   raise notice 'Password set for % account(s).', v_hit;
-- end $$;

-- Notes
--   - Only a bcrypt hash is stored, so this file is safe to keep in the
--     repository and safe to re-run.
--   - Tell each admin the password by phone or in person. Never mail it from
--     this project: mail is the part that is broken.
--   - The administrator sign-in page is admin.html. There is no administrator
--     registration page, by design.
