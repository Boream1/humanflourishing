
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
          
          <div className="menu-button-container">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none hamburger-button" aria-label="Open menu">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <nav className="flex flex-col py-6">
                  <Link 
                    to="/" 
                    className={`py-2 px-4 hover:bg-gray-100 rounded text-lg ${location.pathname === '/' ? 'active-link' : ''}`}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/chapter1" 
                    className={`py-2 px-4 hover:bg-gray-100 rounded text-lg ${location.pathname === '/chapter1' ? 'active-link' : ''}`}
                  >
                    LESSON 1: Being Human
                  </Link>
                  <Link 
                    to="/chapter2" 
                    className={`py-2 px-4 hover:bg-gray-100 rounded text-lg ${location.pathname === '/chapter2' ? 'active-link' : ''}`}
                  >
                    LESSON 2: Cultivating Awareness: Emotions and Cognition
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
