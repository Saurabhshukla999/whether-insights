"use client"

import { useEffect, useState } from "react"

type CursorType = "default" | "pointer" | "text" | "button" | "project"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<CursorType>("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === "A") {
        setCursorType("pointer")
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorType("button")
      } else if (target.closest("[data-cursor='project']")) {
        setCursorType("project")
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorType("text")
      } else {
        setCursorType("default")
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseover", handleElementHover)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseover", handleElementHover)
      document.body.style.cursor = "auto"
    }
  }, [])

  const getCursorStyle = () => {
    const baseStyle = {
      left: position.x,
      top: position.y,
      transform: "translate(-50%, -50%)",
    }

    switch (cursorType) {
      case "pointer":
        return {
          ...baseStyle,
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(59, 130, 246, 0.3)",
          border: "2px solid rgb(59, 130, 246)",
        }
      case "button":
        return {
          ...baseStyle,
          width: "50px",
          height: "50px",
          backgroundColor: "rgba(147, 51, 234, 0.3)",
          border: "2px solid rgb(147, 51, 234)",
        }
      case "project":
        return {
          ...baseStyle,
          width: "60px",
          height: "60px",
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          border: "2px solid rgb(34, 197, 94)",
        }
      case "text":
        return {
          ...baseStyle,
          width: "2px",
          height: "20px",
          backgroundColor: "rgb(59, 130, 246)",
          borderRadius: "1px",
        }
      default:
        return {
          ...baseStyle,
          width: "20px",
          height: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }
    }
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-[9999] rounded-full transition-all duration-200 ease-out mix-blend-difference"
      style={getCursorStyle()}
    >
      {cursorType === "project" && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-400">VIEW</div>
      )}
    </div>
  )
}
