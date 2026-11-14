// El navegador puede bloquear localStorage (modo privado).
// En ese caso la web sigue funcionando, solo que no recuerda la preferencia.

export const loadSetting = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const saveSetting = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Sin almacenamiento disponible.
  }
};
