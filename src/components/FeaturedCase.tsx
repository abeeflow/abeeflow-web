import { useLanguage } from '../i18n/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import './FeaturedCase.css';

const FeaturedCase = () => {
  const { t } = useLanguage();

  return (
    <section id="caso-destacado" className="featured-case" aria-label={t.featured.title}>
      <div className="container">
        <RevealOnScroll>
          <div className="featured-case-box">
            <div>
              <div className="featured-case-badge">{t.featured.badge}</div>
              <h2 className="featured-case-title">{t.featured.title}</h2>
              <p className="featured-case-desc">{t.featured.desc}</p>
            </div>

            <div className="featured-case-compare">
              <div className="featured-case-row featured-case-before">
                <span className="featured-case-label">{t.featured.before.label}</span>
                <span className="featured-case-value">{t.featured.before.value}</span>
                <span className="featured-case-bar"></span>
              </div>
              <div className="featured-case-row featured-case-after">
                <span className="featured-case-label">{t.featured.after.label}</span>
                <span className="featured-case-value">{t.featured.after.value}</span>
                <span className="featured-case-bar"></span>
              </div>
              <p className="featured-case-note">{t.featured.note}</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default FeaturedCase;
