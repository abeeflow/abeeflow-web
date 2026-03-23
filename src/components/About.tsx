import './About.css';

const About = () => {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2>Sobre nosotros</h2>
            <p className="about-text">En <strong>abeeFlow</strong>, desarrollamos software a medida y automatizamos procesos empresariales. Construimos desde aplicaciones web hasta plataformas SaaS completas, adaptadas a las necesidades de cada industria.</p>
            <p className="about-text">Trabajamos con startups, PYMEs y empresas que necesitan digitalizar sus operaciones: desarrollo de sistemas de gestion, automatizacion con Python e IA, migracion de datos y desarrollo web profesional.</p>
            <p className="about-text">Nuestro compromiso es entregar soluciones escalables, seguras y documentadas, con codigo limpio y buenas practicas que garantizan resultados a largo plazo.</p>
          </div>

          <div>
            <h3 className="team-title">Nuestro equipo</h3>
            <div className="team-grid">
              <div className="team-member" itemScope itemType="https://schema.org/Person">
                <div className="team-avatar">
                  <img
                    src="/maria.jpg"
                    alt="Maria Flores - Product & Strategy en Abeeflow"
                    loading="lazy"
                    width="120"
                    height="120"
                    itemProp="image"
                  />
                </div>
                <div>
                  <div className="team-name" itemProp="name">Maria Flores</div>
                  <div className="team-role">Product & Strategy</div>
                </div>
              </div>

              <div className="team-member" itemScope itemType="https://schema.org/Person">
                <div className="team-avatar">
                  <img
                    src="/chris.png"
                    alt="Alberth Mendoza - Lead Developer en Abeeflow"
                    loading="lazy"
                    width="120"
                    height="120"
                    itemProp="image"
                  />
                </div>
                <div>
                  <div className="team-name" itemProp="name">Alberth Mendoza</div>
                  <div className="team-role">Lead Developer</div>
                </div>
              </div>

              <div className="team-member" itemScope itemType="https://schema.org/Person">
                <div className="team-avatar">
                  <img
                    src="/esau.png"
                    alt="Esau Pretell - Data & Integrations en Abeeflow"
                    loading="lazy"
                    width="120"
                    height="120"
                    itemProp="image"
                  />
                </div>
                <div>
                  <div className="team-name" itemProp="name">Esau Pretell</div>
                  <div className="team-role">Data & Integrations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
