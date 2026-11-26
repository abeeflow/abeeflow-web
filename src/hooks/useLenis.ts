import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { prefersReducedMotion, setLenis } from '../lib/motion';

// Activa el scroll suave en toda la página.
export const useLenis = () => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // lerp 0.1: suave pero sigue de cerca a la rueda. Con duration 1.2
    // el scroll se quedaba atrás del dedo y se sentía secuestrado.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    setLenis(lenis);

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
};
