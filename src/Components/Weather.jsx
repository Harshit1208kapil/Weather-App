import React, { useEffect, useState } from 'react';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [pollutionData, setPollutionData] = useState(null); // State for pollution data
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString()); // Current time state

  const searchWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        feelsLike: Math.floor(data.main.feels_like),
        visibility: (data.visibility / 1000).toFixed(1),
        sunrise: sunrise,
        sunset: sunset,
        minTemp: Math.floor(data.main.temp_min), // Minimum temperature
        maxTemp: Math.floor(data.main.temp_max), // Maximum temperature
        clouds: data.clouds.all, // Cloud percentage
        rain: data.rain ? data.rain['1h'] : 0 // Rain possibility in the last hour
      });

      // Fetch pollution data
      const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${import.meta.env.VITE_APP_ID}`;
      const pollutionResponse = await fetch(pollutionUrl);
      const pollutionData = await pollutionResponse.json();
      setPollutionData(pollutionData.list[0].main); // Pollution levels

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (city) {
      searchWeather(city);
    }
  }, [city]);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="flex justify-center items-center rounded-3xl p-6 w-2/3 md:w-full max-w-md mx-auto bg-gray-900 shadow-lg text-white mt-6">
      <div className="text-sm md:text-lg lg:text-2xl text-center">
        {weatherData ? (
          <>
            <h2 className="text-xl font-bold mb-2">{weatherData.location}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt="Weather Icon"
              className="w-16 h-16 mx-auto"
            />
            <p className="text-4xl font-semibold">{weatherData.temperature}°C</p>
            <p className="text-lg capitalize">{weatherData.description}</p>
            <p>Feels Like: {weatherData.feelsLike}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Visibility: {weatherData.visibility} km</p>
            <p>Wind Speed: {weatherData.windspeed} m/s</p>
            <p>Sunrise: {weatherData.sunrise}</p>
            <p>Sunset: {weatherData.sunset}</p>
            <p>Min Temp: {weatherData.minTemp}°C</p>
            <p>Max Temp: {weatherData.maxTemp}°C</p>
            <p>Clouds: {weatherData.clouds}%</p>
            <p>Rain (last hour): {weatherData.rain} mm</p>
            {pollutionData && (
              <p>Pollution Level: {pollutionData.aqi} AQI</p> // Air Quality Index
            )}
            <p>Current Time: {currentTime}</p>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
