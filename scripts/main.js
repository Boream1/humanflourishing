
// Funcionalidad para el menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      navList.classList.toggle('show');
      
      // Animación para el icono del menú
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(span => {
        span.classList.toggle('active');
      });
    });
    
    // Cerrar menú al hacer clic en un enlace
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

  // Añadir animación al ícono del menú
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

  // Detectar la página actual y actualizar el menú
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
});
