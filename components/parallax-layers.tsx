"use client"

import { useEffect, useState } from "react"

export function ParallaxLayers() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Slowest (Background) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-gradient-to-tl from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Layer 2 - Medium Speed */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
        }}
      >
        <div className="absolute top-1/2 left-1/6 w-32 h-32 bg-gradient-to-r from-green-500/8 to-blue-500/8 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-l from-purple-500/8 to-pink-500/8 rounded-full blur-2xl"></div>
      </div>

      {/* Layer 3 - Fast Speed */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
        }}
      >
        <div className="absolute top-1/6 right-1/6 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Layer 4 - Fastest (Foreground) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.4}px, 0)`,
        }}
      >
        <div className="absolute top-2/3 left-1/2 w-16 h-16 bg-gradient-to-r from-red-500/12 to-pink-500/12 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 right-1/2 w-20 h-20 bg-gradient-to-l from-teal-500/12 to-cyan-500/12 rounded-full blur-lg"></div>
      </div>

      {/* Geometric shapes with parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.15}px, 0) rotateZ(${scrollY * 0.01}deg)`,
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-2 h-32 bg-gradient-to-b from-blue-400/20 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-2 h-24 bg-gradient-to-t from-purple-400/20 to-transparent transform -rotate-45"></div>
      </div>

      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${scrollY * 0.25}px, 0) rotateZ(${-scrollY * 0.005}deg)`,
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-1 h-40 bg-gradient-to-b from-cyan-400/15 to-transparent transform rotate-12"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-28 bg-gradient-to-t from-pink-400/15 to-transparent transform -rotate-12"></div>
      </div>
    </div>
  )
}
