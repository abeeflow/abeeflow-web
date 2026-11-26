import { useState } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import FeaturedCase from './FeaturedCase';
import './Cases.css';

// Un icono por caso, en el mismo orden que t.cases.items.
const caseIcons: ReactElement[] = [
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
];

// El primer caso va arriba como caso destacado; de los demás se ven
// cuatro y el resto aparece al expandir.
const VISIBLE_COUNT = 4;

const Cases = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const rest = t.cases.items.slice(1);
  const cases = showAll ? rest : rest.slice(0, VISIBLE_COUNT);

  return (
    <section id="casos" className="cases">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.cases.title}</h2>
          <p className="section-subtitle">{t.cases.subtitle}</p>
        </div>

        <FeaturedCase />

        <div className="cases-grid">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.title}
              className={index >= VISIBLE_COUNT ? 'case-new' : undefined}
              style={index >= VISIBLE_COUNT ? ({ '--i': index - VISIBLE_COUNT } as CSSProperties) : undefined}
            >
              <article
                className={`case-card ${index % 2 === 0 ? 'case-card-warm' : 'case-card-blue'}`}
              >
                <div className="case-company">
                  <div className="case-company-logo" aria-hidden="true">{caseIcons[index + 1]}</div>
                  <div className="case-company-name">{caseItem.who}</div>
                </div>
                <h3 className="case-title">{caseItem.title}</h3>
                <dl className="case-compare">
                  <div className="case-step">
                    <dt>{t.cases.before}</dt>
                    <dd>{caseItem.before}</dd>
                  </div>
                  <div className="case-step case-step-after">
                    <dt>{t.cases.after}</dt>
                    <dd>{caseItem.after}</dd>
                  </div>
                </dl>
              </article>
            </div>
          ))}
        </div>

        <div className="cases-more">
          <button
            type="button"
            className="btn-link-arrow"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
          >
            {showAll ? t.cases.showLess : t.cases.showAll}
            <svg className={showAll ? 'cases-more-up' : undefined} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
