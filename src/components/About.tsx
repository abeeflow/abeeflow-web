import './About.css';

const About = () => {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-content mt-20" >
          <div className="about-text">
            <div className="section-header">
              <h2>Sobre nosotros</h2>
            </div>
            
            <div className="about-description">
              <p>
                En <strong>abeeFlow</strong>, nos especializamos en transformar procesos empresariales 
                mediante automatización inteligente e integraciones personalizadas. Nuestro enfoque 
                combina tecnología de vanguardia con un profundo entendimiento de las necesidades 
                específicas de cada industria.
              </p>
              <p>
                Trabajamos con empresas que buscan optimizar sus operaciones, reducir costos 
                operativos y mejorar la eficiencia mediante soluciones tecnológicas a medida. 
                Cada proyecto es una oportunidad de crear valor real y medible para nuestros clientes.
              </p>
              <p>
                Nuestro compromiso es entregar soluciones escalables, seguras y documentadas, 
                acompañadas de un proceso de mejora continua que garantiza resultados a largo plazo.
              </p>
            </div>
          </div>

          <div className="team-section">
            <h3>Nuestro equipo</h3>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">
                  <img src="/maria.jpg" alt="Maria" />
                </div>
                <div className="team-name">Maria Flores</div>
              </div>

              <div className="team-member">
                <div className="team-avatar">
                  <img src="/chris.png" alt="Chris" />
                </div>
                <div className="team-name">Alberth Mendoza</div>
              </div>

              <div className="team-member">
                <div className="team-avatar">
                  <img src="/esau.png" alt="Esau" />
                </div>
                <div className="team-name">Esau Pretell</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

