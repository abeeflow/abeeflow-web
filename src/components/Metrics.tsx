import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';
import RevealOnScroll from './RevealOnScroll';
import './Metrics.css';

// Solo anima valores con formato numérico limpio (+15K, +50, 12, 70%, 5x).
// Valores como "1ra sem" o "<24h" se renderizan como texto estático.
const ANIMATE_PATTERN = /^([+-]?)(\d+)([%KkMm+x]?)$/;

type ParsedValue =
  | { animate: true; prefix: string; number: number; suffix: string }
  | { animate: false; raw: string };

const parseValue = (raw: string): ParsedValue => {
  const match = raw.match(ANIMATE_PATTERN);
  if (!match) return { animate: false, raw };
  return {
    animate: true,
    prefix: match[1] || '',
    number: parseInt(match[2], 10),
    suffix: match[3] || '',
  };
};

interface MetricItemProps {
  raw: string;
  label: string;
  shouldAnimate: boolean;
}

const MetricItem = ({ raw, label, shouldAnimate }: MetricItemProps) => {
  const parsed = parseValue(raw);
  const targetNumber = parsed.animate ? parsed.number : 0;
  const current = useCountUp(targetNumber, 1500, shouldAnimate);

  return (
    <div className="metric-item">
      <div className="metric-value">
        {parsed.animate ? (
          <>{parsed.prefix}{current}{parsed.suffix}</>
        ) : (
          parsed.raw
        )}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
};

const Metrics = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldAnimate(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="metrics" aria-label="Métricas de Abeeflow">
      <div className="container">
        <div className="metrics-grid">
          {t.metrics.items.map((m, i) => (
            <RevealOnScroll key={i} delay={0.08 * i}>
              <MetricItem raw={m.value} label={m.label} shouldAnimate={shouldAnimate} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
