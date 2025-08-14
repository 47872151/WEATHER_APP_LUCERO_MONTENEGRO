import React from "react";
import '../css/styles.css';

function DailyForecast({ data, convertTemp }) {
  if (!data || !data.list) return <div className="daily-forecast">No hay datos disponibles.</div>;

  const days = [];
  const seenDates = new Set();

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!seenDates.has(date)) {
      days.push(item);
      seenDates.add(date);
    }
  });

  // Calcular mín y máx para la barra
  const temps = days.map(day => day.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  // Helper para ancho de barra
  const getBarWidth = (temp) => {
    if (maxTemp === minTemp) return '100%';
    return `${((temp - minTemp) / (maxTemp - minTemp)) * 100}%`;
  };

  return (
    <div className="daily-forecast">
      {days.map((day, idx) => (
        <div key={idx} className="daily-item">
          <div className="daily-date">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
          <div className="daily-icon">
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icon" />
          </div>
          <div className="daily-desc">{day.weather[0].main}</div>
          <div className="daily-temp">{convertTemp(day.main.temp)}</div>
          <div className="daily-bar">
            <div
              className="daily-bar-fill"
              style={{ width: getBarWidth(day.main.temp) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;