import React from "react";
import "../styles/WeatherDisplay.css";

const WeatherDisplay = ({ weather, forecast, unit }) => {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <div className="weather-display">
      <div className="current-weather">
        <h2>{weather.name}</h2>
        <p>
          Temperature: {weather.main.temp}
          {tempUnit}
        </p>
        <p>
          Feels like: {weather.main.feels_like}
          {tempUnit}
        </p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>
          Wind Speed: {weather.wind.speed} {windUnit}
        </p>
        <p>Description: {weather.weather[0].description}</p>
      </div>
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-items">
          {forecast.list
            .filter((item, index) => index % 8 === 0)
            .map((item, index) => (
              <div key={index} className="forecast-item">
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>
                  {item.main.temp}
                  {tempUnit}
                </p>
                <p>{item.weather[0].description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
