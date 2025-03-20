
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Skill Swap', href: '#skill-swap' },
    { name: 'Food Discovery', href: '#food-discovery' },
    { name: 'Budget', href: '#budget' },
    { name: 'Career Path', href: '#career-path' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "glass border-b border-white/10 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <span className="text-2xl font-bold tracking-tight animate-fade-in text-gradient">
            SkillBistro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium transition-colors hover:text-skillbistro-blue"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="relative z-10 animate-fade-in">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-skillbistro-blue transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <Link to="/login">
            <Button 
              size="sm"
              className="animate-fade-in bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-200 ease-in-out" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-200 ease-in-out" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 glass border-b border-white/10 md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block py-2 text-base font-medium hover:text-skillbistro-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
            <Button 
              className="w-full bg-skillbistro-blue hover:bg-skillbistro-blue/90 text-white"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
