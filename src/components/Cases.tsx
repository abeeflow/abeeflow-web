import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Cases.css';

const caseIcons: ReactElement[] = [
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
];

const caseLogos = ['RAI', 'FDA', 'SSA', 'DHI', 'SFA', 'HRS', 'CCA', 'DMS', 'OSS'];

const Cases = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cases = t.cases.items;

  const scrollCarousel = (direction: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.querySelector('.case-card')?.clientWidth || 0;
    const gap = 32;

    const newIndex = currentIndex + (direction * 2);
    if (newIndex < 0) {
      setCurrentIndex(0);
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    if (newIndex >= cases.length) {
      setCurrentIndex(Math.max(0, cases.length - 2));
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      return;
    }

    setCurrentIndex(newIndex);
    container.scrollTo({ left: (cardWidth + gap) * newIndex, behavior: 'smooth' });
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.querySelector('.case-card')?.clientWidth || 0;
    const gap = 32;

    setCurrentIndex(index);
    container.scrollTo({ left: (cardWidth + gap) * index, behavior: 'smooth' });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = carousel.querySelector('.case-card')?.clientWidth || 0;
      const gap = 32;
      const newIndex = Math.round(carousel.scrollLeft / (cardWidth + gap));
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cases.length) {
        setCurrentIndex(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [currentIndex, cases.length]);

  return (
    <section id="casos" className="cases">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.cases.title}</h2>
          <p className="section-subtitle">{t.cases.subtitle}</p>
        </div>

        <div className="cases-carousel-wrapper">
          <div className="cases-carousel" ref={carouselRef}>
            {cases.map((caseItem, index) => (
              <div key={index} className={`case-card ${index % 2 === 0 ? 'case-card-warm' : 'case-card-blue'}`}>
                <div className="case-company">
                  <div className="case-company-logo">{caseLogos[index]}</div>
                  <div className="case-company-name">{caseItem.company}</div>
                </div>
                <div className="case-badge">
                  {caseIcons[index]}
                  {caseItem.tag}
                </div>
                <h3 className="case-title">{caseItem.title}</h3>
                <p className="case-text">{caseItem.description}</p>
                <ul className="case-results">
                  {caseItem.features.map((feature, i) => (
                    <li key={i}>
                      <span className="case-check">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => scrollCarousel(-1)} disabled={currentIndex === 0} aria-label="Anterior">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="carousel-btn" onClick={() => scrollCarousel(1)} disabled={currentIndex >= cases.length - 2} aria-label="Siguiente">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="carousel-dots">
            {cases.map((_, index) => (
              <div key={index} className={`carousel-dot ${index === currentIndex ? 'active' : ''}`} onClick={() => scrollToCard(index)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;
