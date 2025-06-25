"use client"

import { useEffect, useState, useRef } from "react"
import { throttle } from "@/lib/performance"

export function OptimizedParallax() {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false

    const updateScrollY = () => {
      setScrollY(window.scrollY)
      ticking = false
    }

    const handleScroll = throttle(() => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateScrollY)
        ticking = true
      }
    }, 16) // ~60fps

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Slowest */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/3 to-purple-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-tl from-cyan-500/3 to-pink-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Layer 2 - Medium Speed */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
        }}
      >
        <div className="absolute top-1/2 left-1/6 w-24 h-24 bg-gradient-to-r from-green-500/4 to-blue-500/4 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-gradient-to-l from-purple-500/4 to-pink-500/4 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}
