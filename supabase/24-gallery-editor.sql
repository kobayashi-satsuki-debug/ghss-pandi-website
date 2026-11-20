-- =========================================================
-- 24 · Photo gallery editor
-- Run this once in the Supabase SQL Editor, after 02-security.sql.
--
-- Teachers and administrators can add, edit, unpublish and delete
-- gallery photos. Everyone else can only read the photos that are
-- published. The photos themselves live in a public "gallery" bucket
-- so the website can show them without a signed link; only staff may
-- upload into it or remove from it.
-- =========================================================

-- ---------- columns the editor needs -------------------------------
alter table public.gallery_items add column if not exists alt_text    text not null default '';
alter table public.gallery_items add column if not exists is_published boolean not null default true;
alter table public.gallery_items add column if not exists updated_at  timestamptz not null default now();

comment on column public.gallery_items.alt_text is
  'Description read aloud by screen readers; falls back to the title.';
comment on column public.gallery_items.is_published is
  'Draft photos stay visible to staff in the editor and hidden from the website.';

create index if not exists gallery_items_published_idx
  on public.gallery_items (is_published, created_at desc);

-- ---------- read: published photos for everyone, drafts for staff ---
drop policy if exists gallery_public_read on public.gallery_items;
create policy gallery_public_read on public.gallery_items
  for select to anon, authenticated
  using (is_published or public.is_staff());

-- ---------- write: approved teachers and administrators only ------
drop policy if exists gallery_staff_write on public.gallery_items;
create policy gallery_staff_write on public.gallery_items
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

grant select on public.gallery_items to anon;
grant select, insert, update, delete on public.gallery_items to authenticated;

-- ---------- public bucket for the photos --------------------------
-- JPG, PNG, WebP and AVIF only: an uploaded SVG could carry script and
-- would run on this site's own origin.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 3145728,
        array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update
  set public = true,
      file_size_limit = 3145728,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

drop policy if exists "gallery objects read" on storage.objects;
create policy "gallery objects read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "gallery objects insert" on storage.objects;
create policy "gallery objects insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'gallery' and public.is_staff());

drop policy if exists "gallery objects update" on storage.objects;
create policy "gallery objects update" on storage.objects
  for update to authenticated
  using (bucket_id = 'gallery' and public.is_staff())
  with check (bucket_id = 'gallery' and public.is_staff());

drop policy if exists "gallery objects delete" on storage.objects;
create policy "gallery objects delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'gallery' and public.is_staff());

-- ---------- what you should see afterwards ------------------------
--   select policyname, cmd from pg_policies where tablename = 'gallery_items';
--   select id, public, file_size_limit, allowed_mime_types from storage.buckets where id = 'gallery';
