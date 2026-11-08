-- 18-remove-science-and-humanities.sql — drop the Plus One / Plus Two Science and
-- Humanities classes, leaving only Plus One Commerce and Plus Two Commerce.
--
-- Safe to run more than once. A class is removed only when no student is still
-- sitting in it; if somebody is, the file says who and leaves that class alone,
-- so nothing is ever deleted silently with children inside.

-- ---------- 1. what is there now ----------
select c.id, c.name,
       (select count(*) from public.students s where s.class = c.id) as students
  from public.class_rooms c
 where c.id ilike '%science%' or c.id ilike '%humanities%'
 order by c.id;

-- ---------- 2. remove them, one class at a time ----------
do $$
declare
  v_class  record;
  v_count  integer;
  v_go     boolean;
begin
  if to_regclass('public.class_rooms') is null then
    raise notice 'public.class_rooms does not exist: run supabase/01-schema.sql first.';
    return;
  end if;

  for v_class in
    select c.id
      from public.class_rooms c
     where c.id ilike '%science%' or c.id ilike '%humanities%'
     order by c.id
  loop
    select count(*) into v_count from public.students s where s.class = v_class.id;
    if v_count > 0 then
      raise notice 'Kept %: % student(s) are still in it. Move them to another class first, then run this file again.',
        v_class.id, v_count;
      continue;
    end if;

    -- anything still pointing at the class is cleared or dropped with it
    if to_regclass('public.class_promotions') is not null then
      delete from public.class_promotions where from_class = v_class.id;
    end if;
    if to_regclass('public.class_teachers') is not null then
      delete from public.class_teachers where class_id = v_class.id;
    end if;
    -- a subject timetable pinned to that room
    begin
      delete from public.timetable where room = v_class.id;
    exception when undefined_table then null;
    end;

    delete from public.class_rooms where id = v_class.id;
    raise notice 'Removed the class %.', v_class.id;
  end loop;

  -- a promotion rule may still point at a class that is gone
  if to_regclass('public.class_promotions') is not null then
    update public.class_promotions p
       set next_class = null,
           note = 'Next class no longer exists: choose another, or set purge_accounts.'
     where p.next_class is not null
       and not exists (select 1 from public.class_rooms c where c.id = p.next_class);
  end if;
end $$;

-- ---------- 3. the class list as it stands ----------
select c.id, c.name
  from public.class_rooms c
 order by c.id;
