import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import './Process.css';

interface ProcessSlideProps {
  index: number;
  total: number;
  title: string;
  description: string;
}

const ProcessSlide = ({ index, total, title, description }: ProcessSlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const slideAnim = reduced
    ? { initial: undefined, animate: undefined }
    : {
        initial: { opacity: 0, y: 40 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
      };

  const childAnim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
        };

  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <motion.div
      ref={ref}
      className="process-slide"
      {...slideAnim}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span className="process-counter" {...childAnim(0.1)}>
        {counter}
      </motion.span>
      <motion.h2 className="process-step-title" {...childAnim(0.2)}>
        {title}
      </motion.h2>
      <motion.p className="process-step-desc" {...childAnim(0.3)}>
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
