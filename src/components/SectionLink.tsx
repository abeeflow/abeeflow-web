import type { ReactNode } from 'react';
import { scrollToSection } from '../lib/motion';

interface SectionLinkProps {
  href: string;
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}

// Enlace a una sección ('#contacto') con scroll suave.
// Si la sección está en el inicio y no aquí, navega al inicio.
const SectionLink = ({ href, className, onNavigate, children }: SectionLinkProps) => (
  <a
    href={href}
    className={className}
    onClick={(e) => {
      e.preventDefault();
      if (!scrollToSection(href)) window.location.href = `/${href}`;
      onNavigate?.();
    }}
  >
    {children}
  </a>
);

export default SectionLink;
