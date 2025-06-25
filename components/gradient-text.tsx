"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

interface GradientTextProps {
  children: ReactNode
  className?: string
  animationType?: "hover" | "scroll" | "continuous"
}

export function GradientText({ children, className = "", animationType = "hover" }: GradientTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (animationType === "scroll") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting)
        },
        { threshold: 0.1 },
      )

      if (textRef.current) {
        observer.observe(textRef.current)
      }

      return () => observer.disconnect()
    }
  }, [animationType])

  const getAnimationClass = () => {
    switch (animationType) {
      case "hover":
        return "animate-gradient-hover"
      case "scroll":
        return isVisible ? "animate-gradient-scroll" : ""
      case "continuous":
        return "animate-gradient-continuous"
      default:
        return ""
    }
  }

  return (
    <span
      ref={textRef}
      className={`bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-300% ${getAnimationClass()} ${className}`}
    >
      {children}
    </span>
  )
}
