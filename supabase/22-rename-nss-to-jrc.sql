-- Rename the NSS unit to JRC (Junior Red Cross) in data that is already saved.
-- Safe to run more than once.

update public.gallery_items
set title_en = 'JRC community service',
    title_ml = 'ജെ.ആർ.സി സേവനം',
    src      = replace(src, 'nss-01.svg', 'jrc-01.svg')
where title_en ilike '%NSS%' or title_ml like '%എൻ.എസ്.എസ്%' or src like '%nss-01.svg';

update public.achievements
set title_en       = 'JRC Best Unit Award',
    title_ml       = 'ജെ.ആർ.സി മികച്ച യൂണിറ്റ്',
    student_name   = 'JRC Unit (Junior Red Cross), GHSS Pandi',
    description_en = 'Recognised for the community health, first-aid and cleanliness drive in Pandi panchayat.',
    description_ml = 'പാണ്ടി പഞ്ചായത്തിലെ ആരോഗ്യ-പ്രഥമശുശ്രൂഷ-ശുചിത്വ യജ്ഞത്തിന് അംഗീകാരം.'
where title_en ilike '%NSS%' or title_ml like '%എൻ.എസ്.എസ്%' or student_name ilike '%NSS%';

select 'gallery rows now' as info, count(*) as jrc_rows
from public.gallery_items where title_en ilike '%JRC%'
union all
select 'achievement rows now', count(*)
from public.achievements where title_en ilike '%JRC%';
