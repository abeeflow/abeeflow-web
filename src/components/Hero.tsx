import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_URL } from '../lib/links';
import SectionLink from './SectionLink';
import HeroHoneycomb from './HeroHoneycomb';
import './Hero.css';

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// Destino de cada tarjeta de "dos caminos", en el mismo orden que el texto.
const pathLinks = ['#servicios', '#caso-migracion'];

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              {t.hero.badge}
            </div>

            <h1>
              {t.hero.title} <span className="hero-highlight">{t.hero.highlight}</span>
            </h1>

            <p>{t.hero.description}</p>

            <div className="hero-buttons">
              <SectionLink href="#contacto" className="btn-primary">
                {t.hero.cta}
                {arrow}
              </SectionLink>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-link-arrow">
                {t.hero.whatsapp}
                {arrow}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <HeroHoneycomb />
          </div>
        </div>

        <div className="hero-paths" aria-label={t.paths.aria}>
          {t.paths.items.map((path, index) => (
            <div key={path.tag} className="hero-path">
              <span className="hero-path-tag">{path.tag}</span>
              <h2 className="hero-path-title">{path.title}</h2>
              <p className="hero-path-desc">{path.desc}</p>
              <SectionLink href={pathLinks[index]} className="btn-link-arrow">
                {path.link}
                {arrow}
              </SectionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
