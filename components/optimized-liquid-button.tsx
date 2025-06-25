"use client"

import type React from "react"
import { useState, useRef } from "react"
import type { ReactNode } from "react"

interface OptimizedLiquidButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  intensity?: number
}

export function OptimizedLiquidButton({
  children,
  className = "",
  onClick,
  href,
  intensity = 1,
}: OptimizedLiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef<number>()
  const elementRef = useRef<HTMLElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!elementRef.current) return

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100

      const scaleX = 1 + (Math.abs(x - 50) / 100) * 0.1 * intensity
      const scaleY = 1 + (Math.abs(y - 50) / 100) * 0.05 * intensity

      elementRef.current.style.transform = `scale(${scaleX}, ${scaleY})`
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (elementRef.current) {
      elementRef.current.style.transform = "scale(1, 1)"
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }

  const baseClasses = `
    relative overflow-hidden transition-all duration-200 ease-out transform-gpu will-change-transform
    hover:shadow-lg active:scale-95
    ${className}
  `

  if (href) {
    return (
      <a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <span className="relative z-10 block">{children}</span>
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
        )}
      </a>
    )
  }

  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <span className="relative z-10 block">{children}</span>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
      )}
    </button>
  )
}
