import './App.css'
import { WeatherProvider } from './contexts/WeatherContext';
import WeatherApp from './components/WeatherApp';
import { ThemeProvider } from './contexts/ThemeContext';
import { UnitProvider } from './contexts/UnitContext';


function App() {
  return (
    <ThemeProvider>
      <UnitProvider>
        <WeatherProvider>
          <WeatherApp />
        </WeatherProvider>
      </UnitProvider>
    </ThemeProvider>
  )
}

export default App
