import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")
  const lat = searchParams.get("lat")
  const lon = searchParams.get("lon")

  if (!API_KEY) {
    return NextResponse.json({ error: "OpenWeather API key not configured" }, { status: 500 })
  }

  try {
    let weatherUrl: string

    if (lat && lon) {
      weatherUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    } else if (city) {
      weatherUrl = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    } else {
      return NextResponse.json({ error: "Either city or coordinates must be provided" }, { status: 400 })
    }

    const weatherResponse = await fetch(weatherUrl)

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 404) {
        return NextResponse.json({ error: "City not found. Please check the spelling and try again." }, { status: 404 })
      } else if (weatherResponse.status === 401) {
        return NextResponse.json({ error: "Invalid API key configuration" }, { status: 401 })
      }
      return NextResponse.json(
        { error: `Weather data not available (${weatherResponse.status})` },
        { status: weatherResponse.status },
      )
    }

    const weatherJson = await weatherResponse.json()

    // Process and return the weather data
    const processedWeather = {
      location: weatherJson.name,
      country: weatherJson.sys.country,
      temperature: Math.round(weatherJson.main.temp),
      feelsLike: Math.round(weatherJson.main.feels_like),
      condition: weatherJson.weather[0].main,
      description: weatherJson.weather[0].description,
      humidity: weatherJson.main.humidity,
      windSpeed: Math.round(weatherJson.wind.speed * 10) / 10,
      pressure: weatherJson.main.pressure,
      icon: weatherJson.weather[0].icon,
      sunrise: new Date(weatherJson.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(weatherJson.sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    return NextResponse.json(processedWeather)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
