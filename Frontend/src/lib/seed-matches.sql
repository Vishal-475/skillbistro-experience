-- Run this in Supabase SQL Editor to generate a dummy match for your logged-in user

-- 1. Temporarily drop the foreign key so we can create a dummy profile without needing a real Auth account
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- 2. Create a dummy profile for "Jane Doe"
INSERT INTO profiles (id, first_name, last_name, avatar_url, bio, time_credits) 
VALUES ('11111111-1111-1111-1111-111111111111', 'Jane', 'Doe', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', 'Expert Python Developer', 150) 
ON CONFLICT (id) DO NOTHING;

-- 3. Create a Skill Match for EVERY real user in your database, pairing them with Jane
INSERT INTO skill_matches (user_id, matched_user_id, skill_id, match_type, match_score, status)
SELECT 
  p.id, 
  '11111111-1111-1111-1111-111111111111', 
  (SELECT id FROM skills WHERE name = 'Python' LIMIT 1), 
  'student', 
  95, 
  'pending'
FROM profiles p 
WHERE p.id != '11111111-1111-1111-1111-111111111111'
ON CONFLICT DO NOTHING;
