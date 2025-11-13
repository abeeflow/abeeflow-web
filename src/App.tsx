import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import About from './components/About';
import Cases from './components/Cases';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Hero />
      </div>
      <Benefits />
      <About />
      <Cases />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
