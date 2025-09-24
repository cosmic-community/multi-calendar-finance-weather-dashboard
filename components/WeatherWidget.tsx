'use client'

import { useState, useEffect } from 'react'
import { Cloud, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react'
import { getWeatherData, getWeatherConditionIcon } from '@/lib/weather'
import type { WeatherData } from '@/types'

interface WeatherWidgetProps {
  location: string
}

export function WeatherWidget({ location }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true)
        setError(null)
        const data = await getWeatherData(location)
        setWeather(data)
      } catch (err) {
        console.error('Error loading weather:', err)
        setError('Failed to load weather data')
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [location])

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Weather</h2>
        <p className="text-muted-foreground">{error || 'No weather data available'}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Weather</h2>
        <span className="text-sm opacity-80">{location}</span>
      </div>

      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">
            {getWeatherConditionIcon(weather.current.condition)}
          </div>
          <div>
            <div className="text-3xl font-bold">{weather.current.temp}°C</div>
            <div className="text-sm opacity-80 capitalize">{weather.current.condition}</div>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Droplets className="h-4 w-4" />
          <span className="text-sm">
            {weather.current.humidity}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="h-4 w-4" />
          <span className="text-sm">
            {weather.current.windSpeed} km/h
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Gauge className="h-4 w-4" />
          <span className="text-sm">
            {weather.current.pressure} mb
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm">
            {weather.current.visibility} km
          </span>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div>
        <h3 className="text-sm font-medium mb-3 opacity-80">3-Day Forecast</h3>
        <div className="space-y-2">
          {weather.forecast.slice(0, 3).map((day, index) => (
            <div key={day.date} className="flex items-center justify-between text-sm">
              <span className="opacity-80">
                {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <div className="flex items-center space-x-2">
                <span>{getWeatherConditionIcon(day.condition)}</span>
                <span>{day.high}°</span>
                <span className="opacity-60">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}