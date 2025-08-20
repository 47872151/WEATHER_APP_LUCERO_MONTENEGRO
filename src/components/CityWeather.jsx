import React, { useEffect } from "react";
import { useWeather } from "../contexts/WeatherContext";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";

function CityWeather() {
  const {
    currentQuery,
    fetchWeatherData,
    fetchForecast24h,
    fetchForecast5d,
    forecast24h,
    forecast5d,
    isLoading,
    errorMessage,
  } = useWeather();

  useEffect(() => {
    fetchWeatherData(currentQuery);
    fetchForecast24h(currentQuery);
    fetchForecast5d(currentQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery]);

  return (
    <div className="city-weather">
      <h1>Clima en {currentQuery}</h1>
      <CurrentWeather />
      <h2>Pronóstico por hora</h2>
      <HourlyForecast forecastData={forecast24h} />
      <h2>Pronóstico 5 días</h2>
      <DailyForecast forecastData={forecast5d} />
      {isLoading && <div>Cargando...</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}

export default CityWeather;