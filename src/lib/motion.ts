import type Lenis from 'lenis';

// True si la persona pidió menos animaciones en su sistema.
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lenis hace el scroll suave. Queda en null cuando no está activo.
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const scrollToTop = () => {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Baja hasta una sección ('#contacto') sin que el menú fijo la tape.
export const scrollToSection = (href: string) => {
  const section = document.querySelector<HTMLElement>(href);
  if (!section) return;
  const headerHeight = document.querySelector('header')?.offsetHeight ?? 72;

  if (lenis) {
    lenis.scrollTo(section, { offset: -headerHeight });
  } else {
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};
