import { useLanguage } from '../i18n/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import './FeaturedCase.css';

// El caso con más impacto, arriba de la lista de casos.
const FeaturedCase = () => {
  const { t } = useLanguage();

  return (
    <RevealOnScroll className="featured-case">
      <article className="featured-case-box">
        <div>
          <h3 className="featured-case-title">{t.featured.title}</h3>
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
      </article>
    </RevealOnScroll>
  );
};

export default FeaturedCase;
