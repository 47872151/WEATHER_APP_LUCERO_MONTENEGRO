import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import './css/styles.css';

function CurrentWeather() {
  const {
    WeatherData,
    isLoading,
    errorMessage,
    currentQuery,
    setCurrentQuery,
    fetchWeatherData,
  } = useWeather();

  const [localInput, setLocalInput] = useState(currentQuery || '');

  function onSubmit(event) {
    event.preventDefault();
    const query = (localInput || '').trim();
    if (!query) return;
    setCurrentQuery(query);
    fetchWeatherData(query);
  }

  return (
    <div className="cw-root">
      <form className="cw-search" onSubmit={onSubmit}>
        <input
          className="cw-input"
          placeholder="Buscar ciudad (ej: Buenos Aires)"
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
        />
        <button className="cw-search-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {errorMessage && <div className="cw-error">{errorMessage}</div>}

      {!WeatherData && !isLoading && !errorMessage && (
        <div className="cw-empty">Ingresa una ciudad para comenzar</div>
      )}

      {WeatherData && (
        <div className="cw-details">
          <h2 className="cw-city">{WeatherData.name}</h2>
          <div className="cw-temp">
            {Math.round(WeatherData.main.temp - 273.15)}°C
          </div>
          <div className="cw-desc">
            {WeatherData.weather[0].description}
          </div>
          <div className="cw-meta">
            <span>Humedad: {WeatherData.main.humidity}%</span>
            <span>Viento: {WeatherData.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;