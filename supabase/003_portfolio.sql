-- Portfolio fields: type of work, live links, tech stack
alter table projects add column if not exists kind text not null default 'system' check (kind in ('system','analytics','ai'));
alter table projects add column if not exists links jsonb not null default '[]';
alter table projects add column if not exists tech jsonb not null default '[]';
