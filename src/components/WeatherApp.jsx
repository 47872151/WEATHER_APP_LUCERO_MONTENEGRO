import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWeather } from "../contexts/WeatherContext";
import { useThemeContext } from "../contexts/ThemeContext";
import CurrentWeather from "./CurrentWeather";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";


function WeatherApp() {
  const CIUDADES = [
    { name: "New York", country: "US" },
    { name: "Copenhagen", country: "Denmark" },
    { name: "Ho Chi Minh City", country: "Vietnam" },
  ];

  const {
    WeatherData,
    forecast24h,
    forecast5d,
    isLoading,
    errorMessage,
    currentQuery,
    setCurrentQuery,
    fetchWeatherData,
    fetchForecast24h,
    fetchForecast5d,
    unit,
    setUnit,
  } = useWeather();
  const { theme, toggleTheme } = useThemeContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [otherCitiesWeather, setOtherCitiesWeather] = useState([]);

  useEffect(() => {
    async function fetchOtherCities() {
      const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
      const promises = CIUDADES.map(city =>
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${apiKey}`)
          .then(res => ({
            ...city,
            temp: res.data.main.temp,
            desc: res.data.weather[0].main,
            icon: res.data.weather[0].icon,
          }))
          .catch(() => ({
            ...city,
            temp: null,
            desc: "No data",
            icon: null,
          }))
      );
      const results = await Promise.all(promises);
      setOtherCitiesWeather(results);
    }
    fetchOtherCities();
  }, []);

  useEffect(() => {
    if (currentQuery) {
      fetchWeatherData(currentQuery);
      fetchForecast24h(currentQuery);
      fetchForecast5d(currentQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery]);

  const handleCitySearch = (city) => {
    setCurrentQuery(city);
    setSearchQuery("");
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handleCitySearch(searchQuery.trim());
    }
  };

  // Conversión de temperatura
  const convertTemp = (tempK) => {
    if (tempK == null) return "";
    if (unit === "C") return Math.round(tempK - 273.15) + "°C";
    return Math.round((tempK - 273.15) * 9/5 + 32) + "°F";
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className={`weather-app${theme === 'dark' ? ' dark' : ' light'}`}>
      <header className="weather-header">
        <input
          type="text"
          placeholder="Search city..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
        <div className="unit-toggle">
          <button
            className={unit === "C" ? "active" : ""}
            onClick={() => setUnit("C")}
          >
            °C
          </button>
          <button
            className={unit === "F" ? "active" : ""}
            onClick={() => setUnit("F")}
          >
            °F
          </button>
        </div>
        <button onClick={handleThemeToggle} className="theme-toggle">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </header>
      {isLoading && <div>Cargando...</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <main>
        <section>
          <CurrentWeather
            data={WeatherData}
            unit={unit}
            convertTemp={convertTemp}
            city={currentQuery}
          />
        </section>
        <section>
          <HourlyForecast
            data={forecast24h}
            unit={unit}
            convertTemp={convertTemp}
          />
        </section>
        <section>
          <h3>5-day forecast</h3>
          <DailyForecast
            data={forecast5d}
            unit={unit}
            convertTemp={convertTemp}
          />
        </section>
         <section className="other-cities">
          {otherCitiesWeather.map((city, idx) => (
            <div key={idx} className="other-city-card">
              <div className="city-name">{city.name}</div>
              <div className="city-country">{city.country}</div>
              <div className="city-temp">
                {city.temp != null ? convertTemp(city.temp) : "--"}
                {city.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                    alt="icon"
                    style={{ width: 32, verticalAlign: "middle", marginLeft: 6 }}
                  />
                )}
              </div>
              <div className="city-desc">{city.desc}</div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default WeatherApp;