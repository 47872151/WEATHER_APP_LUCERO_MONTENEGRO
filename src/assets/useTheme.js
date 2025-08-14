import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { getTheme } from './theme';


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  const { theme, setTheme } = context;
  const isDarkMode = theme === 'dark';
  const themeColors = getTheme(isDarkMode);


  return {
    ...context,
    theme: themeColors,
    colors: themeColors,
    isDarkMode,
  };
};
