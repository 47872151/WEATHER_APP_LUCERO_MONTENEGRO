import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [WeatherData, setWeatherData] = useState(null);
  const [forecast24h, setForecast24h] = useState(null);
  const [forecast5d, setForecast5d] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuery, setCurrentQuery] = useState('Buenos Aires');

  async function fetchWeatherData(city) {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      setWeatherData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Ciudad no encontrada. Intenta con otra.');
      } else {
        setErrorMessage('No se pudo obtener el clima actual.');
      }
      setWeatherData(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchForecast24h(city) {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
      setForecast24h(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Ciudad no encontrada. Intenta con otra.');
      } else {
        setErrorMessage('No se pudo obtener el pronóstico de 24 horas.');
      }
      setForecast24h(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchForecast5d(city) {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&appid=${apiKey}`);
      setForecast5d(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Ciudad no encontrada. Intenta con otra.');
      } else {
        setErrorMessage('No se pudo obtener el pronóstico de 5 días.');
      }
      setForecast5d(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherData(currentQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
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
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
  return useContext(WeatherContext);
}