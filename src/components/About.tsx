import { useLanguage } from '../i18n/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import './About.css';

const teamImages = ['/maria.jpg', '/chris.jpg', '/esau.jpg'];

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2>{t.about.title}</h2>
            {t.about.paragraphs.map((p, i) => (
              <p key={i} className="about-text" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          <div>
            <h3 className="team-title">{t.about.teamTitle}</h3>
            <div className="team-grid">
              {t.about.team.map((member, index) => (
                <RevealOnScroll key={member.name} delay={0.08 * index}>
                  <div className="team-member" itemScope itemType="https://schema.org/Person">
                    <div className="team-avatar">
                      <img src={teamImages[index]} alt={`${member.name} - ${member.role}`} loading="lazy" width="120" height="120" itemProp="image" />
                    </div>
                    <div>
                      <div className="team-name" itemProp="name">{member.name}</div>
                      <div className="team-role">{member.role}</div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
