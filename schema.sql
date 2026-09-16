-- Sonali Boutique - Supabase/PostgreSQL schema
-- Run this in Supabase SQL Editor.
-- Create the Storage bucket named "sonali-gallery" separately in Supabase Storage.

CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.gallery_items (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Sarees',
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_public_id TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.owner_profile (
  id SMALLINT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  biography TEXT NOT NULL,
  image_url TEXT,
  image_public_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_published_order
  ON public.gallery_items (published, is_new_arrival, sort_order, id);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.owner_profile ENABLE ROW LEVEL SECURITY;
