"use client"

import { useEffect, useState, useRef } from "react"
import { throttle } from "@/lib/performance"

type CursorType = "default" | "pointer" | "text" | "button"

export function OptimizedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<CursorType>("default")
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false

    const updatePosition = (x: number, y: number) => {
      setPosition({ x, y })
      ticking = false
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => updatePosition(e.clientX, e.clientY))
        ticking = true
      }
      setIsVisible(true)
    }, 16)

    const handleMouseLeave = () => setIsVisible(false)

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === "A") {
        setCursorType("pointer")
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorType("button")
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorType("text")
      } else {
        setCursorType("default")
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleElementHover, { passive: true })

    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleElementHover)
      document.body.style.cursor = "auto"
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  const getCursorSize = () => {
    switch (cursorType) {
      case "pointer":
        return "w-8 h-8 border-2 border-blue-400 bg-blue-400/20"
      case "button":
        return "w-10 h-10 border-2 border-purple-400 bg-purple-400/20"
      case "text":
        return "w-0.5 h-5 bg-blue-400"
      default:
        return "w-4 h-4 border border-white/30 bg-white/10"
    }
  }

  return (
    <div
      className={`fixed pointer-events-none z-[9999] rounded-full transition-all duration-150 ease-out mix-blend-difference will-change-transform ${getCursorSize()}`}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}
