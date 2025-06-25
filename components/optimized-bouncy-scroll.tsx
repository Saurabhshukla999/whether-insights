"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { throttle } from "@/lib/performance"
import { useOptimizedInView } from "@/hooks/use-optimized-in-view"

interface OptimizedBouncyScrollProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function OptimizedBouncyScroll({ children, className = "", intensity = 1 }: OptimizedBouncyScrollProps) {
  const [elementRef, isInView] = useOptimizedInView(0.1, "50px")
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!isInView) return

    const handleScroll = throttle(() => {
      if (!elementRef.current) return

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      rafRef.current = requestAnimationFrame(() => {
        if (!elementRef.current) return

        const rect = elementRef.current.getBoundingClientRect()
        const viewportCenter = window.innerHeight / 2
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)
        const maxDistance = window.innerHeight / 2

        if (distance > maxDistance) return

        const proximity = 1 - distance / maxDistance
        const scale = 1 + proximity * 0.02 * intensity

        elementRef.current.style.transform = `scale(${scale})`
      })
    }, 16)

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isInView, intensity, elementRef])

  return (
    <div ref={elementRef} className={`transition-transform duration-100 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  )
}
