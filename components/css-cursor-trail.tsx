"use client"

import { useEffect, useRef } from "react"

export function CssCursorTrail() {
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trail = trailRef.current
    if (!trail) return

    let mouseX = 0
    let mouseY = 0
    let isMoving = false
    let animationId: number

    const updateTrail = () => {
      if (!isMoving) return

      // Create trail effect with CSS transforms only
      const trailElements = trail.children
      for (let i = 0; i < trailElements.length; i++) {
        const element = trailElements[i] as HTMLElement
        const delay = i * 50 // Stagger effect
        const opacity = Math.max(0, 1 - i * 0.15)

        setTimeout(() => {
          element.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`
          element.style.opacity = opacity.toString()
        }, delay)
      }

      isMoving = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMoving = true

      if (!animationId) {
        animationId = requestAnimationFrame(() => {
          updateTrail()
          animationId = 0
        })
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div ref={trailRef} className="fixed inset-0 pointer-events-none z-40">
      {/* Create multiple trail dots */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/60 rounded-full will-change-transform"
          style={{
            opacity: 0,
            transform: "translate3d(-50%, -50%, 0)",
            filter: `blur(${i * 0.2}px)`,
          }}
        />
      ))}
    </div>
  )
}
