import { useState, useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import './Cases.css';

interface CaseData {
  company: string;
  companyLogo: string;
  testimonial: string;
  tag: string;
  tagIcon: ReactElement;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

const Cases = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const cases: CaseData[] = [
    {
      company: 'RecruitAI Systems',
      companyLogo: 'RAI',
      testimonial: 'Reducimos en más del 80% el tiempo invertido en entrevistas preliminares y mejoramos significativamente la calidad en la selección de candidatos.',
      tag: 'Selección de personal',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      title: 'Selección automatizada de candidatos con IA',
      description: 'Sistema de videoentrevistas con avatares de IA integrado con Hireflix. Análisis automático de respuestas verbales, lenguaje corporal y soft skills. Genera informes PDF con evaluación objetiva para decisiones de reclutamiento basadas en datos.',
      features: [
        'Reducción de tiempo de entrevista de 30 a 5 minutos',
        'Evaluación objetiva y estandarizada con criterios uniformes',
        'Disponibilidad 24/7 para postulantes de cualquier zona horaria',
        'Incremento del 85% en eficiencia de contratación'
      ],
      gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
    },
    {
      company: 'FinData Automations',
      companyLogo: 'FDA',
      testimonial: 'Migramos desde plataformas RPA costosas a una solución propia en Python. Eliminamos errores manuales y reducimos el tiempo de conciliación en un 65%.',
      tag: 'Automatización financiera',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Conciliación bancaria automatizada con Python',
      description: 'Framework escalable desarrollado en Python para conciliación automática entre múltiples bancos y sistemas ERP. Migración completa desde plataformas como Blue Prism, UiPath y Automation Anywhere. Ejecución programada con detección inteligente de discrepancias.',
      features: [
        'Eliminación total de costos por licencias RPA propietarias',
        'Precisión del 99.7% en detección automática de errores',
        'Ejecución programada sin intervención humana',
        'Reducción de tiempo operativo de 8 horas a 30 minutos'
      ],
      gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
    },
    {
      company: 'SocialSense Analytics',
      companyLogo: 'SSA',
      testimonial: 'Ahora comprendemos la percepción real de nuestros clientes en tiempo real y generamos estrategias de contenido relevante en minutos, no en días.',
      tag: 'Marketing inteligente',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
        </svg>
      ),
      title: 'Análisis de sentimientos e ideación con IA',
      description: 'Sistema de monitoreo y análisis automatizado de redes sociales mediante API de Meta. Interpreta tono emocional, identifica tendencias emergentes y genera propuestas de contenido adaptadas al público objetivo con análisis predictivo de engagement.',
      features: [
        'Identificación de sentimientos y tendencias en tiempo real',
        'Generación automática de ideas y copys personalizados',
        'Mejora del 45% en engagement y reputación de marca',
        'Dashboards automáticos de desempeño y percepción'
      ],
      gradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)'
    },
    {
      company: 'DataHub Integrator',
      companyLogo: 'DHI',
      testimonial: 'Unificamos información dispersa de ERP, APIs, servicios web y hojas de cálculo en un solo panel centralizado con reportes automáticos e inteligentes.',
      tag: 'Integración de datos',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
        </svg>
      ),
      title: 'Portal centralizado de datos empresariales',
      description: 'Plataforma de recopilación y consolidación desde múltiples fuentes: ERP, APIs REST, web services, Google Sheets y archivos locales. Portal web seguro con consultas personalizadas por rol y visualizaciones interactivas. Ideal para organizaciones con ecosistemas tecnológicos fragmentados.',
      features: [
        'Reportes en tiempo real con actualización automática',
        'Consultas inteligentes segmentadas por usuario y área',
        'Acceso unificado a información crítica de negocio',
        'Eliminación del 92% de errores por procesamiento manual'
      ],
      gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'
    },
    {
      company: 'SalesFlow AI',
      companyLogo: 'SFA',
      testimonial: 'Aumentamos la conversión de leads en un 42% y redujimos los tiempos de respuesta inicial de horas a segundos, mejorando la experiencia del cliente.',
      tag: 'Automatización de ventas',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      ),
      title: 'Chatbot inteligente de ventas y atención',
      description: 'Asistente conversacional con IA entrenado en lenguaje natural para atender consultas, calificar leads según comportamiento, guiar el proceso de compra y resolver objeciones. Integración nativa con CRM, WhatsApp Business y plataformas de mensajería con aprendizaje continuo.',
      features: [
        'Atención instantánea 24/7 en múltiples canales',
        'Calificación automática de leads por scoring predictivo',
        'Integración bidireccional con CRM y WhatsApp Business',
        'Mejora continua mediante machine learning'
      ],
      gradient: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)'
    },
    {
      company: 'HR SmartWriter',
      companyLogo: 'HRS',
      testimonial: 'Reducimos el tiempo de publicación de ofertas y mejoramos la coherencia y atractivo de nuestros anuncios.',
      tag: 'Automatización de redacción',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      ),
      title: 'Redacción automatizada de ofertas de empleo',
      description: 'Redactar ofertas de empleo completas y atractivas suele requerir tiempo y genera resultados desiguales. El proceso automatizado recibe un brief a través de un formulario (Airtable), que se envía mediante n8n o Make a un modelo de IA (OpenAI) para generar la oferta. Luego, la publicación se guarda (Airtable o Google Docs) y se distribuye automáticamente en portales de empleo mediante Zapier o Make.',
      features: [
        'Reducción drástica del tiempo de redacción',
        'Coherencia de tono y estilo en todas las publicaciones',
        'Mayor atractivo y alcance de las ofertas',
        'Publicación automática en múltiples plataformas'
      ],
      gradient: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)'
    },
    {
      company: 'CustomerCare AI',
      companyLogo: 'CCA',
      testimonial: 'Ahora podemos detectar insatisfacciones antes de perder al cliente y mejorar la experiencia postventa.',
      tag: 'Seguimiento inteligente',
      tagIcon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Agente de seguimiento de satisfacción del cliente',
      description: 'El feedback postventa no siempre se gestiona de forma sistemática, lo que puede generar pérdida de clientes. Este agente conversacional basado en IA se activa automáticamente después de un ticket o una compra. Recoge opiniones, analiza el sentimiento y, según el resultado, envía recordatorios, genera reportes o escala el caso al soporte humano.',
      features: [
        'Incremento en la retención de clientes',
        'Feedback estructurado y accionable',
        'Menor carga operativa para el equipo de soporte',
        'Mejora continua de la experiencia del cliente'
      ],
      gradient: 'linear-gradient(135deg, #e0e7ff 0%, #ddd6fe 100%)'
    }
  ];

  const scrollCarousel = (direction: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.querySelector('.case-card')?.clientWidth || 0;
    const gap = 32;
    
    const newIndex = currentIndex + (direction * 2);
    if (newIndex < 0) {
      setCurrentIndex(0);
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    if (newIndex >= cases.length) {
      setCurrentIndex(Math.max(0, cases.length - 2));
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      return;
    }
    
    setCurrentIndex(newIndex);
    container.scrollTo({
      left: (cardWidth + gap) * newIndex,
      behavior: 'smooth'
    });
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.querySelector('.case-card')?.clientWidth || 0;
    const gap = 32;
    
    setCurrentIndex(index);
    container.scrollTo({
      left: (cardWidth + gap) * index,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = carousel.querySelector('.case-card')?.clientWidth || 0;
      const gap = 32;
      const newIndex = Math.round(carousel.scrollLeft / (cardWidth + gap));
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cases.length) {
        setCurrentIndex(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [currentIndex, cases.length]);

  return (
    <section id="casos" className="cases">
      <div className="container">
        <div className="section-header">
          <h2>Casos de uso reales</h2>
          <p>Soluciones implementadas que optimizan procesos, reducen costos operativos y aumentan la productividad desde el primer día de implementación.</p>
        </div>

        <div className="cases-carousel-wrapper">
          <div className="cases-carousel" ref={carouselRef}>
            {cases.map((caseItem, index) => (
              <div key={index} className="case-card" style={{ background: caseItem.gradient }}>
                <div className="case-testimonial">
                  <div className="case-company">
                    <div className="case-logo">{caseItem.companyLogo}</div>
                    <span className="case-company-name">{caseItem.company}</span>
                  </div>
                  <p>{caseItem.testimonial}</p>
                </div>

                <div className="case-header">
                  <span className="case-tag">
                    {caseItem.tagIcon}
                    {caseItem.tag}
                  </span>
                </div>

                <h3>{caseItem.title}</h3>
                <p>{caseItem.description}</p>

                <ul className="case-features">
                  {caseItem.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button 
              className="carousel-btn" 
              onClick={() => scrollCarousel(-1)}
              disabled={currentIndex === 0}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              className="carousel-btn" 
              onClick={() => scrollCarousel(1)}
              disabled={currentIndex === cases.length - 1}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className="carousel-dots">
            {cases.map((_, index) => (
              <div
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cases;

