-- 19-self-healing-profile.sql — the account, not the office, creates the missing
-- public.profiles row.
--
-- "You are signed in, but this account has no school profile yet" means the
-- sign-in worked and public.profiles has no row for this user id — usually
-- because the account was made before the sign-up trigger existed, or because
-- an older row carries the same email under a different id.
--
-- The site calls ensure_my_profile() the moment it meets that message, so the
-- account repairs itself instead of waiting for the office.

-- ---------- 1. the repair ----------
create or replace function public.ensure_my_profile()
returns public.profiles
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_uid    uuid := auth.uid();
  v_email  text;
  v_meta   jsonb := '{}'::jsonb;
  v_name   text;
  v_phone  text;
  v_role   public.app_role;
  v_status public.account_status;
  v_row    public.profiles;
  v_old    public.profiles;
  v_meta_role text;
begin
  if v_uid is null then
    raise exception 'Not signed in.' using errcode = '42501';
  end if;

  select * into v_row from public.profiles where id = v_uid;
  if found then return v_row; end if;

  select lower(coalesce(u.email, '')), coalesce(u.raw_user_meta_data, '{}'::jsonb)
    into v_email, v_meta
    from auth.users u where u.id = v_uid;

  if v_email is null or v_email = '' then
    raise exception 'This account has no email address on record.' using errcode = '22023';
  end if;

  -- An older profile may hold this address under another id. If that id no
  -- longer belongs to an account, it is a leftover: move it to the right one.
  select * into v_old from public.profiles p
   where lower(p.email) = v_email and p.id <> v_uid;
  if found then
    if exists (select 1 from auth.users u2 where u2.id = v_old.id) then
      raise exception 'Another sign-in account already uses the email %.', v_email
        using errcode = '23505';
    end if;
    begin
      update public.profiles set id = v_uid, updated_at = now() where id = v_old.id;
      select * into v_row from public.profiles where id = v_uid;
      if found then return v_row; end if;
    exception when others then
      raise exception 'A leftover profile for % could not be moved to this account: %', v_email, sqlerrm
        using errcode = '23503';
    end;
  end if;

  v_name  := coalesce(nullif(v_meta ->> 'full_name', ''), '');
  v_phone := coalesce(v_meta ->> 'phone', '');
  v_meta_role := lower(coalesce(v_meta ->> 'role', 'student'));
  if v_meta_role not in ('student', 'teacher', 'parent') then
    v_meta_role := 'student';
  end if;
  v_role := v_meta_role::public.app_role;
  v_status := case when v_role = 'teacher'
                   then 'pending'::public.account_status
                   else 'active'::public.account_status end;

  insert into public.profiles (id, email, full_name, role, phone, status)
  values (v_uid, v_email, v_name, v_role, v_phone, v_status)
  on conflict (id) do update
     set email     = excluded.email,
         full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
         phone     = coalesce(nullif(excluded.phone, ''), public.profiles.phone),
         updated_at = now()
  returning * into v_row;

  -- keep the child row in step, ignoring a duplicate class + roll number
  begin
    if v_role = 'student' then
      insert into public.students (profile_id, full_name, class, roll_no, status)
      values (v_uid, coalesce(nullif(v_name, ''), 'Student'),
              coalesce(v_meta -> 'extra' ->> 'class', ''),
              coalesce(v_meta -> 'extra' ->> 'roll_no', ''), 'pending')
      on conflict (profile_id) do nothing;
    elsif v_role = 'teacher' then
      insert into public.teachers (profile_id, full_name, subject, status)
      values (v_uid, coalesce(nullif(v_name, ''), 'Teacher'),
              coalesce(v_meta -> 'extra' ->> 'subject', ''), 'pending')
      on conflict (profile_id) do nothing;
    elsif v_role = 'parent' then
      insert into public.parents (profile_id, full_name, phone)
      values (v_uid, coalesce(nullif(v_name, ''), 'Parent'), v_phone)
      on conflict (profile_id) do nothing;
    end if;
  exception when others then
    raise warning 'ensure_my_profile: child row skipped for % (%)', v_email, sqlerrm;
  end;

  return v_row;
end $$;

revoke all on function public.ensure_my_profile() from anon;
grant execute on function public.ensure_my_profile() to authenticated;

-- ---------- 2. what is wrong, without guessing ----------
-- Every account that is signed in but has no profile row, and every profile
-- row whose email belongs to a different account.
select 'account without a profile' as problem,
       lower(u.email) as account,
       u.id::text as account_id,
       null::text as profile_id
  from auth.users u
 where not exists (select 1 from public.profiles p where p.id = u.id)
union all
select 'profile under another id',
       lower(p.email),
       (select u.id::text from auth.users u where lower(u.email) = lower(p.email) limit 1),
       p.id::text
  from public.profiles p
 where exists (select 1 from auth.users u where lower(u.email) = lower(p.email) and u.id <> p.id)
 order by problem, account;

-- ---------- 3. repair them all now, not one sign-in at a time ----------
do $$
declare
  u record;
  v_made integer := 0;
begin
  if to_regclass('public.profiles') is null then
    raise notice 'public.profiles does not exist: run supabase/01-schema.sql first.';
    return;
  end if;

  -- a leftover row with this email but no account behind it
  for u in
    select p.id as old_id, u2.id as new_id
      from public.profiles p
      join auth.users u2 on lower(u2.email) = lower(p.email) and u2.id <> p.id
     where not exists (select 1 from auth.users u3 where u3.id = p.id)
  loop
    begin
      update public.profiles set id = u.new_id, updated_at = now() where id = u.old_id;
      raise notice 'Moved the leftover profile to its account.';
      v_made := v_made + 1;
    exception when others then
      raise notice 'Could not move profile % (%); the site will retry on sign-in.', u.old_id, sqlerrm;
    end;
  end loop;

  raise notice 'Profiles repaired: %.', v_made;
end $$;

select p.email, p.role, p.status, p.full_name
  from public.profiles p
 where p.role = 'admin'
 order by p.email;
