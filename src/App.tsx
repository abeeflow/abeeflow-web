import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { useLenis } from './hooks/useLenis';
import Header from './components/Header';
import HoneycombBackground from './components/HoneycombBackground';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import LogoStrip from './components/LogoStrip';
import Benefits from './components/Benefits';
import SaasSolutions from './components/SaasSolutions';
import About from './components/About';
import Cases from './components/Cases';
import Process from './components/Process';
import InlineCTA from './components/InlineCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import './App.css';

const SkipLink = () => {
  const { language } = useLanguage();
  return (
    <a href="#main" className="skip-link">
      {language === 'en' ? 'Skip to content' : 'Saltar al contenido'}
    </a>
  );
};

function App() {
  useLenis();

  return (
    <LanguageProvider>
      <HoneycombBackground />
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <LogoStrip />
        <Benefits />
        <SaasSolutions />
        <Process />
        <Cases />
        <InlineCTA />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}

export default App;
