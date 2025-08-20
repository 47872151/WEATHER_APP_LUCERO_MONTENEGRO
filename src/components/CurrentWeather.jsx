import React from 'react';
import '../css/styles.css';

function CurrentWeather({ data, convertTemp, city }) {
  if (!data) return <div className="cw-empty">Busca una ciudad para ver su clima.</div>;

   const localTime = data.dt && data.timezone
    ? new Date((data.dt + data.timezone) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="cw-details">
      <div className="cw-main">
        <div className="cw-temp">{convertTemp(data.main.temp)}</div>
        <div className="cw-city">{city}</div>
        <div className="cw-time">{localTime}</div>
        <div className="cw-icon">
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            alt={data.weather[0].description} 
          />
        </div>
        <div className="cw-desc">{data.weather[0].description}</div>
        <div className="cw-meta">
          <p>
            <span className="cw-feels-like-icon">🌡️</span> 
            {convertTemp(data.main.feels_like)}
          </p>
          <p>
            <span className="cw-wind-icon">💨</span> 
            {data.wind.speed} m/s
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;