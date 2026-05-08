import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';
import './Metrics.css';

const parseValue = (raw: string): { prefix: string; number: number; suffix: string } => {
  const match = raw.match(/^([+-]?)(\d+)(.*)$/);
  if (!match) return { prefix: '', number: 0, suffix: raw };
  return {
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
  const { prefix, number, suffix } = parseValue(raw);
  const current = useCountUp(number, 1500, shouldAnimate);

  return (
    <div className="metric-item">
      <div className="metric-value">{prefix}{current}{suffix}</div>
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
            <MetricItem key={i} raw={m.value} label={m.label} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
