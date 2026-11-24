create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null, logo_url text not null, website_url text,
  sort_order int not null default 0, visible boolean not null default true,
  created_at timestamptz not null default now());
alter table clients enable row level security;
create policy "public reads visible clients" on clients for select using (visible);
create policy "admin all clients" on clients for all using (is_admin()) with check (is_admin());
