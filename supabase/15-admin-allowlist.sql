-- 15-admin-allowlist.sql
-- Only the addresses listed here may ever hold the administrator role.
-- Registration can never create an admin, and neither can a mistaken update.
-- To add an office administrator later, add the address below and run this
-- file again, then set that profile's role to 'admin'.
--
-- Safe to run more than once.

create or replace function public.enforce_admin_allowlist()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  -- keep this list in step with the school office, one address per line
  v_allowed text[] := array[
    '14101ghsspandi@gmail.com',
    'ziyadahmad778@gmail.com'
  ];
begin
  if new.role = 'admin' and lower(coalesce(new.email, '')) <> all (v_allowed) then
    raise exception 'Only the listed office addresses can hold the administrator role.'
      using errcode = '42501',
            hint = 'Add the address to supabase/15-admin-allowlist.sql and run it again.';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_admin_allowlist on public.profiles;
create trigger profiles_admin_allowlist
  before insert or update of role, email on public.profiles
  for each row execute function public.enforce_admin_allowlist();

-- Show who currently holds the role, so the office can confirm the two accounts.
create or replace function public.list_admins()
returns table(email text, full_name text, status text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select p.email, p.full_name, p.status, p.created_at
  from public.profiles p
  where p.role = 'admin'
  order by p.created_at;
$$;

revoke all on function public.list_admins() from anon;
grant execute on function public.list_admins() to authenticated;

-- Expect exactly the two office addresses.
select * from public.list_admins();
