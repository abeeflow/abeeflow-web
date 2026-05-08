import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Benefits from './components/Benefits';
import SaasSolutions from './components/SaasSolutions';
import About from './components/About';
import Cases from './components/Cases';
import Process from './components/Process';
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
  return (
    <LanguageProvider>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <Benefits />
        <SaasSolutions />
        <About />
        <Cases />
        <Process />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}

export default App;
