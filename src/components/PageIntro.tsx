import { useLanguage } from '../i18n/LanguageContext';
import SectionLink from './SectionLink';
import './PageIntro.css';

interface PageIntroProps {
  title: string;
  subtitle: string;
  cta: string;
  // Enlace externo del botón. Sin él, el botón baja a contacto.
  ctaHref?: string;
}

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// Cabecera de las páginas internas (VetSuite, desarrollo web).
const PageIntro = ({ title, subtitle, cta, ctaHref }: PageIntroProps) => {
  const { t } = useLanguage();

  return (
    <section className="page-intro">
      <div className="container">
        <a href="/" className="page-intro-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t.pages.back}
        </a>
        <h1 className="page-intro-title">{title}</h1>
        <p className="page-intro-subtitle">{subtitle}</p>
        {ctaHref ? (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {cta}
            {arrow}
          </a>
        ) : (
          <SectionLink href="#contacto" className="btn-primary">
            {cta}
            {arrow}
          </SectionLink>
        )}
      </div>
    </section>
  );
};

export default PageIntro;
