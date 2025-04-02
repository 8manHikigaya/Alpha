"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import AnimatedPencil from "./animated-pencil"

interface DrawingCanvasProps {
  letter: string
  onDrawingComplete: (isCorrect: boolean) => void
}

export default function DrawingCanvas({ letter, onDrawingComplete }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [pencilPath, setPencilPath] = useState<{ x: number; y: number }[]>([])
  const [showPencilAnimation, setShowPencilAnimation] = useState(true)

  // Initialize canvas
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
  }, [])

  // Clear canvas when letter changes
  useEffect(() => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [letter, context])

  // Generate pencil animation path
  useEffect(() => {
    if (letter) {
      generatePencilPath()
    }
  }, [letter, canvasRef.current])

  const generatePencilPath = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Generate path based on letter shape (simplified for demo)
    // In a real app, you would have specific paths for each letter
    const radius = Math.min(width, height) * 0.3
    const points = []

    // Create a path that follows the general shape of the letter
    // This is a simplified example - for a real app you'd want custom paths per letter
    for (let i = 0; i <= 10; i++) {
      const angle = (i / 10) * Math.PI * 2
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      })
    }

    setPencilPath(points)
  }

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

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="border border-gray-300 rounded-lg bg-white w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <AnimatedPencil active={showPencilAnimation && !isDrawing} pathPoints={pencilPath} speed={2} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full opacity-10 text-9xl flex items-center justify-center text-muted-foreground">
            {letter}
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm flex items-center"
          onClick={() => setShowPencilAnimation((prev) => !prev)}
        >
          {showPencilAnimation ? "Hide" : "Show"} Guide
        </button>
        <button
          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm flex items-center"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

