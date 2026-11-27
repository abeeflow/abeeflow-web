import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import './FeaturedCase.css';

// El caso con más impacto, arriba de la lista de casos.
const FeaturedCase = () => {
  const { t } = useLanguage();
  // La barra de "Ahora" empieza llena, igual que la de "Antes", y se
  // encoge una sola vez al verse: muestra el paso de 8 horas a 30 min.
  const compareRef = useRef<HTMLDivElement>(null);
  const seen = useInView(compareRef, { once: true, amount: 0.6 });

  return (
    <div className="featured-case">
      <article className="featured-case-box">
        <div>
          <h3 className="featured-case-title">{t.featured.title}</h3>
          <p className="featured-case-desc">{t.featured.desc}</p>
        </div>

        <div ref={compareRef} className={`featured-case-compare ${seen ? '' : 'is-pending'}`}>
          <div className="featured-case-row featured-case-before">
            <span className="featured-case-label">{t.featured.before.label}</span>
            <span className="featured-case-track" aria-hidden="true">
              <span className="featured-case-fill"></span>
            </span>
            <span className="featured-case-value">{t.featured.before.value}</span>
          </div>
          <div className="featured-case-row featured-case-after">
            <span className="featured-case-label">{t.featured.after.label}</span>
            <span className="featured-case-track" aria-hidden="true">
              <span className="featured-case-fill"></span>
            </span>
            <span className="featured-case-value">{t.featured.after.value}</span>
          </div>
        </div>

        <dl className="featured-case-stats">
          {t.featured.stats.map((stat) => (
            <div key={stat.value} className="featured-case-stat">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </div>
  );
};

export default FeaturedCase;
