import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import './Benefits.css';

const serviceIcons = [
  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
];

const mainIcon = 'M13 10V3L4 14h7v7l9-11h-7z';

// Un icono por cada punto del servicio principal, en el mismo orden.
const benefitIcons = [
  'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
];
const arrowIcon = 'M5 12h14M12 5l7 7-7 7';

const ServiceCard = ({ icon, title, shortDesc, features, viewDetail, back }: { icon: string; title: string; shortDesc: string; features: string[]; viewDetail: string; back: string }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`flip-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      aria-pressed={flipped}
      aria-label={`${title}. ${flipped ? back : viewDetail}`}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="service-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={icon}/>
            </svg>
          </div>
          <h3 className="service-title">{title}</h3>
          <p className="service-desc">{shortDesc}</p>
          <div className="flip-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>{viewDetail}</span>
          </div>
        </div>
        <div className="flip-card-back">
          <h3 className="service-title-back">{title}</h3>
          <ul className="service-features">
            {features.map((feature, i) => (
              <li key={i}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flip-hint flip-hint-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>{back}</span>
          </div>
        </div>
      </div>
    </button>
  );
};

const Benefits = () => {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>
        <RevealOnScroll>
          <div className="service-main">
            <div className="service-main-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={mainIcon}/>
              </svg>
              {t.services.main.tag}
            </div>
            <h3 className="service-main-title">{t.services.main.title}</h3>
            <p className="service-main-desc">{t.services.main.desc}</p>
            <ul className="service-main-benefits">
              {t.services.main.benefits.map((benefit, index) => (
                <li key={benefit.title} className="service-main-benefit">
                  <div className="service-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={benefitIcons[index]}/>
                    </svg>
                  </div>
                  <span className="service-main-benefit-title">{benefit.title}</span>
                  <span className="service-main-benefit-desc">{benefit.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <h3 className="services-also-title">{t.services.alsoTitle}</h3>
        <div className="services-grid">
          {t.services.items.map((service, index) => (
            <RevealOnScroll key={service.title} delay={0.05 * index}>
              <ServiceCard icon={serviceIcons[index]} title={service.title} shortDesc={service.shortDesc} features={[...service.features]} viewDetail={t.services.viewDetail} back={t.services.back} />
            </RevealOnScroll>
          ))}
        </div>
        <div className="services-page-links">
          <a href="/desarrollo-web" className="btn-link-arrow">
            {t.services.pageLinks.dev}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={arrowIcon}/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
