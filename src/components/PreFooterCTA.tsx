import { useLanguage } from '../i18n/LanguageContext';
import { getLenis } from '../lib/lenis';
import './PreFooterCTA.css';

const PreFooterCTA = () => {
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
    <section className="pre-footer-cta" aria-label={t.preFooterCta.aria}>
      <div className="pre-footer-cta-container">
        <h2 className="pre-footer-cta-heading">{t.preFooterCta.heading}</h2>
        <a href="#contacto" className="pre-footer-cta-button" onClick={handleClick}>
          {t.preFooterCta.button}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
};

export default PreFooterCTA;
