create table admins (user_id uuid primary key references auth.users on delete cascade);
create table projects (
 id uuid primary key default gen_random_uuid(),
 title text not null, slug text not null unique, short_description text not null default '',
 industry text, category text, published_at date,
 status text not null default 'draft' check (status in ('draft','published')),
 featured boolean not null default false, sort_order int not null default 0,
 cover_image_url text, additional_images jsonb not null default '[]', gallery_images jsonb not null default '[]',
 business_context text, problem_statement text, objectives text, methodology text,
 key_findings text, business_insights text, recommendations text, conclusion text,
 powerbi_embed_url text, dashboard_external_url text, show_dashboard boolean not null default false, dashboard_title text,
 seo_title text, seo_description text,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table inquiries (id uuid primary key default gen_random_uuid(), name text not null, company text, email text not null, industry text, need text not null, details text, created_at timestamptz not null default now());
alter table admins enable row level security; alter table projects enable row level security; alter table inquiries enable row level security;
create function is_admin() returns boolean language sql stable security definer as $$ select exists (select 1 from admins where user_id = auth.uid()) $$;
create policy "public reads published" on projects for select using (status='published');
create policy "admin all" on projects for all using (is_admin()) with check (is_admin());
create policy "admin reads inquiries" on inquiries for select using (is_admin());
create policy "anyone can send inquiry" on inquiries for insert with check (true);
-- After creating your user in Auth > Users, run:
-- insert into admins (user_id) values ('YOUR-USER-UUID');

-- Fix: let a signed-in user read ONLY their own row in admins (needed by the login check)
create policy "admin reads own row" on admins for select using (user_id = auth.uid());
