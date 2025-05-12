
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
