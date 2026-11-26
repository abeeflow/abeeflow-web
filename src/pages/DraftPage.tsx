import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { WHATSAPP_URL } from '../lib/links';
import { useHeroTick } from '../hooks/useHeroTick';
import SectionLink from '../components/SectionLink';
import HeroHoneycomb from '../components/HeroHoneycomb';
import RevealOnScroll from '../components/RevealOnScroll';
import Contact from '../components/Contact';
import '../components/Hero.css';
import '../components/Faq.css';
import './DraftPage.css';

// vDraft: versión del inicio pensada para mypes, para comparar con la
// actual antes de reemplazarla. Solo en español y fuera de buscadores.
// Cada dato viene de lo que ya dice el sitio (casos, preguntas, proceso);
// no hay cifras ni servicios nuevos.

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const facts = ['Diagnóstico gratis de 30 min', 'Primera tarea lista en menos de 2 semanas', 'Precio cerrado antes de empezar'];

// Iconos de trazo, del mismo estilo que los del panal (24x24).
const painIcons: ReactNode[] = [
  // Mensajes
  <path key="chat" d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  // Banco
  <g key="bank"><path d="M3 22h18" /><path d="M6 18v-7" /><path d="M10 18v-7" /><path d="M14 18v-7" /><path d="M18 18v-7" /><polygon points="12 2 20 7 4 7" /></g>,
  // Datos de un lado a otro
  <g key="transfer"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></g>,
  // Reportes
  <g key="report"><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></g>,
  // Documentos
  <g key="docs"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><circle cx="11.5" cy="14.5" r="2.5" /><path d="M13.3 16.3 15 18" /></g>,
  // Agenda
  <g key="agenda"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></g>,
];

// Lo que le pasa a una mype y cómo lo resolvemos, en sus palabras.
// Mismo orden que painIcons.
const pains = [
  {
    pain: 'Respondes las mismas preguntas por WhatsApp todo el día.',
    fix: 'Un asistente contesta por ti a cualquier hora, anota los datos del cliente y te pasa solo a los que están listos para comprar.',
  },
  {
    pain: 'Cuadrar las cuentas del banco te toma horas cada día.',
    fix: 'Lo dejamos automático. A un equipo de finanzas le tomaba 8 horas; ahora se hace solo en 30 minutos.',
  },
  {
    pain: 'Pasas datos a mano: del correo al Excel y del Excel al sistema.',
    fix: 'Un robot de software los copia y los revisa por ti, en los mismos programas que ya usas, igual que lo haría una persona.',
  },
  {
    pain: 'El reporte del mes lo armas a mano y siempre llega tarde.',
    fix: 'Juntamos tus datos en un solo lugar y los reportes se actualizan solos.',
  },
  {
    pain: 'Encontrar un documento o una factura antigua te toma horas.',
    fix: 'Pasamos tus papeles a la nube con buscador: cualquier documento aparece en menos de 30 segundos.',
  },
  {
    pain: 'Llevas la agenda o el inventario en cuadernos y hojas sueltas.',
    fix: 'Te hacemos un sistema simple a tu medida, como VetSuite, el que ya usan clínicas veterinarias.',
  },
];

// Los tres pasos del cierre, sin palabras como "piloto".
const steps = [
  {
    number: '01',
    title: 'Conversamos 30 minutos',
    description: 'Gratis, por videollamada. Nos cuentas qué tareas te quitan más tiempo y te decimos cuáles conviene automatizar y cuánto ahorrarías.',
  },
  {
    number: '02',
    title: 'Te hacemos una propuesta',
    description: 'Con la solución para tu problema, el precio cerrado y el plazo, todo por escrito. Tú decides si avanzamos.',
  },
  {
    number: '03',
    title: 'Lo ponemos en marcha',
    description: 'La primera tarea suele estar lista en menos de 2 semanas, y nos encargamos de que siga funcionando. Si algo cambia, respondemos en menos de 24 horas.',
  },
];

const results = [
  { value: '8 h → 30 min', label: 'para cuadrar el banco cada día' },
  { value: '24/7', label: 'atención por WhatsApp, también de noche y fines de semana' },
  { value: '< 30 s', label: 'para encontrar cualquier documento' },
];

const clients = ['Mynos.ai', 'SFA Inversiones', 'RecruitAI Systems', 'HRS Consulting', 'LOZARQ Estudio', 'Jardín San José'];

const faq = [
  { q: '¿Necesito saber de tecnología?', a: 'No. Nosotros lo armamos, lo dejamos funcionando sobre lo que ya usas (Excel, correo, el portal de tu banco) y lo cuidamos después.' },
  { q: '¿Es solo para empresas grandes?', a: 'No. Trabajamos con startups, pymes y empresas más grandes.' },
  { q: '¿Cuánto cuesta?', a: 'Depende de la tarea. En el diagnóstico gratuito te decimos cuánto costaría y cuánto ahorrarías, y el precio queda por escrito antes de empezar.' },
  { q: '¿Cuánto demora?', a: 'La primera tarea suele estar lista en menos de 2 semanas.' },
  { q: '¿Y si algo deja de funcionar?', a: 'Con el soporte mensual lo monitoreamos y lo ajustamos cuando algo cambia. Respondemos en menos de 24 horas.' },
  { q: '¿El sistema es mío?', a: 'Sí. Te entregamos el código y la documentación. No dependes de nosotros.' },
];

const DraftPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { tick, animate } = useHeroTick(heroRef);

  // Un borrador no debe aparecer en Google. index.html ya trae un meta
  // robots en "index": se cambia ese (dos metas que se contradicen
  // confunden) y se restaura al salir.
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    const previous = meta.content;
    meta.content = 'noindex, nofollow';
    return () => {
      if (created) meta.remove();
      else meta.content = previous;
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <h1>
                <span className="draft-h1-lead">Menos Excel y WhatsApp a mano.</span>
                <span className="hero-title-rest">Más tiempo para hacer crecer tu negocio.</span>
              </h1>
              <p>
                Automatizamos las tareas que hoy te quitan horas: responder mensajes, cuadrar el banco,
                armar reportes y pasar datos de un lado a otro. Para mypes que no tienen un área de sistemas.
              </p>
              <div className="hero-buttons">
                <SectionLink href="#contacto" className="btn-primary">
                  Agendar diagnóstico gratis
                  {arrow}
                </SectionLink>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-link-arrow">
                  Escríbenos por WhatsApp
                  {arrow}
                </a>
              </div>
              <ul className="draft-facts">
                {facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
            <div className="hero-visual">
              <HeroHoneycomb tick={tick} animate={animate} />
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="draft-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">¿Te suena familiar?</h2>
            <p className="section-subtitle">Lo que más tiempo le quita a una mype, y cómo lo resolvemos.</p>
          </div>
          <RevealOnScroll>
            <ul className="draft-pains">
              {pains.map((item, index) => (
                <li key={item.pain} className="draft-pain">
                  <span className="draft-pain-icon" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {painIcons[index]}
                    </svg>
                  </span>
                  {/* Hoy / Con abeeFlow: el mismo antes y después de los casos. */}
                  <dl className="draft-pain-compare">
                    <div className="draft-pain-now">
                      <dt>Hoy</dt>
                      <dd>{item.pain}</dd>
                    </div>
                    <div className="draft-pain-fix">
                      <dt>Con abeeFlow</dt>
                      <dd>{item.fix}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
          <div className="draft-note">
            <p>¿Tu caso no está aquí? Cuéntanoslo en el diagnóstico y te decimos si se puede automatizar.</p>
            <SectionLink href="#contacto" className="btn-link-arrow">
              Contar mi caso
              {arrow}
            </SectionLink>
          </div>
        </div>
      </section>

      <section id="casos" className="draft-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Negocios que ya trabajan así</h2>
          </div>
          <dl className="draft-results">
            {results.map((result) => (
              <div key={result.value} className="draft-result">
                <dt>{result.label}</dt>
                <dd>{result.value}</dd>
              </div>
            ))}
          </dl>
          <p className="draft-clients">
            <span>Confían en nosotros:</span> {clients.join(' · ')}
          </p>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Preguntas frecuentes</h2>
          </div>
          <RevealOnScroll className="faq-list">
            {faq.map((item) => (
              <details key={item.q} className="faq-item">
                <summary className="faq-question">{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      <Contact full steps={steps} />

      {/* Marca de borrador, para no confundirla con la versión publicada. */}
      <a href="/" className="draft-badge" aria-label="vDraft: versión para mypes. Ver la versión actual">
        <span className="draft-badge-tag">vDraft</span>
        <span className="draft-badge-text">Versión para mypes · ver la actual</span>
      </a>
    </>
  );
};

export default DraftPage;
