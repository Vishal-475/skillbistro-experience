import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useFoodSpots(filters?: { cuisine?: string; maxPrice?: string; maxDistance?: number }) {
  return useQuery({
    queryKey: ['food-spots', filters],
    queryFn: async () => {
      let query = supabase.from('food_spots').select('*').order('rating', { ascending: false });

      if (filters?.cuisine && filters.cuisine !== 'All') {
        query = query.eq('cuisine', filters.cuisine);
      }
      if (filters?.maxPrice) {
        query = query.eq('price_tier', filters.maxPrice);
      }
      if (filters?.maxDistance) {
        query = query.lte('distance_minutes', filters.maxDistance);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useTrendingSpots() {
  return useQuery({
    queryKey: ['trending-spots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_spots')
        .select('*')
        .eq('is_trending', true)
        .order('rating', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useFoodReviews(spotId?: string) {
  return useQuery({
    queryKey: ['food-reviews', spotId],
    queryFn: async () => {
      let query = supabase.from('food_reviews').select('*').order('helpful_count', { ascending: false });
      if (spotId) {
        query = query.eq('spot_id', spotId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useCuisines() {
  return useQuery({
    queryKey: ['cuisines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('food_spots')
        .select('cuisine')
        .order('cuisine');
      if (error) throw error;
      const unique = [...new Set(data?.map(d => d.cuisine))];
      return ['All', ...unique];
    },
  });
}
