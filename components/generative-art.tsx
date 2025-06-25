"use client"

import { useEffect, useRef } from "react"

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

interface Connection {
  p1: Particle
  p2: Particle
  strength: number
}

export function GenerativeArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const colors = [
      "rgba(59, 130, 246, 0.6)", // blue
      "rgba(147, 51, 234, 0.6)", // purple
      "rgba(236, 72, 153, 0.6)", // pink
      "rgba(34, 197, 94, 0.6)", // green
      "rgba(251, 191, 36, 0.6)", // yellow
      "rgba(239, 68, 68, 0.6)", // red
    ]

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 1000 + 500,
    })

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Fade out near end of life
        if (particle.life > particle.maxLife * 0.8) {
          particle.opacity *= 0.98
        }

        // Respawn particle
        if (particle.life > particle.maxLife || particle.opacity < 0.01) {
          particlesRef.current[index] = createParticle()
        }
      })
    }

    const updateConnections = () => {
      connectionsRef.current = []
      const maxDistance = 150

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))

          if (distance < maxDistance) {
            const strength = 1 - distance / maxDistance
            connectionsRef.current.push({ p1, p2, strength })
          }
        }
      }
    }

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.restore()
      })
    }

    const drawConnections = () => {
      connectionsRef.current.forEach((connection) => {
        ctx.save()
        ctx.globalAlpha = connection.strength * 0.3
        ctx.strokeStyle = connection.p1.color
        ctx.lineWidth = connection.strength * 2
        ctx.beginPath()
        ctx.moveTo(connection.p1.x, connection.p1.y)
        ctx.lineTo(connection.p2.x, connection.p2.y)
        ctx.stroke()
        ctx.restore()
      })
    }

    const drawGenerativeShapes = () => {
      const time = Date.now() * 0.001

      // Draw flowing curves
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
      ctx.lineWidth = 2

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.01 + time + i * 2) * Math.PI) * 50 +
            Math.sin((x * 0.005 + time * 0.5 + i) * Math.PI) * 30
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateParticles()
      updateConnections()

      drawGenerativeShapes()
      drawConnections()
      drawParticles()

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent", mixBlendMode: "screen" }}
    />
  )
}
