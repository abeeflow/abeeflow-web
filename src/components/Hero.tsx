import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_URL } from '../lib/links';
import SectionLink from './SectionLink';
import HeroHoneycomb from './HeroHoneycomb';
import './Hero.css';

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// Destino de cada tarjeta de "dos caminos", en el mismo orden que el texto.
const pathLinks = ['#servicios', '#caso-migracion'];

// Cada cuánto cambia el verbo del titular.
const WORD_INTERVAL_MS = 2800;
const easeOut = [0.23, 1, 0.32, 1] as const;

// Verbo del titular que cambia solo. La palabra vieja sube y se desenfoca
// mientras la nueva entra desde abajo: las dos se cruzan sin dejar hueco.
// Se detiene fuera de pantalla y con "reducir movimiento" queda la primera.
const RotatingWord = ({ words }: { words: readonly string[] }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), WORD_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, inView, words.length]);

  const word = reduceMotion ? words[0] : words[index % words.length];

  return (
    <span ref={ref} className="hero-word">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="hero-word-text"
          initial={{ opacity: 0, transform: 'translateY(0.4em)', filter: 'blur(6px)' }}
          animate={{ opacity: 1, transform: 'translateY(0em)', filter: 'blur(0px)' }}
          exit={{
            opacity: 0,
            transform: 'translateY(-0.4em)',
            filter: 'blur(6px)',
            transition: { duration: 0.25, ease: easeOut },
          }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const { t } = useLanguage();

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
              {/* Los lectores de pantalla leen una frase fija; la parte visual cambia. */}
              <span className="sr-only">
                {t.hero.words[0]} {t.hero.title} {t.hero.highlight}
              </span>
              <span aria-hidden="true">
                <RotatingWord words={t.hero.words} />
                <span className="hero-title-rest">{t.hero.title}</span>{' '}
                <span className="hero-highlight">{t.hero.highlight}</span>
              </span>
            </h1>

            <p>{t.hero.description}</p>

            <div className="hero-buttons">
              <SectionLink href="#contacto" className="btn-primary">
                {t.hero.cta}
                {arrow}
              </SectionLink>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-link-arrow">
                {t.hero.whatsapp}
                {arrow}
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <HeroHoneycomb />
          </div>
        </div>

        <div className="hero-paths" aria-label={t.paths.aria}>
          {t.paths.items.map((path, index) => (
            <div key={path.tag} className="hero-path">
              <span className="hero-path-tag">{path.tag}</span>
              <h2 className="hero-path-title">{path.title}</h2>
              <p className="hero-path-desc">{path.desc}</p>
              <SectionLink href={pathLinks[index]} className="btn-link-arrow">
                {path.link}
                {arrow}
              </SectionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
