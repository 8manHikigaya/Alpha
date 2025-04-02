"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Volume2, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AlphabetLearning() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [progress, setProgress] = useState(0)
  const [pencilPosition, setPencilPosition] = useState({ x: 200, y: 200 })
  const [showPencil, setShowPencil] = useState(true)
  const animationRef = useRef<number>()
  const { toast } = useToast()

  // Sample Hindi alphabet array with pronunciation guides
  const alphabets = [
    { letter: "अ", pronunciation: "a", example: "अनार (Pomegranate)", guide: "Start from top, curve down" },
    { letter: "आ", pronunciation: "aa", example: "आम (Mango)", guide: "Start from top, straight down" },
    { letter: "इ", pronunciation: "i", example: "इमली (Tamarind)", guide: "Curve from left to right" },
    { letter: "ई", pronunciation: "ee", example: "ईख (Sugarcane)", guide: "Two curves connected" },
    { letter: "उ", pronunciation: "u", example: "उल्लू (Owl)", guide: "Hook shape from top" },
  ]

  // Generate path points for the current letter
  const generatePathPoints = useCallback(() => {
    if (!canvasRef.current) return []

    const canvas = canvasRef.current
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.3

    // Create different paths based on the current letter
    const points = []

    switch (currentLetter) {
      case 0: // अ
        // Create a curved path for अ
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX - radius / 2 + radius * t,
            y: centerY - radius / 2 + radius * Math.sin(t * Math.PI),
          })
        }
        break
      case 1: // आ
        // Create a vertical line with a curve for आ
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX,
            y: centerY - radius + t * radius * 2,
          })
        }
        break
      case 2: // इ
        // Create a curved path for इ
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX - radius / 2 + t * radius,
            y: centerY + (radius / 3) * Math.sin(t * Math.PI * 2),
          })
        }
        break
      case 3: // ई
        // Create a double curve for ई
        for (let i = 0; i <= 30; i++) {
          const t = i / 30
          if (i <= 15) {
            points.push({
              x: centerX - radius / 2 + t * radius,
              y: centerY - radius / 4 + (radius / 2) * Math.sin(t * Math.PI),
            })
          } else {
            points.push({
              x: centerX + radius / 2 - (t - 0.5) * radius,
              y: centerY + radius / 4 + (radius / 2) * Math.sin((t - 0.5) * Math.PI),
            })
          }
        }
        break
      case 4: // उ
        // Create a hook shape for उ
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX - radius / 3 + (radius / 2) * Math.sin(t * Math.PI),
            y: centerY - radius / 2 + t * radius,
          })
        }
        break
      default:
        // Default circular path
        for (let i = 0; i <= 20; i++) {
          const angle = (i / 20) * Math.PI * 2
          points.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle),
          })
        }
    }

    return points
  }, [currentLetter])

  // Animate the pencil along the path
  const animatePencil = useCallback(() => {
    const pathPoints = generatePathPoints()
    if (pathPoints.length === 0) return

    let pointIndex = 0
    let progress = 0
    const speed = 0.02

    const animate = () => {
      if (!showPencil || isDrawing) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const currentPoint = pathPoints[pointIndex]
      const nextPointIndex = (pointIndex + 1) % pathPoints.length
      const nextPoint = pathPoints[nextPointIndex]

      // Calculate direction vector
      const dx = nextPoint.x - currentPoint.x
      const dy = nextPoint.y - currentPoint.y

      // Update progress
      progress += speed

      if (progress >= 1) {
        // Move to next point
        pointIndex = nextPointIndex
        progress = 0
      }

      // Calculate new position
      setPencilPosition({
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
  }, [generatePathPoints, showPencil, isDrawing])

  // Initialize canvas and start animation
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.strokeStyle = "#2563eb"
        ctx.lineWidth = 8
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        setContext(ctx)
      }
    }

    const cleanup = animatePencil()

    return () => {
      if (cleanup) cleanup()
    }
  }, [animatePencil])

  const clearCanvas = useCallback(() => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      toast({
        title: "Canvas Cleared",
        description: "Start drawing again!",
        duration: 1500,
      })
    }
  }, [context, toast])

  const nextLetter = useCallback(() => {
    if (currentLetter < alphabets.length - 1) {
      setCurrentLetter((prev) => prev + 1)
      if (context) {
        clearCanvas()
        setProgress(((currentLetter + 1) / alphabets.length) * 100)
      }
      toast({
        title: "Great job!",
        description: "Moving to next letter",
        duration: 1500,
      })
    }
  }, [currentLetter, alphabets.length, context, clearCanvas, toast])

  const previousLetter = useCallback(() => {
    if (currentLetter > 0) {
      setCurrentLetter((prev) => prev - 1)
      if (context) {
        clearCanvas()
        setProgress(((currentLetter - 1) / alphabets.length) * 100)
      }
    }
  }, [currentLetter, alphabets.length, context, clearCanvas])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    if (!context) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    if (context) {
      context.closePath()
    }
  }

  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(alphabets[currentLetter].pronunciation)
    utterance.lang = "hi-IN"
    speechSynthesis.speak(utterance)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Letter {currentLetter + 1} of {alphabets.length}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Letter Display Section */}
            <div className="bg-card rounded-xl p-6 flex flex-col items-center justify-center border shadow-lg">
              <div className="text-9xl font-bold mb-4 text-primary">{alphabets[currentLetter].letter}</div>
              <p className="text-lg mb-4 text-muted-foreground">Example: {alphabets[currentLetter].example}</p>
              <div className="flex gap-2">
                <Button onClick={playSound} size="lg" className="gap-2">
                  <Volume2 className="w-5 h-5" />
                  Listen
                </Button>
              </div>
            </div>

            {/* Drawing Section */}
            <div className="bg-card rounded-xl p-6 border shadow-lg">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="border-2 border-dashed border-muted-foreground rounded-lg bg-white w-full touch-none"
                  aria-label={`Drawing area for letter ${alphabets[currentLetter].letter}`}
                />

                {/* Animated Pencil */}
                {showPencil && !isDrawing && (
                  <div
                    className="absolute pointer-events-none z-10 transition-transform duration-100"
                    style={{
                      transform: `translate(${pencilPosition.x - 20}px, ${pencilPosition.y - 40}px)`,
                    }}
                  >
                    <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 75L5 80H35L30 75V65L10 65V75Z" fill="#FFD700" />
                      <path d="M10 65V15L30 15V65L10 65Z" fill="#FFA500" />
                      <path d="M10 15L15 5L25 5L30 15L10 15Z" fill="#8B4513" />
                      <path d="M15 5L20 0L25 5H15Z" fill="#808080" />
                      <path d="M20 0L22 2L18 2L20 0Z" fill="#C0C0C0" />
                      <path
                        d="M10 65H30M10 55H30M10 45H30M10 35H30M10 25H30M10 15H30"
                        stroke="#000000"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M10 75L5 80H35L30 75M10 75V65M10 75H30M30 75V65M10 65H30M10 65V15M10 15H30M10 15L15 5M30 15V65M30 15L25 5M15 5H25M15 5L20 0M25 5L20 0"
                        stroke="#000000"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full opacity-10 text-9xl flex items-center justify-center text-muted-foreground">
                    {alphabets[currentLetter].letter}
                  </div>
                </div>
              </div>

              {/* Writing Guide */}
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">{alphabets[currentLetter].guide}</p>
              </div>

              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={clearCanvas} className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Clear
                </Button>

                <Button variant="outline" onClick={() => setShowPencil((prev) => !prev)} className="gap-2">
                  {showPencil ? "Hide" : "Show"} Guide
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={previousLetter} disabled={currentLetter === 0}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button onClick={nextLetter} disabled={currentLetter === alphabets.length - 1}>
                    <ChevronRight className="w-4 h-4" />
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

