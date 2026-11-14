import { useLanguage } from '../i18n/LanguageContext';
import SectionLink from './SectionLink';
import './PreFooterCTA.css';

const PreFooterCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="pre-footer-cta" aria-label={t.preFooterCta.aria}>
      <div className="pre-footer-cta-container">
        <h2 className="pre-footer-cta-heading">{t.preFooterCta.heading}</h2>
        <SectionLink href="#contacto" className="pre-footer-cta-button">
          {t.preFooterCta.button}
          <span aria-hidden="true">→</span>
        </SectionLink>
      </div>
    </section>
  );
};

export default PreFooterCTA;
