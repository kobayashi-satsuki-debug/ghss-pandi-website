-- 12-set-admin-password.sql — give the two office accounts a password so they
-- can sign in while email is broken. It sets a password only; no role changes.
--
-- ############################################################
-- #  THIS FILE REFUSES TO RUN UNTIL YOU CHANGE ONE WORD.     #
-- #  Find:  PASTE-YOUR-NEW-PASSWORD-HERE                     #
-- #  Replace it with your own password of 12+ characters,     #
-- #  keep the two quotes around it, then Run.                #
-- #  That word is the only thing to change; nothing else.    #
-- ############################################################
--
-- FASTEST PATH (one statement, no editing of the block below):
-- 1. Supabase → SQL Editor → New query
-- 2. Paste this single line, with your own password between the quotes:
--
--    update auth.users set encrypted_password = extensions.crypt('PASTE-YOUR-NEW-PASSWORD-HERE', extensions.gen_salt('bf')), email_confirmed_at = coalesce(email_confirmed_at, now()) where lower(email) in ('14101ghsspandi@gmail.com','ziyadahmad778@gmail.com');
--
-- 3. Run.
--
-- THE FULL VERSION (checks the password, reports what changed):
do $$
declare
  v_password text := 'PASTE-YOUR-NEW-PASSWORD-HERE';   -- <<< THE ONE LINE TO EDIT
  v_emails   text[] := array[
    '14101ghsspandi@gmail.com',
    'ziyadahmad778@gmail.com'
  ];
  v_hit integer;
begin
  if v_password = 'PASTE-YOUR-NEW-PASSWORD-HERE' then
    raise exception using
      message = 'This is the file protecting you, not an error in Supabase: the password is still the placeholder.',
      detail  = 'Change PASTE-YOUR-NEW-PASSWORD-HERE to your own password of 12 or more characters, keep the two quotes around it, then press Run again. Example: v_password text := ''Pandi@Office2026'';',
      hint    = 'That placeholder is written in this file, which is published on GitHub, so every admin would share a public password. The script refuses until you choose a real one.';
  end if;

  if length(v_password) < 12 then
    raise exception using
      message = format('Stop: the password has %s characters, 12 or more are needed.', length(v_password)),
      hint    = 'Make it longer on the marked line and Run again.';
  end if;

  update auth.users u
     set encrypted_password = extensions.crypt(v_password, extensions.gen_salt('bf')),
         email_confirmed_at = coalesce(u.email_confirmed_at, now()),
         updated_at = now()
   where lower(u.email) = any (select lower(e) from unnest(v_emails) as e);

  get diagnostics v_hit = row_count;

  if v_hit = 0 then
    raise exception using
      message = 'Stop: neither office address has an account yet.',
      detail  = 'Create both in Authentication → Users → Add user, tick Auto Confirm User, save, then Run this file again.',
      hint    = 'Addresses tried: ' || array_to_string(v_emails, ', ');
  end if;

  raise notice 'Password set for % account(s).', v_hit;
end $$;

-- What the accounts look like now.
select p.email, p.role, p.status,
       (u.email_confirmed_at is not null) as address_confirmed,
       (u.encrypted_password is not null) as has_password
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(p.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by p.email;

-- ---------- If you would rather paste one plain statement ----------
-- Replace OnlyNewPasswordKeepTheQuotes with the real password, then run:
--
--   update auth.users
--      set encrypted_password = extensions.crypt('OnlyNewPasswordKeepTheQuotes', extensions.gen_salt('bf')),
--          email_confirmed_at = coalesce(email_confirmed_at, now())
--    where lower(email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com');
--
-- Notes
--   • Only a bcrypt hash is stored, so this file is safe to re-run and safe to
--     keep in the repository.
--   • Tell each admin the password by phone or in person. Never mail it from
--     this project — that is the part that is broken.
--   • Re-run the file with a new password whenever the old one spreads too far.
