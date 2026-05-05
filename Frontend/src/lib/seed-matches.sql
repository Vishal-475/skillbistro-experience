-- PROPER SKILL MATCHING SCRIPT
-- Run this in the Supabase SQL Editor ONLY AFTER you have signed up at least 2 or 3 real accounts.

-- 1. Clear any existing matches to start fresh
DELETE FROM skill_matches;

-- 2. Create dynamic matches between ALL real users in your database!
-- This pairs every user with every other user for a random skill.
INSERT INTO skill_matches (user_id, matched_user_id, skill_id, match_type, match_score, status)
SELECT 
  p1.id as user_id, 
  p2.id as matched_user_id, 
  (SELECT id FROM skills ORDER BY random() LIMIT 1) as skill_id, 
  CASE WHEN random() > 0.5 THEN 'student' ELSE 'teacher' END as match_type, 
  floor(random() * 20 + 80)::int as match_score, -- Generates a random score between 80-99
  'pending' as status
FROM profiles p1
CROSS JOIN profiles p2
WHERE p1.id != p2.id
ON CONFLICT DO NOTHING;
