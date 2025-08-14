import React from 'react';
import '../css/styles.css';

function CurrentWeather({ data, unit, convertTemp, city }) {
  if (!data) return <div className="cw-empty">Busca una ciudad para ver el clima.</div>;

  return (
    <div className="cw-details">
      <div className="cw-main">
        <div className="cw-temp">{convertTemp(data.main.temp)}</div>
        <div className="cw-city">{city}</div>
        <div className="cw-desc">{data.weather[0].description}</div>
        <div className="cw-meta">
          <span>Sensación: {convertTemp(data.main.feels_like)}</span>
          <span>Viento: {data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;