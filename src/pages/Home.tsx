
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Left side content */}
      <div className="w-1/2 h-full flex flex-col justify-between p-8 md:p-16">
        {/* Module 1: Title, text and button - vertically centered */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-md">
            <h1 
              className={`text-4xl md:text-5xl font-bold text-gray-800 mb-8 md:mb-12 transition-all duration-700 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Human<br />Flourishing
            </h1>
            
            <div 
              className={`border-l-4 border-red-500 pl-4 py-2 mb-8 transition-all duration-700 delay-300 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="text-sm text-gray-700 mb-1">Author: Cristina Vicedo</p>
              <p className="text-sm text-gray-700 mb-1">Code: 1234567</p>
              <p className="text-sm text-gray-700">Time estimate: 60-90 minutes</p>
            </div>
            
            <Button 
              asChild 
              className={`mt-6 bg-red-400 hover:bg-red-500 text-white rounded-md px-6 py-4 md:px-8 md:py-6 transition-all duration-700 delay-600 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link to="/chapter1" className="flex items-center gap-2">
                Start course
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Module 2: Copyright - aligned left */}
        <div 
          className={`text-xs text-gray-400 text-left transition-all duration-700 delay-900 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          © {currentYear} IE University. All rights reserved.
        </div>
      </div>
      
      {/* Right side image - taking full height */}
      <div className="w-1/2 h-screen relative">
        <img 
          src="assets/Cover.png" 
          alt="Course cover image" 
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
    </div>
  );
};

export default Home;
