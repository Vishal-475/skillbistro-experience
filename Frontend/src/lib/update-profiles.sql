-- Run this script in the Supabase SQL Editor to add the missing fields for the User Profile

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS major TEXT,
ADD COLUMN IF NOT EXISTS year TEXT;
