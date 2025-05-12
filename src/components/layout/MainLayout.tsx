
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const [hasHeaderShadow, setHeaderShadow] = useState(false);

  useEffect(() => {
    // Add scroll event listener for header shadow
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setHeaderShadow(true);
      } else {
        setHeaderShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to check if a path is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="page-container">
      <header className={`main-header ${hasHeaderShadow ? 'header-shadow' : ''}`}>
        <div className="header-container">
          <div className="logo-title-container">
            <a href="https://www.ie.edu" target="_blank" rel="noreferrer" className="logo">
              <img alt="IE University Logo" className="ie-logo" src="/assets/IE_University_logo.svg" />
            </a>
            <h1 className="course-title">Human Flourishing</h1>
          </div>
          
          <div className="header-actions">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none" aria-label="Open menu">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col py-6">
                  <Link 
                    to="/" 
                    className={`py-2 px-4 rounded text-lg relative flex items-center ${isActiveRoute('/') ? 'bg-primary text-white font-medium' : 'hover:bg-gray-100'}`}
                  >
                    <span className="flex-1">Home</span>
                    {isActiveRoute('/') && <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l"></div>}
                  </Link>
                  <Link 
                    to="/chapter1" 
                    className={`py-2 px-4 rounded text-lg relative flex items-center ${isActiveRoute('/chapter1') ? 'bg-primary text-white font-medium' : 'hover:bg-gray-100'}`}
                  >
                    <span className="flex-1">LESSON 1: Being Human</span>
                    {isActiveRoute('/chapter1') && <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l"></div>}
                  </Link>
                  <Link 
                    to="/chapter2" 
                    className={`py-2 px-4 rounded text-lg relative flex items-center ${isActiveRoute('/chapter2') ? 'bg-primary text-white font-medium' : 'hover:bg-gray-100'}`}
                  >
                    <span className="flex-1">LESSON 2: Cultivating Awareness: Emotions and Cognition</span>
                    {isActiveRoute('/chapter2') && <div className="absolute right-0 top-0 h-full w-1 bg-white rounded-l"></div>}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
