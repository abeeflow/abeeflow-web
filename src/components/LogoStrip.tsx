import { useLanguage } from '../i18n/LanguageContext';
import './LogoStrip.css';

interface ClientLogo {
  name: string;
  url?: string;
}

const clients: ClientLogo[] = [
  { name: 'Mynos.ai', url: 'https://www.mynos.ai/' },
  { name: 'SFA Inversiones' },
  { name: 'RecruitAI Systems' },
  { name: 'HRS Consulting' },
  { name: 'LOZARQ Estudio', url: 'https://lozarqestudio.com' },
  { name: 'Jardín San José', url: 'https://guarderiajardinsanjose.com' },
  { name: 'VetSuite' },
];

const LogoStrip = () => {
  const { t } = useLanguage();
  return (
    <section className="logo-strip-section" aria-label={t.logoStrip.aria}>
      <div className="logo-strip-container">
        <p className="logo-strip-title">{t.logoStrip.title}</p>
        <div className="logo-strip-grid">
          {clients.map((client) =>
            client.url ? (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="logo-strip-item"
              >
                {client.name}
              </a>
            ) : (
              <span key={client.name} className="logo-strip-item">
                {client.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default LogoStrip;
