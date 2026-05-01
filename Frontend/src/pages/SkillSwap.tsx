import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import { useSkills, useSkillMatches, useSessions } from '@/hooks/use-skills';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, RefreshCw, Star, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SkillSwap = () => {
  const { user } = useAuth();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: matches, isLoading: matchesLoading } = useSkillMatches();
  const { data: sessions, isLoading: sessionsLoading } = useSessions();
  const [activeTab, setActiveTab] = useState('matches');

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThreeJSBackground />
      <Navbar />
      
      <main className="pt-28 pb-16 section-padding relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Skill Swap</h1>
            <p className="text-gray-600 text-lg">Exchange knowledge, earn Time Credits, and grow your network.</p>
          </div>
          
          {user && (
            <Card className="bg-white/80 backdrop-blur-sm border-skillbistro-blue/20 shadow-sm w-full md:w-auto">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full border-4 border-skillbistro-blue flex items-center justify-center bg-skillbistro-blue/10 text-skillbistro-blue font-bold">
                  {user.user_metadata?.time_credits || 100}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Available Balance</p>
                  <p className="font-bold text-skillbistro-blue">Time Credits</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="matches">AI Matches</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: My Skills & Learning Goals */}
              <div className="space-y-8">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">I Can Teach</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-skillbistro-blue">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Skills you offer to others</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Spanish', 'Photography'].map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-skillbistro-blue/10 text-skillbistro-blue hover:bg-skillbistro-blue/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">I Want to Learn</CardTitle>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-skillbistro-green">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Skills you're looking for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['Yoga', 'Data Science', 'Guitar'].map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-skillbistro-green/10 text-skillbistro-green hover:bg-skillbistro-green/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Match Feed */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Recommended Matches</h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" /> Refresh Matches
                  </Button>
                </div>

                {matchesLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <Card key={i} className="glass-card animate-pulse h-24" />
                    ))}
                  </div>
                ) : matches?.length === 0 ? (
                  <Card className="glass-card p-8 text-center text-gray-500">
                    No matches found yet. Try adding more skills!
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {matches?.map((match: any, index) => (
                      <Card key={match.id} className="glass-card transition-all hover:shadow-md animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                              <AvatarImage src={match.matched_user?.avatar_url} />
                              <AvatarFallback className="bg-gradient-to-br from-skillbistro-blue to-skillbistro-purple text-white">
                                {match.matched_user?.first_name?.[0] || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-lg">{match.matched_user?.first_name} {match.matched_user?.last_name}</h4>
                                <Badge variant="outline" className={match.match_type === 'teacher' ? 'bg-skillbistro-green/10 text-skillbistro-green border-skillbistro-green/20' : 'bg-skillbistro-blue/10 text-skillbistro-blue border-skillbistro-blue/20'}>
                                  {match.match_type === 'teacher' ? 'Can Teach You' : 'Wants to Learn'}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <span>{match.skill?.icon} {match.skill?.name}</span>
                                <span>•</span>
                                <span className="flex items-center text-yellow-500 text-xs font-medium bg-yellow-50 px-2 py-0.5 rounded-full">
                                  <Star className="h-3 w-3 mr-1 fill-current" /> {match.match_score}% Match
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button className="w-full sm:w-auto bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white">
                            Connect
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Upcoming Sessions</h3>
             </div>
             
             {sessionsLoading ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <Card key={i} className="glass-card animate-pulse h-24" />
                  ))}
                </div>
             ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {sessions?.map((session: any, index) => (
                    <Card key={session.id} className="glass-card border-l-4 border-l-skillbistro-blue animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {session.skill?.icon} {session.skill?.name}
                          </CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {session.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          with {session.teacher?.first_name} (Teacher) and {session.student?.first_name} (Student)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-skillbistro-blue" />
                            {new Date(session.scheduled_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-skillbistro-purple" />
                            {new Date(session.scheduled_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ({session.duration_minutes} min)
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button size="sm" className="bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white">Join Meeting</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
             )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SkillSwap;