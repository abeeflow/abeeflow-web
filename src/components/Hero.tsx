import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_URL } from '../lib/links';
import { useHeroTick } from '../hooks/useHeroTick';
import SectionLink from './SectionLink';
import HeroHoneycomb from './HeroHoneycomb';
import './Hero.css';

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const easeOut = [0.23, 1, 0.32, 1] as const;

// Verbo del titular que cambia solo. La palabra vieja sube y se desenfoca
// mientras la nueva entra desde abajo: las dos se cruzan sin dejar hueco.
const RotatingWord = ({ words, tick }: { words: readonly string[]; tick: number }) => {
  const word = words[tick % words.length];

  return (
    <span className="hero-word">
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
  const heroRef = useRef<HTMLElement>(null);
  const { tick, animate } = useHeroTick(heroRef);

  return (
    <section ref={heroRef} className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <h1>
              {/* Los lectores de pantalla leen una frase fija; la parte visual cambia. */}
              <span className="sr-only">
                {t.hero.words[0]} {t.hero.title} {t.hero.highlight}
              </span>
              <span aria-hidden="true">
                <RotatingWord words={t.hero.words} tick={tick} />
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
            <HeroHoneycomb tick={tick} animate={animate} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
