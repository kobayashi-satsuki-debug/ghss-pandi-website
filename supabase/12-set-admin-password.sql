-- 12-set-admin-password.sql — give the two office accounts a password so they can
-- sign in while the school's mail server is not sending codes.
--
-- This file works when you simply paste it and press Run, and the password
-- comes out in the LAST result grid on the screen.
--
-- Every Run invents NEW passwords: the numbers from an earlier Run stop working
-- the moment you Run it again. Always copy the password from the most recent
-- grid. (That is the usual reason for "Incorrect email or password": a password
-- copied before the file was run a second time.)
--
-- While it is at it, it confirms both addresses and makes sure each account has
-- the email identity row Supabase Auth expects, in case the account was created
-- straight in the database.
--
-- Nothing secret is written into this file: only a bcrypt hash is stored in the
-- database, and the invented password is shown once, in your own SQL Editor.
-- Run it again any time to mint a fresh password.
--
-- It sets a password only; it does not change anyone's role. The statement for
-- that is further down, commented out on purpose.

-- ---------- 1. what the two accounts look like right now ----------
select p.email,
       p.role,
       p.status,
       (u.email_confirmed_at is not null) as address_confirmed,
       (u.encrypted_password is not null)  as has_password
  from public.profiles p
  join auth.users u on u.id = p.id
 where lower(p.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by p.email;

-- ---------- 2. make sure each account has its email identity ----------
-- An account inserted straight into auth.users can exist without the identity
-- row that Supabase Auth looks for, and then every password is refused.
do $$
declare
  v_id_type         text;
  v_has_provider_id boolean;
  v_id_expr         text;
  r                 record;
begin
  if to_regclass('auth.identities') is null then
    raise notice 'No auth.identities table here; nothing to repair.';
    return;
  end if;

  select data_type into v_id_type
    from information_schema.columns
   where table_schema = 'auth' and table_name = 'identities' and column_name = 'id';

  select exists (select 1 from information_schema.columns
                  where table_schema = 'auth' and table_name = 'identities'
                    and column_name = 'provider_id')
    into v_has_provider_id;

  v_id_expr := case when v_id_type = 'uuid' then '$1::uuid' else '$1::text' end;

  for r in
    select u.id, lower(u.email) as email
      from auth.users u
     where lower(u.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
       and not exists (select 1 from auth.identities i where i.user_id = u.id)
  loop
    if v_has_provider_id then
      execute 'insert into auth.identities
                 (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
               values (' || v_id_expr || ', $2, $3::text, $4::jsonb, $5, now(), now(), now())'
        using gen_random_uuid()::text, r.id, r.id::text,
              jsonb_build_object('sub', r.id::text, 'email', r.email, 'email_verified', true),
              'email';
    else
      execute 'insert into auth.identities
                 (id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
               values (' || v_id_expr || ', $2, $3::jsonb, $4, now(), now(), now())'
        using gen_random_uuid()::text, r.id,
              jsonb_build_object('sub', r.id::text, 'email', r.email, 'email_verified', true),
              'email';
    end if;
    raise notice 'Added the email identity for %.', r.email;
  end loop;
exception when others then
  raise notice 'Identity repair skipped: %', sqlerrm;
end $$;

-- ---------- 3. the school profile, with the administrator role ----------
-- The site reads the role from public.profiles, not from the sign-in. An account
-- without that row signs in correctly and is then refused with "this account has
-- no school profile yet" — which is what happens to an account made before the
-- sign-up trigger existed. The trigger in 15-admin-allowlist.sql permits exactly
-- these two addresses to hold the role admin.
do $$
declare
  v_created integer := 0;
  r record;
begin
  if to_regclass('public.profiles') is null then
    raise notice 'public.profiles does not exist: run supabase/01-schema.sql first.';
    return;
  end if;

  -- An older profile may hold the address under an id with no account behind
  -- it. Move such a leftover row to the real account instead of leaving the
  -- person with a working password and no profile.
  for r in
    select p.id as old_id, u.id as new_id
      from public.profiles p
      join auth.users u on lower(u.email) = lower(p.email) and u.id <> p.id
     where not exists (select 1 from auth.users u2 where u2.id = p.id)
  loop
    begin
      update public.profiles set id = r.new_id, updated_at = now() where id = r.old_id;
      raise notice 'Moved a leftover profile to its account.';
    exception when others then
      raise notice 'Could not move profile % (%); running supabase/19-self-healing-profile.sql may help.', r.old_id, sqlerrm;
    end;
  end loop;

  for r in
    select u.id, lower(u.email) as email
      from auth.users u
     where lower(u.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
       and not exists (select 1 from public.profiles p
                        where p.id = u.id or lower(p.email) = lower(u.email))
  loop
    insert into public.profiles (id, email, full_name, role, status)
    values (r.id, r.email, '', 'admin'::public.app_role, 'active'::public.account_status);
    v_created := v_created + 1;
    raise notice 'Created the school profile for %.', r.email;
  end loop;

  update public.profiles
     set role = 'admin'::public.app_role,
         status = 'active'::public.account_status,
         updated_at = now()
   where lower(email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com');

  raise notice 'School profiles created: %, and both are active administrators now.', v_created;
end $$;

select p.email, p.role, p.status, p.full_name
  from public.profiles p
 where lower(p.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by p.email;

-- ---------- 4. the password (this is the grid you copy from) ----------
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
returning u.email as account,
          t.p as new_password,
          extensions.crypt(t.p, u.encrypted_password) = u.encrypted_password as password_checks_out;

-- If that grid came back empty, neither office address has an account yet.
-- Fix that first: Authentication -> Users -> Add user, tick "Auto confirm user",
-- save, then run this file again.

-- ---------- 5. optional: choose the password yourself ----------
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
