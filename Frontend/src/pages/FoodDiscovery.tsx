import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import { useFoodSpots, useTrendingSpots, useCuisines } from '@/hooks/use-food';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Star, TrendingUp, Filter, DollarSign } from 'lucide-react';

const FoodDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  
  const { data: cuisines } = useCuisines();
  const { data: spots, isLoading: spotsLoading } = useFoodSpots({ cuisine: selectedCuisine });
  const { data: trendingSpots, isLoading: trendingLoading } = useTrendingSpots();

  const filteredSpots = spots?.filter(spot => 
    spot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    spot.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ThreeJSBackground />
      <Navbar />
      
      <main className="pt-28 pb-16 section-padding relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">SRM Food Discovery</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Find the best student-friendly spots, filter by your budget, and see what's trending right now.</p>
        </div>

        {/* Search & Filter Bar */}
        <Card className="glass-card mb-12 animate-fade-in">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search spots or cravings..." 
                className="pl-10 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {cuisines?.map(cuisine => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => setSelectedCuisine(cuisine)}
                  className={selectedCuisine === cuisine ? "bg-skillbistro-orange hover:bg-skillbistro-orange/90 text-white" : ""}
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <MapPin className="text-skillbistro-orange" /> Nearby Spots
            </h2>
            
            {spotsLoading ? (
               <div className="grid md:grid-cols-2 gap-6">
                 {[1, 2, 3, 4].map(i => (
                   <Card key={i} className="glass-card animate-pulse h-64" />
                 ))}
               </div>
            ) : filteredSpots?.length === 0 ? (
               <div className="text-center p-12 glass-card rounded-xl">
                 <p className="text-gray-500">No food spots found matching your search.</p>
               </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredSpots?.map((spot: any, i) => (
                  <Card key={spot.id} className="glass-card overflow-hidden hover:shadow-lg transition-all animate-fade-in group" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div 
                      className="h-32 w-full relative"
                      style={{ backgroundColor: spot.image_color || '#FF9500' }}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white border-0 font-semibold shadow-sm">
                        {spot.price_tier}
                      </Badge>
                      {spot.student_popular && (
                        <Badge className="absolute top-3 left-3 bg-skillbistro-orange text-white border-0 shadow-sm flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> Student Pick
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-skillbistro-orange transition-colors">{spot.name}</h3>
                        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">
                          <Star className="h-3 w-3 fill-current" /> {spot.rating}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{spot.description}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <Badge variant="outline" className="text-xs bg-gray-50">{spot.cuisine}</Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {spot.distance_minutes} min walk
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Trending */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <TrendingUp className="text-skillbistro-orange" /> Trending Now
            </h2>

            {trendingLoading ? (
              <div className="space-y-4">
                 {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-xl" />)}
              </div>
            ) : (
              <div className="space-y-4">
                {trendingSpots?.map((spot: any, i) => (
                  <div key={spot.id} className="glass-card rounded-xl p-4 flex gap-4 items-center animate-fade-in cursor-pointer hover:bg-white/60 transition-colors" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="w-16 h-16 rounded-lg flex-shrink-0" style={{ backgroundColor: spot.image_color || '#FF9500' }} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{spot.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{spot.cuisine} • {spot.price_tier}</p>
                      <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 mt-1">
                        <Star className="h-3 w-3 fill-current" /> {spot.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Card className="glass-card bg-gradient-to-br from-skillbistro-orange/10 to-transparent border-skillbistro-orange/20 mt-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Student Deals</h3>
                <p className="text-sm text-gray-600 mb-4">Show your SRM ID at Potheri Food Street for 10% off on Tuesdays!</p>
                <Button className="w-full bg-skillbistro-orange hover:bg-skillbistro-orange/90 text-white">View All Deals</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FoodDiscovery;