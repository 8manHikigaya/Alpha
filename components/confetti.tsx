"use client"

import { useEffect, useRef } from "react"

interface ConfettiProps {
  active: boolean
  duration?: number
}

export default function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particles = useRef<any[]>([])
  const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#9B5DE5", "#00BBF9", "#00F5D4"]

  useEffect(() => {
    if (!active || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match window
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    particles.current = []
    for (let i = 0; i < 200; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        oscillationSpeed: Math.random() * 0.2 + 0.1,
        oscillationDistance: Math.random() * 40 + 20,
        initialX: 0,
      })
    }

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i]

        // Save initial X position for oscillation
        if (p.initialX === 0) {
          p.initialX = p.x
        }

        // Update position
        p.y += p.speed
        p.x = p.initialX + Math.sin(p.y * p.oscillationSpeed) * p.oscillationDistance
        p.rotation += p.rotationSpeed

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()

        // Reset if off screen
        if (p.y > canvas.height) {
          particles.current[i].y = -p.size
          particles.current[i].x = Math.random() * canvas.width
          particles.current[i].initialX = particles.current[i].x
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Stop after duration
    const timeout = setTimeout(() => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }, duration)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(timeout)
    }
  }, [active, duration])

  if (!active) return null

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" aria-hidden="true" />
}

