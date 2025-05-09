
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

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

  React.useEffect(() => {
    // Set copyright year dynamically
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
      copyrightYearElement.textContent = new Date().getFullYear().toString();
    }
    
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              <img alt="IE University Logo" className="ie-logo" src="assets/IE_University_logo.svg" />
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
            
            <button 
              className="menu-toggle" 
              id="menuToggle" 
              aria-label="Navigation Menu"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`} id="navList">
            <li className="nav-item">
              <Link to="/" className={currentPath === '/' ? 'nav-link active' : 'nav-link'}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chapter1" className={currentPath === '/chapter1' ? 'nav-link active' : 'nav-link'}>
                Chapter 1
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chapter2" className={currentPath === '/chapter2' ? 'nav-link active' : 'nav-link'}>
                Chapter 2
              </Link>
            </li>
          </ul>
        </nav>
      </header>

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
