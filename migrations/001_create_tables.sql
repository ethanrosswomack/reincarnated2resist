-- Migration: Create core tables for Hawk Eye site
-- Generated: 2025-10-22

BEGIN;

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  album_code TEXT UNIQUE,
  dedicated_to TEXT,
  description TEXT,
  cover_image TEXT,
  back_image TEXT,
  side_image TEXT,
  disc_image TEXT,
  release_year INTEGER,
  track_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT,
  track_number INTEGER NOT NULL,
  duration TEXT,
  duration_seconds INTEGER,
  lyrics TEXT,
  description TEXT,
  audio_url TEXT,
  lyrics_ipynb_url TEXT,
  lyrics_md_url TEXT,
  video_url TEXT,
  image_url TEXT,
  sku TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (album_id, track_number)
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  image_url TEXT,
  publish_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Merch items
CREATE TABLE IF NOT EXISTS merch_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) DEFAULT 0,
  sku TEXT,
  type TEXT,
  category TEXT,
  in_stock INTEGER DEFAULT 0,
  image_alt TEXT,
  image_back TEXT,
  image_front TEXT,
  image_side TEXT,
  kunaki_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

COMMIT;
