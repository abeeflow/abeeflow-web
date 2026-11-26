import { useLanguage } from '../i18n/LanguageContext';
import './SaasSolutions.css';

const projectMeta = [
  { icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10m10 0H3m10 0h2m0 0a1 1 0 011-1V9h3l3 4v4a1 1 0 01-1 1h-1', bgClass: 'project-card-cream' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', bgClass: 'project-card-deep', link: 'https://lozarqestudio.com' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.677 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', bgClass: 'project-card-muted', link: 'https://guarderiajardinsanjose.com' }
];

const SaasSolutions = () => {
  const { t } = useLanguage();

  return (
    <section className="projects-section" aria-label={t.pages.dev.title}>
      <div className="container">
        <div className="projects-grid">
          {t.projects.items.map((project, index) => {
            const meta = projectMeta[index];
            return (
              <div key={project.name} className="projects-grid-item">
                <div className={`project-card ${meta.bgClass}`}>
                  <div className="project-card-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={meta.icon}/>
                    </svg>
                  </div>
                  <div className="project-card-category">{project.category}</div>
                  <h2 className="project-card-name">{project.name}</h2>
                  <div className="project-card-desc">{project.description}</div>
                  {meta.link && (
                    <a href={meta.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                      {t.projects.visitSite}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SaasSolutions;
