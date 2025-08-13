import React from "react";
import './css/styles.css';
import { useWeather } from '../contexts/WeatherContext';

function HourlyForecast() {
  const { forecastData } = useWeather();

  if (!forecastData || !forecastData.list) {
    return <div className="hourly-forecast">No hay datos disponibles.</div>;
  }

  return (
    <div className="hourly-forecast">
      {forecastData.list.slice(0, 8).map((item, idx) => (
        <div key={idx} className="hourly-item">
          <div>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div>Temp: {Math.round(item.main.temp - 273.15)}°C</div>
          <div>{item.weather[0].description}</div>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;