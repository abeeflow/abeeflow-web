import { useLanguage } from '../i18n/LanguageContext';
import './Faq.css';

// Usa <details> para abrir y cerrar sin estado ni JS extra.
const Faq = () => {
  const { t } = useLanguage();

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.faq.title}</h2>
        </div>
        <div className="faq-list">
          {t.faq.items.map((item) => (
            <details key={item.q} className="faq-item">
              <summary className="faq-question">{item.q}</summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
