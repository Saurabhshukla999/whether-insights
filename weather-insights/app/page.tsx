"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cloud, Sun, CloudRain, CloudSnow, Zap, Eye, MapPin, AlertCircle } from "lucide-react"
import { WeatherChart } from "./components/weather-chart"
import { WeatherDetails } from "./components/weather-details"
import { ForecastCard } from "./components/forecast-card"
import { SearchForm } from "./components/search-form"
import { LastUpdated } from "./components/last-updated"
import { LocationButton } from "./components/location-button"

// Types
interface WeatherData {
  location: string
  country: string
  temperature: number
  feelsLike: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  pressure: number
  icon: string
  sunrise?: string
  sunset?: string
}

interface ForecastDay {
  date: string
  high: number
  low: number
  condition: string
  icon: string
  description: string
}

interface ForecastData {
  days: ForecastDay[]
}

// Weather icon mapping
const getWeatherIcon = (iconCode: string, size = 24) => {
  const iconMap: { [key: string]: any } = {
    "01d": Sun,
    "01n": Sun,
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Cloud,
    "04n": Cloud,
    "09d": CloudRain,
    "09n": CloudRain,
    "10d": CloudRain,
    "10n": CloudRain,
    "11d": Zap,
    "11n": Zap,
    "13d": CloudSnow,
    "13n": CloudSnow,
    "50d": Eye,
    "50n": Eye,
  }

  const IconComponent = iconMap[iconCode] || Cloud
  return <IconComponent size={size} />
}

// Background theme based on weather
const getWeatherTheme = (condition: string, icon: string) => {
  const isNight = icon.includes("n")
  const conditionLower = condition.toLowerCase()

  // Rain conditions
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
    return isNight ? "from-slate-700 to-slate-900" : "from-slate-400 to-slate-600"
  }
  // Snow conditions
  else if (conditionLower.includes("snow")) {
    return isNight ? "from-blue-800 to-blue-950" : "from-blue-200 to-blue-400"
  }
  // Thunderstorm conditions
  else if (conditionLower.includes("thunder")) {
    return isNight ? "from-purple-900 to-slate-900" : "from-purple-700 to-slate-700"
  }
  // Cloudy conditions
  else if (conditionLower.includes("cloud") || conditionLower.includes("overcast")) {
    return isNight ? "from-slate-700 to-slate-900" : "from-gray-300 to-gray-500"
  }
  // Foggy/misty conditions
  else if (conditionLower.includes("fog") || conditionLower.includes("mist") || conditionLower.includes("haze")) {
    return isNight ? "from-slate-600 to-slate-800" : "from-gray-200 to-gray-400"
  }
  // Clear conditions
  else if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
    return isNight ? "from-indigo-900 to-purple-900" : "from-blue-400 to-cyan-300"
  }
  // Default fallback
  else {
    return isNight ? "from-slate-700 to-slate-900" : "from-blue-300 to-blue-500"
  }
}

export default function WeatherInsights() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchCity, setSearchCity] = useState("")
  const [currentLocation, setCurrentLocation] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Fetch weather data from our API routes
  const fetchWeatherData = async (city?: string, coords?: { lat: number; lon: number }) => {
    setLoading(true)
    setError(null)

    try {
      let weatherUrl, forecastUrl

      if (coords) {
        weatherUrl = `/api/weather?lat=${coords.lat}&lon=${coords.lon}`
        forecastUrl = `/api/forecast?lat=${coords.lat}&lon=${coords.lon}`
      } else if (city) {
        weatherUrl = `/api/weather?city=${encodeURIComponent(city)}`
        forecastUrl = `/api/forecast?city=${encodeURIComponent(city)}`
      } else {
        throw new Error("No location provided")
      }

      // Fetch current weather
      const weatherResponse = await fetch(weatherUrl)
      const weatherData = await weatherResponse.json()

      if (!weatherResponse.ok) {
        throw new Error(weatherData.error || "Failed to fetch weather data")
      }

      // Fetch forecast
      const forecastResponse = await fetch(forecastUrl)
      const forecastData = await forecastResponse.json()

      if (!forecastResponse.ok) {
        throw new Error(forecastData.error || "Failed to fetch forecast data")
      }

      setWeatherData(weatherData)
      setForecastData(forecastData)
      setCurrentLocation(weatherData.location)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  // Get user's geolocation
  const getCurrentLocation = () => {
    setLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            // Use the actual coordinates from geolocation
            fetchWeatherData(undefined, { lat: latitude, lon: longitude })
          } catch (err) {
            setError("Failed to get weather for your location")
            fetchWeatherData("London") // Fallback
          }
        },
        (error) => {
          // Geolocation denied or failed
          console.log("Geolocation error:", error.message)
          setError("Location access denied. Showing default city.")
          fetchWeatherData("London") // Default city
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
      fetchWeatherData("London") // Geolocation not supported
    }
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim())
      setSearchCity("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchCity.trim()) {
      e.preventDefault()
      fetchWeatherData(searchCity.trim())
      setSearchCity("")
    }
  }

  const refreshWeather = () => {
    if (currentLocation) {
      fetchWeatherData(currentLocation)
    } else {
      getCurrentLocation()
    }
  }

  // Initialize app
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // Auto-refresh weather data every 15 minutes
  useEffect(() => {
    if (!currentLocation) return

    const refreshInterval = setInterval(
      () => {
        fetchWeatherData(currentLocation)
      },
      15 * 60 * 1000,
    ) // 15 minutes

    return () => clearInterval(refreshInterval)
  }, [currentLocation])

  const weatherTheme = weatherData
    ? getWeatherTheme(weatherData.condition, weatherData.icon)
    : "from-blue-400 to-cyan-300"

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weatherTheme} p-4 transition-all duration-1000`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">WeatherInsights</h1>
          <p className="text-white/80 text-lg drop-shadow">Your comprehensive climate visualization tool</p>
          <div className="mt-4">
            <LocationButton getCurrentLocation={getCurrentLocation} isLoading={loading} />
          </div>
        </div>

        {/* Search Bar */}
        <Card className="mb-6 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <SearchForm
              searchCity={searchCity}
              setSearchCity={setSearchCity}
              handleSearch={handleSearch}
              handleKeyDown={handleKeyDown}
              refreshWeather={refreshWeather}
              isLoading={loading}
            />
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-500/20 border-red-500/30 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between w-full">
              <span>{error}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="text-white hover:bg-red-500/30"
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Current Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin size={20} />
                Current Weather
              </CardTitle>
              <CardDescription className="text-white/80">
                {currentLocation && `${currentLocation} • `}Real-time conditions
              </CardDescription>
              <LastUpdated timestamp={lastUpdated} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full bg-white/20" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-12 bg-white/20" />
                    <Skeleton className="h-12 bg-white/20" />
                  </div>
                </div>
              ) : weatherData ? (
                <div className="space-y-6">
                  {/* Main Temperature Display */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-5xl font-bold text-white mb-2">{Math.round(weatherData.temperature)}°C</div>
                      <div className="text-white/80 text-lg">Feels like {Math.round(weatherData.feelsLike)}°C</div>
                      <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                        {weatherData.description}
                      </Badge>
                    </div>
                    <div className="text-white">{getWeatherIcon(weatherData.icon, 80)}</div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Weather Details */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Details</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 bg-white/20" />
                  ))}
                </div>
              ) : weatherData ? (
                <WeatherDetails
                  humidity={weatherData.humidity}
                  windSpeed={weatherData.windSpeed}
                  pressure={weatherData.pressure}
                  loading={loading}
                  sunrise={weatherData.sunrise}
                  sunset={weatherData.sunset}
                />
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* 5-Day Forecast */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">5-Day Forecast</CardTitle>
            <CardDescription className="text-white/80">Temperature trends and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-64 bg-white/20" />
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-24 bg-white/20" />
                  ))}
                </div>
              </div>
            ) : forecastData ? (
              <div className="space-y-6">
                {/* Chart */}
                <div className="h-64">
                  <WeatherChart data={forecastData.days} />
                </div>

                {/* Daily Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {forecastData.days.map((day, index) => (
                    <ForecastCard
                      key={index}
                      date={day.date}
                      high={day.high}
                      low={day.low}
                      icon={getWeatherIcon(day.icon, 32)}
                      description={day.description}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p>Powered by OpenWeather API • Built with React & Chart.js</p>
        </div>
      </div>
    </div>
  )
}
