"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import Image from "next/image"

interface LanguageSelectorProps {
  selectedLanguage: string
  onSelectLanguage: (language: string) => void
  progressData: Record<string, number>
}

export default function LanguageSelector({ selectedLanguage, onSelectLanguage, progressData }: LanguageSelectorProps) {
  const languages = [
    { id: "hindi", name: "Hindi", image: "/placeholder.svg?height=100&width=100" },
    { id: "tamil", name: "Tamil", image: "/placeholder.svg?height=100&width=100" },
    { id: "telugu", name: "Telugu", image: "/placeholder.svg?height=100&width=100" },
    { id: "kannada", name: "Kannada", image: "/placeholder.svg?height=100&width=100" },
    { id: "malayalam", name: "Malayalam", image: "/placeholder.svg?height=100&width=100" },
    { id: "bengali", name: "Bengali", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {languages.map((language) => (
        <Card
          key={language.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedLanguage === language.id ? "ring-4 ring-kid-accent" : ""
          }`}
          onClick={() => onSelectLanguage(language.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-kid-accent/30">
                <Image src={language.image || "/placeholder.svg"} alt={language.name} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-bold text-lg">{language.name}</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{progressData[language.id]}%</span>
                  </div>
                  <Progress value={progressData[language.id]} className="h-2" />
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/learn/${language.id}/1`}
                    className="text-xs text-kid-primary font-medium hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

