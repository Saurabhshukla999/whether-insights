"use client"

import type React from "react"

import { useRef, useState } from "react"
import type { ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltIntensity?: number
}

export function TiltCard({ children, className = "", tiltIntensity = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * tiltIntensity
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * -tiltIntensity

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-300 ease-out transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.1)"
          : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      }}
    >
      {children}
    </div>
  )
}
