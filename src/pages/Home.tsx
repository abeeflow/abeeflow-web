import { useEffect } from 'react';
import { scrollToSection } from '../lib/motion';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import Benefits from '../components/Benefits';
import Cases from '../components/Cases';
import Faq from '../components/Faq';
import Contact from '../components/Contact';

// Seis bloques, en el orden en que alguien decide: qué hacen, prueba,
// servicios, casos, dudas y cómo empezar.
const Home = () => {
  // Al llegar desde otra página con '/#contacto', baja a esa sección.
  // Espera un momento a que el scroll suave esté activo.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const timer = setTimeout(() => scrollToSection(hash), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero />
      <Metrics />
      <Benefits />
      <Cases />
      <Faq />
      <Contact full />
    </>
  );
};

export default Home;
