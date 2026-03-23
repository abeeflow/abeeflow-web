import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 72;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetPosition - headerHeight, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="logo" onClick={handleLogoClick}>
          <svg className="logo-icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <title>Logo de Abeeflow</title>
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
          <span className="logo-text">abeeFlow</span>
        </a>

        <ul className="nav-links">
          <li><a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>Servicios</a></li>
          <li><a href="#soluciones" onClick={(e) => handleSmoothScroll(e, '#soluciones')}>Soluciones</a></li>
          <li><a href="#nosotros" onClick={(e) => handleSmoothScroll(e, '#nosotros')}>Nosotros</a></li>
          <li><a href="#casos" onClick={(e) => handleSmoothScroll(e, '#casos')}>Casos de uso</a></li>
          <li><a href="#proceso" onClick={(e) => handleSmoothScroll(e, '#proceso')}>Proceso</a></li>
          <li><a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')}>Contacto</a></li>
        </ul>

        <a href="#contacto" className="nav-cta" onClick={(e) => handleSmoothScroll(e, '#contacto')}>Contactanos</a>

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Navegacion movil">
        <ul className="mobile-nav-links">
          <li><a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>Servicios</a></li>
          <li><a href="#soluciones" onClick={(e) => handleSmoothScroll(e, '#soluciones')}>Soluciones</a></li>
          <li><a href="#nosotros" onClick={(e) => handleSmoothScroll(e, '#nosotros')}>Nosotros</a></li>
          <li><a href="#casos" onClick={(e) => handleSmoothScroll(e, '#casos')}>Casos de uso</a></li>
          <li><a href="#proceso" onClick={(e) => handleSmoothScroll(e, '#proceso')}>Proceso</a></li>
          <li><a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')}>Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
