import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import { useCareerMatches, useLearningPaths, useMentors } from '@/hooks/use-career';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, BookOpen, Users, Star, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const CareerPath = () => {
  const { data: careers, isLoading: careersLoading } = useCareerMatches();
  const { data: mentors, isLoading: mentorsLoading } = useMentors();
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);

  // Automatically select the first career when loaded if none is selected
  React.useEffect(() => {
    if (careers && careers.length > 0 && !selectedCareerId) {
      setSelectedCareerId(careers[0].id);
    }
  }, [careers, selectedCareerId]);

  const { data: paths, isLoading: pathsLoading } = useLearningPaths(selectedCareerId || undefined);

  const handleStartPath = () => {
    toast.success('Learning path started!', {
      description: 'Your progress will now be tracked.'
    });
  };

  const handleBookMentor = (mentorName: string) => {
    toast.success(`Session requested with ${mentorName}`, {
      description: 'We will notify you when they confirm.'
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThreeJSBackground />
      <Navbar />
      
      <main className="pt-28 pb-16 section-padding relative z-10 max-w-7xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Career Path Guidance</h1>
          <p className="text-gray-600 text-lg max-w-2xl">Discover your ideal career, follow tailored learning paths, and connect with industry mentors.</p>
        </div>

        <Tabs defaultValue="explore" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mx-auto md:mx-0">
            <TabsTrigger value="explore">Explore Paths</TabsTrigger>
            <TabsTrigger value="mentors">Mentors Network</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Career Matches */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="text-skillbistro-purple" /> Top Career Matches
                </h3>
                
                {careersLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl" />)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {careers?.map((career, i) => (
                      <Card 
                        key={career.id} 
                        className={`glass-card cursor-pointer transition-all hover:border-skillbistro-purple/50 animate-fade-in ${selectedCareerId === career.id ? 'border-skillbistro-purple shadow-md bg-skillbistro-purple/5' : ''}`}
                        onClick={() => setSelectedCareerId(career.id)}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg">{career.title}</h4>
                            <Badge className="bg-skillbistro-purple/10 text-skillbistro-purple hover:bg-skillbistro-purple/20 border-0">
                              {career.match_score}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{career.description}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                            <span>{career.salary_range}</span>
                            <span>{career.growth_outlook} Growth</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Learning Path Details */}
              <div className="lg:col-span-2">
                {selectedCareerId && (
                  <Card className="glass-card h-full animate-fade-in">
                    <CardHeader className="border-b border-gray-100 pb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl mb-2">{careers?.find(c => c.id === selectedCareerId)?.title} Learning Path</CardTitle>
                          <CardDescription>Step-by-step guide to land this role</CardDescription>
                        </div>
                        <Button onClick={handleStartPath} className="bg-skillbistro-purple hover:bg-skillbistro-purple/90 text-white">
                          Start Path
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-8">
                        <h4 className="text-sm font-semibold mb-3 text-gray-500 uppercase tracking-wider">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {careers?.find(c => c.id === selectedCareerId)?.skills_required.map((skill: string) => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wider">Roadmap</h4>
                        {pathsLoading ? (
                           <div className="space-y-6">
                             {[1, 2, 3].map(i => <div key={i} className="h-16 bg-gray-50 animate-pulse rounded-lg" />)}
                           </div>
                        ) : paths?.length === 0 ? (
                          <p className="text-gray-500">No learning path defined for this career yet.</p>
                        ) : (
                          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                            {paths?.map((path: any, index: number) => (
                              <div key={path.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${path.status === 'completed' ? 'bg-skillbistro-green text-white' : path.status === 'in_progress' ? 'bg-skillbistro-purple text-white' : 'bg-gray-200 text-gray-400'}`}>
                                  {path.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : path.step_number}
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white/50 shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex justify-between items-start mb-1">
                                    <h5 className="font-bold text-gray-900">{path.title}</h5>
                                    <span className="text-xs font-medium text-gray-500">{path.duration}</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-3">
                                    <Badge variant="outline" className={`text-xs ${path.status === 'completed' ? 'text-skillbistro-green' : path.status === 'in_progress' ? 'text-skillbistro-purple' : 'text-gray-400'}`}>
                                      {path.status.replace('_', ' ')}
                                    </Badge>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                                      <ArrowRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mentors" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Users className="text-skillbistro-purple" /> Industry Mentors
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white">UX Design</Button>
                <Button variant="outline" className="bg-white">Engineering</Button>
                <Button variant="outline" className="bg-white">Product</Button>
              </div>
            </div>

            {mentorsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-xl" />)}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors?.map((mentor: any, i) => (
                  <Card key={mentor.id} className="glass-card hover:-translate-y-1 transition-transform duration-300 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center mb-4">
                        <Avatar className="h-20 w-20 mb-3 border-4 border-white shadow-md">
                          <AvatarFallback className="text-xl text-white font-bold" style={{ backgroundColor: mentor.avatar_color || '#5856D6' }}>
                            {mentor.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-bold text-lg">{mentor.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{mentor.title} @ {mentor.company}</p>
                      </div>
                      
                      <div className="flex justify-center gap-4 mb-4 text-sm font-medium">
                        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="h-3.5 w-3.5 fill-current" /> {mentor.rating}
                        </div>
                        <div className="flex items-center gap-1 text-skillbistro-purple bg-skillbistro-purple/10 px-2 py-1 rounded-full">
                          <BookOpen className="h-3.5 w-3.5" /> {mentor.sessions_completed} sessions
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-1 mb-6">
                        {mentor.expertise.slice(0, 3).map((exp: string) => (
                          <span key={exp} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{exp}</span>
                        ))}
                      </div>

                      <Button onClick={() => handleBookMentor(mentor.name)} className="w-full bg-skillbistro-purple hover:bg-skillbistro-purple/90 text-white">
                        Book Session
                      </Button>
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

export default CareerPath;