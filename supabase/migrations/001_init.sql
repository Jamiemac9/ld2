-- SellMyDoll.com schema. Apply with: supabase db push  (or paste into the SQL editor)

create extension if not exists "pgcrypto";

create table public.sellers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  phone text,
  postcode text,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create type listing_status as enum ('pending', 'awaiting_payment', 'approved', 'sold', 'rejected', 'expired');
create type listing_tier as enum ('standard', 'brokered', 'delivery');

create table public.listings (
  id text primary key default ('smd-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  seller_id uuid references public.sellers(id) on delete cascade,
  status listing_status not null default 'pending',
  tier listing_tier not null,
  title text not null,
  brand text not null,
  model text,
  type text not null check (type in ('Full doll', 'Torso', 'Head')),
  gender text not null check (gender in ('Female', 'Male')),
  material text not null,
  height_cm int,
  weight_kg numeric,
  body text,
  condition text not null,
  months_owned int not null default 0,
  price_gbp int not null check (price_gbp > 0),
  original_price_gbp int,
  region text not null,
  includes text[] not null default '{}',
  description text not null,
  photos text[] not null default '{}',
  -- seller declarations (all must be true to submit)
  decl_owner boolean not null,
  decl_adult_appearance boolean not null,
  decl_cleaned boolean not null,
  decl_inserts boolean not null,
  decl_accurate boolean not null,
  rejection_reason text,
  reviewed_by text,
  reviewed_at timestamptz,
  paid_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  -- full-body dolls must meet the minimum height policy
  constraint full_doll_min_height check (type <> 'Full doll' or (height_cm is not null and height_cm >= 150))
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id text references public.listings(id) on delete cascade,
  name text not null,
  email text not null,
  message text not null,
  postcode text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  listing_id text references public.listings(id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);

create table public.waitlist (
  email text primary key,
  interest text,
  created_at timestamptz not null default now()
);

-- Row level security: the public can only READ approved/sold listings.
-- All writes go through server API routes using the service role key.
alter table public.sellers   enable row level security;
alter table public.listings  enable row level security;
alter table public.enquiries enable row level security;
alter table public.reports   enable row level security;
alter table public.waitlist  enable row level security;

create policy "public reads live listings" on public.listings
  for select using (status in ('approved', 'sold'));

-- Photos bucket: public read, writes via service role only.
insert into storage.buckets (id, name, public) values ('listing-photos', 'listing-photos', true)
  on conflict (id) do nothing;

create index listings_status_idx on public.listings (status, created_at desc);
