import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  return (
    <a
      href="https://wa.me/33686251232"
      className="whatsapp-widget"
      target="_blank"
      rel="noopener noreferrer"
      title="Escribenos por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    </a>
  );
};

export default WhatsAppWidget;
