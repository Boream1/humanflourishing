// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
  const setupMobileMenu = () => {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    
    if (menuToggle && navList) {
      menuToggle.addEventListener('click', function() {
        navList.classList.toggle('show');
        
        // Animation for the menu icon
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
          span.classList.toggle('active');
        });
      });
      
      // Close menu when clicking on a link
      const navLinks = navList.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            navList.classList.remove('show');
            
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
              span.classList.remove('active');
            });
          }
        });
      });
    }
  };

  // Add animation to the menu icon
  const addMenuStyles = () => {
    if (!document.querySelector('#menu-toggle-styles')) {
      const style = document.createElement('style');
      style.id = 'menu-toggle-styles';
      style.innerHTML = `
        .menu-toggle span.active:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        
        .menu-toggle span.active:nth-child(2) {
          opacity: 0;
        }
        
        .menu-toggle span.active:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Detect current page and update menu
  const updateCurrentPageInMenu = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Accessibility enhancements
  const enhanceAccessibility = () => {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
      if (!el.hasAttribute('aria-label') && !el.textContent.trim()) {
        console.warn('Element missing accessible label:', el);
      }
    });
  };
  
  // Dynamic copyright year
  const updateCopyrightYear = () => {
    const copyrightElements = document.querySelectorAll('#copyright-year');
    copyrightElements.forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  };
  
  // Initialize with a small delay to ensure React has rendered
  setTimeout(() => {
    setupMobileMenu();
    addMenuStyles();
    updateCurrentPageInMenu();
    enhanceAccessibility();
    updateCopyrightYear();
  }, 500);
});

// Language detection and redirection
function detectLanguage() {
  // Browser language detection
  const userLang = navigator.language || navigator.userLanguage;
  const langPrefix = userLang.split('-')[0];
  
  // Check URL for language parameter instead of path
  const urlParams = new URLSearchParams(window.location.search);
  const currentLang = urlParams.get('lang');
  
  if (!currentLang) {
    // Default is English, redirect to Spanish if detected
    if (langPrefix === 'es') {
      console.log('Spanish language detected');
      // Could add a language parameter instead of changing path
      // window.location.search = '?lang=es';
    }
  }
}

// Initialize, but keep commented for now as we're only working in English
// detectLanguage();
