-- Run this in Supabase SQL Editor to allow users to book sessions

DROP POLICY IF EXISTS "Users can insert sessions" ON sessions;
CREATE POLICY "Users can insert sessions" ON sessions FOR INSERT WITH CHECK (auth.uid() = student_id OR auth.uid() = teacher_id);
