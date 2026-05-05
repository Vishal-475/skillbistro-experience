import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useSkillMatches() {
  return useQuery({
    queryKey: ['skill-matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skill_matches')
        .select(`
          *,
          matched_user:profiles!skill_matches_matched_user_id_fkey(first_name, last_name, avatar_url, time_credits),
          skill:skills(name, icon, category)
        `)
        .order('match_score', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          skill:skills(name, icon),
          teacher:profiles!sessions_teacher_id_fkey(first_name, last_name),
          student:profiles!sessions_student_id_fkey(first_name, last_name)
        `)
        .order('scheduled_at', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useBookSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ teacherId, studentId, skillId }: { teacherId: string, studentId: string, skillId: string }) => {
      const scheduledAt = new Date();
      scheduledAt.setDate(scheduledAt.getDate() + 2); // Schedule 2 days from now for demo

      const { data, error } = await supabase
        .from('sessions')
        .insert({
          teacher_id: teacherId,
          student_id: studentId,
          skill_id: skillId,
          scheduled_at: scheduledAt.toISOString(),
          duration_minutes: 60,
          status: 'upcoming',
          credits_exchanged: 10
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
}
