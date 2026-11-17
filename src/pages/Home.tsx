import { useEffect } from 'react';
import { scrollToSection } from '../lib/motion';
import Hero from '../components/Hero';
import Metrics from '../components/Metrics';
import LogoStrip from '../components/LogoStrip';
import FeaturedCase from '../components/FeaturedCase';
import Benefits from '../components/Benefits';
import ProductDemo from '../components/ProductDemo';
import About from '../components/About';
import Cases from '../components/Cases';
import Process from '../components/Process';
import InlineCTA from '../components/InlineCTA';
import Faq from '../components/Faq';
import Contact from '../components/Contact';

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
      <LogoStrip />
      <FeaturedCase />
      <Benefits />
      <ProductDemo />
      <Process />
      <Cases />
      <InlineCTA />
      <About />
      <Faq />
      <Contact />
    </>
  );
};

export default Home;
