import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WeatherProvider } from './contexts/WeatherContext';
import WeatherApp from './components/WeatherApp';
import { ThemeProvider } from './contexts/ThemeContext';
import { UnitProvider } from './contexts/UnitContext';


function App() {
  const [count, setCount] = useState(0)

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
