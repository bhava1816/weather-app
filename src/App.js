import React, { useState } from 'react';
// Tailwind is loaded via CDN; no CSS import needed

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherCondition = (weatherCode) => {
    const conditions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return conditions[weatherCode] || 'Unknown';
  };

  const getWeatherEmoji = (weatherCode) => {
    if (weatherCode === 0 || weatherCode === 1) return '☀️';
    if (weatherCode === 2 || weatherCode === 3) return '☁️';
    if (weatherCode >= 45 && weatherCode <= 48) return '🌫️';
    if (weatherCode >= 51 && weatherCode <= 55) return '🌦️';
    if (weatherCode >= 61 && weatherCode <= 65) return '🌧️';
    if (weatherCode >= 71 && weatherCode <= 75) return '❄️';
    if (weatherCode >= 80 && weatherCode <= 82) return '⛈️';
    if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
    return '🌤️';
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      // First, get coordinates for the city using geocoding
      const geocodeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      );
      
      if (!geocodeResponse.ok) {
        throw new Error('Failed to fetch city coordinates');
      }
      
      const geocodeData = await geocodeResponse.json();
      
      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      
      const { latitude, longitude, name, country } = geocodeData.results[0];
      
      // Now fetch weather data using coordinates (correct endpoint)
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherData = await weatherResponse.json();
      const current = weatherData && weatherData.current_weather;
      
      if (!current) {
        throw new Error('No current weather data available');
      }
      
      setWeather({
        city: name,
        country: country,
        temperature: Math.round(current.temperature),
        condition: getWeatherCondition(current.weathercode),
        emoji: getWeatherEmoji(current.weathercode),
        windSpeed: Math.round(current.windspeed)
      });
      
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-card p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6">
            Weather Now
          </h1>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 rounded-full border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 disabled:opacity-60"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !city.trim()}
                className="rounded-full bg-gradient-to-r from-sky-400 to-blue-600 text-white px-4 py-3 min-w-[56px] grid place-items-center text-xl shadow transition-transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? '⏳' : '🔍'}
              </button>
            </div>
          </form>

          {loading && (
            <div className="flex flex-col items-center gap-3 py-6 text-gray-600">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-sky-400 rounded-full animate-spin"></div>
              <p>Fetching weather data...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 rounded-xl px-4 py-3 mb-2">
              <p>❌ {error}</p>
            </div>
          )}

          {weather && !loading && (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner animate-[slideUp_.4s_ease-out]">
              <div className="mb-3 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {weather.city}, {weather.country}
                </h2>
              </div>

              <div className="mb-4 text-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl sm:text-6xl font-extrabold text-gray-800 leading-none">{weather.temperature}</span>
                  <span className="text-2xl sm:text-3xl text-gray-500 ml-1">°C</span>
                </div>
                <div className="mt-2 flex items-center justify-center gap-2 text-lg text-gray-600">
                  <span className="text-2xl">{weather.emoji}</span>
                  <span className="font-medium">{weather.condition}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Wind Speed</span>
                  <span className="text-gray-800 font-semibold text-lg">{weather.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

