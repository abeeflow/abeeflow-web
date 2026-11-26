import { useLanguage } from '../i18n/LanguageContext';
import './Metrics.css';

// Las cifras se muestran fijas, sin animar el conteo desde 0.
const Metrics = () => {
  const { t } = useLanguage();

  return (
    <section className="metrics" aria-label="Métricas de Abeeflow">
      <div className="container">
        <div className="metrics-grid">
          {t.metrics.items.map((m) => (
            <div key={m.label}>
              <div className="metric-item">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
