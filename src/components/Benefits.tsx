import { useLanguage } from '../i18n/LanguageContext';
import { VETSUITE_DEMO_URL } from '../lib/links';
import RevealOnScroll from './RevealOnScroll';
import './Benefits.css';

// Un icono por cada punto del servicio principal, en el mismo orden.
const benefitIcons = [
  'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
];

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// Servicios: la automatización primero, en tres tarjetas. Lo demás que
// hacemos va en una fila de texto, y VetSuite en una franja con su demo.
const Benefits = () => {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.services.title}</h2>
        </div>

        <RevealOnScroll>
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
        </RevealOnScroll>

        <div className="services-also">
          <h3 className="services-also-title">{t.services.alsoTitle}</h3>
          <ul className="services-also-list">
            {t.services.items.map((service) => (
              <li key={service.title} className="services-also-item">
                <span className="services-also-name">{service.title}</span>
                <span className="services-also-desc">{service.shortDesc}</span>
              </li>
            ))}
          </ul>
          <a href="/desarrollo-web" className="btn-link-arrow">
            {t.services.pageLinks.dev}
            {arrow}
          </a>
        </div>

        <div className="services-product">
          <div>
            <h3 className="services-product-title">{t.product.title}</h3>
            <p className="services-product-desc">{t.product.desc}</p>
          </div>
          <div className="services-product-actions">
            <a href={VETSUITE_DEMO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.product.demo}
              {arrow}
            </a>
            <a href="/vetsuite" className="btn-link-arrow">
              {t.product.more}
              {arrow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
