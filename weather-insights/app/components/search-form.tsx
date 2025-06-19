"use client"

import type React from "react"
import { Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFormProps {
  searchCity: string
  setSearchCity: (city: string) => void
  handleSearch: (e: React.FormEvent) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  refreshWeather: () => void
  isLoading: boolean
}

export function SearchForm({
  searchCity,
  setSearchCity,
  handleSearch,
  handleKeyDown,
  refreshWeather,
  isLoading,
}: SearchFormProps) {
  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
        <Input
          type="text"
          placeholder="Search for a city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        variant="secondary"
        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
        disabled={isLoading}
      >
        Search
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={refreshWeather}
        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
        disabled={isLoading}
      >
        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        <span className="sr-only">Refresh</span>
      </Button>
    </form>
  )
}
