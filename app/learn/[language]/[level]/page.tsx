"use client"

import type React from "react"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Confetti from "@/components/confetti"
import AnimatedPencil from "@/components/animated-pencil"

interface AlphabetLearningProps {
  params: {
    language: string
    level: string
  }
}

export default function AlphabetLearningPage({ params }: AlphabetLearningProps) {
  const { language, level } = params
  const levelNum = Number.parseInt(level)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [progress, setProgress] = useState(0)
  const [pencilPosition, setPencilPosition] = useState({ x: 200, y: 200 })
  const [showPencil, setShowPencil] = useState(true)
  const [showCelebration, setShowCelebration] = useState(false)
  const [drawingAccuracy, setDrawingAccuracy] = useState<number | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const animationRef = useRef<number>()
  const { toast } = useToast()
  const router = useRouter()

  // Sample alphabets for different languages
  const languageAlphabets: Record<string, any[]> = {
    hindi: [
      { letter: "अ", pronunciation: "a", example: "अनार (Pomegranate)", guide: "Start from top, curve down" },
      { letter: "आ", pronunciation: "aa", example: "आम (Mango)", guide: "Start from top, straight down" },
      { letter: "इ", pronunciation: "i", example: "इमली (Tamarind)", guide: "Curve from left to right" },
      { letter: "ई", pronunciation: "ee", example: "ईख (Sugarcane)", guide: "Two curves connected" },
      { letter: "उ", pronunciation: "u", example: "उल्लू (Owl)", guide: "Hook shape from top" },
    ],
    tamil: [
      { letter: "அ", pronunciation: "a", example: "அம்மா (Mother)", guide: "Start from left, curve right" },
      { letter: "ஆ", pronunciation: "aa", example: "ஆடு (Goat)", guide: "Curve with a line on top" },
      { letter: "இ", pronunciation: "i", example: "இலை (Leaf)", guide: "Three curves connected" },
      { letter: "ஈ", pronunciation: "ee", example: "ஈ (Fly)", guide: "Double curve with line" },
      { letter: "உ", pronunciation: "u", example: "உடல் (Body)", guide: "Rounded shape with tail" },
    ],
    telugu: [
      { letter: "అ", pronunciation: "a", example: "అమ్మ (Mother)", guide: "Start from top, curve down" },
      { letter: "ఆ", pronunciation: "aa", example: "ఆవు (Cow)", guide: "Curve with extension" },
      { letter: "ఇ", pronunciation: "i", example: "ఇల్లు (House)", guide: "Two curves with line" },
      { letter: "ఈ", pronunciation: "ee", example: "ఈగ (Fly)", guide: "Complex curve pattern" },
      { letter: "ఉ", pronunciation: "u", example: "ఉంగరం (Ring)", guide: "Rounded shape with tail" },
    ],
    kannada: [
      { letter: "ಅ", pronunciation: "a", example: "ಅಮ್ಮ (Mother)", guide: "Start from left, curve right" },
      { letter: "ಆ", pronunciation: "aa", example: "ಆನೆ (Elephant)", guide: "Extended curve" },
      { letter: "ಇ", pronunciation: "i", example: "ಇಲಿ (Mouse)", guide: "Curve with dot" },
      { letter: "ಈ", pronunciation: "ee", example: "ಈಗ (Now)", guide: "Double curve" },
      { letter: "ಉ", pronunciation: "u", example: "ಉಪ್ಪು (Salt)", guide: "Hook shape" },
    ],
    malayalam: [
      { letter: "അ", pronunciation: "a", example: "അമ്മ (Mother)", guide: "Start from top, curve down" },
      { letter: "ആ", pronunciation: "aa", example: "ആന (Elephant)", guide: "Extended curve" },
      { letter: "ഇ", pronunciation: "i", example: "ഇല (Leaf)", guide: "Curve with extension" },
      { letter: "ഈ", pronunciation: "ee", example: "ഈറ്റ (Reed)", guide: "Double curve" },
      { letter: "ഉ", pronunciation: "u", example: "ഉപ്പ് (Salt)", guide: "Hook shape" },
    ],
    bengali: [
      { letter: "অ", pronunciation: "a", example: "অজগর (Python)", guide: "Start from left, curve right" },
      { letter: "আ", pronunciation: "aa", example: "আম (Mango)", guide: "Extended curve" },
      { letter: "ই", pronunciation: "i", example: "ইঁদুর (Mouse)", guide: "Dot with curve" },
      { letter: "ঈ", pronunciation: "ee", example: "ঈগল (Eagle)", guide: "Double dot with curve" },
      { letter: "উ", pronunciation: "u", example: "উট (Camel)", guide: "Hook shape" },
    ],
  }

  // Default to Hindi if language not found
  const alphabets = languageAlphabets[language] || languageAlphabets.hindi

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

    // This is a simplified version - in a real app, you'd have specific paths for each letter
    // Here we're just creating different patterns based on the letter index
    switch (currentLetter % 5) {
      case 0: // First letter of each language
        // Create a curved path
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX - radius / 2 + radius * t,
            y: centerY - radius / 2 + radius * Math.sin(t * Math.PI),
          })
        }
        break
      case 1: // Second letter
        // Create a vertical line with a curve
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX,
            y: centerY - radius + t * radius * 2,
          })
        }
        break
      case 2: // Third letter
        // Create a curved path
        for (let i = 0; i <= 20; i++) {
          const t = i / 20
          points.push({
            x: centerX - radius / 2 + t * radius,
            y: centerY + (radius / 3) * Math.sin(t * Math.PI * 2),
          })
        }
        break
      case 3: // Fourth letter
        // Create a double curve
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
      case 4: // Fifth letter
        // Create a hook shape
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

  // Draw guidelines on the canvas
  const drawGuidelines = useCallback(() => {
    if (!context || !canvasRef.current) return

    const canvas = canvasRef.current
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    context.clearRect(0, 0, width, height)

    // Draw light grid lines
    context.strokeStyle = "rgba(200, 200, 200, 0.3)"
    context.lineWidth = 1

    // Horizontal lines
    for (let y = 0; y < height; y += 50) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(width, y)
      context.stroke()
    }

    // Vertical lines
    for (let x = 0; x < width; x += 50) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, height)
      context.stroke()
    }

    // Reset stroke style for drawing
    context.strokeStyle = "#2563eb"
    context.lineWidth = 8
    context.lineCap = "round"
    context.lineJoin = "round"
  }, [context])

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
  }, [])

  // Draw guidelines when context is available
  useEffect(() => {
    if (context) {
      drawGuidelines()
    }
  }, [context, drawGuidelines])

  // Start pencil animation
  useEffect(() => {
    // No cleanup needed as AnimatedPencil handles its own lifecycle
  }, [])

  // Update progress when current letter changes
  useEffect(() => {
    setProgress(((currentLetter + 1) / alphabets.length) * 100)
    setDrawingAccuracy(null)
  }, [currentLetter, alphabets.length])

  // Evaluate drawing accuracy
  const evaluateDrawing = useCallback(() => {
    if (!canvasRef.current || !context) return 0

    // In a real app, you would use image recognition or pattern matching
    // For this demo, we'll generate a random accuracy score between 60-100%
    const accuracy = Math.floor(Math.random() * 41) + 60

    setDrawingAccuracy(accuracy)

    // Show confetti for good drawings (above 80%)
    if (accuracy >= 80) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      toast({
        title: "Great job!",
        description: `Your drawing is ${accuracy}% accurate!`,
        duration: 3000,
      })
    } else {
      toast({
        title: "Good attempt!",
        description: `Your drawing is ${accuracy}% accurate. Keep practicing!`,
        duration: 3000,
      })
    }

    return accuracy
  }, [context, toast])

  const clearCanvas = useCallback(() => {
    if (context && canvasRef.current) {
      drawGuidelines()
      setDrawingAccuracy(null)
      toast({
        title: "Canvas Cleared",
        description: "Start drawing again!",
        duration: 1500,
      })
    }
  }, [context, toast, drawGuidelines])

  const nextLetter = useCallback(() => {
    // Evaluate current drawing if not already evaluated
    if (drawingAccuracy === null) {
      evaluateDrawing()
    }

    if (currentLetter < alphabets.length - 1) {
      setCurrentLetter((prev) => prev + 1)
      if (context) {
        clearCanvas()
      }
      toast({
        title: "Moving to next letter",
        description: "Let's practice the next letter!",
        duration: 1500,
      })
    } else {
      // Show celebration when all letters are completed
      setShowCelebration(true)
      toast({
        title: "Congratulations!",
        description: "You've completed all the letters!",
        duration: 3000,
      })
    }
  }, [currentLetter, alphabets.length, context, clearCanvas, toast, drawingAccuracy, evaluateDrawing])

  const previousLetter = useCallback(() => {
    if (currentLetter > 0) {
      setCurrentLetter((prev) => prev - 1)
      if (context) {
        clearCanvas()
      }
    }
  }, [currentLetter, context, clearCanvas])

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
    utterance.lang = language === "hindi" ? "hi-IN" : "en-US" // Simplified language selection
    speechSynthesis.speak(utterance)
  }

  const saveDrawing = () => {
    if (!canvasRef.current) return

    // Evaluate the drawing
    const accuracy = evaluateDrawing()

    // In a real app, you would save the drawing to a server
    toast({
      title: "Drawing Saved!",
      description: `Your drawing has been saved with ${accuracy}% accuracy.`,
      duration: 2000,
    })
  }

  if (showCelebration) {
    return (
      <div className="kid-container min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/dashboard">
              <Home className="h-6 w-6" />
            </Link>
          </Button>
        </div>

        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="text-center max-w-md">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <Image src="/tiger.png" alt="Celebration" fill className="object-contain animate-bounce-slow" />
          </div>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
            Congratulations!
          </h1>

          <p className="text-xl mb-8">
            You've completed all the {language.charAt(0).toUpperCase() + language.slice(1)} alphabet lessons!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="kid" size="lg">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>

            <Button
              variant="kid-secondary"
              size="lg"
              onClick={() => {
                setShowCelebration(false)
                setCurrentLetter(0)
                clearCanvas()
              }}
            >
              Practice Again
            </Button>
          </div>
        </div>

        <Confetti active={true} duration={5000} />
      </div>
    )
  }

  return (
    <div className="kid-container min-h-screen p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/dashboard">
            <Home className="h-6 w-6" />
          </Link>
        </Button>

        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-kid-secondary to-kid-blue bg-clip-text text-transparent">
            {language.charAt(0).toUpperCase() + language.slice(1)} Alphabet Learning
          </h1>
        </div>

        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Letter {currentLetter + 1} of {alphabets.length}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Letter Display Section */}
          <Card className="p-6 flex flex-col items-center justify-center">
            <div className="text-9xl font-bold mb-4 text-primary">{alphabets[currentLetter].letter}</div>
            <p className="text-lg mb-4 text-muted-foreground">Example: {alphabets[currentLetter].example}</p>
            <div className="flex gap-2">
              <Button onClick={playSound} size="lg" variant="kid-accent" className="gap-2">
                <Volume2 className="w-5 h-5" />
                Listen
              </Button>
            </div>
          </Card>

          {/* Drawing Section */}
          <Card className="p-6">
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
                className="border-2 border-dashed border-muted-foreground rounded-xl bg-white w-full touch-none"
                aria-label={`Drawing area for letter ${alphabets[currentLetter].letter}`}
              />

              {/* Animated Pencil */}
              <AnimatedPencil active={showPencil && !isDrawing} followCursor={true} size={40} />

              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full opacity-10 text-9xl flex items-center justify-center text-muted-foreground">
                  {alphabets[currentLetter].letter}
                </div>
              </div>

              {/* Accuracy Badge */}
              {drawingAccuracy !== null && (
                <div className="absolute top-4 right-4 z-20">
                  <Badge
                    variant={drawingAccuracy >= 80 ? "kid-secondary" : drawingAccuracy >= 60 ? "kid-accent" : "default"}
                    className="text-sm font-bold px-3 py-1.5 text-base shadow-md"
                  >
                    {drawingAccuracy}% Accuracy
                  </Badge>
                </div>
              )}
            </div>

            {/* Writing Guide */}
            <div className="mt-4 p-4 bg-muted rounded-xl">
              <p className="text-sm text-muted-foreground">{alphabets[currentLetter].guide}</p>
            </div>

            {/* Accuracy Result */}
            {drawingAccuracy !== null && (
              <div className="mt-4 p-4 bg-accent/20 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Drawing Accuracy</h3>
                  <p className="text-sm text-muted-foreground">
                    {drawingAccuracy >= 80
                      ? "Excellent work! Your drawing is very accurate."
                      : drawingAccuracy >= 60
                        ? "Good job! Keep practicing to improve."
                        : "Nice try! Practice makes perfect."}
                  </p>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
                  {drawingAccuracy}%
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-between mt-4 gap-2">
              <Button variant="outline" onClick={clearCanvas} className="gap-2 rounded-full">
                <RotateCcw className="w-4 h-4" />
                Clear
              </Button>

              <Button variant="outline" onClick={() => setShowPencil((prev) => !prev)} className="gap-2 rounded-full">
                {showPencil ? "Hide" : "Show"} Guide
              </Button>

              <Button variant="outline" onClick={saveDrawing} className="gap-2 rounded-full">
                Save Drawing
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={previousLetter}
                  disabled={currentLetter === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button onClick={nextLetter} variant="kid" className="rounded-full">
                  <ChevronRight className="w-4 h-4" />
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Confetti effect */}
      <Confetti active={showConfetti} duration={3000} />
    </div>
  )
}

