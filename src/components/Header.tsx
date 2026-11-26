import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { scrollToTop } from '../lib/motion';
import BeeLogo from './BeeLogo';
import SectionLink from './SectionLink';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const sections = ['servicios', 'casos', 'faq', 'contacto'] as const;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleLang = () => setLanguage(language === 'es' ? 'en' : 'es');

  // El mismo menú se muestra en escritorio y dentro del menú móvil.
  const navItems = sections.map((id) => (
    <li key={id}>
      <SectionLink href={`#${id}`} onNavigate={closeMobileMenu}>{t.nav[id]}</SectionLink>
    </li>
  ));

  const langLabels = (
    <>
      <span className={language === 'es' ? 'lang-active' : ''}>ES</span>
      <span className="lang-sep">|</span>
      <span className={language === 'en' ? 'lang-active' : ''}>EN</span>
    </>
  );

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a
          href="/"
          className="logo"
          onClick={(e) => {
            // En las páginas internas el logo lleva al inicio.
            if (window.location.pathname !== '/') return;
            e.preventDefault();
            scrollToTop();
            closeMobileMenu();
          }}
        >
          <BeeLogo size={36} className="logo-icon" />
          <span className="logo-text">abeeFlow</span>
        </a>

        <ul className="nav-links">{navItems}</ul>

        <div className="header-toggles">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button className="lang-toggle" onClick={toggleLang} aria-label="Cambiar idioma">
            {langLabels}
          </button>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Navegación móvil">
        <ul className="mobile-nav-links">
          {navItems}
          <li className="mobile-toggles">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button className="lang-toggle-mobile" onClick={toggleLang}>
              {langLabels}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
