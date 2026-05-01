-- ============================================
-- SkillBistro Database Schema + Seed Data
-- Run this in Supabase SQL Editor
-- ============================================

-- =====================
-- 1. PROFILES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL DEFAULT '',
  last_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  bio TEXT,
  time_credits INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================
-- 2. SKILLS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'General',
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 3. USER_SKILLS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  skill_type TEXT NOT NULL CHECK (skill_type IN ('teach', 'learn')),
  proficiency TEXT DEFAULT 'intermediate' CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, skill_id, skill_type)
);

-- =====================
-- 4. SKILL_MATCHES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS skill_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  matched_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  match_type TEXT NOT NULL CHECK (match_type IN ('teacher', 'student')),
  match_score INTEGER NOT NULL DEFAULT 85,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 5. SESSIONS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
  credits_exchanged INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 6. FOOD_SPOTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS food_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  description TEXT,
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0,
  price_tier TEXT NOT NULL DEFAULT '$' CHECK (price_tier IN ('$', '$$', '$$$')),
  distance_minutes INTEGER NOT NULL DEFAULT 5,
  address TEXT,
  image_color TEXT DEFAULT '#FF9500',
  is_trending BOOLEAN DEFAULT FALSE,
  student_popular BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 7. FOOD_REVIEWS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS food_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id UUID NOT NULL REFERENCES food_spots(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 8. TRANSACTIONS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense')),
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 9. SAVINGS_CHALLENGES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS savings_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_amount NUMERIC(10,2) NOT NULL,
  current_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  weeks_remaining INTEGER NOT NULL DEFAULT 4,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  icon TEXT DEFAULT '🎯',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 10. CAREER_MATCHES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS career_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  match_score INTEGER NOT NULL DEFAULT 85,
  salary_range TEXT,
  growth_outlook TEXT DEFAULT 'High',
  skills_required TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 11. LEARNING_PATHS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_match_id UUID NOT NULL REFERENCES career_matches(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('completed', 'in_progress', 'upcoming')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- 12. MENTORS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  expertise TEXT[] DEFAULT '{}',
  bio TEXT,
  avatar_color TEXT DEFAULT '#5856D6',
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.5,
  sessions_completed INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================
-- ENABLE RLS (Row Level Security)
-- =====================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;

-- Allow public read access to shared data tables
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON food_spots FOR SELECT USING (true);
CREATE POLICY "Public read access" ON food_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON career_matches FOR SELECT USING (true);
CREATE POLICY "Public read access" ON learning_paths FOR SELECT USING (true);
CREATE POLICY "Public read access" ON mentors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON savings_challenges FOR SELECT USING (true);

-- Profile policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- User skills policies
CREATE POLICY "Public read user_skills" ON user_skills FOR SELECT USING (true);
CREATE POLICY "Users can manage own skills" ON user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own skills" ON user_skills FOR DELETE USING (auth.uid() = user_id);

-- Skill matches policies
CREATE POLICY "Public read skill_matches" ON skill_matches FOR SELECT USING (true);

-- Sessions policies
CREATE POLICY "Public read sessions" ON sessions FOR SELECT USING (true);

-- Transactions policies
CREATE POLICY "Public read transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "Users can insert transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- SEED DATA
-- ============================================

-- Skills
INSERT INTO skills (name, category, icon) VALUES
  ('Python', 'Programming', '🐍'),
  ('JavaScript', 'Programming', '⚡'),
  ('React', 'Programming', '⚛️'),
  ('Guitar', 'Music', '🎸'),
  ('Piano', 'Music', '🎹'),
  ('Spanish', 'Languages', '🇪🇸'),
  ('French', 'Languages', '🇫🇷'),
  ('Mandarin', 'Languages', '🇨🇳'),
  ('Yoga', 'Fitness', '🧘'),
  ('Photography', 'Creative', '📸'),
  ('Cooking', 'Life Skills', '👨‍🍳'),
  ('Math', 'Academic', '📐'),
  ('Design', 'Creative', '🎨'),
  ('Writing', 'Academic', '✍️'),
  ('Public Speaking', 'Soft Skills', '🎤'),
  ('Data Science', 'Programming', '📊'),
  ('Machine Learning', 'Programming', '🤖'),
  ('Drawing', 'Creative', '✏️'),
  ('Video Editing', 'Creative', '🎬'),
  ('Marketing', 'Business', '📢')
ON CONFLICT (name) DO NOTHING;

-- Food Spots
INSERT INTO food_spots (name, cuisine, description, rating, price_tier, distance_minutes, address, image_color, is_trending, student_popular) VALUES
  ('The Student Café', 'Café', 'Cozy café with the best lattes on campus. Free WiFi and study-friendly atmosphere.', 4.8, '$', 5, '123 University Ave', '#FF9500', true, true),
  ('Campus Bistro', 'International', 'Diverse menu with options from around the world. Great lunch combos.', 4.5, '$$', 10, '456 College St', '#5856D6', false, true),
  ('Noodle House', 'Asian', 'Authentic ramen and stir-fry bowls. Student discount on Tuesdays.', 4.7, '$', 8, '789 Market Rd', '#FF2D55', true, true),
  ('Green Bowl', 'Healthy', 'Fresh salads, smoothie bowls, and grain bowls. Perfect for health-conscious students.', 4.6, '$$', 12, '321 Wellness Blvd', '#34C759', true, true),
  ('Pizza Corner', 'Italian', 'Late-night slices and full pies. The go-to spot after study sessions.', 4.3, '$', 3, '555 Dorm Circle', '#FF9500', false, true),
  ('Spice Route', 'Indian', 'Authentic curries, biryanis, and tandoori. Generous student portions.', 4.9, '$$', 15, '678 Flavor Lane', '#FF2D55', true, true),
  ('Taco Fiesta', 'Mexican', 'Build-your-own tacos and burritos. Dollar taco Wednesdays!', 4.4, '$', 7, '234 Fiesta Dr', '#FF9500', false, true),
  ('Sushi Express', 'Japanese', 'Quick and affordable sushi rolls. Great combo deals for lunch.', 4.2, '$$', 20, '890 Pacific Ave', '#007AFF', false, false);

-- Food Reviews
INSERT INTO food_reviews (spot_id, user_name, rating, comment, helpful_count) VALUES
  ((SELECT id FROM food_spots WHERE name = 'The Student Café'), 'Alex M.', 5, 'Best study spot ever! The cold brew is incredible and the WiFi never drops.', 24),
  ((SELECT id FROM food_spots WHERE name = 'The Student Café'), 'Sarah K.', 4, 'Love the atmosphere. Pastries are amazing, but it gets crowded during finals.', 18),
  ((SELECT id FROM food_spots WHERE name = 'Noodle House'), 'Jamie L.', 5, 'The tonkotsu ramen here is legit. Reminds me of the real deal in Japan!', 31),
  ((SELECT id FROM food_spots WHERE name = 'Noodle House'), 'Morgan P.', 4, 'Great flavors, decent portions. Tuesday discounts make it even better.', 12),
  ((SELECT id FROM food_spots WHERE name = 'Green Bowl'), 'Chris W.', 5, 'Finally a healthy option that actually tastes good! The acai bowl is a must-try.', 27),
  ((SELECT id FROM food_spots WHERE name = 'Spice Route'), 'Priya R.', 5, 'Authentic Indian food at student-friendly prices. The butter chicken is perfection.', 45),
  ((SELECT id FROM food_spots WHERE name = 'Pizza Corner'), 'Tom H.', 4, 'Perfect late-night fuel. Nothing fancy, just good honest pizza slices.', 15),
  ((SELECT id FROM food_spots WHERE name = 'Campus Bistro'), 'Emma J.', 4, 'Nice variety of cuisines. The lunch combo deal is great value.', 9);

-- Transactions (generic, not tied to a specific user for demo)
INSERT INTO transactions (amount, category, description, transaction_type, transaction_date) VALUES
  (1500.00, 'Income', 'Monthly Allowance', 'income', CURRENT_DATE - INTERVAL '1 day'),
  (45.50, 'Food & Dining', 'Grocery shopping at FreshMart', 'expense', CURRENT_DATE - INTERVAL '1 day'),
  (12.99, 'Food & Dining', 'Lunch at Campus Bistro', 'expense', CURRENT_DATE - INTERVAL '2 days'),
  (600.00, 'Rent', 'Monthly rent payment', 'expense', CURRENT_DATE - INTERVAL '3 days'),
  (29.99, 'Entertainment', 'Spotify + Netflix subscriptions', 'expense', CURRENT_DATE - INTERVAL '4 days'),
  (85.00, 'Books & Supplies', 'Data Structures textbook', 'expense', CURRENT_DATE - INTERVAL '5 days'),
  (8.50, 'Food & Dining', 'Coffee at The Student Café', 'expense', CURRENT_DATE - INTERVAL '5 days'),
  (200.00, 'Income', 'Freelance web design project', 'income', CURRENT_DATE - INTERVAL '6 days'),
  (35.00, 'Transportation', 'Monthly bus pass', 'expense', CURRENT_DATE - INTERVAL '7 days'),
  (22.00, 'Food & Dining', 'Dinner at Noodle House', 'expense', CURRENT_DATE - INTERVAL '8 days'),
  (15.00, 'Entertainment', 'Movie tickets', 'expense', CURRENT_DATE - INTERVAL '9 days'),
  (50.00, 'Income', 'Tutoring session payment', 'income', CURRENT_DATE - INTERVAL '10 days'),
  (42.00, 'Food & Dining', 'Weekly grocery run', 'expense', CURRENT_DATE - INTERVAL '11 days'),
  (18.50, 'Food & Dining', 'Pizza Corner order', 'expense', CURRENT_DATE - INTERVAL '12 days'),
  (120.00, 'Shopping', 'New backpack for semester', 'expense', CURRENT_DATE - INTERVAL '14 days');

-- Savings Challenges
INSERT INTO savings_challenges (title, description, target_amount, current_amount, weeks_remaining, icon) VALUES
  ('Coffee Break Challenge', 'Skip your daily coffee 3 times a week to save $60 this month!', 60.00, 45.00, 3, '☕'),
  ('No Takeout Week', 'Cook all your meals for one week and save on delivery fees.', 40.00, 28.00, 1, '🍳'),
  ('Textbook Swap', 'Buy used textbooks or use library copies instead of new ones.', 150.00, 85.00, 6, '📚'),
  ('Transit Saver', 'Walk or bike for short trips instead of rideshare this month.', 30.00, 12.00, 4, '🚲');

-- Career Matches
INSERT INTO career_matches (title, description, match_score, salary_range, growth_outlook, skills_required) VALUES
  ('UX/UI Designer', 'Create intuitive and visually appealing interfaces. Your skills in design, psychology, and coding make you an excellent match for UX/UI design.', 98, '$65K - $120K', 'Very High', ARRAY['Design', 'User Research', 'Prototyping', 'HTML/CSS', 'Figma']),
  ('Full-Stack Developer', 'Build complete web applications from frontend to backend. Strong demand in tech industry with excellent growth potential.', 92, '$75K - $140K', 'Very High', ARRAY['JavaScript', 'React', 'Node.js', 'SQL', 'Git']),
  ('Data Scientist', 'Analyze complex data sets to drive business decisions. Combines statistics, programming, and domain expertise.', 85, '$80K - $150K', 'High', ARRAY['Python', 'Statistics', 'Machine Learning', 'SQL', 'Visualization']),
  ('Product Manager', 'Lead product strategy and development. Bridge between business, design, and engineering teams.', 78, '$90K - $160K', 'High', ARRAY['Strategy', 'Communication', 'Analytics', 'Agile', 'User Research']);

-- Learning Paths (for UX/UI Designer career)
INSERT INTO learning_paths (career_match_id, step_number, title, duration, status) VALUES
  ((SELECT id FROM career_matches WHERE title = 'UX/UI Designer'), 1, 'Intro to UI Design Principles', '4 weeks', 'completed'),
  ((SELECT id FROM career_matches WHERE title = 'UX/UI Designer'), 2, 'User Research Fundamentals', '3 weeks', 'completed'),
  ((SELECT id FROM career_matches WHERE title = 'UX/UI Designer'), 3, 'Prototyping with Figma', '6 weeks', 'in_progress'),
  ((SELECT id FROM career_matches WHERE title = 'UX/UI Designer'), 4, 'Interaction Design Patterns', '4 weeks', 'upcoming'),
  ((SELECT id FROM career_matches WHERE title = 'UX/UI Designer'), 5, 'Design Systems & Components', '5 weeks', 'upcoming'),
  ((SELECT id FROM career_matches WHERE title = 'UX/UI Designer'), 6, 'Portfolio Project', '8 weeks', 'upcoming');

-- Learning Paths (for Full-Stack Developer career)
INSERT INTO learning_paths (career_match_id, step_number, title, duration, status) VALUES
  ((SELECT id FROM career_matches WHERE title = 'Full-Stack Developer'), 1, 'Advanced JavaScript & TypeScript', '4 weeks', 'completed'),
  ((SELECT id FROM career_matches WHERE title = 'Full-Stack Developer'), 2, 'React & State Management', '5 weeks', 'in_progress'),
  ((SELECT id FROM career_matches WHERE title = 'Full-Stack Developer'), 3, 'Node.js & Express APIs', '4 weeks', 'upcoming'),
  ((SELECT id FROM career_matches WHERE title = 'Full-Stack Developer'), 4, 'Database Design & SQL', '3 weeks', 'upcoming'),
  ((SELECT id FROM career_matches WHERE title = 'Full-Stack Developer'), 5, 'DevOps & Deployment', '3 weeks', 'upcoming');

-- Mentors
INSERT INTO mentors (name, title, company, expertise, bio, avatar_color, rating, sessions_completed) VALUES
  ('Dr. Sarah Chen', 'Senior UX Designer', 'Google', ARRAY['UX Design', 'User Research', 'Design Systems'], 'Former professor turned industry leader. Passionate about mentoring the next generation of designers.', '#007AFF', 4.9, 127),
  ('Michael Torres', 'Staff Engineer', 'Meta', ARRAY['React', 'System Design', 'Performance'], '15 years in tech. Open source contributor and conference speaker.', '#5856D6', 4.8, 89),
  ('Aisha Patel', 'Data Science Lead', 'Netflix', ARRAY['Machine Learning', 'Python', 'Analytics'], 'PhD in Statistics. Loves making data science accessible to newcomers.', '#FF2D55', 4.7, 64),
  ('James Wright', 'Product Director', 'Stripe', ARRAY['Product Strategy', 'Agile', 'Leadership'], 'Built products from 0 to millions of users. Focuses on career transitions.', '#34C759', 4.9, 156),
  ('Lisa Kim', 'Engineering Manager', 'Spotify', ARRAY['Full-Stack', 'Team Building', 'Career Growth'], '10 years in tech, 5 in management. Advocates for diverse voices in engineering.', '#FF9500', 4.6, 42);
