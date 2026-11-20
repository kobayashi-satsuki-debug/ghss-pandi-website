-- 25 — remove the duplicate photos from the gallery
--
-- 04-seed.sql ends with "on conflict do nothing", but nothing in the gallery was
-- unique, so nothing ever conflicted: every run of the seed added the same ten
-- sample photos again. The live gallery holds 118 rows for 10 pictures.
--
-- This file keeps the oldest copy of each picture, deletes every later copy,
-- and adds the unique index that makes 04-seed.sql safe to run again.
-- Nothing else is touched: the title, Malayalam title, category, alt text and
-- publish state of the surviving rows stay exactly as they are.
--
-- Safe to run twice. Read the two result grids: the first says what is there
-- now, the second says what was deleted and what is left.

begin;

-- 1. what the gallery holds at the moment
select count(*) as photos_now,
       count(distinct (coalesce(title_en, ''), coalesce(src, ''))) as different_pictures
from public.gallery_items;

-- 2. delete every copy except the oldest of the same title and image
with ranked as (
  select id,
         row_number() over (
           partition by coalesce(title_en, ''), coalesce(src, '')
           order by created_at asc, id asc
         ) as rn
  from public.gallery_items
), removed as (
  delete from public.gallery_items g
  using ranked r
  where g.id = r.id and r.rn > 1
  returning g.id
)
select (select count(*) from removed) as photos_deleted,
       (select count(*) from ranked where rn = 1) as photos_left;

-- 3. make the same picture impossible to add twice from now on
create unique index if not exists gallery_items_title_src_key
  on public.gallery_items (title_en, src)
  where src <> '';

commit;
