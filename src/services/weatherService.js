import axios from "axios";

const API_KEY = "4c6c9784f9f0db7dc000154dbbb908b4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeather = async (city, unit) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: unit,
    },
  });
  return response.data;
};

export const getForecast = async (city, unit) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: unit,
    },
  });
  return response.data;
};
