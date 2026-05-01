import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
  });
}

export function useBudgetOverview() {
  return useQuery({
    queryKey: ['budget-overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false });
      if (error) throw error;

      const income = data?.filter(t => t.transaction_type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;
      const expenses = data?.filter(t => t.transaction_type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0) || 0;
      const balance = income - expenses;

      // Group expenses by category
      const categoryMap: Record<string, number> = {};
      data?.filter(t => t.transaction_type === 'expense').forEach(t => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + parseFloat(t.amount);
      });

      const categories = Object.entries(categoryMap).map(([category, amount]) => ({
        category,
        amount,
        percent: Math.round((amount / expenses) * 100),
      })).sort((a, b) => b.amount - a.amount);

      return { income, expenses, balance, categories, transactions: data };
    },
  });
}

export function useSavingsChallenges() {
  return useQuery({
    queryKey: ['savings-challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('savings_challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}
