import './Footer.css';

const Footer = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 72;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetPosition - headerHeight, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 15 L7 18 L10 21" stroke="#FBBF24" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26 15 L29 18 L26 21" stroke="#FBBF24" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 13 L21 15 L21.5 22 L18 26 L14.5 22 L15 15 Z" fill="#FBBF24"/>
                <line x1="15.5" y1="16.5" x2="20.5" y2="16.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="15" y1="19.5" x2="21" y2="19.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="15.5" y1="23" x2="20.5" y2="23" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="18" cy="11" r="3" fill="#FBBF24"/>
                <path d="M16.5 8.5 Q15 7 15 5.5" stroke="#FBBF24" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
                <path d="M19.5 8.5 Q21 7 21 5.5" stroke="#FBBF24" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
              </svg>
              abeeFlow
            </div>
            <p className="footer-brand-desc">Soluciones tecnologicas personalizadas para tu industria. Automatizacion inteligente e integraciones a medida.</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/abeeflow/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/abeeflow.co" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Servicios</div>
            <a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>Automatizacion</a>
            <a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>Migracion de datos</a>
            <a href="#soluciones" onClick={(e) => handleSmoothScroll(e, '#soluciones')}>Soluciones SaaS</a>
            <a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>Desarrollo web</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Empresa</div>
            <a href="#nosotros" onClick={(e) => handleSmoothScroll(e, '#nosotros')}>Nosotros</a>
            <a href="#casos" onClick={(e) => handleSmoothScroll(e, '#casos')}>Casos de uso</a>
            <a href="#proceso" onClick={(e) => handleSmoothScroll(e, '#proceso')}>Proceso</a>
            <a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')}>Contacto</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Contacto</div>
            <a href="mailto:abeeflow.info@gmail.com">abeeflow.info@gmail.com</a>
            <a href="https://wa.me/51938197341" target="_blank" rel="noopener noreferrer">+51 938 197 341</a>
            <a href="https://wa.me/33686251232" target="_blank" rel="noopener noreferrer">+33 6 86 25 12 32</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 AbeeFlow. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
