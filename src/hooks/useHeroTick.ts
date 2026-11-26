import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Cada cuánto avanza el hero: cambia el verbo del titular y se enciende
// otra celda del panal.
export const HERO_TICK_MS = 2800;

// Pulso común del hero. Se detiene fuera de pantalla y con "reducir
// movimiento" no avanza (animate queda en false).
export const useHeroTick = (ref: RefObject<HTMLElement | null>) => {
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion() ?? false;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(() => setTick((n) => n + 1), HERO_TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion, inView]);

  return { tick: reduceMotion ? 0 : tick, animate: !reduceMotion };
};
