"use client"

import { useEffect, useState } from "react"

interface TrailPoint {
  x: number
  y: number
  id: number
}

export function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationId: number
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      setTrail((prevTrail) => {
        const newPoint = { x: e.clientX, y: e.clientY, id: trailId++ }
        const updatedTrail = [newPoint, ...prevTrail.slice(0, 19)] // Keep last 20 points
        return updatedTrail
      })
    }

    const fadeTrail = () => {
      setTrail((prevTrail) => prevTrail.slice(0, -1))
      animationId = requestAnimationFrame(fadeTrail)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animationId = requestAnimationFrame(fadeTrail)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor glow */}
      <div
        className="absolute w-6 h-6 bg-blue-400/30 rounded-full blur-sm transition-all duration-75 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
        }}
      />

      {/* Trail points */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 ease-out"
          style={{
            left: point.x - (4 - index * 0.2),
            top: point.y - (4 - index * 0.2),
            width: Math.max(2, 8 - index * 0.4),
            height: Math.max(2, 8 - index * 0.4),
            opacity: Math.max(0, 0.8 - index * 0.04),
            filter: `blur(${index * 0.1}px)`,
          }}
        />
      ))}
    </div>
  )
}
