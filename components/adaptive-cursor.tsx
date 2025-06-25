"use client"

import { useEffect, useRef, useState } from "react"

export function AdaptiveCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }

    checkTouchDevice()
    window.addEventListener("resize", checkTouchDevice)

    return () => window.removeEventListener("resize", checkTouchDevice)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return // Don't show cursor on touch devices

    const cursor = cursorRef.current
    if (!cursor) return

    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    // Smooth following animation
    const animateCursor = () => {
      const dx = targetX - x
      const dy = targetY - y

      x += dx * 0.1 // Smooth following
      y += dy * 0.1

      cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
      requestAnimationFrame(animateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.body.style.cursor = "none"

    animateCursor()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "auto"
    }
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] w-5 h-5 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full will-change-transform"
      style={{
        transform: "translate3d(-50%, -50%, 0)",
        filter: "blur(0.5px)",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
      }}
    />
  )
}
