import React from "react";
import './css/styles.css';
import { useWeather } from '../contexts/WeatherContext';

function DailyForecast() {
  const { forecastData } = useWeather();

  if (!forecastData || !forecastData.list) {
    return <div className="daily-forecast">No hay datos disponibles.</div>;
  }

  return (
    <div className="daily-forecast">
      {forecastData.list.map((day, idx) => (
        <div key={idx} className="daily-item">
          <div>{new Date(day.dt * 1000).toLocaleDateString()}</div>
          <div>Temp: {Math.round(day.temp.day - 273.15)}°C</div>
          <div>Min: {Math.round(day.temp.min - 273.15)}°C / Max: {Math.round(day.temp.max - 273.15)}°C</div>
          <div>{day.weather[0].description}</div>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;