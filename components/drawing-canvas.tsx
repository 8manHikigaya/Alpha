"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import AnimatedPencil from "./animated-pencil"

interface DrawingCanvasProps {
  letter: string | null
  onDrawingChange: (drawingData: string) => void
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ letter, onDrawingChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [pencilPath, setPencilPath] = useState<{ x: number; y: number }[]>([])
  const [showPencilAnimation, setShowPencilAnimation] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.lineWidth = 5
    ctx.strokeStyle = "black"

    if (letter) {
      clearCanvas()
    }
  }, [letter])

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
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if (e instanceof MouseEvent) {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    } else {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    }

    setLastX(x)
    setLastY(y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if (e instanceof MouseEvent) {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    } else {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    }

    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()

    setLastX(x)
    setLastY(y)

    // Notify parent component about the drawing change
    onDrawingChange(canvas.toDataURL())
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Notify parent component about the drawing change (cleared canvas)
    onDrawingChange(canvas.toDataURL())
  }

  return (
    <div>
      <div className="mb-2">
        <button className="mr-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm" onClick={clearCanvas}>
          Clear
        </button>
        <button
          className="mr-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm flex items-center"
          onClick={() => setShowPencilAnimation((prev) => !prev)}
        >
          {showPencilAnimation ? "Hide" : "Show"} Guide
        </button>
      </div>
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
      </div>
    </div>
  )
}

export default DrawingCanvas

