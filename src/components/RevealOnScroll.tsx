import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const RevealOnScroll = ({ children, delay = 0, className }: RevealOnScrollProps) => {
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      // Solo para bloques grandes (un caso, una demo), no para cada tarjeta.
      initial={{ opacity: 0, transform: 'translateY(16px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
