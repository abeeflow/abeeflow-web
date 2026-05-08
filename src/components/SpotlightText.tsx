import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface WordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word = ({ word, progress, range }: WordProps) => {
  const { theme } = useTheme();
  const colors: [string, string] =
    theme === 'dark'
      ? ['rgba(199, 199, 204, 0.35)', 'rgba(244, 244, 245, 1)']
      : ['rgba(107, 107, 107, 0.3)', 'rgba(10, 10, 10, 1)'];
  const color = useTransform(progress, range, colors);
  return (
    <>
      <motion.span style={{ color }}>{word}</motion.span>{' '}
    </>
  );
};

interface SpotlightTextProps {
  text: string;
  className?: string;
}

const SpotlightText = ({ text, className }: SpotlightTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.2'],
  });

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    return <p ref={ref} className={className} dangerouslySetInnerHTML={{ __html: text }} />;
  }

  const plainText = text.replace(/<[^>]+>/g, '');
  const words = plainText.split(/\s+/).filter(Boolean);
  const total = words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          progress={scrollYProgress}
          range={[i / total, (i + 1) / total]}
        />
      ))}
    </p>
  );
};

export default SpotlightText;
