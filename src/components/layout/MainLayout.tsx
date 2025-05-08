
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="page-container">
      <header className="main-header">
        <div className="logo">
          <a href="https://www.ie.edu" target="_blank" rel="noreferrer">
            <img src="/assets/ie-logo-blue.svg" alt="IE University Logo" className="ie-logo" />
          </a>
        </div>
        <nav className="main-nav">
          <button className="menu-toggle" id="menuToggle" aria-label="Navigation Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className="nav-list" id="navList">
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
