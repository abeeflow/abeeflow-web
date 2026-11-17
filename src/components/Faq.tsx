import { useLanguage } from '../i18n/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import './Faq.css';

// Usa <details> para abrir y cerrar sin estado ni JS extra.
const Faq = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <div className="faq-badge">{t.faq.badge}</div>
          <h2 className="section-title">{t.faq.title}</h2>
        </div>
        <RevealOnScroll className="faq-list">
          {t.faq.items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-question">{item.q}</summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Faq;
