
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Globe } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useLanguage } from '@/context/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const [hasHeaderShadow, setHeaderShadow] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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

  const handleLanguageChange = (value: string) => {
    setLanguage(value as "en" | "es");
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
          
          <div className="menu-button-container">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none hamburger-button" aria-label="Open menu">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <nav className="flex flex-col py-6">
                  <div className="py-4 px-4 mb-4 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Globe className="mr-2" size={18} />
                      {t('selectLanguage')}
                    </label>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span>{language === 'en' ? t('english') : t('spanish')}</span>
                        <span className="ml-2">▼</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-white">
                        <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleLanguageChange('en')}>
                          {t('english')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleLanguageChange('es')}>
                          {t('spanish')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <Link 
                    to="/" 
                    className={`py-2 px-4 hover:bg-gray-100 rounded text-lg ${location.pathname === '/' ? 'active-link' : ''}`}
                  >
                    {t('home')}
                  </Link>
                  <Link 
                    to="/chapter1" 
                    className={`py-2 px-4 hover:bg-gray-100 rounded text-lg ${location.pathname === '/chapter1' ? 'active-link' : ''}`}
                  >
                    {t('lesson1')}
                  </Link>
                  <Link 
                    to="/chapter2" 
                    className={`py-2 px-4 hover:bg-gray-100 rounded text-lg ${location.pathname === '/chapter2' ? 'active-link' : ''}`}
                  >
                    {t('lesson2')}
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
