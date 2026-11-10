-- 23-security-audit-rpc.sql — install the security audit functions.
--
-- Fixes: "Could not find the function public.admin_security_events(p_limit)
-- in the schema cache". That message means the function was never created in
-- this database (21-app-security.sql had not been run, or it stopped early),
-- while the website already tries to call it.
--
-- This file creates the table and the three functions on their own, then asks
-- PostgREST to reload its schema cache. Safe to run twice.

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
