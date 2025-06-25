"use client"

import { useState } from "react"
import type { ReactNode } from "react"

interface AsciiTransformProps {
  children: ReactNode
  text: string
  className?: string
}

export function AsciiTransform({ children, text, className = "" }: AsciiTransformProps) {
  const [isHovered, setIsHovered] = useState(false)

  const generateAscii = (text: string) => {
    const asciiChars = ["█", "▓", "▒", "░", "▄", "▀", "■", "□", "▪", "▫"]
    return text
      .split("")
      .map(() => asciiChars[Math.floor(Math.random() * asciiChars.length)])
      .join("")
  }

  const [asciiText] = useState(generateAscii(text))

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`transition-all duration-500 ${
          isHovered ? "opacity-0 transform scale-110" : "opacity-100 transform scale-100"
        }`}
      >
        {children}
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center font-mono text-green-400 transition-all duration-500 ${
          isHovered ? "opacity-100 transform scale-100" : "opacity-0 transform scale-90"
        }`}
        style={{
          fontSize: "clamp(0.5rem, 2vw, 1rem)",
          letterSpacing: "0.1em",
          textShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
        }}
      >
        {asciiText}
      </div>
    </div>
  )
}
