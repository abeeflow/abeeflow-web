import { useState } from 'react';
import { saveSetting } from '../lib/storage';

export type Theme = 'light' | 'dark';

// index.html ya aplicó el tema guardado antes de que cargue React.
const currentTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    saveSetting('abeeflow-theme', next);
  };

  return { theme, toggleTheme };
};
