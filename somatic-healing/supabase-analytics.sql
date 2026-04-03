create table public.page_views (
  id uuid default uuid_generate_v4() primary key,
  path text not null,
  referrer text,
  user_agent text,
  visitor_id text not null,
  created_at timestamptz not null default now()
);

create index idx_page_views_path on public.page_views(path);
create index idx_page_views_created_at on public.page_views(created_at);
create index idx_page_views_visitor_id on public.page_views(visitor_id);

alter table public.page_views enable row level security;

create policy "Anyone can insert page views"
  on public.page_views for insert
  with check (true);

create policy "Admins can read page views"
  on public.page_views for select
  using (true);
