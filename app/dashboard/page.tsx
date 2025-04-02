"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, BookOpen, Calendar, Clock, Award, Languages } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import DashboardHeader from "@/components/dashboard-header"
import LanguageSelector from "@/components/language-selector"
import RecentActivities from "@/components/recent-activities"
import AchievementsList from "@/components/achievements-list"
import Image from "next/image"

interface User {
  name: string
  email: string
  userType: string
  isLoggedIn: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data for the dashboard
  const [selectedLanguage, setSelectedLanguage] = useState("hindi")
  const [progressData, setProgressData] = useState({
    hindi: 45,
    tamil: 20,
    telugu: 10,
    kannada: 5,
    malayalam: 0,
    bengali: 15,
  })

  const [streakDays, setStreakDays] = useState(7)
  const [totalPracticeTime, setTotalPracticeTime] = useState(320) // in minutes
  const [alphabetsLearned, setAlphabetsLearned] = useState(24)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")

    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // Redirect to login if not logged in
      router.push("/auth/login")
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/auth/login")
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="kid-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      {user.userType === "parent" && (
        <Link href="/parent-controls" className="kid-nav-item">
          Parent Controls
        </Link>
      )}

      <main className="container py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <Card className="col-span-2 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 opacity-10">
              <Image src="/tiger.png" alt="Decoration" width={160} height={160} className="object-contain" />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                <span className="bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
                  Welcome back, {user.name}!
                </span>
              </CardTitle>
              <CardDescription>Track your progress and continue your learning journey.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Languages className="h-5 w-5 text-kid-blue" />
                      <span className="text-sm font-medium">
                        Current Language: {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {progressData[selectedLanguage as keyof typeof progressData]}% Complete
                    </span>
                  </div>
                  <Progress value={progressData[selectedLanguage as keyof typeof progressData]} className="h-3" />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="flex-1" variant="kid">
                    <Link href={`/learn/${selectedLanguage}/1`}>Continue Learning</Link>
                  </Button>
                  <Button variant="kid-secondary" asChild className="flex-1">
                    <Link href={`/alphabets/${selectedLanguage}`}>Practice Alphabets</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-6 w-6 text-kid-accent" />
                <span>Your Stats</span>
              </CardTitle>
              <CardDescription>Your learning statistics and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-kid-accent/10 hover:bg-kid-accent/20 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-kid-orange" />
                    <span className="text-sm font-medium">Current Streak</span>
                  </div>
                  <span className="text-sm font-medium">{streakDays} days</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-kid-secondary/10 hover:bg-kid-secondary/20 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-kid-secondary" />
                    <span className="text-sm font-medium">Total Practice Time</span>
                  </div>
                  <span className="text-sm font-medium">
                    {Math.floor(totalPracticeTime / 60)}h {totalPracticeTime % 60}m
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-kid-blue/10 hover:bg-kid-blue/20 transition-colors">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-kid-blue" />
                    <span className="text-sm font-medium">Alphabets Learned</span>
                  </div>
                  <span className="text-sm font-medium">{alphabetsLearned}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-kid-purple/10 hover:bg-kid-purple/20 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-kid-purple" />
                    <span className="text-sm font-medium">Achievements</span>
                  </div>
                  <span className="text-sm font-medium">5 / 20</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="languages">
            <TabsList className="grid w-full grid-cols-4 md:w-auto rounded-xl p-1">
              <TabsTrigger value="languages" className="rounded-lg">
                Languages
              </TabsTrigger>
              <TabsTrigger value="activities" className="rounded-lg">
                Recent Activities
              </TabsTrigger>
              <TabsTrigger value="achievements" className="rounded-lg">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="languages" className="mt-6">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                progressData={progressData}
              />
            </TabsContent>

            <TabsContent value="activities" className="mt-6">
              <RecentActivities />
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <AchievementsList />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-6 w-6 text-kid-blue" />
                    <span>Learning Analytics</span>
                  </CardTitle>
                  <CardDescription>Visualize your learning progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-xl">
                    <div className="text-center">
                      <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Analytics Dashboard</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Detailed analytics will be available after more practice sessions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

