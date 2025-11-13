import './Benefits.css';

const Benefits = () => {
  return (
    <section id="servicios" className="benefits">
      <div className="container">
        <div className="benefits-grid">
          <div className="benefit-card">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <h3>Automatización inteligente</h3>
            <p>Diseñamos flujos automáticos que eliminan retrabajos y validan la información en cada paso. Menos cuellos de botella, más velocidad operativa y métricas claras de mejora como tiempo de ciclo o tasa de error.</p>
            <ul className="benefit-features">
              <li>Disminución de errores y retrabajo</li>
              <li>Validaciones y alertas automáticas</li>
              <li>Escalable sin licencias propietarias</li>
            </ul>
          </div>

          <div className="benefit-card">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
            <h3>Integración total</h3>
            <p>Orquestamos integraciones seguras para que tus sistemas, datos y equipos trabajen en completa sincronía. Información consistente, sin duplicidades y disponible en tiempo real para una toma de decisiones ágil.</p>
            <ul className="benefit-features">
              <li>Sincronización de datos en tiempo real</li>
              <li>Conectores listos o desarrollos a medida</li>
              <li>Auditoría y trazabilidad de procesos</li>
            </ul>
          </div>

          <div className="benefit-card">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
            <h3>Soluciones personalizadas</h3>
            <p>Partimos de tus metas y KPIs para construir procesos que respondan exactamente a tus necesidades. Nada genérico: cada flujo está diseñado para tu industria, tus equipos y tus objetivos.</p>
            <ul className="benefit-features">
              <li>Configuración de KPIs y reglas por área</li>
              <li>Seguridad y roles definidos por perfil</li>
              <li>Documentación y transferencia completa</li>
            </ul>
          </div>

          <div className="benefit-card">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <h3>Mejora continua</h3>
            <p>Acompañamos cada implementación con un proceso de optimización constante basado en datos reales. Monitoreamos resultados, aplicamos mejoras progresivas y aseguramos la evolución continua de tus flujos.</p>
            <ul className="benefit-features">
              <li>Paneles y alertas proactivas</li>
              <li>Pruebas controladas de mejoras</li>
              <li>Roadmap trimestral de optimización</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;

