import React from "react";
import '../css/styles.css';

function DailyForecast({ data, convertTemp }) {
  if (!data || !data.list) return <div className="daily-forecast">No hay datos disponibles.</div>;

  const days = [];
  const seenDates = new Set();

  // Agrupa por día y busca min/max
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!seenDates.has(date)) {
      // Busca todos los items de ese día
      const itemsOfDay = data.list.filter(i => new Date(i.dt * 1000).toLocaleDateString() === date);
      // Calcula min y max
      const minTemp = Math.min(...itemsOfDay.map(i => i.main.temp_min ?? i.main.temp));
      const maxTemp = Math.max(...itemsOfDay.map(i => i.main.temp_max ?? i.main.temp));
      // Elige el item del mediodía para mostrar icono y descripción
      const noonItem = itemsOfDay[Math.floor(itemsOfDay.length / 2)];
      days.push({
        date,
        weekday: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        icon: noonItem.weather[0].icon,
        desc: noonItem.weather[0].main,
        minTemp,
        maxTemp,
        avgTemp: noonItem.main.temp
      });
      seenDates.add(date);
    }
  });

  // Helper para ancho y posición de barra
  const getBarStyle = (min, max, avg) => {
    const range = max - min;
    if (range === 0) return { width: '100%', marginLeft: 0 };
    const percent = ((avg - min) / range) * 100;
    return {
      width: '40%', // ancho fijo de barra
      marginLeft: `${percent * 0.6}%` // desliza la barra según la temp promedio
    };
  };

  return (
    <div className="daily-forecast">
      {days.map((day, idx) => (
        <div key={idx} className="daily-item">
          <div className="daily-date">{idx === 0 ? "Today" : day.weekday}</div>
          <div className="daily-icon">
            <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="icon" />
          </div>
          <div className="daily-desc">{day.desc}</div>
          <div className="daily-temp-min">{convertTemp(day.minTemp)}</div>
          <div className="daily-bar">
            <div
              className="daily-bar-fill"
              style={getBarStyle(day.minTemp, day.maxTemp, day.avgTemp)}
            />
          </div>
          <div className="daily-temp-max">{convertTemp(day.maxTemp)}</div>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;