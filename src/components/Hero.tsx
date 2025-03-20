
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from 'framer-motion';

const Hero = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    });
  }, [controls]);

  const scrollToContent = () => {
    document.getElementById('skill-swap')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 pt-20 pb-16 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background to-transparent z-0"></div>
      
      <div className="max-w-4xl mx-auto text-center z-10 space-y-8 animate-fade-in">
        <div className="inline-block rounded-full px-4 py-1.5 text-sm font-medium bg-white shadow-sm border border-gray-100 mb-4">
          <span className="mr-1.5 inline-block w-2 h-2 rounded-full bg-skillbistro-green animate-pulse-slow"></span>
          Introducing SkillBistro for College Students
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight tracking-tight">
          The Ultimate <span className="text-gradient">College Life Companion</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your AI-driven platform to swap skills, discover food, manage budgets, and plan careers—all in one beautiful, immersive experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            className="bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white shadow-sm sm:min-w-[160px]"
            onClick={() => window.location.href = '/login'}
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="sm:min-w-[160px] border-gray-200"
            onClick={scrollToContent}
          >
            Explore Features
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce duration-slow">
        <button
          onClick={scrollToContent}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <ArrowDown className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
      {/* Circle decorations */}
      <div className="absolute top-1/3 left-10 w-64 h-64 rounded-full bg-skillbistro-blue/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-skillbistro-purple/5 blur-3xl"></div>
    </section>
  );
};

export default Hero;
