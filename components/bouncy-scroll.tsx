"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface BouncyScrollProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function BouncyScroll({ children, className = "", intensity = 1 }: BouncyScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [elementTop, setElementTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const updateElementPosition = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        setElementTop(rect.top + window.scrollY)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateElementPosition)
    updateElementPosition()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateElementPosition)
    }
  }, [])

  const getTransform = () => {
    const elementCenter = elementTop + (elementRef.current?.offsetHeight || 0) / 2
    const viewportCenter = scrollY + window.innerHeight / 2
    const distance = Math.abs(elementCenter - viewportCenter)
    const maxDistance = window.innerHeight / 2

    if (distance > maxDistance) return "scale(1)"

    const proximity = 1 - distance / maxDistance
    const squash = 1 - proximity * 0.1 * intensity
    const stretch = 1 + proximity * 0.05 * intensity

    return `scaleY(${squash}) scaleX(${stretch})`
  }

  return (
    <div
      ref={elementRef}
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{ transform: getTransform() }}
    >
      {children}
    </div>
  )
}
