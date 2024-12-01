import React, { useState, useEffect, useCallback } from "react";
import SearchComponent from "./SearchComponent";
import WeatherDisplay from "./WeatherDisplay";
import FavoriteComponent from "./FavoriteComponent";
import { getWeather, getForecast } from "../services/weatherService";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoriteService";
import "../styles/WeatherDashboard.css";

const WeatherDashboard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Memoized function to fetch weather data
  const fetchWeatherData = useCallback(
    async (cityName) => {
      try {
        const weatherData = await getWeather(cityName, unit);
        const forecastData = await getForecast(cityName, unit);
        setWeather(weatherData);
        setForecast(forecastData);
        localStorage.setItem("lastSearchedCity", cityName);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    [unit] // Re-run only when 'unit' changes
  );

  // Fetch the list of favorite cities
  const fetchFavorites = async () => {
    try {
      const favoritesData = await getFavorites();
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    const lastSearchedCity = localStorage.getItem("lastSearchedCity");
    if (lastSearchedCity && lastSearchedCity !== city) {
      setCity(lastSearchedCity);
      fetchWeatherData(lastSearchedCity);
    }
    fetchFavorites();
  }, [city, fetchWeatherData]); // Depend on 'city' and 'fetchWeatherData'

  // Handle city search
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  // Add a city to favorites
  const handleAddFavorite = async () => {
    if (weather && weather.name) {
      try {
        await addFavorite(weather.name);
        await fetchFavorites();
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    } else {
      console.error("No city selected to add to favorites");
    }
  };

  // Remove a city from favorites
  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Toggle between Celsius and Fahrenheit
  const handleUnitToggle = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
    if (city) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="weather-dashboard">
      <h1>Weather Dashboard</h1>
      <SearchComponent onSearch={handleSearch} />
      <button onClick={handleUnitToggle}>
        Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
      </button>
      {weather && forecast && (
        <WeatherDisplay weather={weather} forecast={forecast} unit={unit} />
      )}
      <FavoriteComponent
        favorites={favorites}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        onSelectFavorite={handleSearch}
      />
    </div>
  );
};

export default WeatherDashboard;
