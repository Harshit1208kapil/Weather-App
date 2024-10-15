import { useEffect, useState } from 'react';

function ForecastCard({ city }) {
  const [forecast, setForecast] = useState([]);
  const apiKey = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();

          // Extracting data for the next 5 days (5 days * 8 intervals = 40 data points)
          const dailyForecasts = data.list.slice(0, 5 * 8).filter((_, index) => index % 8 === 0);
          setForecast(dailyForecasts);
        } catch (error) {
          console.error("Error fetching forecast:", error);
        }
      };

      fetchForecast();
    }
  }, [city, apiKey]); // Refetch when city changes

  return (
    <div className="text-white rounded-lg p-6">
      <h2 className="text-xl mb-4">Forecast for {city} (5 Days)</h2>
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>{day.weather[0].description}</p>
            </div>
            <div className="flex items-center">
              <p className="mr-4">{Math.round(day.main.temp)}°C</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt="Weather Icon"
                className="w-10 h-10"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastCard;
