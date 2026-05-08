import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';
import './Results.css';

interface CountedNumberProps {
  count: number;
  suffix: string;
  shouldStart: boolean;
}

const CountedNumber = ({ count, suffix, shouldStart }: CountedNumberProps) => {
  const value = useCountUp(count, 2000, shouldStart);
  return (
    <>
      {value}
      <span className="result-suffix">{suffix}</span>
    </>
  );
};

interface SlideData {
  count: number | null;
  suffix: string;
  text: string | null;
  label: string;
}

interface ResultSlideProps {
  index: number;
  total: number;
  slide: SlideData;
}

const ResultSlide = ({ index, total, slide }: ResultSlideProps) => {
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

  return (
    <motion.div
      ref={ref}
      className="result-slide"
      {...slideAnim}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span className="result-counter" {...childAnim(0.1)}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </motion.span>
      <motion.h2 className="result-number" {...childAnim(0.2)}>
        {slide.text !== null ? (
          slide.text
        ) : (
          <CountedNumber count={slide.count!} suffix={slide.suffix} shouldStart={inView && !reduced} />
        )}
      </motion.h2>
      <motion.p className="result-label" {...childAnim(0.3)}>
        {slide.label}
      </motion.p>
    </motion.div>
  );
};

const Results = () => {
  const { t } = useLanguage();
  const slides = t.results.slides;

  return (
    <section className="results" aria-label={t.results.badge}>
      <svg
        className="results-arc"
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

      <div className="results-container">
        <div className="results-badge">{t.results.badge}</div>
        {slides.map((slide, i) => (
          <ResultSlide key={i} index={i} total={slides.length} slide={slide as SlideData} />
        ))}
      </div>
    </section>
  );
};

export default Results;
