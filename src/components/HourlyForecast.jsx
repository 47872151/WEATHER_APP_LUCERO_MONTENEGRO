import React from "react";
import '../css/styles.css';

function HourlyForecast({ data, unit, convertTemp }) {
  if (!data || !data.list) return <div className="hourly-forecast">No hay datos disponibles.</div>;

  return (
    <div className="hourly-forecast">
      {data.list.slice(0, 8).map((item, idx) => (
        <div key={idx} className="hourly-item">
          <div className="hourly-time">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="hourly-icon">
            <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="icon" />
          </div>
          <div className="hourly-temp">{convertTemp(item.main.temp)}</div>
          <div className="hourly-desc">{item.weather[0].main}</div>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;