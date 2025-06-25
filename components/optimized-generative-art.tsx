"use client"

import { useEffect, useRef, useCallback } from "react"
import { throttle, PerformanceMonitor } from "@/lib/performance"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export function OptimizedGenerativeArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const performanceMonitor = useRef(new PerformanceMonitor())
  const lastFrameTime = useRef(0)
  const targetFPS = 60
  const frameInterval = 1000 / targetFPS

  const colors = [
    "rgba(59, 130, 246, 0.4)", // blue
    "rgba(147, 51, 234, 0.4)", // purple
    "rgba(236, 72, 153, 0.4)", // pink
    "rgba(34, 197, 94, 0.4)", // green
  ]

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.3 + 0.1,
      life: 0,
      maxLife: Math.random() * 800 + 400,
    }),
    [colors],
  )

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const particleCount = performanceMonitor.current.shouldReduceEffects() ? 15 : 25
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(canvas))
      }
    },
    [createParticle],
  )

  const updateParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Boundary collision with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Fade out near end of life
        if (particle.life > particle.maxLife * 0.7) {
          particle.opacity *= 0.99
        }

        // Respawn particle
        if (particle.life > particle.maxLife || particle.opacity < 0.01) {
          particlesRef.current[index] = createParticle(canvas)
        }
      })
    },
    [createParticle],
  )

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  }, [])

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D) => {
    const maxDistance = 100
    const particles = particlesRef.current

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i]
        const p2 = particles[j]
        const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

        if (distance < maxDistance) {
          const strength = (1 - distance / maxDistance) * 0.2
          ctx.save()
          ctx.globalAlpha = strength
          ctx.strokeStyle = p1.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }
  }, [])

  const animate = useCallback(
    (currentTime: number) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Frame rate limiting
      if (currentTime - lastFrameTime.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastFrameTime.current = currentTime
      performanceMonitor.current.update()

      // Clear with better performance
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles(canvas)
      drawParticles(ctx)

      // Only draw connections if performance is good
      if (!performanceMonitor.current.shouldReduceEffects()) {
        drawConnections(ctx)
      }

      animationRef.current = requestAnimationFrame(animate)
    },
    [updateParticles, drawParticles, drawConnections],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = throttle(() => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas)
    }, 250)

    resizeCanvas()
    animationRef.current = requestAnimationFrame(animate)

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
        mixBlendMode: "screen",
        willChange: "transform",
      }}
    />
  )
}
