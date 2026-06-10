-- Montagfrei: dynamische Kunden (Scraper / Admin)
-- Statische Demo-Kunden bleiben im Repo unter src/clients/data/

create table if not exists public.clients (
  id text primary key,
  slug text not null unique,
  code text not null unique,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists clients_slug_idx on public.clients (slug);

alter table public.clients enable row level security;

-- MVP: offen für anon key — vor Produktion mit Auth / restriktiven Policies absichern
create policy "clients_select_anon"
  on public.clients for select
  to anon, authenticated
  using (true);

create policy "clients_insert_anon"
  on public.clients for insert
  to anon, authenticated
  with check (id like 'dyn-%');

create policy "clients_update_anon"
  on public.clients for update
  to anon, authenticated
  using (id like 'dyn-%')
  with check (id like 'dyn-%');

create policy "clients_delete_anon"
  on public.clients for delete
  to anon, authenticated
  using (id like 'dyn-%');
