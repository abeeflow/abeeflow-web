import { useState } from 'react';
import './Benefits.css';

interface Service {
  icon: string;
  title: string;
  shortDesc: string;
  features: string[];
}

const servicesData: Service[] = [
  {
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    title: 'SaaS a medida',
    shortDesc: 'Plataformas SaaS completas, multi-tenant y escalables para tu negocio.',
    features: [
      'Sistemas de gestion por industria',
      'Arquitectura multi-tenant desde el dia uno',
      'Apps web, paneles admin y APIs'
    ]
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Automatizacion inteligente',
    shortDesc: 'Eliminamos tareas repetitivas y reemplazamos licencias RPA costosas.',
    features: [
      'Migracion de RPA a Python: $0 en licencias',
      'Bots, flujos y validaciones automaticas',
      'Integracion con IA para decisiones'
    ]
  },
  {
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
    title: 'Migracion de datos',
    shortDesc: 'Migramos tu data y digitalizamos documentos. De papel a base de datos.',
    features: [
      'Diseno y migracion de bases de datos',
      'Digitalizacion documental a la nube',
      'Integraciones entre sistemas en tiempo real'
    ]
  },
  {
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    title: 'Consultoria continua',
    shortDesc: 'Diagnosticamos, implementamos y optimizamos con datos reales.',
    features: [
      'Diagnostico de procesos y KPIs',
      'Roadmap de optimizacion trimestral',
      'Paneles, reportes y alertas proactivas'
    ]
  },
  {
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    title: 'Desarrollo web',
    shortDesc: 'Sitios profesionales, rapidos y optimizados para buscadores.',
    features: [
      'Landing pages y sitios corporativos',
      'SEO basico y rendimiento optimizado',
      'Adaptados a cualquier dispositivo'
    ]
  }
];

const ServiceCard = ({ service }: { service: Service }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <div className="service-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={service.icon}/>
            </svg>
          </div>
          <h3 className="service-title">{service.title}</h3>
          <p className="service-desc">{service.shortDesc}</p>
          <div className="flip-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>Ver detalle</span>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <h3 className="service-title-back">{service.title}</h3>
          <ul className="service-features">
            {service.features.map((feature, i) => (
              <li key={i}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <div className="flip-hint flip-hint-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Volver</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Benefits = () => {
  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Servicios</h2>
          <p className="section-subtitle">Desde desarrollo de software hasta automatizacion con IA. Construimos lo que tu negocio necesita.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
