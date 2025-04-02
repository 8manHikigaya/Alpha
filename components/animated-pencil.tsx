"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface AnimatedPencilProps {
  active: boolean
  pathPoints?: { x: number; y: number }[]
  followCursor?: boolean
  speed?: number
  size?: number
}

export default function AnimatedPencil({
  active = true,
  pathPoints = [],
  followCursor = true,
  speed = 3,
  size = 40,
}: AnimatedPencilProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [currentPointIndex, setCurrentPointIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return

    if (followCursor) {
      // Follow cursor mode
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return

        const container = containerRef.current
        const rect = container.getBoundingClientRect()

        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    } else if (pathPoints.length >= 2) {
      // Follow path mode
      const animate = () => {
        const currentPoint = pathPoints[currentPointIndex]
        const nextPointIndex = (currentPointIndex + 1) % pathPoints.length
        const nextPoint = pathPoints[nextPointIndex]

        // Calculate direction vector
        const dx = nextPoint.x - currentPoint.x
        const dy = nextPoint.y - currentPoint.y

        // Calculate distance
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Update progress
        setProgress((prevProgress) => {
          const newProgress = prevProgress + speed / distance

          if (newProgress >= 1) {
            // Move to next point
            setCurrentPointIndex(nextPointIndex)
            return 0
          }

          return newProgress
        })

        // Calculate new position
        setPosition({
          x: currentPoint.x + dx * progress,
          y: currentPoint.y + dy * progress,
        })

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [active, pathPoints, currentPointIndex, progress, speed, followCursor])

  if (!active) return null

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10">
      <div
        className="absolute pointer-events-none z-10 transition-opacity duration-300"
        style={{
          transform: `translate(${position.x - size / 2}px, ${position.y - size}px)`,
          opacity: active ? 1 : 0,
        }}
      >
        <Image src="/pencil.svg" width={size} height={size * 2} alt="Pencil" className="rotate-45" />
      </div>
    </div>
  )
}

