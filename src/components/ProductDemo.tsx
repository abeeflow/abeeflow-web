import { useLanguage } from '../i18n/LanguageContext';
import { VETSUITE_DEMO_URL } from '../lib/links';
import RevealOnScroll from './RevealOnScroll';
import './ProductDemo.css';

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ProductDemo = () => {
  const { t } = useLanguage();

  return (
    <section className="product-demo" aria-label={t.product.title}>
      <div className="container">
        <RevealOnScroll>
          <div className="product-demo-box">
            <div>
              <div className="product-demo-tag">{t.product.tag}</div>
              <h2 className="product-demo-title">{t.product.title}</h2>
              <p className="product-demo-desc">{t.product.desc}</p>
              <div className="product-demo-actions">
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
            <div className="product-demo-roles">
              {t.product.roles.map((role) => (
                <a key={role.name} href={VETSUITE_DEMO_URL} target="_blank" rel="noopener noreferrer" className="product-demo-role">
                  <span className="product-demo-role-name">{role.name}</span>
                  <span className="product-demo-role-desc">{role.desc}</span>
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ProductDemo;
