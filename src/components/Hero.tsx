import { useEffect, useState, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const words = ['Automatizamos', 'Optimizamos', 'Integramos', 'Transformamos'];
  const [currentWord, setCurrentWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const stateRef = useRef({ wordIndex: 0, letterIndex: 0, isDeleting: false });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const type = () => {
      const { wordIndex, letterIndex, isDeleting } = stateRef.current;
      const fullWord = words[wordIndex];

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
          stateRef.current.wordIndex = (wordIndex + 1) % words.length;
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <span>Soluciones a medida</span>
          </div>

          <h1>
            <span className="rotating-text-container">
              <span className="rotating-text">
                <span className={`word ${!isDeleting && letterIndex > 0 ? 'active' : ''}`}>
                  {currentWord}
                </span>
              </span>
            </span>
            <span className="rest-text">&nbsp;tus procesos</span>
          </h1>
          <p>Soluciones tecnológicas personalizadas para tu industria. Integramos las herramientas adecuadas para mejorar eficiencia, reducir costos y optimizar resultados.</p>

          <div className="hero-buttons">
            <a href="#contacto" className="btn btn-primary" onClick={(e) => handleSmoothScroll(e, '#contacto')}>
              Solicitar demo
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <a href="#casos" className="btn btn-secondary" onClick={(e) => handleSmoothScroll(e, '#casos')}>
              Ver casos de uso
            </a>
          </div>
        </div>
      </div>

      <div className="hero-decoration"></div>
    </div>
  );
};

export default Hero;

