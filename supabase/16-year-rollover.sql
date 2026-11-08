-- 16-year-rollover.sql
-- The June rollover: on 1 June every year each class moves up one, and the
-- children who have finished school (Class 10 after SSLC, Plus Two Commerce
-- after +2) lose their accounts and their email addresses.
--
-- Run this whole file once in the SQL editor. It only creates the policy and
-- the functions; nothing is changed until the office calls
--   select public.run_year_rollover('2026');
-- with the exact four-digit year. preview_year_rollover() shows what that
-- call would do and changes nothing.
--
-- Safe to re-run.

-- ---------- who moves where ----------
create table if not exists public.class_promotions (
  from_class     text primary key references public.class_rooms(id) on delete cascade,
  next_class     text references public.class_rooms(id) on delete set null,
  purge_accounts boolean not null default false,
  note           text not null default ''
);

insert into public.class_promotions (from_class, next_class, purge_accounts, note) values
  ('1', '2', false, ''),
  ('2', '3', false, ''),
  ('3', '4', false, ''),
  ('4', '5', false, ''),
  ('5', '6', false, ''),
  ('6', '7', false, ''),
  ('7', '8 A', false, 'Class 7 splits into 8 A and 8 B; change next_class to 8 B for the other half.'),
  ('8 A', '9 A', false, ''),
  ('8 B', '9 B', false, ''),
  ('9 A', '10 A', false, ''),
  ('9 B', '10 B', false, ''),
  ('Plus One Commerce', 'Plus Two Commerce', false, ''),
  ('10 A', null, true, 'SSLC done: the account and its email are removed.'),
  ('10 B', null, true, 'SSLC done: the account and its email are removed.'),
  ('Plus Two Commerce', null, true, 'Plus Two done: the account and its email are removed.')
on conflict (from_class) do nothing;

-- ---------- where old examination results go ----------
create table if not exists public.results_archive (
  id           uuid primary key default gen_random_uuid(),
  school_year  text not null,
  class        text not null,
  roll_no      text not null,
  exam_name    text not null,
  subject      text not null,
  marks        numeric(5,2) not null,
  max_marks    numeric(5,2) not null,
  grade        text not null default '',
  published_at timestamptz,
  archived_at  timestamptz not null default now()
);

create index if not exists results_archive_idx on public.results_archive (school_year, class, roll_no);

-- ---------- one row per year that has been rolled over ----------
create table if not exists public.year_rollovers (
  run_year          int primary key,
  run_at            timestamptz not null default now(),
  run_by            uuid references public.profiles(id),
  promoted          int not null default 0,
  purged_accounts   int not null default 0,
  results_archived  int not null default 0,
  messages_cleared  int not null default 0,
  details           jsonb not null default '{}'::jsonb
);

alter table public.class_promotions enable row level security;
alter table public.results_archive  enable row level security;
alter table public.year_rollovers   enable row level security;

drop policy if exists class_promotions_read on public.class_promotions;
create policy class_promotions_read on public.class_promotions
  for select to authenticated using (true);

drop policy if exists results_archive_admin on public.results_archive;
create policy results_archive_admin on public.results_archive
  for select to authenticated using (public.is_admin());

drop policy if exists year_rollovers_admin on public.year_rollovers;
create policy year_rollovers_admin on public.year_rollovers
  for select to authenticated using (public.is_admin());

-- =============================================================
-- What would happen, without changing anything
-- =============================================================
create or replace function public.preview_year_rollover()
returns table (
  class_name text,
  next_class text,
  students bigint,
  accounts bigint,
  action text
)
language sql
stable
security definer
set search_path = public
as $$
  select c.id,
         p.next_class,
         (select count(*) from public.students s where s.class = c.id),
         (select count(*) from public.students s
            join public.profiles pr on pr.id = s.profile_id
           where s.class = c.id),
         case when p.purge_accounts then 'remove account'
              when p.next_class is null then 'stay'
              else 'promote to ' || p.next_class end
  from public.class_rooms c
  join public.class_promotions p on p.from_class = c.id
  order by c.id;
$$;

-- =============================================================
-- Do it
--   p_confirm must be the four-digit year of the rollover, e.g. '2026'.
--   Refuses to run twice in the same year, and refuses before 1 June
--   unless p_force is true.
-- =============================================================
create or replace function public.run_year_rollover(p_confirm text, p_force boolean default false)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year       int := extract(year from (now() at time zone 'Asia/Kolkata'))::int;
  v_month      int := extract(month from (now() at time zone 'Asia/Kolkata'))::int;
  v_purged     int := 0;
  v_promoted   int := 0;
  v_archived   int := 0;
  v_messages   int := 0;
  v_purge      text[] := array(select from_class from public.class_promotions where purge_accounts);
  v_rows       int;
  r            record;
begin
  if auth.uid() is not null and not public.is_admin() then
    raise exception 'Only a school administrator can run the year rollover.' using errcode = '42501';
  end if;

  if trim(coalesce(p_confirm, '')) <> v_year::text then
    raise exception 'Type the current year to confirm: run_year_rollover(%L)', v_year::text
      using hint = 'This moves every class up and deletes the accounts of the children who left.';
  end if;

  if not p_force and v_month < 6 then
    raise exception 'The rollover runs on 1 June. Use p_force = true only if you are sure.'
      using errcode = '22023';
  end if;

  if exists (select 1 from public.year_rollovers where run_year = v_year) and not p_force then
    raise exception 'The rollover for % has already been run.', v_year
      using hint = 'Use p_force = true to run it again.';
  end if;

  -- 1. the year that has just ended: keep the marks, drop the live rows
  select count(*) into v_archived from public.results;
  insert into public.results_archive
    (school_year, class, roll_no, exam_name, subject, marks, max_marks, grade, published_at)
  select (v_year - 1)::text || '-' || right(v_year::text, 2),
         class, roll_no, exam_name, subject, marks, max_marks, grade, published_at
  from public.results;
  delete from public.results;

  -- 2. class chat starts again with the new batch
  delete from public.chat_messages where room = any (v_purge);
  get diagnostics v_messages = row_count;

  -- 3. the children who have left: their auth user, profile, student row,
  --    results and messages all go with them
  select count(*) into v_purged
  from public.students s
  join public.profiles p on p.id = s.profile_id
  where s.class = any (v_purge) and p.role = 'student';

  delete from auth.users u
  using public.students s, public.profiles p
  where s.class = any (v_purge)
    and p.id = s.profile_id
    and u.id = p.id;

  -- students who never had an account still leave the roll
  delete from public.students where class = any (v_purge);
  get diagnostics v_rows = row_count;

  -- 4. everyone else moves up, highest class first so the target is empty
  for r in select from_class, next_class from public.class_promotions
             where next_class is not null and not purge_accounts
             order by from_class desc
  loop
    update public.students set class = r.next_class where class = r.from_class;
    get diagnostics v_rows = row_count;
    v_promoted := v_promoted + v_rows;
  end loop;

  insert into public.moderation_log (actor_id, actor_name, action, target, details)
  values ((select id from public.profiles where id = auth.uid()), 'School Office',
          'year rollover', v_year::text,
          format('%s students promoted, %s accounts removed, %s results archived',
                 v_promoted, v_purged, v_archived));

  insert into public.year_rollovers
    (run_year, run_by, promoted, purged_accounts, results_archived, messages_cleared, details)
  values (v_year, auth.uid(), v_promoted, v_purged, v_archived, v_messages,
          jsonb_build_object('removed_students_without_account', v_rows,
                             'purge_classes', to_jsonb(v_purge)))
  on conflict (run_year) do update
    set run_at = now(), run_by = excluded.run_by, promoted = excluded.promoted,
        purged_accounts = excluded.purged_accounts,
        results_archived = excluded.results_archived,
        messages_cleared = excluded.messages_cleared, details = excluded.details;

  return jsonb_build_object(
    'year', v_year,
    'promoted', v_promoted,
    'accounts_removed', v_purged,
    'results_archived', v_archived,
    'messages_cleared', v_messages
  );
end;
$$;

revoke all on function public.preview_year_rollover() from anon;
revoke all on function public.run_year_rollover(text, boolean) from anon;
grant execute on function public.preview_year_rollover() to authenticated;
grant execute on function public.run_year_rollover(text, boolean) to authenticated;

-- The two reporting helpers below are for the office, not for the browser.
create or replace function public.rollover_history()
returns table (run_year int, run_at timestamptz, promoted int, purged_accounts int,
               results_archived int, messages_cleared int)
language sql
stable
security definer
set search_path = public
as $$
  select run_year, run_at, promoted, purged_accounts, results_archived, messages_cleared
  from public.year_rollovers order by run_year desc;
$$;

grant execute on function public.rollover_history() to authenticated;

-- Optional: let the database itself run this on 1 June at 02:00 IST.
-- Uncomment after checking preview_year_rollover() once. pg_cron must be
-- enabled in Database → Extensions first.
--
-- select cron.schedule('ghss-june-rollover', '0 2 1 6 *',
--   $$ select public.run_year_rollover(extract(year from (now() at time zone 'Asia/Kolkata'))::text); $$);

select * from public.preview_year_rollover();
