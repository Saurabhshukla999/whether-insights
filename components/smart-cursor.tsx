"use client"

import { useEffect, useRef } from "react"

export function SmartCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const performanceRef = useRef({ fps: 60, frameCount: 0, lastTime: performance.now() })

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let isHighPerformance = true

    // Performance monitoring
    const monitorPerformance = () => {
      const now = performance.now()
      performanceRef.current.frameCount++

      if (now - performanceRef.current.lastTime >= 1000) {
        performanceRef.current.fps = performanceRef.current.frameCount
        performanceRef.current.frameCount = 0
        performanceRef.current.lastTime = now

        // Adjust cursor complexity based on performance
        isHighPerformance = performanceRef.current.fps > 45
      }

      requestAnimationFrame(monitorPerformance)
    }

    // Ultra-fast cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - 8
      const y = e.clientY - 8

      // Direct style update - no React state, no delays
      cursor.style.left = `${x}px`
      cursor.style.top = `${y}px`

      // Add glow effect only on high-performance devices
      if (isHighPerformance) {
        cursor.style.boxShadow = "0 0 20px rgba(59, 130, 246, 0.4)"
      } else {
        cursor.style.boxShadow = "none"
      }
    }

    // Event listeners with maximum performance
    document.addEventListener("mousemove", handleMouseMove, {
      passive: true,
      capture: true,
    })

    document.body.style.cursor = "none"
    monitorPerformance()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] w-4 h-4 bg-blue-400/40 rounded-full will-change-auto"
      style={{
        transform: "translate3d(0, 0, 0)",
        transition: "none",
      }}
    />
  )
}
