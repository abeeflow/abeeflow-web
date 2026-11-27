import type { ComponentType } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { useLenis } from './hooks/useLenis';
import Header from './components/Header';
import HoneycombBackground from './components/HoneycombBackground';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import VetSuitePage from './pages/VetSuitePage';
import DevPage from './pages/DevPage';
import DraftPage from './pages/DraftPage';

// Páginas internas. Cualquier otra ruta muestra el inicio.
const pages: Record<string, ComponentType> = {
  '/vetsuite': VetSuitePage,
  '/desarrollo-web': DevPage,
  // Borrador del inicio para mypes, para comparar antes de publicarlo.
  '/vdraft': DraftPage,
};

const SkipLink = () => {
  const { t } = useLanguage();
  return (
    <a href="#main" className="skip-link">
      {t.nav.skip}
    </a>
  );
};

function App() {
  useLenis();
  // En minúsculas: /vDraft y /vdraft llevan a la misma página.
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  const Page = pages[path] ?? Home;

  return (
    <LanguageProvider>
      <HoneycombBackground />
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Page />
      </main>
      <Footer mype={path === '/vdraft'} />
      <ChatWidget />
    </LanguageProvider>
  );
}

export default App;
