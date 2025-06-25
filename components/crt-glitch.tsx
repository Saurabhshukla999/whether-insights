"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

interface CrtGlitchProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function CrtGlitch({ children, className = "", intensity = 1 }: CrtGlitchProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1 * intensity) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 100 + Math.random() * 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [intensity])

  return (
    <div className={`relative ${className}`}>
      <div
        className={`transition-all duration-75 ${isGlitching ? "animate-crt-glitch" : ""}`}
        style={{
          filter: isGlitching
            ? `hue-rotate(${Math.random() * 360}deg) contrast(${1 + Math.random() * 0.5}) brightness(${1 + Math.random() * 0.3})`
            : "none",
        }}
      >
        {children}
      </div>

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.1) 2px,
            rgba(0, 255, 0, 0.1) 4px
          )`,
          animation: "scanlines 0.1s linear infinite",
        }}
      />

      {/* Flicker overlay */}
      {isGlitching && (
        <div
          className="absolute inset-0 pointer-events-none bg-white opacity-5 animate-pulse"
          style={{ animationDuration: "0.05s" }}
        />
      )}
    </div>
  )
}
