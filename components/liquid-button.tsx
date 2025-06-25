"use client"

import type React from "react"
import { useState } from "react"
import type { ReactNode } from "react"

interface LiquidButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  intensity?: number
}

export function LiquidButton({ children, className = "", onClick, href, intensity = 1 }: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const getSlimeTransform = () => {
    if (!isHovered) return "scale(1)"

    const distanceFromCenter = Math.sqrt(Math.pow(mousePosition.x - 50, 2) + Math.pow(mousePosition.y - 50, 2))
    const stretchFactor = Math.max(0.2, 1 - distanceFromCenter / 100) * intensity

    const scaleX = 1 + stretchFactor * 0.3
    const scaleY = 1 + stretchFactor * 0.2
    const skewX = (mousePosition.x - 50) * 0.1 * intensity
    const skewY = (mousePosition.y - 50) * 0.05 * intensity

    return `scale(${scaleX}, ${scaleY}) skew(${skewX}deg, ${skewY}deg)`
  }

  const baseClasses = `
    relative overflow-hidden transition-all duration-300 ease-out transform-gpu
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20
    before:opacity-0 before:transition-all before:duration-300 hover:before:opacity-100
    before:blur-sm hover:before:blur-none
    ${className}
  `

  const liquidStyle = {
    transform: getSlimeTransform(),
    filter: isHovered ? "blur(0.5px) contrast(1.1)" : "none",
    transition: "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        style={liquidStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <span className="relative z-10 block">{children}</span>
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            clipPath: `circle(${isHovered ? "100%" : "0%"} at ${mousePosition.x}% ${mousePosition.y}%)`,
            transition: "clip-path 0.3s ease-out",
          }}
        />
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      style={liquidStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="relative z-10 block">{children}</span>
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          clipPath: `circle(${isHovered ? "100%" : "0%"} at ${mousePosition.x}% ${mousePosition.y}%)`,
          transition: "clip-path 0.3s ease-out",
        }}
      />
    </button>
  )
}
