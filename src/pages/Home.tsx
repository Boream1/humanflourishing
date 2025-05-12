
import React from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="w-full h-screen flex">
      {/* Left side content */}
      <div className="w-1/2 h-full flex flex-col justify-between p-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold text-gray-800 mb-12">
            Human<br />Flourishing
          </h1>
          
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <p className="text-sm text-gray-700 mb-1">Author: Cristina Vicedo</p>
            <p className="text-sm text-gray-700 mb-1">Code: 1234567</p>
            <p className="text-sm text-gray-700">Time estimate: 60-90 minutes</p>
          </div>
        </div>
        
        <Button asChild className="self-start mt-16 bg-red-400 hover:bg-red-500 text-white rounded-md px-8 py-6">
          <Link to="/chapter1" className="flex items-center gap-2">
            Start course
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </Button>
        
        <div className="text-xs text-gray-400 mt-auto">
          © {currentYear} IE University. All rights reserved.
        </div>
      </div>
      
      {/* Right side image */}
      <div className="w-1/2 h-full">
        <img 
          src="/lovable-uploads/0fa38892-6d16-4bf1-b52f-f397b0e51c00.png" 
          alt="Person with sunglasses" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
