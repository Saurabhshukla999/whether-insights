import { Clock } from "lucide-react"

interface LastUpdatedProps {
  timestamp: Date | null
}

export function LastUpdated({ timestamp }: LastUpdatedProps) {
  if (!timestamp) return null

  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="flex items-center gap-1 text-white/60 text-xs">
      <Clock size={12} />
      <span>Last updated: {formattedTime}</span>
    </div>
  )
}
