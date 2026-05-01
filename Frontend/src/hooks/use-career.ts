import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useCareerMatches() {
  return useQuery({
    queryKey: ['career-matches'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('career_matches')
        .select('*')
        .order('match_score', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useLearningPaths(careerMatchId?: string) {
  return useQuery({
    queryKey: ['learning-paths', careerMatchId],
    queryFn: async () => {
      let query = supabase
        .from('learning_paths')
        .select('*, career_match:career_matches(title)')
        .order('step_number', { ascending: true });

      if (careerMatchId) {
        query = query.eq('career_match_id', careerMatchId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!careerMatchId,
  });
}

export function useMentors() {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('mentors')
        .select('*')
        .order('rating', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
