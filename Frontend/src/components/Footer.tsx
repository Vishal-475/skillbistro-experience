
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-bold tracking-tight text-gradient">SkillBistro</h3>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              The ultimate AI-driven college life companion for skill swapping, food discovery, budget management, and career guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-skillbistro-blue transition-colors">
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
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-skillbistro-blue transition-colors">
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
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-skillbistro-blue transition-colors">
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
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#skill-swap" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Skill Swap</a></li>
              <li><a href="#food-discovery" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Food Discovery</a></li>
              <li><a href="#budget" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Budget Structuring</a></li>
              <li><a href="#career-path" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Career Path Guidance</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Tutorials</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-500 hover:text-skillbistro-blue text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} SkillBistro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-skillbistro-blue transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-skillbistro-blue transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-skillbistro-blue transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
