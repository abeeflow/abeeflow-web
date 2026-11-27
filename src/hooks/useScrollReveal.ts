import { useLayoutEffect } from 'react';
import { prefersReducedMotion } from '../lib/motion';

// Aparición al hacer scroll, la misma en todas las páginas: cada bloque
// sube 16px y pasa de difuminado a nítido la primera vez que entra en
// pantalla (estilos .reveal en index.css).
//
// Se aplica solo, sin marcar cada componente: toma los hijos directos
// del .container de cada sección (título, texto, cajas) y del footer.
// Las grillas de la lista STAGGER no aparecen como un bloque: aparecen
// sus tarjetas, una tras otra.

// Contenedores cuyos hijos aparecen. El hero y el encabezado de las
// páginas internas tienen su propia entrada al cargar.
const CONTAINERS = [
  'main > section:not(.hero):not(.page-intro) > .container',
  'main > section.container',
  'footer > .container',
].join(', ');

// Grillas y listas: aparece cada pieza, no la grilla entera.
const STAGGER = [
  '.metrics-grid',
  '.service-main-benefits',
  '.cases-grid',
  '.faq-list',
  '.draft-pains',
  '.draft-results',
  '.projects-grid',
  '.feature-grid',
  '.footer-grid',
].join(', ');

// Piezas que entran juntas se separan 60ms, hasta 300ms.
const STEP_MS = 60;
const MAX_STEPS = 5;

export const useScrollReveal = () => {
  // Antes de pintar: así lo que está más abajo no se ve un instante y
  // luego desaparece.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    const targets: Element[] = [];
    document.querySelectorAll(CONTAINERS).forEach((container) => {
      for (const child of container.children) {
        if (child.matches(STAGGER)) targets.push(...child.children);
        else targets.push(child);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        // Las que entran en la misma pasada van en orden, una tras otra.
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty('--reveal-delay', `${Math.min(order, MAX_STEPS) * STEP_MS}ms`);
          el.classList.add('is-revealed');
          observer.unobserve(el);
          order += 1;
        }
      },
      // Aparece cuando ya asomó un poco, no apenas toca el borde.
      { rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};
