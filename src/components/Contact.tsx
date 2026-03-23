import { useLanguage } from '../i18n/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();
  const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3J3r3K7-GmhVRDOp2PYGN66AQUKCkP0F-Y_fhgG3nKqhtyyg7vykG27zkLGe1gfE04zlBU3TAl?gv=true';

  const featureIcons = [
    <svg key="clock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    <svg key="video" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>,
    <svg key="check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
  ];

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="contact-box">
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
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="contact-book-btn">
            {t.contact.bookBtn}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
