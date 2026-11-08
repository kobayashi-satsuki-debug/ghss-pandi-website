-- 20-fix-profile-now.sql — the office accounts, fixed in one run.
--
-- Use this when admin.html still says "You are signed in, but this account has
-- no school profile yet" after 12-set-admin-password.sql. It changes no
-- password. It shows exactly what the database holds for the two office
-- addresses, then creates or moves the missing profile.
--
-- Run the whole file in the Supabase SQL Editor. Read the three grids at the
-- end; the middle one is the repair report.

-- ---------- 1. a plain language read-out ----------
with target(email) as (
  values ('14101ghsspandi@gmail.com'), ('ziyadahmad778@gmail.com')
)
select t.email                                                    as address,
       u.id::text                                                 as sign_in_account_id,
       case when u.id is null then 'NO ACCOUNT' else 'account exists' end as account,
       (u.email_confirmed_at is not null)::text                    as email_confirmed,
       u.last_sign_in_at::text                                     as last_signed_in,
       (select count(*) from auth.identities i where i.user_id = u.id)::text as identities,
       (select count(*) from public.profiles p where p.id = u.id)::text      as profile_by_account_id,
       (select count(*) from public.profiles p where lower(p.email) = t.email)::text as profile_by_email
  from target t
  left join auth.users u on lower(u.email) = t.email
 order by t.email;

-- ---------- 2. everybody else who is in the same state ----------
select lower(u.email)                       as account_without_profile,
       u.created_at::text                   as account_created,
       u.last_sign_in_at::text              as last_signed_in
  from auth.users u
 where not exists (select 1 from public.profiles p where p.id = u.id)
 order by u.created_at;

-- ---------- 3. the repair ----------
do $$
declare
  v_email   text;
  v_uid     uuid;
  v_old     uuid;
  v_role    text;
  v_made    integer := 0;
  v_moved   integer := 0;
  v_skipped integer := 0;
begin
  if to_regclass('public.profiles') is null then
    raise notice 'public.profiles does not exist: run supabase/01-schema.sql first.';
    return;
  end if;

  foreach v_email in array array['14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com']
  loop
    select u.id into v_uid from auth.users u where lower(u.email) = v_email limit 1;

    if v_uid is null then
      raise notice '% —  no sign-in account with this address. Create it once from admin.html, then run this file again.', v_email;
      v_skipped := v_skipped + 1;
      continue;
    end if;

    -- A leftover profile may hold this address under an id with no account
    -- behind it. Move it instead of failing on the unique email.
    select p.id into v_old
      from public.profiles p
     where lower(p.email) = v_email and p.id <> v_uid
       and not exists (select 1 from auth.users u2 where u2.id = p.id)
     limit 1;

    if v_old is not null and not exists (select 1 from public.profiles p where p.id = v_uid) then
      begin
        update public.profiles set id = v_uid, updated_at = now() where id = v_old;
        v_moved := v_moved + 1;
        raise notice '% —  moved its leftover profile onto the account.', v_email;
      exception when others then
        raise notice '% —  could not move profile % (%); a person must look at this one.', v_email, v_old, sqlerrm;
      end;
    end if;

    if exists (select 1 from public.profiles p where p.id = v_uid) then
      update public.profiles
         set role = 'admin', status = 'active', updated_at = now()
       where id = v_uid;
      raise notice '% —  already had a profile; role set to admin, status active.', v_email;
      v_made := v_made + 1;
      continue;
    end if;

    if exists (select 1 from public.profiles p where lower(p.email) = v_email) then
      raise notice '% —  this address belongs to another live profile (%), so nothing was created. Send 17-why-cant-i-sign-in.sql output to the office.', v_email, (
        select p.id from public.profiles p where lower(p.email) = v_email limit 1);
      v_skipped := v_skipped + 1;
      continue;
    end if;

    begin
      insert into public.profiles (id, email, full_name, role, status)
      values (v_uid, v_email,
              coalesce((select coalesce(u.raw_user_meta_data ->> 'full_name', '')
                          from auth.users u where u.id = v_uid), ''),
              'admin', 'active');
      raise notice '% —  profile created as administrator.', v_email;
      v_made := v_made + 1;
    exception when others then
      raise notice '% —  could not create the profile: %', v_email, sqlerrm;
      v_skipped := v_skipped + 1;
    end;
  end loop;

  -- everyone else who signed up before the trigger existed
  for v_uid, v_email, v_role in
    select u.id, lower(u.email),
           case lower(coalesce(u.raw_user_meta_data ->> 'role', 'student'))
             when 'teacher' then 'teacher'
             when 'parent'  then 'parent'
             else 'student' end
      from auth.users u
     where not exists (select 1 from public.profiles p where p.id = u.id)
       and not exists (select 1 from public.profiles p where lower(p.email) = lower(u.email))
  loop
    begin
      insert into public.profiles (id, email, full_name, role, status)
      values (v_uid, v_email,
              coalesce((select coalesce(u.raw_user_meta_data ->> 'full_name', '')
                          from auth.users u where u.id = v_uid), ''),
              v_role::public.app_role,
              case when v_role = 'teacher' then 'pending'::public.account_status
                   else 'active'::public.account_status end);
      v_made := v_made + 1;
    exception when others then
      v_skipped := v_skipped + 1;
    end;
  end loop;

  raise notice 'Done: % account(s) repaired, % profile(s) moved, % left for a person.', v_made, v_moved, v_skipped;
end $$;

-- ---------- 4. the result ----------
select p.email, p.role, p.status,
       (select count(*) from auth.users u where u.id = p.id)::text as has_sign_in_account
  from public.profiles p
 where lower(p.email) in ('14101ghsspandi@gmail.com', 'ziyadahmad778@gmail.com')
 order by p.email;

-- Both rows must read role = admin, status = active, has_sign_in_account = 1.
-- Then sign in at admin.html again. If it still says "no school profile",
-- a session from before the repair is cached: sign out, reload, sign in.
