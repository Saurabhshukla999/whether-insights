import { Droplets, Wind, Gauge, Sunrise, Sunset } from "lucide-react"

interface WeatherDetailsProps {
  humidity: number
  windSpeed: number
  pressure: number
  loading: boolean
  sunrise?: string
  sunset?: string
}

export function WeatherDetails({ humidity, windSpeed, pressure, loading, sunrise, sunset }: WeatherDetailsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-12 bg-white/20 animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Droplets size={20} className="text-blue-300" />
          <span>Humidity</span>
        </div>
        <span className="font-semibold">{humidity}%</span>
      </div>

      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Wind size={20} className="text-green-300" />
          <span>Wind Speed</span>
        </div>
        <span className="font-semibold">{windSpeed} m/s</span>
      </div>

      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Gauge size={20} className="text-purple-300" />
          <span>Pressure</span>
        </div>
        <span className="font-semibold">{pressure} hPa</span>
      </div>

      {sunrise && sunset && (
        <>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sunrise size={20} className="text-amber-300" />
              <span>Sunrise</span>
            </div>
            <span className="font-semibold">{sunrise}</span>
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sunset size={20} className="text-orange-300" />
              <span>Sunset</span>
            </div>
            <span className="font-semibold">{sunset}</span>
          </div>
        </>
      )}
    </div>
  )
}
