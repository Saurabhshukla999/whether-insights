"use client"

import { useEffect, useState } from "react"

export function FloatingBlob() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main morphing blob */}
      <div
        className="absolute w-[600px] h-[600px] opacity-30"
        style={{
          left: `${20 + mousePosition.x * 0.05}%`,
          top: `${20 + mousePosition.y * 0.05}%`,
          transform: `translate(-50%, -50%) rotate(${mousePosition.x * 0.1}deg)`,
          transition: "all 0.3s ease-out",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-morph-blob"></div>
      </div>

      {/* Secondary blob */}
      <div
        className="absolute w-[400px] h-[400px] opacity-25"
        style={{
          right: `${15 + mousePosition.x * 0.03}%`,
          bottom: `${15 + mousePosition.y * 0.03}%`,
          transform: `translate(50%, 50%) rotate(${-mousePosition.y * 0.1}deg)`,
          transition: "all 0.4s ease-out",
        }}
      >
        <div className="w-full h-full bg-gradient-to-tl from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-morph-blob-reverse"></div>
      </div>

      {/* Tertiary blob */}
      <div
        className="absolute w-[300px] h-[300px] opacity-20"
        style={{
          left: `${60 + mousePosition.y * 0.02}%`,
          top: `${40 + mousePosition.x * 0.02}%`,
          transform: `translate(-50%, -50%) scale(${1 + mousePosition.x * 0.001})`,
          transition: "all 0.5s ease-out",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-green-400/15 via-blue-400/15 to-purple-500/15 rounded-full blur-3xl animate-morph-blob-slow"></div>
      </div>
    </div>
  )
}
