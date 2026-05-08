import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './WhatsAppWidget.css';

type Message = { role: 'user' | 'model'; content: string };

const WHATSAPP_URL = 'https://wa.me/51999950133';
const MAX_USER_TURNS = 8;
const STORAGE_DISMISSED = 'abeeflow-chat-dismissed';

const WhatsAppWidget = () => {
  const { t, language } = useLanguage();

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestWA, setSuggestWA] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  // Welcome message al abrir por primera vez (o al cambiar idioma con panel cerrado)
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'model', content: t.chatWidget.welcome }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, language]);

  // Auto-scroll al fondo cuando entra mensaje nuevo
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Detectar dismissal de sesión anterior
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_DISMISSED) === '1') {
        setDismissed(true);
      }
    } catch {
      // sessionStorage unavailable — ignore
    }
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userTurns = messages.filter((m) => m.role === 'user').length;
    if (userTurns >= MAX_USER_TURNS) {
      setSuggestWA(true);
      return;
    }

    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.chatWidget.errorGeneric);
        if (data.suggestWhatsapp) setSuggestWA(true);
        return;
      }

      setMessages([...newMessages, { role: 'model', content: data.reply }]);
      if (data.suggestWhatsapp) setSuggestWA(true);
    } catch {
      setError(t.chatWidget.errorGeneric);
      setSuggestWA(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setOpen(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_DISMISSED, '1');
    } catch {
      // sessionStorage unavailable — ignore
    }
  };

  const handleToggle = () => {
    if (dismissed) {
      setDismissed(false);
      try {
        sessionStorage.removeItem(STORAGE_DISMISSED);
      } catch {
        // ignore
      }
    }
    setOpen((prev) => !prev);
  };

  const isOpen = open && !dismissed;

  return (
    <div className="whatsapp-widget-container">
      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label={t.chatWidget.aria}>
          <div className="chat-panel-header">
            <div className="chat-avatar" aria-hidden="true">
              <svg viewBox="0 0 36 36" width="22" height="22">
                <circle cx="18" cy="11" r="3" fill="currentColor" />
                <path d="M18 13 L21 15 L21.5 22 L18 26 L14.5 22 L15 15 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="chat-meta">
              <p className="chat-name">Abeeflow</p>
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
              onClick={handleDismiss}
              aria-label={t.chatWidget.dismiss}
            >
              ×
            </button>
          </div>

          <div className="chat-thread" ref={threadRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === 'user' ? 'out' : 'in'}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="chat-typing" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            {error && <div className="chat-error">{error}</div>}
            {suggestWA && (
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

          {!suggestWA && (
            <form
              className="chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="chat-input"
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
        className={`whatsapp-widget ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        aria-label={t.chatWidget.ariaButton}
        aria-expanded={isOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppWidget;
