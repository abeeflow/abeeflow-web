import { useLanguage } from '../i18n/LanguageContext';
import { getLenis } from '../lib/lenis';
import './InlineCTA.css';

const InlineCTA = () => {
  const { t } = useLanguage();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#contacto');
    if (!target) return;
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 72;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -headerHeight });
    } else {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetPosition - headerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="inline-cta-section" aria-label={t.inlineCta.aria}>
      <div className="inline-cta-container">
        <a href="#contacto" className="inline-cta-button" onClick={handleClick}>
          <span className="inline-cta-action">{t.inlineCta.action}</span>
          <span className="inline-cta-arrow" aria-hidden="true">→</span>
          <span className="inline-cta-outcome">{t.inlineCta.outcome}</span>
        </a>
      </div>
    </section>
  );
};

export default InlineCTA;
