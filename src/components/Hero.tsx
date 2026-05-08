import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getLenis } from '../lib/lenis';
import HeroHoneycomb from './HeroHoneycomb';
import './Hero.css';

const buildScreenReaderSentence = (
  words: readonly string[],
  subtitle: string,
  conjunction: string
): string => {
  if (words.length === 0) return subtitle;
  if (words.length === 1) return `${words[0]} ${subtitle}`;
  const first = words[0];
  const middle = words.slice(1, -1).map((w) => w.toLowerCase());
  const last = words[words.length - 1].toLowerCase();
  const head = [first, ...middle].join(', ');
  return `${head} ${conjunction} ${last} ${subtitle}`;
};

const Hero = () => {
  const { t, language } = useLanguage();
  const words = t.hero.words;

  const [text, setText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      setCursorVisible(false);
      return;
    }

    setText('');
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const cycle = async () => {
      let wordIdx = 0;
      while (!cancelled) {
        const word = words[wordIdx];

        setCursorVisible(true);
        for (let i = 1; i <= word.length && !cancelled; i++) {
          setText(word.slice(0, i));
          await sleep(1400 / word.length);
        }
        if (cancelled) break;

        setCursorVisible(false);
        await sleep(2000);
        if (cancelled) break;

        setCursorVisible(true);
        for (let i = word.length - 1; i >= 0 && !cancelled; i--) {
          setText(word.slice(0, i));
          await sleep(800 / word.length);
        }
        if (cancelled) break;

        wordIdx = (wordIdx + 1) % words.length;
      }
    };

    cycle();

    return () => {
      cancelled = true;
      if (timer !== null) clearTimeout(timer);
    };
  }, [words]);

  const conjunction = language === 'en' ? 'and' : 'y';
  const sentence = buildScreenReaderSentence(words, t.hero.subtitle, conjunction);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 72;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -headerHeight });
    } else {
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
              <span className="sr-only">{sentence}</span>
              <span aria-hidden="true">
                <span className="rotating-text-container">
                  <span className="rotating-text">
                    <span className={`word${cursorVisible ? '' : ' cursor-hidden'}`}>{text}</span>
                  </span>
                </span>
                <br />
                <span className="rest-text">{t.hero.subtitle}</span>
              </span>
            </h1>

            <p>{t.hero.description}</p>

            <div className="hero-buttons">
              <a href="#contacto" className="btn-primary" onClick={(e) => handleSmoothScroll(e, '#contacto')}>
                {t.hero.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#casos" className="btn-link-arrow" onClick={(e) => handleSmoothScroll(e, '#casos')}>
                {t.hero.secondary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <HeroHoneycomb />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
