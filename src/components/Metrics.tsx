import { useLanguage } from '../i18n/LanguageContext';
import './Metrics.css';

interface Client {
  name: string;
  url?: string;
}

const clients: Client[] = [
  { name: 'Mynos.ai', url: 'https://www.mynos.ai/' },
  { name: 'SFA Inversiones' },
  { name: 'RecruitAI Systems' },
  { name: 'HRS Consulting' },
  { name: 'LOZARQ Estudio', url: 'https://lozarqestudio.com' },
  { name: 'Jardín San José', url: 'https://guarderiajardinsanjose.com' },
];

// Una sola banda de prueba: las cifras y, debajo, quiénes son los clientes.
// Las cifras se muestran fijas, sin animar el conteo desde 0.
const Metrics = () => {
  const { t } = useLanguage();

  return (
    <section className="metrics" aria-label={t.proof.aria}>
      <div className="container">
        <div className="metrics-grid">
          {t.metrics.items.map((m) => (
            <div key={m.label} className="metric-item">
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="metrics-clients">
          <p className="metrics-clients-title">{t.proof.clients}</p>
          <ul className="metrics-clients-list">
            {clients.map((client) => (
              <li key={client.name}>
                {client.url ? (
                  <a href={client.url} target="_blank" rel="noopener noreferrer" className="metrics-client">
                    {client.name}
                  </a>
                ) : (
                  <span className="metrics-client">{client.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
