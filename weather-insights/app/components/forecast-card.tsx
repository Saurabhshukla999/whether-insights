import type React from "react"
interface ForecastCardProps {
  date: string
  high: number
  low: number
  icon: React.ReactNode
  description: string
}

export function ForecastCard({ date, high, low, icon, description }: ForecastCardProps) {
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "short" })
  const formattedDate = new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return (
    <div className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
      <div className="text-white/80 font-medium mb-1">{dayOfWeek}</div>
      <div className="text-white/60 text-xs mb-2">{formattedDate}</div>
      <div className="text-white mb-2">{icon}</div>
      <div className="text-white font-semibold">{Math.round(high)}°</div>
      <div className="text-white/60 text-sm">{Math.round(low)}°</div>
      <div className="text-white/80 text-xs mt-1 capitalize">{description}</div>
    </div>
  )
}
