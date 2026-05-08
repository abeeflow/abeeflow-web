import { useLanguage } from '../i18n/LanguageContext';
import './Metrics.css';

const Metrics = () => {
  const { t } = useLanguage();

  return (
    <section className="metrics" aria-label={t.metrics.items[0].label}>
      <div className="container">
        <div className="metrics-grid">
          {t.metrics.items.map((m, i) => (
            <div key={i} className="metric-item">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
