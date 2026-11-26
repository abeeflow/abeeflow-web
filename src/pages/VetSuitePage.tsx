import { useLanguage } from '../i18n/LanguageContext';
import { VETSUITE_DEMO_URL } from '../lib/links';
import PageIntro from '../components/PageIntro';
import Contact from '../components/Contact';

const VetSuitePage = () => {
  const { t } = useLanguage();
  const page = t.pages.vetsuite;

  return (
    <>
      <PageIntro title={page.title} subtitle={page.subtitle} cta={page.cta} ctaHref={VETSUITE_DEMO_URL} />
      <section className="container" aria-label={page.title}>
        <div className="feature-grid">
          {page.features.map((feature) => (
            <div key={feature.title} className="feature-grid-item">
              <div className="feature-card">
                <h2 className="feature-card-title">{feature.title}</h2>
                <p className="feature-card-desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
};

export default VetSuitePage;
