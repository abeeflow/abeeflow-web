import { useState, useEffect, useRef } from 'react';
import './Benefits.css';

interface Benefit {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const benefitsData: Benefit[] = [
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Automatización inteligente',
    description: 'Diseñamos flujos automáticos que eliminan retrabajos y validan la información en cada paso. Menos cuellos de botella, más velocidad operativa y métricas claras de mejora como tiempo de ciclo o tasa de error.',
    features: [
      'Disminución de errores y retrabajo',
      'Validaciones y alertas automáticas',
      'Escalable sin licencias propietarias'
    ]
  },
  {
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    title: 'Integración total',
    description: 'Orquestamos integraciones seguras para que tus sistemas, datos y equipos trabajen en completa sincronía. Información consistente, sin duplicidades y disponible en tiempo real para una toma de decisiones ágil.',
    features: [
      'Sincronización de datos en tiempo real',
      'Conectores listos o desarrollos a medida',
      'Auditoría y trazabilidad de procesos'
    ]
  },
  {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    title: 'Soluciones personalizadas',
    description: 'Partimos de tus metas y KPIs para construir procesos que respondan exactamente a tus necesidades. Nada genérico: cada flujo está diseñado para tu industria, tus equipos y tus objetivos.',
    features: [
      'Configuración de KPIs y reglas por área',
      'Seguridad y roles definidos por perfil',
      'Documentación y transferencia completa'
    ]
  },
  {
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    title: 'Mejora continua',
    description: 'Acompañamos cada implementación con un proceso de optimización constante basado en datos reales. Monitoreamos resultados, aplicamos mejoras progresivas y aseguramos la evolución continua de tus flujos.',
    features: [
      'Paneles y alertas proactivas',
      'Pruebas controladas de mejoras',
      'Roadmap trimestral de optimización'
    ]
  }
];

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const previousIndexRef = useRef(0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScroll = () => {
      const containerWidth = grid.clientWidth;
      const cards = grid.querySelectorAll('.benefit-card');
      
      if (cards.length === 0) return;
      
      // Encontrar la tarjeta más visible usando getBoundingClientRect para mayor precisión
      let mostVisibleIndex = 0;
      let maxVisibility = 0;
      const containerRect = grid.getBoundingClientRect();
      
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        
        // Calcular el área visible de la tarjeta dentro del contenedor
        const visibleLeft = Math.max(0, cardRect.left - containerRect.left);
        const visibleRight = Math.min(containerWidth, cardRect.right - containerRect.left);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        const cardWidth = cardRect.width;
        const visibility = cardWidth > 0 ? visibleWidth / cardWidth : 0;
        
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleIndex = index;
        }
      });
      
      // Actualizar el índice activo con animación
      if (mostVisibleIndex !== previousIndexRef.current) {
        setIsTransitioning(true);
        setActiveIndex(mostVisibleIndex);
        previousIndexRef.current = mostVisibleIndex;
        setTimeout(() => setIsTransitioning(false), 400);
      }
    };

    // También usar requestAnimationFrame para suavizar las actualizaciones
    let rafId: number | null = null;
    const onScrollOptimized = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    grid.addEventListener('scroll', onScrollOptimized, { passive: true });
    handleScroll(); // Initial call
    
    // También escuchar eventos de touch para móvil
    grid.addEventListener('touchmove', onScrollOptimized, { passive: true });

    // También actualizar en resize para móvil
    const handleResize = () => {
      setTimeout(handleScroll, 100); // Pequeño delay para que el DOM se actualice
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      grid.removeEventListener('scroll', onScrollOptimized);
      grid.removeEventListener('touchmove', onScrollOptimized);
      window.removeEventListener('resize', handleResize);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section id="servicios" className="benefits">
       
      <div className="container">
        <div className="section-header">
            <h2>Servicios</h2>
            
        </div>
        <div className="benefits-grid-wrapper">
          <div className="benefits-grid" ref={gridRef}>
            {benefitsData.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon}/>
                </svg>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <ul className="benefit-features">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div 
          ref={indicatorsRef}
          className={`carousel-indicators ${isTransitioning ? 'transitioning' : ''}`}
        >
          {benefitsData.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${activeIndex === index ? 'active' : ''}`}
            ></div>
          ))}
          {activeIndex < benefitsData.length - 1 && (
            <div className="scroll-hint">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

