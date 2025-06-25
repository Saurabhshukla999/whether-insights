"use client"

import { motion } from "framer-motion"
import { useOptimizedInView } from "@/hooks/use-optimized-in-view"
import { animations } from "@/lib/advanced-animations"
import type { ReactNode } from "react"

interface MotionWrapperProps {
  children: ReactNode
  animation?: keyof typeof animations
  delay?: number
  className?: string
  once?: boolean
}

export function MotionWrapper({
  children,
  animation = "fadeInLuxury",
  delay = 0,
  className = "",
  once = true,
}: MotionWrapperProps) {
  const [ref, isInView] = useOptimizedInView(0.1, "50px")

  const animationConfig = animations[animation]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animationConfig.initial}
      animate={isInView ? animationConfig.animate : animationConfig.initial}
      transition={{
        ...animationConfig.transition,
        delay: delay,
      }}
      {...(animationConfig.whileHover && { whileHover: animationConfig.whileHover })}
      {...(animationConfig.whileTap && { whileTap: animationConfig.whileTap })}
    >
      {children}
    </motion.div>
  )
}
