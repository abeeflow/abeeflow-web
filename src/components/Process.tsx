import { useState, useEffect, useRef } from 'react';
import './Process.css';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processData: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnóstico del proceso',
    description: 'Analizamos tus flujos actuales e identificamos oportunidades de optimización y automatización específicas para tu operación.'
  },
  {
    number: '02',
    title: 'Diseño y prueba del flujo',
    description: 'Desarrollamos la solución personalizada y realizamos pruebas exhaustivas en ambiente controlado para garantizar su funcionamiento.'
  },
  {
    number: '03',
    title: 'Implementación y seguimiento',
    description: 'Desplegamos la automatización en tu entorno productivo y monitoreamos resultados para mejora continua y optimización constante.'
  }
];

const Process = () => {
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
      const cards = grid.querySelectorAll('.process-card');
      
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
    <section id="proceso" className="process">
      <div className="container">
        <div className="section-header">
          <h2>Cómo trabajamos</h2>
          <p>Un proceso transparente y estructurado para garantizar resultados óptimos.</p>
        </div>

        <div className="process-grid-wrapper">
          <div className="process-grid" ref={gridRef}>
            {processData.map((step, index) => (
              <div key={index} className="process-card">
                <div className="process-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div 
          ref={indicatorsRef}
          className={`carousel-indicators ${isTransitioning ? 'transitioning' : ''}`}
        >
          {processData.map((_, index) => (
            <div 
              key={index} 
              className={`indicator ${activeIndex === index ? 'active' : ''}`}
            ></div>
          ))}
          {activeIndex < processData.length - 1 && (
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

export default Process;

