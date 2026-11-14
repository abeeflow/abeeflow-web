import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { prefersReducedMotion } from '../lib/motion';
import './Process.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProcessSlideProps {
  index: number;
  total: number;
  title: string;
  description: string;
}

const ProcessSlide = ({ index, total, title, description }: ProcessSlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const reduced = prefersReducedMotion();

  // Aparece subiendo `distance` px cuando el paso entra en pantalla.
  const fadeUp = (distance: number, duration: number, delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: distance },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
          transition: { duration, ease: EASE, delay },
        };

  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <motion.div
      ref={ref}
      className="process-slide"
      {...fadeUp(40, 0.6)}
    >
      <motion.span className="process-counter" {...fadeUp(20, 0.5, 0.1)}>
        {counter}
      </motion.span>
      <motion.h2 className="process-step-title" {...fadeUp(20, 0.5, 0.2)}>
        {title}
      </motion.h2>
      <motion.p className="process-step-desc" {...fadeUp(20, 0.5, 0.3)}>
        {description}
      </motion.p>
    </motion.div>
  );
};

const Process = () => {
  const { t } = useLanguage();
  const steps = t.process.steps;

  return (
    <section id="proceso" className="process-section" aria-label={t.process.title}>
      <svg
        className="process-arc"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 0 100 Q 600 0 1200 100"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          opacity="0.45"
        />
      </svg>

      <div className="process-container">
        <div className="process-badge">{t.process.badge}</div>
        {steps.map((step, i) => (
          <ProcessSlide
            key={step.number}
            index={i}
            total={steps.length}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Process;
