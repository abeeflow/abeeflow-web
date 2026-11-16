import { useLanguage } from '../i18n/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import './Process.css';

const Process = () => {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="process-section">
      <div className="container">
        <div className="section-header">
          <div className="process-badge">{t.process.badge}</div>
          <h2 className="section-title">{t.process.title}</h2>
        </div>
        <div className="process-grid">
          {t.process.steps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={0.1 * index} className="process-grid-item">
              <div className="process-step">
                <span className="process-step-number">{step.number}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
