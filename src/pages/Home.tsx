
import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Logo container - positioned to align with content */}
      <div className="absolute top-8 md:left-16 left-8 z-10">
        <a href="https://www.ie.edu" target="_blank" rel="noreferrer">
          <img 
            src="/assets/IE_University_logo.svg" 
            alt="IE University Logo" 
            className={`w-20 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
          />
        </a>
      </div>
      
      {/* Language selector buttons */}
      <div className="absolute top-8 md:right-16 right-8 z-10 flex gap-4">
        <button 
          onClick={() => setLanguage('en')} 
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            language === 'en' 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-800 hover:bg-gray-100'
          }`}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('es')} 
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            language === 'es' 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-800 hover:bg-gray-100'
          }`}
        >
          Español
        </button>
      </div>
      
      <div className="w-full h-full flex flex-grow">
        {/* Left side content */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} h-full flex flex-col justify-between p-8 md:p-16`}>
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
                  {t('start course')}
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
        
        {/* Right side image - taking full height, hidden on mobile */}
        {!isMobile && (
          <div className="w-1/2 h-screen relative">
            <img 
              src="/assets/Cover.png" 
              alt="Course cover image" 
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-out opacity-0 ${imgLoaded ? 'fade-in' : ''}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

