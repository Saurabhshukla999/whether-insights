"use client"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationButtonProps {
  getCurrentLocation: () => void
  isLoading: boolean
}

export function LocationButton({ getCurrentLocation, isLoading }: LocationButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={getCurrentLocation}
      disabled={isLoading}
      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
    >
      <MapPin size={16} className="mr-1" />
      Use My Location
    </Button>
  )
}
