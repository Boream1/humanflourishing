// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle functionality
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

  // Add animation to the menu icon
  const style = document.createElement('style');
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

  // Detect current page and update menu
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
  
  // Accessibility enhancements
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusableElements.forEach(el => {
    if (!el.hasAttribute('aria-label') && !el.textContent.trim()) {
      console.warn('Element missing accessible label:', el);
    }
  });
  
  // Dynamic copyright year
  const copyrightElements = document.querySelectorAll('#copyright-year');
  copyrightElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

// Language detection and redirection
function detectLanguage() {
  // Browser language detection
  const userLang = navigator.language || navigator.userLanguage;
  const langPrefix = userLang.split('-')[0];
  
  // Check if we're already in a language folder
  const currentPath = window.location.pathname;
  const inLangFolder = /\/(es|en)\//.test(currentPath);
  
  if (!inLangFolder) {
    // Default is English, redirect to Spanish if detected
    if (langPrefix === 'es') {
      // Check if Spanish version exists
      const esPath = `/es${currentPath}`;
      // This is just a check - in production you'd verify the file exists
      console.log('Would redirect to:', esPath);
      // Uncomment to enable redirection
      // window.location.href = esPath;
    }
  }
}

// Initialize, but keep commented for now as we're only working in English
// detectLanguage();
