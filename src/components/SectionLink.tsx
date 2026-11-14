import type { ReactNode } from 'react';
import { scrollToSection } from '../lib/motion';

interface SectionLinkProps {
  href: string;
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
}

// Enlace a una sección de la página ('#contacto') con scroll suave.
const SectionLink = ({ href, className, onNavigate, children }: SectionLinkProps) => (
  <a
    href={href}
    className={className}
    onClick={(e) => {
      e.preventDefault();
      scrollToSection(href);
      onNavigate?.();
    }}
  >
    {children}
  </a>
);

export default SectionLink;
