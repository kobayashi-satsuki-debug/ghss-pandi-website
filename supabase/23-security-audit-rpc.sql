-- 23-security-audit-rpc.sql — install the security audit functions.
--
-- Fixes: "Could not find the function public.admin_security_events(p_limit)
-- in the schema cache". That message means the function was never created in
-- this database (21-app-security.sql had not been run, or it stopped early),
-- while the website already tries to call it.
--
-- This file creates the table, the three functions and the two audit triggers
-- on their own, then asks PostgREST to reload its schema cache. Safe to run
-- twice. It never touches profiles.class_id (there is no such column).

-- ---------- 1. the table the events go into ----------
create table if not exists public.security_events (
  id         uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  email      text,
  kind       text not null,
  detail     text not null default '',
  ip         text not null default '',
  user_agent text not null default '',
  created_at timestamptz not null default now()
);

alter table public.security_events enable row level security;

revoke all on public.security_events from anon, authenticated;
grant select on public.security_events to authenticated;

drop policy if exists security_events_read_own on public.security_events;
create policy security_events_read_own on public.security_events for select
  to authenticated using (profile_id = auth.uid());

drop policy if exists security_events_admin_read on public.security_events;
create policy security_events_admin_read on public.security_events for select
  to authenticated using (public.is_admin());

create index if not exists security_events_profile_time
  on public.security_events (profile_id, created_at desc);
create index if not exists security_events_kind_time
  on public.security_events (kind, created_at desc);

-- ---------- 2. writing an event ----------
create or replace function public.log_security_event(p_kind text, p_detail text default '')
returns void
language plpgsql security definer set search_path = public, auth as $$
declare
  v_uid   uuid := auth.uid();
  v_email text;
  v_ip    text := '';
  v_ua    text := '';
  v_headers json;
  v_recent integer;
begin
  if v_uid is null then
    raise exception 'not signed in' using errcode = '42501';
  end if;
  if coalesce(p_kind, '') !~ '^[a-z_]{3,40}$' then
    raise exception 'invalid_event' using errcode = '22023';
  end if;

  select count(*) into v_recent
    from public.security_events
   where profile_id = v_uid and created_at > now() - interval '1 hour';
  if v_recent >= 60 then
    return;
  end if;

  select lower(email) into v_email from public.profiles where id = v_uid;

  begin
    v_headers := current_setting('request.headers', true)::json;
    v_ip := left(coalesce(v_headers ->> 'x-forwarded-for', ''), 60);
    v_ua := left(coalesce(v_headers ->> 'user-agent', ''), 200);
  exception when others then
    v_ip := '';
    v_ua := '';
  end;

  insert into public.security_events (profile_id, email, kind, detail, ip, user_agent)
  values (v_uid, v_email, p_kind, left(coalesce(p_detail, ''), 300), v_ip, v_ua);
end $$;

-- ---------- 3. reading events back ----------
create or replace function public.my_security_events(p_limit integer default 50)
returns table (kind text, detail text, created_at timestamptz)
language sql stable security definer set search_path = public, auth as $$
  select e.kind, e.detail, e.created_at
    from public.security_events e
   where e.profile_id = auth.uid()
   order by e.created_at desc
   limit greatest(1, least(coalesce(p_limit, 50), 200));
$$;

create or replace function public.admin_security_events(p_limit integer default 200)
returns table (email text, kind text, detail text, ip text, created_at timestamptz)
language plpgsql stable security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then
    raise exception 'administrators only' using errcode = '42501';
  end if;
  return query
    select e.email, e.kind, e.detail, e.ip, e.created_at
      from public.security_events e
     order by e.created_at desc
     limit greatest(1, least(coalesce(p_limit, 200), 500));
end $$;

revoke all on function public.log_security_event(text, text) from public;
revoke all on function public.my_security_events(integer)     from public;
revoke all on function public.admin_security_events(integer)  from public;
grant execute on function public.log_security_event(text, text) to authenticated;
grant execute on function public.my_security_events(integer)     to authenticated;
grant execute on function public.admin_security_events(integer)  to authenticated;

-- ---------- 4. the office's changes are recorded too ----------
-- public.profiles has no class column: that is why 21-app-security.sql failed
-- with «column "class_id" of relation "profiles" does not exist». Role and
-- status are watched here, and class assignments through class_teachers.
create or replace function public.audit_profile_change()
returns trigger
language plpgsql security definer set search_path = public as $$
declare v_bits text[] := '{}';
begin
  if new.role is distinct from old.role then
    v_bits := v_bits || ('role ' || old.role || ' -> ' || new.role);
  end if;
  if new.status is distinct from old.status then
    v_bits := v_bits || ('status ' || old.status || ' -> ' || new.status);
  end if;
  if cardinality(v_bits) > 0 then
    insert into public.security_events (profile_id, email, kind, detail)
    values (new.id, lower(new.email), 'office_change', array_to_string(v_bits, '; '));
  end if;
  return new;
end $$;

drop trigger if exists profiles_audit_change on public.profiles;
create trigger profiles_audit_change
  after update of role, status on public.profiles
  for each row execute function public.audit_profile_change();

create or replace function public.audit_class_teacher_change()
returns trigger
language plpgsql security definer set search_path = public as $$
declare
  v_teacher uuid;
  v_class   text;
  v_profile uuid;
  v_email   text;
begin
  if tg_op = 'DELETE' then
    v_teacher := old.teacher_id;
    v_class   := old.class_id;
  else
    v_teacher := new.teacher_id;
    v_class   := new.class_id;
  end if;

  select t.profile_id, lower(p.email)
    into v_profile, v_email
    from public.teachers t
    left join public.profiles p on p.id = t.profile_id
   where t.id = v_teacher;

  insert into public.security_events (profile_id, email, kind, detail)
  values (v_profile, v_email, 'office_change',
          (case when tg_op = 'DELETE' then 'class teacher removed from '
                else 'class teacher assigned to ' end)
          || coalesce(v_class, '(unknown)'));
  return null;
end $$;

drop trigger if exists class_teachers_audit on public.class_teachers;
create trigger class_teachers_audit
  after insert or delete on public.class_teachers
  for each row execute function public.audit_class_teacher_change();

-- ---------- 4. tell PostgREST to refresh, then prove it ----------
notify pgrst, 'reload schema';

select p.proname as function_name,
       pg_get_function_identity_arguments(p.oid) as arguments,
       case when pg_get_function_result(p.oid) is null then '—'
            else pg_get_function_result(p.oid) end as result
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public'
   and p.proname in ('log_security_event', 'my_security_events', 'admin_security_events')
 order by p.proname;
