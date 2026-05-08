import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './WhatsAppWidget.css';

type Phase = 'hidden' | 'msg1' | 'typing' | 'msg2' | 'cta';

const STORAGE_KEY = 'abeeflow-chat-dismissed';
const WHATSAPP_URL = 'https://wa.me/51999950133';

const WhatsAppWidget = () => {
  const { t } = useLanguage();
  const flows = t.chatWidget.flows;

  const [phase, setPhase] = useState<Phase>('hidden');
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Persist random flow index across language toggles (so the conversation
  // doesn't reset / change copy mid-session)
  const flowIndexRef = useRef<number>(Math.floor(Math.random() * flows.length));
  const flow = flows[flowIndexRef.current] ?? flows[0];

  const timersRef = useRef<number[]>([]);

  // Read sessionStorage dismissal flag on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') setDismissed(true);
    } catch {
      // sessionStorage unavailable — ignore
    }
  }, []);

  // Trigger: scroll past hero (~80%) OR 12s fallback
  useEffect(() => {
    if (dismissed) return;
    const hero = document.querySelector('.hero');
    let triggered = false;

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setOpen(true);
    };

    const onScroll = () => {
      const heroHeight = (hero as HTMLElement | null)?.clientHeight ?? 600;
      if (window.scrollY > heroHeight * 0.8) trigger();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = window.setTimeout(trigger, 12000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(fallback);
    };
  }, [dismissed]);

  // Run conversation animation once opened
  useEffect(() => {
    if (!open || dismissed) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPhase('cta');
      return;
    }

    const t1 = window.setTimeout(() => setPhase('msg1'), 400);
    const t2 = window.setTimeout(() => setPhase('typing'), 1400);
    const t3 = window.setTimeout(() => setPhase('msg2'), 2600);
    const t4 = window.setTimeout(() => setPhase('cta'), 3400);
    timersRef.current = [t1, t2, t3, t4];

    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, [open, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // sessionStorage unavailable — ignore
    }
  };

  const isOpen = open && !dismissed;

  return (
    <div className="whatsapp-widget-container">
      {isOpen && (
        <div className="chat-bubble" role="dialog" aria-label={t.chatWidget.aria}>
          <button
            type="button"
            className="chat-close"
            onClick={handleDismiss}
            aria-label={t.chatWidget.dismiss}
          >
            ×
          </button>

          <div className="chat-header">
            <div className="chat-avatar" aria-hidden="true">
              <svg viewBox="0 0 36 36" width="20" height="20">
                <path d="M16.5 8.5 Q15 7 15 5.5" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
                <path d="M19.5 8.5 Q21 7 21 5.5" stroke="currentColor" strokeWidth="0.7" fill="none" strokeLinecap="round" />
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
          </div>

          <div className="chat-thread">
            {(phase === 'msg1' || phase === 'typing' || phase === 'msg2' || phase === 'cta') && (
              <div className="chat-msg in">{flow.msg1}</div>
            )}
            {phase === 'typing' && (
              <div className="chat-typing" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            {(phase === 'msg2' || phase === 'cta') && (
              <div className="chat-msg in">{flow.msg2}</div>
            )}
            {phase === 'cta' && (
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
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        className={`whatsapp-widget ${isOpen ? 'pulsing' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.chatWidget.ariaButton}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppWidget;
