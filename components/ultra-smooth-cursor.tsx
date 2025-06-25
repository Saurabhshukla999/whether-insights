"use client"

import { useEffect, useRef } from "react"

export function UltraSmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)
  const currentTypeRef = useRef<string>("default")

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Direct DOM manipulation for zero lag
    const updateCursorPosition = (x: number, y: number) => {
      // Use transform for hardware acceleration - no layout recalculation
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cursorDot.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    const updateCursorType = (type: string) => {
      if (currentTypeRef.current === type) return
      currentTypeRef.current = type

      // Direct class manipulation - faster than React state
      cursor.className = `fixed pointer-events-none z-[9999] transition-all duration-200 ease-out mix-blend-difference will-change-transform ${getCursorClasses(type)}`
      cursorDot.className = `fixed pointer-events-none z-[9999] transition-all duration-100 ease-out will-change-transform ${getDotClasses(type)}`
    }

    const getCursorClasses = (type: string) => {
      switch (type) {
        case "pointer":
          return "w-10 h-10 border-2 border-blue-400 bg-blue-400/10 rounded-full"
        case "button":
          return "w-12 h-12 border-2 border-purple-400 bg-purple-400/10 rounded-full"
        case "text":
          return "w-0.5 h-6 bg-blue-400 rounded-sm"
        default:
          return "w-8 h-8 border border-white/20 bg-white/5 rounded-full"
      }
    }

    const getDotClasses = (type: string) => {
      switch (type) {
        case "pointer":
          return "w-2 h-2 bg-blue-400 rounded-full"
        case "button":
          return "w-3 h-3 bg-purple-400 rounded-full"
        case "text":
          return "w-0.5 h-2 bg-blue-400 rounded-sm"
        default:
          return "w-1 h-1 bg-white rounded-full"
      }
    }

    // Ultra-fast mouse move handler - no throttling, no RAF
    const handleMouseMove = (e: MouseEvent) => {
      const x =
        e.clientX -
        (currentTypeRef.current === "text"
          ? 1
          : currentTypeRef.current === "button"
            ? 24
            : currentTypeRef.current === "pointer"
              ? 20
              : 16)
      const y =
        e.clientY -
        (currentTypeRef.current === "text"
          ? 12
          : currentTypeRef.current === "button"
            ? 24
            : currentTypeRef.current === "pointer"
              ? 20
              : 16)

      updateCursorPosition(x, y)

      if (!isVisibleRef.current) {
        cursor.style.opacity = "1"
        cursorDot.style.opacity = "1"
        isVisibleRef.current = true
      }
    }

    // Fast hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let newType = "default"

      // Optimized element detection
      if (target.tagName === "A" || target.closest("a")) {
        newType = "pointer"
      } else if (target.tagName === "BUTTON" || target.closest("button") || target.getAttribute("role") === "button") {
        newType = "button"
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        newType = "text"
      }

      updateCursorType(newType)
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = "0"
      cursorDot.style.opacity = "0"
      isVisibleRef.current = false
    }

    const handleMouseEnter = () => {
      if (!isVisibleRef.current) {
        cursor.style.opacity = "1"
        cursorDot.style.opacity = "1"
        isVisibleRef.current = true
      }
    }

    // Add event listeners with optimal settings
    document.addEventListener("mousemove", handleMouseMove, { passive: true, capture: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })

    // Hide default cursor immediately
    document.body.style.cursor = "none"
    document.documentElement.style.cursor = "none"

    // Initial setup
    cursor.style.opacity = "0"
    cursorDot.style.opacity = "0"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
      document.documentElement.style.cursor = "auto"
    }
  }, [])

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-8 h-8 border border-white/20 bg-white/5 rounded-full transition-all duration-200 ease-out mix-blend-difference will-change-transform"
        style={{
          opacity: 0,
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-1 h-1 bg-white rounded-full transition-all duration-100 ease-out will-change-transform"
        style={{
          opacity: 0,
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />
    </>
  )
}
