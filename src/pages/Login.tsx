
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreeJSBackground from '@/components/ThreeJSBackground';
import { LogIn, UserPlus, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login/signup process
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      <ThreeJSBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-6 animate-fade-in">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="absolute top-0 left-0 text-gray-500 hover:text-skillbistro-blue"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <Card className="glass border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-skillbistro-blue via-skillbistro-purple to-skillbistro-pink" />
          
          <CardHeader>
            <div className="flex justify-center mb-4">
              <h3 className="text-xl font-bold tracking-tight text-gradient">SkillBistro</h3>
            </div>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <Tabs 
            defaultValue="login" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-4 rounded-md">
              <TabsTrigger value="login" className="rounded-md data-[state=active]:shadow-sm">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-md data-[state=active]:shadow-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-white/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a 
                        href="#" 
                        className="text-xs text-skillbistro-blue hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="bg-white/50 focus:bg-white transition-colors"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </div>
                    ) : (
                      <>Sign in</>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input 
                        id="first-name"
                        required
                        className="bg-white/50 focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input 
                        id="last-name"
                        required
                        className="bg-white/50 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="name@example.com"
                      required
                      className="bg-white/50 focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      required
                      className="bg-white/50 focus:bg-white transition-colors"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating account...
                      </div>
                    ) : (
                      <>Create Account</>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="px-8 pb-6 pt-2 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to SkillBistro's Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
        
        {/* Floating elements animation */}
        <div className="absolute top-[-20px] left-[10%] w-16 h-16 rounded-full bg-skillbistro-blue/10 blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-20 h-20 rounded-full bg-skillbistro-purple/10 blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[20%] right-[-5%] w-24 h-24 rounded-full bg-skillbistro-pink/10 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Login;
