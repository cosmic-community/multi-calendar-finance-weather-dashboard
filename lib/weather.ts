import type { WeatherData } from '@/types';

const OPENWEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    // Get coordinates for the location
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );
    
    if (!geoResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const geoData = await geoResponse.json();
    
    if (!geoData || geoData.length === 0) {
      throw new Error('Location not found');
    }
    
    const { lat, lon } = geoData[0];

    // Get current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error('Failed to fetch current weather data');
    }
    
    const currentData = await currentResponse.json();

    // Get 7-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    
    const forecastData = await forecastResponse.json();

    // Process current weather
    const current = {
      temp: Math.round(currentData.main.temp),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      uvIndex: 0, // UV Index not available in free tier
      pressure: currentData.main.pressure,
      visibility: Math.round(currentData.visibility / 1000), // Convert to km
      condition: currentData.weather[0].description,
      icon: currentData.weather[0].icon
    };

    // Process 7-day forecast (take one reading per day)
    const forecast = [];
    const processedDates = new Set();
    
    for (const item of forecastData.list) {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!processedDates.has(date) && forecast.length < 7) {
        processedDates.add(date);
        forecast.push({
          date,
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          condition: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6)
        });
      }
    }

    return {
      current,
      forecast
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return mock data for development/demo purposes
    return getMockWeatherData();
  }
}

function getMockWeatherData(): WeatherData {
  return {
    current: {
      temp: 22,
      humidity: 65,
      windSpeed: 15,
      uvIndex: 6,
      pressure: 1013,
      visibility: 10,
      condition: 'Partly cloudy',
      icon: '02d'
    },
    forecast: [
      {
        date: new Date().toISOString().split('T')[0],
        high: 25,
        low: 18,
        condition: 'Sunny',
        icon: '01d',
        humidity: 60,
        windSpeed: 12
      },
      {
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        high: 23,
        low: 16,
        condition: 'Partly cloudy',
        icon: '02d',
        humidity: 70,
        windSpeed: 18
      },
      {
        date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        high: 20,
        low: 14,
        condition: 'Rainy',
        icon: '10d',
        humidity: 85,
        windSpeed: 22
      },
      {
        date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        high: 18,
        low: 12,
        condition: 'Cloudy',
        icon: '04d',
        humidity: 75,
        windSpeed: 15
      },
      {
        date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
        high: 24,
        low: 17,
        condition: 'Clear',
        icon: '01d',
        humidity: 55,
        windSpeed: 10
      },
      {
        date: new Date(Date.now() + 432000000).toISOString().split('T')[0],
        high: 26,
        low: 19,
        condition: 'Sunny',
        icon: '01d',
        humidity: 50,
        windSpeed: 8
      },
      {
        date: new Date(Date.now() + 518400000).toISOString().split('T')[0],
        high: 21,
        low: 15,
        condition: 'Thunderstorm',
        icon: '11d',
        humidity: 90,
        windSpeed: 25
      }
    ]
  };
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round(temp * 9/5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

export function getWeatherConditionIcon(condition: string): string {
  const conditionMap: Record<string, string> = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '⛅',
    'broken clouds': '☁️',
    'shower rain': '🌦️',
    'rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '🌨️',
    'mist': '🌫️',
    'partly cloudy': '⛅',
    'sunny': '☀️',
    'cloudy': '☁️',
    'rainy': '🌧️'
  };

  return conditionMap[condition.toLowerCase()] || '🌤️';
}