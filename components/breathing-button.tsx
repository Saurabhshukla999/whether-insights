"use client"

import type { ReactNode } from "react"

interface BreathingButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  intensity?: number
}

export function BreathingButton({ children, className = "", onClick, href, intensity = 1 }: BreathingButtonProps) {
  const baseClasses = `
    relative overflow-hidden transition-all duration-300 transform
    animate-breathing hover:scale-105 hover:shadow-2xl
    before:absolute before:inset-0 before:bg-gradient-to-r 
    before:from-blue-500/20 before:to-purple-500/20 before:opacity-0 
    before:transition-opacity before:duration-300 hover:before:opacity-100
    ${className}
  `

  const style = {
    animationDuration: `${2 / intensity}s`,
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} style={style}>
        <span className="relative z-10">{children}</span>
      </a>
    )
  }

  return (
    <button onClick={onClick} className={baseClasses} style={style}>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
