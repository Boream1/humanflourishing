
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname, isMenuOpen]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    console.log("Menu toggled, new state:", newState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const switchLanguage = (language: string) => {
    setCurrentLanguage(language);
    // Here you would implement actual language switching logic
  };

  return (
    <div className="page-container">
      <header className="main-header">
        <div className="header-container">
          <div className="logo-title-container">
            <a href="https://www.ie.edu" target="_blank" rel="noreferrer" className="logo">
              <img alt="IE University Logo" className="ie-logo" src="/assets/IE_University_logo.svg" />
            </a>
            <h1 className="course-title">Human Flourishing</h1>
          </div>
          
          <div className="header-actions">
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
          </div>
        </div>
      </header>

      {/* Floating hamburger menu button */}
      <button 
        className="menu-toggle" 
        id="menuToggle" 
        aria-label="Navigation Menu"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Navigation menu - positioned after the button for proper z-index stacking */}
      <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`} id="mainNav">
        <button 
          aria-label="Close navigation menu" 
          className="nav-close"
          onClick={closeMenu}
        >
          <X size={24} />
        </button>
        
        <ul className="nav-list">
          <li className={`nav-item ${currentPath === '/' ? 'active-chapter' : ''}`}>
            <Link to="/" className={currentPath === '/' ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={`nav-item ${currentPath === '/chapter1' ? 'active-chapter' : ''}`}>
            <Link to="/chapter1" className={currentPath === '/chapter1' ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              1. Being Human
            </Link>
          </li>
          <li className={`nav-item ${currentPath === '/chapter2' ? 'active-chapter' : ''}`}>
            <Link to="/chapter2" className={currentPath === '/chapter2' ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              2. Cultivating Awareness
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chapter3" className={currentPath === '/chapter3' ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              3. Autonomy and Motivation
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chapter4" className={currentPath === '/chapter4' ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              4. Building Resilience
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chapter5" className={currentPath === '/chapter5' ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              5. Ownership and Practice
            </Link>
          </li>
        </ul>
      </nav>

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
