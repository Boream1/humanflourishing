
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [hasHeaderShadow, setHeaderShadow] = useState(false);

  // Determine if the current path is a chapter path
  const isChapterPath = currentPath.includes('chapter');
  const chapterNumber = isChapterPath ? currentPath.replace('/chapter', '') : null;

  useEffect(() => {
    // Set copyright year dynamically
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
      copyrightYearElement.textContent = new Date().getFullYear().toString();
    }
    
    // Close menu when route changes
    setIsMenuOpen(false);

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      console.log("Menu opened - body scroll disabled");
    } else {
      document.body.style.overflow = 'auto';
      console.log("Menu closed - body scroll enabled");
    }

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
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, isMenuOpen]);

  const toggleMenu = () => {
    console.log("Toggle menu called. Current state:", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log("New menu state:", !isMenuOpen);
  };

  const closeMenu = () => {
    console.log("Close menu called");
    setIsMenuOpen(false);
  };

  const switchLanguage = (language: string) => {
    setCurrentLanguage(language);
    // Here you would implement actual language switching logic
    console.log("Language switched to:", language);
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
            <button 
              className="hamburger-button" 
              onClick={toggleMenu} 
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation menu overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-container">
          <div className="menu-header">
            <div className="language-switcher">
              <button 
                className={`lang-btn ${currentLanguage === 'English' ? 'active' : ''}`}
                onClick={() => switchLanguage('English')}
              >
                English
              </button>
              <span className="lang-separator">|</span>
              <button 
                className={`lang-btn ${currentLanguage === 'Español' ? 'active' : ''}`}
                onClick={() => switchLanguage('Español')}
              >
                Español
              </button>
            </div>
            
            <button 
              aria-label="Close navigation menu" 
              className="menu-close"
              onClick={closeMenu}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="menu-nav">
            <ul className="menu-list">
              <li className="menu-item">
                <Link to="/" className={currentPath === '/' ? 'menu-link active' : 'menu-link'} onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/chapter0" className={currentPath === '/chapter0' ? 'menu-link active' : 'menu-link'} onClick={closeMenu}>
                  0. Introduction
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/chapter1" className={currentPath === '/chapter1' ? 'menu-link active blue-highlight' : 'menu-link'} onClick={closeMenu}>
                  1. Being Human
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/chapter2" className={currentPath === '/chapter2' ? 'menu-link active' : 'menu-link'} onClick={closeMenu}>
                  2. Cultivating Awareness
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/chapter3" className={currentPath === '/chapter3' ? 'menu-link active' : 'menu-link'} onClick={closeMenu}>
                  3. Autonomy and Motivation
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/chapter4" className={currentPath === '/chapter4' ? 'menu-link active' : 'menu-link'} onClick={closeMenu}>
                  4. Building Resilience
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/chapter5" className={currentPath === '/chapter5' ? 'menu-link active' : 'menu-link'} onClick={closeMenu}>
                  5. Ownership and Practice
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="main-content">
        {children}
      </main>

      <footer className="main-footer">
        <p>&copy; <span id="copyright-year"></span> IE University. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
