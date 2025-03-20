
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
  index?: number;
  linkHref: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
  iconClassName,
  index = 0,
  linkHref
}) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-6 hover:translate-y-[-3px] transition-all duration-300 hover:shadow-lg group",
        className
      )}
      style={{ 
        animationDelay: `${index * 0.1}s` 
      }}
    >
      <div className="mb-4 relative overflow-hidden">
        <div 
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 mb-2",
            iconClassName || "bg-skillbistro-blue/10 text-skillbistro-blue"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shine_3s_ease-in-out_infinite] opacity-0 group-hover:opacity-100" style={{ animationDelay: `${index * 0.5}s` }} />
      </div>

      <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 text-balance">{description}</p>
      
      <a href={linkHref} className="w-full block">
        <Button variant="outline" className="w-full justify-start mt-2 group/btn">
          <span className="mr-auto">Explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 transform group-hover/btn:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </a>
    </div>
  );
};

export default FeatureCard;
