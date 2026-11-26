import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CALENDAR_URL, WHATSAPP_URL } from '../lib/links';
import './ChatWidget.css';

type Message = { role: 'user' | 'assistant'; content: string };
type LeadStatus = 'idle' | 'sending' | 'sent' | 'error';

// Las mismas reglas que valida api/lead.js.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isContact = (value: string) =>
  EMAIL_RE.test(value) || (/^\+?[\d\s()-]{7,20}$/.test(value) && value.replace(/\D/g, '').length >= 7);

// Vuelve clicable el enlace de WhatsApp que el asistente escribe en un mensaje.
const withLinks = (text: string) =>
  text.split(/(https:\/\/wa\.me\/\d+)/).map((part, i) =>
    part.startsWith('https://wa.me/') ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
    ) : (
      part
    )
  );

// Botón flotante que abre el chat con el asistente (api/chat.js).
const ChatWidget = () => {
  const { t } = useLanguage();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  // Cuando es true se oculta el campo de texto y queda el botón de WhatsApp.
  const [suggestWhatsapp, setSuggestWhatsapp] = useState(false);
  // Formulario de contacto: aparece cuando el visitante quiere agendar,
  // cotizar o hablar con el equipo. Los datos llegan por correo (api/lead.js).
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', contact: '', need: '', website: '' });
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('idle');
  const [leadErrors, setLeadErrors] = useState({ name: false, contact: false });
  const threadRef = useRef<HTMLDivElement>(null);
  // En el teléfono el botón flotante tapaba el botón principal del hero.
  // Mientras ese botón está a la vista, el flotante se esconde.
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector('.hero .btn-primary');
    if (!heroCta) return;
    const phone = window.matchMedia('(max-width: 768px)');
    let ctaVisible = false;
    const update = () => setTucked(phone.matches && ctaVisible);

    const observer = new IntersectionObserver(([entry]) => {
      ctaVisible = entry.isIntersecting;
      update();
    });
    observer.observe(heroCta);
    // También al girar el teléfono o cambiar el ancho de la ventana.
    phone.addEventListener('change', update);
    return () => {
      observer.disconnect();
      phone.removeEventListener('change', update);
    };
  }, []);

  // Mantiene a la vista el último mensaje.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading, open, showLead, leadStatus]);

  const sendLead = async (e: FormEvent) => {
    e.preventDefault();
    if (leadStatus === 'sending') return;
    const name = lead.name.trim();
    const contact = lead.contact.trim();
    const errors = { name: !name, contact: !isContact(contact) };
    setLeadErrors(errors);
    if (errors.name || errors.contact) return;

    setLeadStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          name,
          contact,
          transcript: messages,
          page: window.location.pathname,
        }),
      });
      setLeadStatus(res.ok ? 'sent' : 'error');
    } catch {
      setLeadStatus('error');
    }
  };

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    const conversation: Message[] = [...messages, { role: 'user', content }];
    setMessages(conversation);
    setInput('');
    setLoading(true);
    setFailed(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessages([...conversation, { role: 'assistant', content: data.reply }]);
        if (data.askContact) setShowLead(true);
      } else {
        setFailed(true);
      }
      if (data.suggestWhatsapp) setSuggestWhatsapp(true);
    } catch {
      setFailed(true);
      setSuggestWhatsapp(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-widget ${tucked && !open ? 'chat-widget-tucked' : ''}`}>
      {open && (
        <div className="chat-panel" role="dialog" aria-label={t.chatWidget.aria}>
          <div className="chat-panel-header">
            <div className="chat-avatar" aria-hidden="true">
              <svg viewBox="0 0 36 36" width="22" height="22">
                <circle cx="18" cy="11" r="3" fill="currentColor" />
                <path d="M18 13 L21 15 L21.5 22 L18 26 L14.5 22 L15 15 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="chat-meta">
              <p className="chat-name">abeeFlow</p>
              <p className="chat-status">
                <span className="chat-dot" aria-hidden="true"></span>
                {t.chatWidget.status}
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-wa-link"
              aria-label={t.chatWidget.toWhatsapp}
              title={t.chatWidget.toWhatsapp}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
            </a>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label={t.chatWidget.dismiss}
            >
              ×
            </button>
          </div>

          <div className="chat-thread" ref={threadRef}>
            <div className="chat-msg in">{t.chatWidget.welcome}</div>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === 'user' ? 'out' : 'in'}`}>
                {withLinks(m.content)}
              </div>
            ))}
            {loading && (
              <div className="chat-typing" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            {!loading && messages.length === 0 && (
              <div className="chat-quick-options">
                {t.chatWidget.quickOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    className="chat-quick-option"
                    onClick={() => send(opt.prompt)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {failed && <div className="chat-error">{t.chatWidget.errorGeneric}</div>}

            {showLead && leadStatus !== 'sent' && (
              <form className="chat-lead" onSubmit={sendLead} noValidate>
                <p className="chat-lead-title">{t.chatWidget.lead.title}</p>
                <label className="chat-lead-field">
                  <span>{t.chatWidget.lead.name}</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    maxLength={80}
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    aria-invalid={leadErrors.name}
                  />
                  {leadErrors.name && <span className="chat-lead-error">{t.chatWidget.lead.invalidName}</span>}
                </label>
                <label className="chat-lead-field">
                  <span>{t.chatWidget.lead.contact}</span>
                  <input
                    type="text"
                    name="contact"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={120}
                    value={lead.contact}
                    onChange={(e) => setLead({ ...lead, contact: e.target.value })}
                    aria-invalid={leadErrors.contact}
                  />
                  {leadErrors.contact && <span className="chat-lead-error">{t.chatWidget.lead.invalidContact}</span>}
                </label>
                <label className="chat-lead-field">
                  <span>{t.chatWidget.lead.need}</span>
                  <textarea
                    name="need"
                    rows={2}
                    maxLength={1000}
                    value={lead.need}
                    onChange={(e) => setLead({ ...lead, need: e.target.value })}
                  />
                </label>
                {/* Campo trampa para bots: oculto para las personas. */}
                <input
                  type="text"
                  name="website"
                  className="chat-lead-trap"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={lead.website}
                  onChange={(e) => setLead({ ...lead, website: e.target.value })}
                />
                {leadStatus === 'error' && <p className="chat-error">{t.chatWidget.lead.error}</p>}
                <button type="submit" className="chat-cta chat-lead-send" disabled={leadStatus === 'sending'}>
                  {leadStatus === 'sending' ? t.chatWidget.lead.sending : t.chatWidget.lead.send}
                </button>
              </form>
            )}

            {leadStatus === 'sent' && (
              <>
                <div className="chat-msg in">
                  {t.chatWidget.lead.thanks.replace('{name}', lead.name.trim().split(/\s+/)[0])}
                </div>
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="chat-cta">
                  {t.chatWidget.lead.pickTime} <span aria-hidden="true">→</span>
                </a>
              </>
            )}

            {(suggestWhatsapp || leadStatus === 'error') && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-cta"
              >
                {t.chatWidget.cta} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>

          {!suggestWhatsapp && (
            <form
              className="chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                type="text"
                className="chat-input"
                name="message"
                placeholder={t.chatWidget.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                disabled={loading}
                aria-label={t.chatWidget.placeholder}
              />
              <button
                type="submit"
                className="chat-send"
                disabled={loading || !input.trim()}
                aria-label={t.chatWidget.send}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}

      <button
        type="button"
        className={`chat-toggle ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label={t.chatWidget.ariaButton}
        aria-expanded={open}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v2" />
          <rect x="4" y="7" width="16" height="12" rx="3" />
          <circle cx="9" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="13" r="1.2" fill="currentColor" stroke="none" />
          <path d="M9 17h6" />
          <path d="M2 12v3" />
          <path d="M22 12v3" />
        </svg>
      </button>
    </div>
  );
};

export default ChatWidget;
