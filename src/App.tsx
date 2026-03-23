import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import SaasSolutions from './components/SaasSolutions';
import About from './components/About';
import Cases from './components/Cases';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <Benefits />
      <SaasSolutions />
      <About />
      <Cases />
      <Process />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </LanguageProvider>
  );
}

export default App;
