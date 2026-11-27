-- Open-ended portfolio: any category, free sections, free facts, editable site settings
alter table projects drop constraint if exists projects_kind_check;
alter table projects add column if not exists facts jsonb not null default '[]';
alter table projects add column if not exists blocks jsonb not null default '[]';
update projects set category = case kind when 'system' then 'Business systems' when 'analytics' then 'Data & analytics' when 'ai' then 'AI systems' else category end
 where (category is null or category = '') and kind is not null;
create table if not exists site_settings (key text primary key, value jsonb not null default '{}', updated_at timestamptz not null default now());
alter table site_settings enable row level security;
create policy "public reads settings" on site_settings for select using (true);
create policy "admin writes settings" on site_settings for all using (is_admin()) with check (is_admin());
