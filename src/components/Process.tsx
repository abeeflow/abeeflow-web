import { useLanguage } from '../i18n/LanguageContext';
import './Process.css';

const Process = () => {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.process.title}</h2>
          <p className="section-subtitle">{t.process.subtitle}</p>
        </div>
        <div className="process-grid">
          {t.process.steps.map((step, index) => (
            <div key={index} className="process-card">
              <div className="process-num">{step.number}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
