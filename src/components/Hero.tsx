import { useLanguage } from '../i18n/LanguageContext';
import './Hero.css';

const flowIcons = [
  // Email
  <svg key="email" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>,
  // AI / Sparkles
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // CRM / Users
  <svg key="crm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>,
  // Slack / Bell
  <svg key="bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
];

const Hero = () => {
  const { t } = useLanguage();
  const words = t.hero.words;
  const headlineWord = words[0];
  const flowNodes = t.hero.flowNodes;

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
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              {t.hero.badge}
            </div>

            <h1>
              <span className="sr-only">{headlineWord} {t.hero.subtitle}</span>
              <span aria-hidden="true">
                <span className="rotating-text-container">
                  <span className="rotating-text">
                    <span className="word" key={headlineWord}>{headlineWord}</span>
                  </span>
                </span>
                <br />
                <span className="rest-text">{t.hero.subtitle}</span>
              </span>
            </h1>

            <p>{t.hero.description}</p>

            <div className="hero-buttons">
              <a href="#contacto" className="btn-primary" onClick={(e) => handleSmoothScroll(e, '#contacto')}>
                {t.hero.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#casos" className="btn-link-arrow" onClick={(e) => handleSmoothScroll(e, '#casos')}>
                {t.hero.secondary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-flow" aria-hidden="true">
              <svg className="hero-flow-lines" viewBox="0 0 400 320" preserveAspectRatio="none">
                {/* 1 → 2 (top horizontal) */}
                <path d="M 130 60 L 270 60" />
                {/* 2 → 3 (right vertical) */}
                <path d="M 340 100 L 340 220" />
                {/* 3 → 4 (bottom horizontal, reverse) */}
                <path d="M 270 260 L 130 260" />
              </svg>

              {flowNodes.map((node, index) => (
                <div key={index} className={`hero-flow-node hero-flow-node-${index + 1}`}>
                  <div className="hero-flow-node-icon">
                    {flowIcons[index]}
                  </div>
                  <div className="hero-flow-node-label">{node.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
