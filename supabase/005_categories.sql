-- Project categories, each with a square (1:1) logo link
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  logo_url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now());
alter table categories enable row level security;
create policy "public reads categories" on categories for select using (true);
create policy "admin all categories" on categories for all using (is_admin()) with check (is_admin());
alter table projects add column if not exists category_id uuid references categories(id) on delete set null;
