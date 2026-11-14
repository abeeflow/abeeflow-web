import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { prefersReducedMotion } from '../lib/motion';

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

// La palabra pasa de tenue a nítida mientras el scroll recorre su tramo.
const Word = ({ word, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <>
      <motion.span style={{ opacity, color: 'var(--ink)' }}>{word}</motion.span>{' '}
    </>
  );
};

interface SpotlightTextProps {
  text: string;
  className?: string;
}

// Párrafo que se va iluminando palabra por palabra al hacer scroll.
const SpotlightText = ({ text, className }: SpotlightTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.2'],
  });

  if (prefersReducedMotion()) {
    return <p ref={ref} className={className}>{text}</p>;
  }

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        />
      ))}
    </p>
  );
};

export default SpotlightText;
