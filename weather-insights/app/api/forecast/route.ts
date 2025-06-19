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
    let forecastUrl: string

    if (lat && lon) {
      forecastUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    } else if (city) {
      forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    } else {
      return NextResponse.json({ error: "Either city or coordinates must be provided" }, { status: 400 })
    }

    const forecastResponse = await fetch(forecastUrl)

    if (!forecastResponse.ok) {
      return NextResponse.json(
        { error: `Forecast data not available (${forecastResponse.status})` },
        { status: forecastResponse.status },
      )
    }

    const forecastJson = await forecastResponse.json()

    // Process forecast data - group by day and get min/max temps
    const forecastDays: { [key: string]: any } = {}

    forecastJson.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0]

      if (!forecastDays[date]) {
        forecastDays[date] = {
          date,
          high: item.main.temp_max,
          low: item.main.temp_min,
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          temps: [item.main.temp],
        }
      } else {
        // Update high/low temperatures
        forecastDays[date].high = Math.max(forecastDays[date].high, item.main.temp_max)
        forecastDays[date].low = Math.min(forecastDays[date].low, item.main.temp_min)
        forecastDays[date].temps.push(item.main.temp)
      }
    })

    // Get the next 5 days (excluding today)
    const today = new Date().toISOString().split("T")[0]
    const fiveDayForecast = Object.values(forecastDays)
      .filter((day: any) => day.date !== today)
      .slice(0, 5)
      .map((day: any) => ({
        date: day.date,
        high: Math.round(day.high),
        low: Math.round(day.low),
        condition: day.condition,
        icon: day.icon,
        description: day.description,
      }))

    return NextResponse.json({ days: fiveDayForecast })
  } catch (error) {
    console.error("Forecast API error:", error)
    return NextResponse.json({ error: "Failed to fetch forecast data" }, { status: 500 })
  }
}
