-- Somatic Healing Australia — Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- PRACTITIONERS TABLE
-- ============================================================
create table public.practitioners (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  slug text unique not null,
  full_name text not null,
  credentials text not null default '',
  practice_name text not null default '',
  photo_url text,

  -- Location
  address text not null default '',
  suburb text not null default '',
  city text not null default '',
  state text not null default '',
  postcode text not null default '',
  lat double precision,
  lng double precision,

  -- Profile content
  about_me text not null default '',
  modalities text[] not null default '{}',
  helps_with_tags text[] not null default '{}',
  session_types text not null default 'both' check (session_types in ('in-person', 'telehealth', 'both')),
  session_length text not null default '',
  fee_min integer,
  fee_max integer,
  booking_method text not null default 'enquiry' check (booking_method in ('url', 'enquiry')),
  booking_url text,
  qualifications text not null default '',
  why_i_do_this_work text not null default '',
  professional_memberships text[] not null default '{}',
  gender text not null default '' check (gender in ('female', 'male', 'non-binary', '')),

  -- Status
  availability text not null default 'accepting' check (availability in ('accepting', 'waitlist', 'full')),
  listing_tier text not null default 'free' check (listing_tier in ('free', 'premium', 'featured')),
  verified boolean not null default false,
  published boolean not null default false,

  -- Stripe
  stripe_customer_id text,
  stripe_subscription_id text,

  -- Stats
  profile_views integer not null default 0,
  enquiry_count integer not null default 0,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for search
create index idx_practitioners_city on public.practitioners(city);
create index idx_practitioners_state on public.practitioners(state);
create index idx_practitioners_availability on public.practitioners(availability);
create index idx_practitioners_listing_tier on public.practitioners(listing_tier);
create index idx_practitioners_published on public.practitioners(published);
create index idx_practitioners_slug on public.practitioners(slug);
create index idx_practitioners_user_id on public.practitioners(user_id);

-- ============================================================
-- ENQUIRIES TABLE
-- ============================================================
create table public.enquiries (
  id uuid default uuid_generate_v4() primary key,
  practitioner_id uuid references public.practitioners(id) on delete cascade not null,
  name text not null,
  email text not null,
  message text not null,
  type text not null default 'general' check (type in ('general', 'practitioner', 'media', 'support')),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_enquiries_practitioner on public.enquiries(practitioner_id);

-- ============================================================
-- REVIEWS TABLE
-- ============================================================
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  practitioner_id uuid references public.practitioners(id) on delete cascade not null,
  author_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  body text not null default '',
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_reviews_practitioner on public.reviews(practitioner_id);
create index idx_reviews_approved on public.reviews(approved);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Practitioners: public can read published, owners can edit their own
alter table public.practitioners enable row level security;

create policy "Public can view published practitioners"
  on public.practitioners for select
  using (published = true);

create policy "Users can view their own practitioner profile"
  on public.practitioners for select
  using (auth.uid() = user_id);

create policy "Users can insert their own practitioner profile"
  on public.practitioners for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own practitioner profile"
  on public.practitioners for update
  using (auth.uid() = user_id);

-- Enquiries: practitioners can read their own, anyone can insert
alter table public.enquiries enable row level security;

create policy "Anyone can submit an enquiry"
  on public.enquiries for insert
  with check (true);

create policy "Practitioners can view their own enquiries"
  on public.enquiries for select
  using (
    practitioner_id in (
      select id from public.practitioners where user_id = auth.uid()
    )
  );

create policy "Practitioners can update their own enquiries"
  on public.enquiries for update
  using (
    practitioner_id in (
      select id from public.practitioners where user_id = auth.uid()
    )
  );

-- Reviews: public can read approved, anyone can insert
alter table public.reviews enable row level security;

create policy "Public can view approved reviews"
  on public.reviews for select
  using (approved = true);

create policy "Anyone can submit a review"
  on public.reviews for insert
  with check (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.practitioners
  for each row
  execute function public.handle_updated_at();

-- ============================================================
-- RPC FUNCTIONS
-- ============================================================

-- Increment enquiry count
create or replace function public.increment_enquiry_count(p_id uuid)
returns void as $$
begin
  update public.practitioners
  set enquiry_count = enquiry_count + 1
  where id = p_id;
end;
$$ language plpgsql security definer;

-- Increment profile views
create or replace function public.increment_profile_views(p_slug text)
returns void as $$
begin
  update public.practitioners
  set profile_views = profile_views + 1
  where slug = p_slug and published = true;
end;
$$ language plpgsql security definer;

-- ============================================================
-- STORAGE BUCKET FOR PRACTITIONER PHOTOS
-- ============================================================
insert into storage.buckets (id, name, public)
values ('practitioner-photos', 'practitioner-photos', true);

create policy "Anyone can view practitioner photos"
  on storage.objects for select
  using (bucket_id = 'practitioner-photos');

create policy "Authenticated users can upload their own photo"
  on storage.objects for insert
  with check (
    bucket_id = 'practitioner-photos'
    and auth.role() = 'authenticated'
  );

create policy "Users can update their own photo"
  on storage.objects for update
  using (
    bucket_id = 'practitioner-photos'
    and auth.role() = 'authenticated'
  );
