import './Process.css';

const processData = [
  {
    number: '01',
    title: 'Entendemos tu negocio',
    description: 'Nos reunimos contigo para entender tu operacion, tus procesos y tus puntos de dolor. Identificamos que se puede automatizar, digitalizar o construir desde cero.'
  },
  {
    number: '02',
    title: 'Desarrollamos tu solucion',
    description: 'Disenamos la arquitectura, construimos el software y lo probamos en conjunto. Ya sea un SaaS, una automatizacion o una migracion, trabajas con nosotros en cada iteracion.'
  },
  {
    number: '03',
    title: 'Desplegamos y escalamos',
    description: 'Ponemos tu solucion en produccion, te capacitamos y seguimos optimizando. Si tu negocio crece, tu software crece contigo.'
  }
];

const Process = () => {
  return (
    <section id="proceso" className="process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Como trabajamos</h2>
          <p className="section-subtitle">Un proceso transparente y estructurado para garantizar resultados optimos.</p>
        </div>

        <div className="process-grid">
          {processData.map((step, index) => (
            <div key={index} className="process-card">
              <div className="process-num">{step.number}</div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
