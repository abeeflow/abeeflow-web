import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { getLenis } from '../lib/lenis';
import './Hero.css';

const flowIcons: ReactNode[] = [
  // Email
  <svg key="email" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>,
  // AI / Sparkles
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // CRM / Users
  <svg key="crm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>,
  // Slack / Bell
  <svg key="bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
];

const flowMeta: { code: string; statusColor: 'green' | 'yellow' | 'blue' }[] = [
  { code: "if email.subject.match(/quote/i):", statusColor: 'green' },
  { code: "intent = ai.classify(email.body)", statusColor: 'yellow' },
  { code: "hubspot.contacts.create({...})", statusColor: 'green' },
  { code: "slack.send('#sales', summary)", statusColor: 'blue' },
];

const MAGNETIC_RADIUS = 150;
const MAGNETIC_INTENSITY = 0.1; // ~max 8-15px depending on radius
const TILT_RANGE = 12; // ±12 deg

interface FlowNodeProps {
  index: number;
  label: string;
  icon: ReactNode;
  code: string;
  status: string;
  statusColor: 'green' | 'yellow' | 'blue';
  tooltipPosition: 'above' | 'below';
}

const FlowNode = ({ index, label, icon, code, status, statusColor, tooltipPosition }: FlowNodeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const x = useSpring(magX, { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(magY, { stiffness: 200, damping: 18, mass: 0.6 });
  const rotateX = useSpring(tiltX, { stiffness: 200, damping: 18, mass: 0.5 });
  const rotateY = useSpring(tiltY, { stiffness: 200, damping: 18, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < MAGNETIC_RADIUS) {
        const factor = 1 - dist / MAGNETIC_RADIUS;
        magX.set(dx * factor * MAGNETIC_INTENSITY);
        magY.set(dy * factor * MAGNETIC_INTENSITY);
      } else {
        magX.set(0);
        magY.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [magX, magY]);

  const handleLocalMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * TILT_RANGE * 2);
    tiltX.set(-py * TILT_RANGE * 2);
  };

  const handleLocalLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`hero-flow-node hero-flow-node-${index + 1}`}
      style={{ x, y, rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      onMouseMove={handleLocalMove}
      onMouseLeave={handleLocalLeave}
    >
      <div className="hero-flow-node-status">
        <span className={`status-dot status-dot-${statusColor}`} />
        {status}
      </div>
      <div className="hero-flow-node-icon">{icon}</div>
      <div className="hero-flow-node-label">{label}</div>
      <div className="hero-flow-node-progress" style={{ animationDelay: `${index * 0.75}s` }} />
      <div className={`hero-flow-node-tooltip hero-flow-node-tooltip-${tooltipPosition}`}>
        <code>{code}</code>
      </div>
    </motion.div>
  );
};

const buildScreenReaderSentence = (words: readonly string[], subtitle: string, conjunction: string): string => {
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
  const flowNodes = t.hero.flowNodes;

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

        // Typing
        setCursorVisible(true);
        for (let i = 1; i <= word.length && !cancelled; i++) {
          setText(word.slice(0, i));
          await sleep(1400 / word.length);
        }
        if (cancelled) break;

        // Pause
        setCursorVisible(false);
        await sleep(2000);
        if (cancelled) break;

        // Deleting
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
            <div className="hero-flow" aria-hidden="true">
              <svg className="hero-flow-lines" viewBox="0 0 400 320" preserveAspectRatio="none">
                <defs>
                  <filter id="particle-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path id="flow-path-1" d="M 130 60 L 270 60" />
                <path id="flow-path-2" d="M 340 100 L 340 220" />
                <path id="flow-path-3" d="M 270 260 L 130 260" />
                <circle r="4" className="flow-particle">
                  <animateMotion dur="2s" repeatCount="indefinite">
                    <mpath href="#flow-path-1" />
                  </animateMotion>
                </circle>
                <circle r="4" className="flow-particle">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="0.66s">
                    <mpath href="#flow-path-2" />
                  </animateMotion>
                </circle>
                <circle r="4" className="flow-particle">
                  <animateMotion dur="2s" repeatCount="indefinite" begin="1.33s">
                    <mpath href="#flow-path-3" />
                  </animateMotion>
                </circle>
              </svg>

              {flowNodes.map((node, index) => (
                <FlowNode
                  key={node.label}
                  index={index}
                  label={node.label}
                  icon={flowIcons[index]}
                  code={flowMeta[index].code}
                  status={language === 'en' ? 'active' : 'activo'}
                  statusColor={flowMeta[index].statusColor}
                  tooltipPosition={index < 2 ? 'below' : 'above'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
