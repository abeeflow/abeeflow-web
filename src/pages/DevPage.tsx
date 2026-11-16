import { useLanguage } from '../i18n/LanguageContext';
import PageIntro from '../components/PageIntro';
import SaasSolutions from '../components/SaasSolutions';
import Contact from '../components/Contact';

const DevPage = () => {
  const { t } = useLanguage();
  const page = t.pages.dev;

  return (
    <>
      <PageIntro badge={page.badge} title={page.title} subtitle={page.subtitle} cta={page.cta} />
      <SaasSolutions />
      <Contact />
    </>
  );
};

export default DevPage;
