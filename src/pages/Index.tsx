
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';
import { RefreshCw, Utensils, PiggyBank, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThreeJSBackground />
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background to-background pointer-events-none"></div>
        
        {/* Skill Swap Section */}
        <section id="skill-swap" className="section-padding relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-skillbistro-blue/10 text-skillbistro-blue mb-2">
                  Skill Swap
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Learn, Teach & Earn<br />Time Credits
                </h2>
                <p className="text-gray-600 text-lg max-w-md">
                  Our AI matches you with fellow students based on skills and availability. Teach what you know, learn what you don't, and earn Time Credits along the way.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">AI-powered skill matching algorithm</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Time Credits economy for fair exchanges</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Scheduling integration for seamless booking</p>
                  </div>
                </div>
                <Button className="bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white">
                  Start Swapping Skills
                </Button>
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-white p-6 animate-fade-in relative">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-skillbistro-blue via-skillbistro-purple to-skillbistro-pink"></div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">My Skills</h3>
                      <p className="text-sm text-gray-500">Drag and drop to add or remove</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Refresh</span>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {["Python", "Guitar", "Spanish", "Yoga", "Photography", "Cooking", "Math", "Design"].map((skill, i) => (
                      <div 
                        key={skill}
                        className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium hover:bg-skillbistro-blue/5 hover:border-skillbistro-blue/20 cursor-pointer transition-all duration-200 animate-fade-in"
                        style={{ animationDelay: `${i * 0.05}s` }}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Recommended Matches</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Alex Kim", skill: "Spanish", type: "Teacher" },
                        { name: "Jamie Chen", skill: "Python", type: "Student" },
                        { name: "Morgan Lee", skill: "Yoga", type: "Student" }
                      ].map((match, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-skillbistro-blue/5 transition-colors duration-200 animate-fade-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500 font-medium">
                              {match.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{match.name}</p>
                              <p className="text-xs text-gray-500">{match.skill} · {match.type}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Grid Section */}
        <section className="section-padding relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Explore All Features
              </h2>
              <p className="text-lg text-gray-600">
                SkillBistro brings together everything you need for a successful college experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={RefreshCw}
                title="Skill Swap"
                description="Exchange knowledge and skills with other students using our AI-powered matching system."
                iconClassName="bg-skillbistro-blue/10 text-skillbistro-blue"
                index={0}
                linkHref="#skill-swap"
              />
              
              <FeatureCard
                icon={Utensils}
                title="Food Discovery"
                description="Find, recommend, and explore student-friendly food spots based on your preferences and budget."
                iconClassName="bg-skillbistro-orange/10 text-skillbistro-orange"
                index={1}
                linkHref="#food-discovery"
              />
              
              <FeatureCard
                icon={PiggyBank}
                title="Budget Structuring"
                description="Track expenses, set savings goals, and get AI-powered financial recommendations."
                iconClassName="bg-skillbistro-green/10 text-skillbistro-green"
                index={2}
                linkHref="#budget"
              />
              
              <FeatureCard
                icon={Briefcase}
                title="Career Path Guidance"
                description="Get personalized career advice, resume feedback, and connect with industry mentors."
                iconClassName="bg-skillbistro-purple/10 text-skillbistro-purple"
                index={3}
                linkHref="#career-path"
              />
            </div>
          </div>
        </section>
        
        {/* Food Discovery Section */}
        <section id="food-discovery" className="section-padding bg-gray-50 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl bg-white animate-fade-in">
                <div className="aspect-w-4 aspect-h-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                  <div className="w-full h-52 bg-skillbistro-orange/10"></div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">Campus Food Map</h3>
                      <p className="text-sm text-gray-500">Discover nearby spots within your budget</p>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-skillbistro-orange animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-skillbistro-orange/60 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-skillbistro-orange/30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "The Student Café", rating: "4.8", price: "$", distance: "5 min" },
                      { name: "Campus Bistro", rating: "4.5", price: "$$", distance: "10 min" }
                    ].map((place, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 space-y-2 cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className="w-full h-24 rounded-lg bg-gray-100"></div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{place.name}</h4>
                            <div className="flex items-center space-x-1 text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFCC00" stroke="#FFCC00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                              <span>{place.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{place.price} • {place.distance}</span>
                            <span>Popular with students</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-6 animate-fade-in">
                <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-skillbistro-orange/10 text-skillbistro-orange mb-2">
                  Food Discovery
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Crave, Share & Explore<br />Food Spots
                </h2>
                <p className="text-gray-600 text-lg max-w-md">
                  Discover student-friendly food spots, get recommendations based on your preferences, and see what's trending in your campus community.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Interactive 3D food spot map</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Budget-friendly recommendations</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Community reviews and trending spots</p>
                  </div>
                </div>
                <Button className="bg-skillbistro-orange hover:bg-skillbistro-orange/90 text-white">
                  Explore Food Map
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Budget Section */}
        <section id="budget" className="section-padding relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-skillbistro-green/10 text-skillbistro-green mb-2">
                  Budget Structuring
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Spend Smart, Save Better
                </h2>
                <p className="text-gray-600 text-lg max-w-md">
                  Track your expenses, get AI-powered budgeting tips, and participate in gamified savings challenges to improve your financial well-being.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Smart expense categorization</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Gamified savings challenges</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Visual finance dashboard</p>
                  </div>
                </div>
                <Button className="bg-skillbistro-green hover:bg-skillbistro-green/90 text-white">
                  Start Budgeting
                </Button>
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-6 animate-fade-in">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Budget Overview</h3>
                      <p className="text-sm text-gray-500">September 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <span>All Categories</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-40 w-full bg-gray-50 rounded-xl"></div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { category: "Food & Dining", amount: "$350", percent: "35%" },
                        { category: "Rent", amount: "$600", percent: "60%" },
                        { category: "Entertainment", amount: "$120", percent: "12%" },
                        { category: "Books & Supplies", amount: "$80", percent: "8%" }
                      ].map((expense, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-gray-50 space-y-2 animate-fade-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{expense.category}</span>
                            <span className="text-xs text-gray-500">{expense.percent}</span>
                          </div>
                          <div className="text-lg font-semibold">{expense.amount}</div>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-skillbistro-green rounded-full" 
                              style={{ width: expense.percent }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Savings Challenge</h4>
                      <span className="text-xs text-skillbistro-green font-medium">3 weeks remaining</span>
                    </div>
                    <div className="p-4 rounded-xl bg-skillbistro-green/5 border border-skillbistro-green/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-skillbistro-green">Coffee Break Challenge</span>
                        <span className="text-sm">$45 / $60</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full mb-3">
                        <div className="h-full bg-skillbistro-green rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Skip your daily coffee 3 times a week to save $60 this month!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Career Path Section */}
        <section id="career-path" className="section-padding bg-gray-50 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl bg-white animate-fade-in">
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Career Path Explorer</h3>
                      <p className="text-sm text-gray-500">Based on your skills and interests</p>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-skillbistro-purple/5 border border-skillbistro-purple/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-skillbistro-purple">Top Career Match</h4>
                      <span className="text-xs font-medium bg-skillbistro-purple/10 text-skillbistro-purple px-2 py-0.5 rounded-full">98% Match</span>
                    </div>
                    <h3 className="text-lg font-semibold">UX/UI Designer</h3>
                    <p className="text-sm text-gray-600">
                      Your skills in design, psychology, and coding make you an excellent match for a career in UX/UI design.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">Design</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">User Research</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">Prototyping</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">HTML/CSS</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Recommended Learning Path</h4>
                    <div className="space-y-2">
                      {[
                        "Complete Intro to UI Design (8 weeks)",
                        "User Research Fundamentals (4 weeks)",
                        "Prototyping with Figma (6 weeks)"
                      ].map((step, i) => (
                        <div 
                          key={i} 
                          className="flex items-center p-3 rounded-lg bg-gray-50 animate-fade-in"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <div className="w-6 h-6 rounded-full bg-skillbistro-purple/10 text-skillbistro-purple flex items-center justify-center text-xs font-medium mr-3">
                            {i + 1}
                          </div>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Potential Mentors</h4>
                    <div className="flex overflow-x-auto py-2 space-x-3">
                      {[1, 2, 3].map((mentor) => (
                        <div 
                          key={mentor}
                          className="flex-shrink-0 w-36 p-3 rounded-xl bg-gray-50 space-y-2 animate-fade-in"
                          style={{ animationDelay: `${mentor * 0.1}s` }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                          <div>
                            <p className="text-sm font-medium">Mentor {mentor}</p>
                            <p className="text-xs text-gray-500">Senior UX Designer</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-6 animate-fade-in">
                <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-skillbistro-purple/10 text-skillbistro-purple mb-2">
                  Career Path Guidance
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Plan, Prepare & Succeed
                </h2>
                <p className="text-gray-600 text-lg max-w-md">
                  Get personalized career recommendations, improve your resume with AI-powered feedback, and connect with industry professionals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">AI-powered career recommendations</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Resume analysis and improvement tips</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-skillbistro-green/10 text-skillbistro-green flex items-center justify-center mr-3 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Mentorship matching with professionals</p>
                  </div>
                </div>
                <Button className="bg-skillbistro-purple hover:bg-skillbistro-purple/90 text-white">
                  Explore Career Paths
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-skillbistro-blue via-skillbistro-purple to-skillbistro-pink p-0.5 shadow-xl animate-fade-in">
              <div className="bg-white rounded-3xl px-8 py-14 sm:px-14">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Ready to Transform Your<br />College Experience?
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                  Join thousands of students already using SkillBistro to make the most of their college years.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white shadow-sm min-w-[180px]"
                    onClick={() => window.location.href = '/login'}
                  >
                    Get Started for Free
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="min-w-[180px]"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
