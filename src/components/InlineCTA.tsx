import { useLanguage } from '../i18n/LanguageContext';
import SectionLink from './SectionLink';
import './InlineCTA.css';

const InlineCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="inline-cta-section" aria-label={t.inlineCta.aria}>
      <div className="inline-cta-container">
        <SectionLink href="#contacto" className="inline-cta-button">
          <span className="inline-cta-action">{t.inlineCta.action}</span>
          <span className="inline-cta-arrow" aria-hidden="true">→</span>
          <span className="inline-cta-outcome">{t.inlineCta.outcome}</span>
        </SectionLink>
      </div>
    </section>
  );
};

export default InlineCTA;
