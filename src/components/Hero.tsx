import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Hero.css';

const serviceIcons = [
  'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'M13 10V3L4 14h7v7l9-11h-7z',
  'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
];

const Hero = () => {
  const { t } = useLanguage();
  const words = t.hero.words;
  const services = t.hero.services;

  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const stateRef = useRef({ wordIndex: 0, letterIndex: 0, isDeleting: false });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordsRef = useRef(words);

  const [activeService, setActiveService] = useState(0);

  // Update words ref when language changes
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  // Typing animation
  useEffect(() => {
    const type = () => {
      const { wordIndex, letterIndex, isDeleting } = stateRef.current;
      const currentWords = wordsRef.current;
      const fullWord = currentWords[wordIndex % currentWords.length];

      if (!isDeleting) {
        const newWord = fullWord.substring(0, letterIndex + 1);
        setCurrentWord(newWord);
        stateRef.current.letterIndex = letterIndex + 1;
        setLetterIndex(letterIndex + 1);

        if (letterIndex === fullWord.length - 1) {
          timeoutRef.current = setTimeout(() => {
            stateRef.current.isDeleting = true;
            setIsDeleting(true);
            type();
          }, 2000);
          return;
        }
      } else {
        const newWord = fullWord.substring(0, letterIndex - 1);
        setCurrentWord(newWord);
        stateRef.current.letterIndex = letterIndex - 1;
        setLetterIndex(letterIndex - 1);

        if (letterIndex === 0) {
          stateRef.current.isDeleting = false;
          setIsDeleting(false);
          stateRef.current.wordIndex = (wordIndex + 1) % currentWords.length;
          stateRef.current.letterIndex = 0;
          setLetterIndex(0);
          timeoutRef.current = setTimeout(type, 500);
          return;
        }
      }

      const speed = isDeleting ? 50 : 100;
      timeoutRef.current = setTimeout(type, speed);
    };

    timeoutRef.current = setTimeout(type, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Service icon rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

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
              <span className="rotating-text-container">
                <span className="rotating-text">
                  <span className={`word ${!isDeleting && letterIndex > 0 ? 'active' : ''}`}>
                    {currentWord}
                  </span>
                </span>
              </span>
              <br />
              <span className="rest-text">{t.hero.subtitle}</span>
            </h1>

            <p>{t.hero.description}</p>

            <div className="hero-buttons">
              <a href="#contacto" className="btn-primary" onClick={(e) => handleSmoothScroll(e, '#contacto')}>
                {t.hero.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#casos" className="btn-secondary" onClick={(e) => handleSmoothScroll(e, '#casos')}>
                {t.hero.secondary}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-blob">
              <div className="hero-illustration">
                <div className="hero-illustration-inner">
                  {services.map((service, index) => (
                    <div key={index} className={`hero-service-slide ${index === activeService ? 'active' : ''}`}>
                      <svg className="hero-service-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={serviceIcons[index]}/>
                      </svg>
                      <div className="hero-service-label">{service.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="float-card float-card-1">
              <div className="float-card-icon yellow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div className="float-card-stats">
                {services.map((s, i) => (
                  <div key={i} className={`float-stat ${i === activeService ? 'active' : ''}`}>
                    <strong>{s.stat1.value}</strong>
                    <span className="float-card-label">{s.stat1.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="float-card float-card-2">
              <div className="float-card-icon green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <div className="float-card-stats">
                {services.map((s, i) => (
                  <div key={i} className={`float-stat ${i === activeService ? 'active' : ''}`}>
                    <strong>{s.stat2.value}</strong>
                    <span className="float-card-label">{s.stat2.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-service-dots">
              {services.map((_, i) => (
                <div key={i} className={`hero-service-dot ${i === activeService ? 'active' : ''}`} onClick={() => setActiveService(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
