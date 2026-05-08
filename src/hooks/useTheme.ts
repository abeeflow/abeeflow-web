import { useState } from 'react';

export type Theme = 'light' | 'dark';

const isTheme = (v: string | null): v is Theme => v === 'light' || v === 'dark';

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark';
    const attr = document.documentElement.getAttribute('data-theme');
    return isTheme(attr) ? attr : 'dark';
  });

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('abeeflow-theme', next);
    } catch (e) {
      // localStorage unavailable (e.g. private mode) — silent fail
    }
  };

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return { theme, setTheme, toggle };
};
