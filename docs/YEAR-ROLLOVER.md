# The June rollover

Every year on **1 June** the school moves up a year. GHSS Pandi does this in the
database, not by editing students by hand.

## What happens

| Class now | On 1 June |
| --- | --- |
| 1 – 6 | next class (1 → 2 … 6 → 7) |
| 7 | 8 A (change the rule if the other half goes to 8 B) |
| 8 A / 8 B | 9 A / 9 B |
| 9 A / 9 B | 10 A / 10 B |
| Plus One Commerce | Plus Two Commerce |
| **10 A / 10 B** | **account and email address removed** (SSLC finished) |
| **Plus Two Commerce** | **account and email address removed** (+2 finished) |

Before any class moves, the whole of the year's examination results is copied
into `results_archive` and the live result rows are cleared, so next year's
Class 10 can use the same roll numbers. Marks are never lost, and the archive
is readable only by an administrator.

The class chat of the leaving classes is cleared too, and the admin dashboard's
own record (`year_rollovers`) keeps a line with the counts, so the office can
show what happened and when.

Example: the **2025–26** batch is in Class 10 until March 2026. On **1 June
2026** their accounts and email addresses are removed, and the 2025–26 Class 9 A
becomes the 2026–27 Class 10 A.

## Running it

1. In Supabase → SQL Editor run **`supabase/16-year-rollover.sql`** once.
2. In the dashboard, open **Year rollover** (administrator only). The page lists
   every class, how many students it holds, and what will happen to it.
3. On 1 June, type the current year in the box and press the button. The run
   cannot be repeated in the same year, and it refuses to run before June
   without a deliberate override.

From the SQL editor the same thing is:

```sql
select * from public.preview_year_rollover();      -- look first
select public.run_year_rollover('2026');           -- then do it
```

## Automatic on the day

If you would rather the database ran it by itself, enable the **pg_cron**
extension (Database → Extensions), then uncomment the `cron.schedule` line at
the bottom of `16-year-rollover.sql`. It runs at 02:00 IST on 1 June. Check the
preview once before you switch that on.

## Changing the rules

`public.class_promotions` is a plain table — one row per class:

| column | meaning |
| --- | --- |
| `from_class` | the class today |
| `next_class` | where it goes (empty = it does not move) |
| `purge_accounts` | `true` = the accounts and emails are removed |

So if Class 7 is to be split evenly between 8 A and 8 B, keep the row and add
`('7', '8 B', false)` for the other half — or move students individually from
**Students** before running the rollover.

Only an administrator can change this table, and only an administrator can run
the rollover. A teacher or student who calls the function from the browser gets
`42501` — the check is inside the database, not the page.

## Before you press the button

- Export anything you still need from **Results** (each dashboard section has a
  CSV button); the archive keeps the marks but not the live rows.
- Tell the leaving batch that the portal closes on 31 May.
- Parents of leaving students lose that child's results in the portal; approved
  parent links go with the student row.

## If the SQL complains

**`class_promotions_from_class_fkey` … Key (from_class)=(1) is not present in
table class_rooms** — the class list was empty, because `04-seed.sql` had not
been run. Re-running `16-year-rollover.sql` is now enough: if `class_rooms` is
empty it adds the standard classes first, and it only writes a rule for a class
that really exists. If your classes are named differently, those rows are added
as "stay" with a note, and the file prints a notice naming any next class that
is missing so you can add it and run it again.

## If something looks wrong

`select * from public.rollover_history();` shows each year that ran.
`select * from public.results_archive where school_year = '2025-26';` shows the
archived marks. Nothing deleted by the purge can be recovered from the site, so
take a database backup (Supabase → Database → Backups) before 1 June.
