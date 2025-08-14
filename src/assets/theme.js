export const lightTheme = {
  // Colores principales
  primary: '#6C63FF', // Un violeta azulado acorde al título "Weather App"
  primaryLight: '#EAE9FF', // Fondo suave para cards y detalles
  secondary: '#FF6B35', // Color acento cálido para contrastar
  
  // Colores de fondo
  background: '#F5F6FA', // Fondo gris-azulado muy claro
  surface: '#FFFFFF', // Fondo de inputs y contenedores
  card: '#FFFFFF', // Fondo de tarjetas

  // Colores de texto
  text: '#1E1E2F', // Texto principal gris muy oscuro
  textSecondary: '#5E6472', // Gris medio
  textTertiary: '#8E94A4', // Gris más claro para datos menos importantes

  // Colores de borde
  border: '#D9DBE0',
  borderLight: '#E5E7EB',

  // Colores de estado
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Sombras
  shadow: '#000000',
  shadowOpacity: 0.05,

  // Status bar
  statusBar: 'dark-content',
  statusBarBackground: '#F5F6FA',

  // Extras
  primaryText: '#1E1E2F',
  secondaryText: '#5E6472',
  backgroundScreen: '#F5F6FA',
  cardBackground: '#FFFFFF',
  googleBorder: '#D9DBE0',
  link: '#6C63FF'
};

export const darkTheme = {
  // Colores principales
  primary: '#6C63FF',
  primaryLight: '#2A2A40', // Fondo de cards suavemente azulado
  secondary: '#FF6B35',
  
  // Colores de fondo
  background: '#0F111A', // Fondo general muy oscuro
  surface: '#1C1E2A', // Fondo para tarjetas
  card: '#1C1E2A', // Fondo de tarjetas

  // Colores de texto
  text: '#FFFFFF',
  textSecondary: '#B0B3C0',
  textTertiary: '#7E8494',

  // Colores de borde
  border: '#2C2F3A',
  borderLight: '#3A3F4E',

  // Colores de estado
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Sombras
  shadow: '#000000',
  shadowOpacity: 0.3,

  // Status bar
  statusBar: 'light-content',
  statusBarBackground: '#0F111A',

  // Extras
  primaryText: '#FFFFFF',
  secondaryText: '#B0B3C0',
  backgroundScreen: '#0F111A',
  cardBackground: '#1C1E2A',
  googleBorder: '#2C2F3A',
  link: '#6C63FF'
};

export const getTheme = (isDarkMode) => {
  return isDarkMode ? darkTheme : lightTheme;
};