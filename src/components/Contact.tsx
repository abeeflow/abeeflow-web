import { useLanguage } from '../i18n/LanguageContext';
import { CALENDAR_URL, WHATSAPP_URL } from '../lib/links';
import './Contact.css';

const teamImages = ['/maria.jpg', '/chris.jpg', '/esau.jpg'];

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ContactProps {
  // En el inicio el cierre suma los tres pasos y el equipo.
  full?: boolean;
  // Pasos con otras palabras (la vDraft para mypes). Por defecto, los del sitio.
  steps?: readonly Step[];
}

const Contact = ({ full = false, steps }: ContactProps) => {
  const { t } = useLanguage();

  const featureIcons = [
    <svg key="clock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    <svg key="video" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>,
    <svg key="check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
  ];

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className={`contact-box ${full ? 'contact-box-full' : ''}`}>
          <div className="contact-main">
            <h2 className="contact-title">{t.contact.title}</h2>
            <p className="contact-subtitle">{t.contact.subtitle}</p>
            <div className="contact-features">
              {t.contact.features.map((feature, i) => (
                <div key={i} className="contact-feature">
                  <div className="contact-feature-icon">{featureIcons[i]}</div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div className="contact-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="contact-book-btn">
                {t.contact.bookBtn}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
                {t.contact.whatsapp}
              </a>
            </div>
          </div>

          {full && (
            <>
              <div className="contact-steps">
                <h3 className="contact-aside-title">{t.process.title}</h3>
                <ol className="contact-steps-list">
                  {(steps ?? t.process.steps).map((step) => (
                    <li key={step.number} className="contact-step">
                      <span className="contact-step-number" aria-hidden="true">{step.number}</span>
                      <div>
                        <span className="contact-step-title">{step.title}</span>
                        <p className="contact-step-desc">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div id="nosotros" className="contact-team">
                <h3 className="contact-aside-title">{t.about.teamTitle}</h3>
                <ul className="contact-team-list">
                  {t.about.team.map((member, index) => (
                    <li key={member.name} className="team-member" itemScope itemType="https://schema.org/Person">
                      <img
                        className="team-avatar"
                        src={teamImages[index]}
                        alt={`${member.name} - ${member.role}`}
                        loading="lazy"
                        width="48"
                        height="48"
                        itemProp="image"
                      />
                      <div>
                        <div className="team-name" itemProp="name">{member.name}</div>
                        <div className="team-role">{member.role}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
