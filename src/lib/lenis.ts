import type Lenis from 'lenis';

let instance: Lenis | null = null;

export const setLenisInstance = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = (): Lenis | null => instance;
