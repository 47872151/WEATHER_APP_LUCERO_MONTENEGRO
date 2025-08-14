import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();
const DEFAULT_THEME = 'dark';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Leer de localStorage si existe
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'light' ? 'light' : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Guardar el tema en localStorage cuando cambie
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDarkMode = theme === 'dark';

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      isDarkMode,
      isLoading,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
