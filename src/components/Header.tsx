import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav>
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </div>
          <ul className="nav-links">
            <li><a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>SERVICIOS</a></li>
            <li><a href="#nosotros" onClick={(e) => handleSmoothScroll(e, '#nosotros')}>NOSOTROS</a></li>
            <li><a href="#casos" onClick={(e) => handleSmoothScroll(e, '#casos')}>CASOS DE USO</a></li>
            <li><a href="#proceso" onClick={(e) => handleSmoothScroll(e, '#proceso')}>PROCESO</a></li>
            <li><a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')}>CONTACTO</a></li>
          </ul>
          
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>
        
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li><a href="#servicios" onClick={(e) => handleSmoothScroll(e, '#servicios')}>SERVICIOS</a></li>
            <li><a href="#nosotros" onClick={(e) => handleSmoothScroll(e, '#nosotros')}>NOSOTROS</a></li>
            <li><a href="#casos" onClick={(e) => handleSmoothScroll(e, '#casos')}>CASOS DE USO</a></li>
            <li><a href="#proceso" onClick={(e) => handleSmoothScroll(e, '#proceso')}>PROCESO</a></li>
            <li><a href="#contacto" onClick={(e) => handleSmoothScroll(e, '#contacto')}>CONTACTO</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

