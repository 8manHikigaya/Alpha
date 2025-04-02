"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, ArrowRight } from "lucide-react"
import Image from "next/image"

interface AlphabetsPageProps {
  params: {
    language: string
  }
}

export default function AlphabetsPage({ params }: AlphabetsPageProps) {
  const { language } = params
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  // Language display names
  const languageNames: Record<string, string> = {
    hindi: "Hindi",
    tamil: "Tamil",
    telugu: "Telugu",
    kannada: "Kannada",
    malayalam: "Malayalam",
    bengali: "Bengali",
  }

  // Alphabets for each language
  const languageAlphabets: Record<string, string[]> = {
    hindi: ["अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", "क", "ख", "ग", "घ", "ङ"],
    tamil: ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ", "க", "ங", "ச"],
    telugu: ["అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఋ", "ౠ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ", "క"],
    kannada: ["ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ", "ಕ"],
    malayalam: ["അ", "ആ", "ഇ", "ഈ", "ഉ", "ഊ", "ഋ", "ൠ", "എ", "ഏ", "ഐ", "ഒ", "ഓ", "ഔ", "ക"],
    bengali: ["অ", "আ", "ই", "ঈ", "উ", "ঊ", "ঋ", "ৠ", "এ", "ঐ", "ও", "ঔ", "ক", "খ", "গ"],
  }

  // Default to Hindi if language not found
  const alphabets = languageAlphabets[language] || languageAlphabets.hindi
  const displayName = languageNames[language] || "Hindi"

  // Mock progress data - in a real app, this would come from a database
  const [progress, setProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")

    if (userData) {
      setUser(JSON.parse(userData))

      // Generate random progress for each alphabet
      const mockProgress: Record<string, number> = {}
      alphabets.forEach((alphabet) => {
        mockProgress[alphabet] = Math.floor(Math.random() * 100)
      })
      setProgress(mockProgress)
    } else {
      // Redirect to login if not logged in
      router.push("/auth/login")
    }
  }, [router, alphabets])

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
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
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
            {displayName} Alphabets
          </h1>
        </div>

        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Select a Letter to Practice</CardTitle>
            <div className="relative w-12 h-12">
              <Image src="/tiger.png" alt="Mascot" fill className="object-contain" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Click on any letter below to start practicing. Your progress for each letter is shown by the background
              color.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {alphabets.map((alphabet, index) => {
                const letterProgress = progress[alphabet] || 0
                const bgColorStyle =
                  letterProgress > 0
                    ? {
                        background: `linear-gradient(to top, rgba(var(--kid-secondary-rgb), ${letterProgress / 100}) 0%, transparent 100%)`,
                      }
                    : {}

                return (
                  <Link href={`/learn/${language}/${index + 1}`} key={alphabet} className="relative">
                    <div
                      className="aspect-square flex items-center justify-center text-3xl font-bold rounded-xl border-2 border-kid-primary/20 hover:border-kid-primary transition-colors"
                      style={bgColorStyle}
                    >
                      {alphabet}
                    </div>
                    {letterProgress > 0 && (
                      <div className="absolute bottom-1 right-1 text-xs font-medium">{letterProgress}%</div>
                    )}
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>

          <Button asChild variant="kid">
            <Link href={`/learn/${language}/1`}>
              Start Learning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

