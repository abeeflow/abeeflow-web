import './Process.css';

const Process = () => {
  return (
    <section id="proceso" className="process">
      <div className="container">
        <div className="section-header">
          <h2>Cómo trabajamos</h2>
          <p>Un proceso transparente y estructurado para garantizar resultados óptimos.</p>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <div className="process-number">01</div>
            <div className="process-icon-circle">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3>Diagnóstico del proceso</h3>
            <p>Analizamos tus flujos actuales e identificamos oportunidades de optimización y automatización específicas para tu operación.</p>
          </div>

          <div className="process-card">
            <div className="process-number">02</div>
            <div className="process-icon-circle">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3>Diseño y prueba del flujo</h3>
            <p>Desarrollamos la solución personalizada y realizamos pruebas exhaustivas en ambiente controlado para garantizar su funcionamiento.</p>
          </div>

          <div className="process-card">
            <div className="process-number">03</div>
            <div className="process-icon-circle">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3>Implementación y seguimiento</h3>
            <p>Desplegamos la automatización en tu entorno productivo y monitoreamos resultados para mejora continua y optimización constante.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

