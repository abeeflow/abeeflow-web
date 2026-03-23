import './SaasSolutions.css';

interface Project {
  icon: string;
  category: string;
  categoryColor: string;
  name: string;
  description: string;
  bgClass: string;
  link?: string;
}

const projects: Project[] = [
  {
    icon: 'M12 21c-1.5 0-2.8-.5-3.8-1.3C4.8 17.5 2 14 2 10.5 2 7.5 4.5 5 7.5 5c1.5 0 2.9.6 3.9 1.5L12 7l.6-.5C13.6 5.6 15 5 16.5 5 19.5 5 22 7.5 22 10.5c0 3.5-2.8 7-6.2 9.2-1 .8-2.3 1.3-3.8 1.3zM7 10h2v2h2v-2h2V8h-2V6H9v2H7v2z',
    category: 'SaaS',
    categoryColor: 'var(--yellow-hover)',
    name: 'VetSuite',
    description: 'Plataforma SaaS para clinicas veterinarias. Gestion de pacientes, historias clinicas, citas, inventario y facturacion.',
    bgClass: 'project-card-warm'
  },
  {
    icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0h2m0 0a1 1 0 011-1V9h3l3 4v4a1 1 0 01-1 1h-1',
    category: 'Software a medida',
    categoryColor: '#3B82F6',
    name: 'Sistema de gestion de flotas',
    description: 'Control de vehiculos, rutas, mantenimientos, conductores y reportes operativos. Desarrollo a medida para el cliente.',
    bgClass: 'project-card-blue'
  },
  {
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    category: 'Desarrollo web',
    categoryColor: '#8B5CF6',
    name: 'LOZARQ Estudio',
    description: 'Sitio web profesional para estudio de arquitectura y diseno interior. Portafolio de proyectos y servicios.',
    bgClass: 'project-card-purple',
    link: 'https://lozarqestudio.com'
  },
  {
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    category: 'Desarrollo web',
    categoryColor: '#8B5CF6',
    name: 'Guarderia Jardin San Jose',
    description: 'Sitio web institucional para guarderia bilingue. Programas, eventos e informacion para padres.',
    bgClass: 'project-card-purple',
    link: 'https://guarderiajardinsanjose.com'
  }
];

const SaasSolutions = () => {
  return (
    <section id="soluciones" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Soluciones por industria</h2>
          <p className="section-subtitle">Proyectos reales que hemos desarrollado. Desde plataformas SaaS hasta sitios web profesionales.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.bgClass}`}>
              <div className="project-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={project.icon}/>
                </svg>
              </div>
              <div className="project-card-category" style={{ color: project.categoryColor }}>{project.category}</div>
              <div className="project-card-name">{project.name}</div>
              <div className="project-card-desc">{project.description}</div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                  Visitar sitio
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaasSolutions;
