import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import { useTransactions, useBudgetOverview, useSavingsChallenges } from '@/hooks/use-budget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, ArrowUpRight, ArrowDownRight, DollarSign, Wallet, Target as GoalIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Budget = () => {
  const { data: transactions, isLoading: txLoading } = useTransactions();
  const { data: overview, isLoading: overviewLoading } = useBudgetOverview();
  const { data: challenges, isLoading: challengesLoading } = useSavingsChallenges();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThreeJSBackground />
      <Navbar />
      
      <main className="pt-28 pb-16 section-padding relative z-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Budget Structuring</h1>
          <p className="text-gray-600 text-lg">Track expenses, optimize your spending, and join savings challenges.</p>
        </div>

        {/* Top Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="glass-card bg-skillbistro-green/5 border-skillbistro-green/20 relative overflow-hidden animate-fade-in">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-skillbistro-green/10 rounded-full blur-xl" />
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Wallet className="h-5 w-5 text-skillbistro-green" />
                </div>
                <Badge variant="outline" className="bg-white/50">Total Balance</Badge>
              </div>
              {overviewLoading ? (
                <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
              ) : (
                <h3 className="text-3xl font-bold text-gray-900">${overview?.balance.toFixed(2) || '0.00'}</h3>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-skillbistro-blue/10 rounded-lg">
                  <ArrowUpRight className="h-5 w-5 text-skillbistro-blue" />
                </div>
                <span className="text-sm font-medium text-gray-500">Income</span>
              </div>
              {overviewLoading ? (
                <div className="h-10 w-32 bg-gray-100 animate-pulse rounded" />
              ) : (
                <h3 className="text-2xl font-bold">${overview?.income.toFixed(2) || '0.00'}</h3>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Expenses</span>
              </div>
              {overviewLoading ? (
                <div className="h-10 w-32 bg-gray-100 animate-pulse rounded" />
              ) : (
                <h3 className="text-2xl font-bold">${overview?.expenses.toFixed(2) || '0.00'}</h3>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expense Categories */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Where your money goes this month</CardDescription>
              </CardHeader>
              <CardContent>
                {overviewLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-lg" />)}
                  </div>
                ) : overview?.categories.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No expenses recorded yet.</p>
                ) : (
                  <div className="space-y-6">
                    {overview?.categories.map((cat, i) => (
                      <div key={cat.category} className="space-y-2 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{cat.category}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">{cat.percent}%</span>
                            <span className="font-bold">${cat.amount.toFixed(2)}</span>
                          </div>
                        </div>
                        <Progress value={cat.percent} className="h-2 bg-gray-100" indicatorClassName="bg-skillbistro-green" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                {txLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-gray-50 animate-pulse rounded-lg" />)}
                  </div>
                ) : transactions?.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No transactions found.</p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {transactions?.map((tx, i) => (
                      <div key={tx.id} className="py-3 flex justify-between items-center animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${tx.transaction_type === 'income' ? 'bg-skillbistro-blue/10 text-skillbistro-blue' : 'bg-gray-100 text-gray-600'}`}>
                            {tx.transaction_type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{tx.description}</p>
                            <p className="text-xs text-gray-500">{tx.category} • {new Date(tx.transaction_date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className={`font-semibold ${tx.transaction_type === 'income' ? 'text-skillbistro-blue' : 'text-gray-900'}`}>
                          {tx.transaction_type === 'income' ? '+' : '-'}${parseFloat(tx.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Savings Challenges */}
            <Card className="glass-card bg-gradient-to-b from-skillbistro-green/10 to-transparent border-skillbistro-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GoalIcon className="text-skillbistro-green" /> Active Challenges
                </CardTitle>
                <CardDescription>Participate and save money</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {challengesLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map(i => <div key={i} className="h-24 bg-white/50 animate-pulse rounded-lg" />)}
                  </div>
                ) : challenges?.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No active challenges.</p>
                ) : (
                  challenges?.map((challenge, i) => {
                    const percent = Math.round((parseFloat(challenge.current_amount) / parseFloat(challenge.target_amount)) * 100);
                    return (
                      <div key={challenge.id} className="bg-white/80 p-4 rounded-xl shadow-sm space-y-3 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{challenge.icon}</span>
                            <h4 className="font-semibold text-sm">{challenge.title}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs border-skillbistro-green/30 text-skillbistro-green">
                            {challenge.weeks_remaining}w left
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{challenge.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span>${challenge.current_amount} saved</span>
                            <span>Goal: ${challenge.target_amount}</span>
                          </div>
                          <Progress value={percent} className="h-1.5" indicatorClassName="bg-skillbistro-green" />
                        </div>
                      </div>
                    );
                  })
                )}
                
                <Button className="w-full mt-2 bg-skillbistro-green hover:bg-skillbistro-green/90 text-white">
                  Join New Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Smart Tips */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-base">AI Financial Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex gap-3">
                  <div className="mt-0.5"><Target className="h-4 w-4 text-skillbistro-blue" /></div>
                  <p className="text-sm text-gray-600">You're spending 35% of your budget on food. Try joining the "No Takeout Week" challenge to save ~$40!</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex gap-3">
                  <div className="mt-0.5"><Target className="h-4 w-4 text-skillbistro-blue" /></div>
                  <p className="text-sm text-gray-600">You have a textbook expense coming up. Check out the "Textbook Swap" challenge before buying new.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Budget;