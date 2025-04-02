"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import DashboardHeader from "@/components/dashboard-header"
import { Clock, Calendar, BarChart, Users } from "lucide-react"

interface User {
  name: string
  email: string
  userType: string
  isLoggedIn: boolean
}

export default function ParentControlsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{
    name: string
    email: string
    userType: string
    isLoggedIn: boolean
  } | null>(null)
  const [loading, setLoading] = useState(true)

  // Parent control settings
  const [dailyTimeLimit, setDailyTimeLimit] = useState(60) // in minutes
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [contentFiltering, setContentFiltering] = useState(true)
  const [childAccounts, setChildAccounts] = useState([
    { id: 1, name: "Arjun", age: 5, language: "Hindi", progress: 45 },
    { id: 2, name: "Priya", age: 4, language: "Tamil", progress: 20 },
  ])

  useEffect(() => {
    // Check if user is logged in and is a parent
    const userData = localStorage.getItem("user")

    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)

      if (parsedUser.userType !== "parent") {
        // Redirect to dashboard if not a parent
        toast({
          title: "Access denied",
          description: "Only parents can access this page.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    } else {
      // Redirect to login if not logged in
      router.push("/auth/login")
    }

    setLoading(false)
  }, [router, toast])

  const handleLogout = () => {
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/auth/login")
  }

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your parental control settings have been updated.",
    })
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onLogout={handleLogout} />

      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Parent Controls</h1>

        <Tabs defaultValue="settings">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Management</CardTitle>
                <CardDescription>Control how much time your child can spend on the app</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <Label htmlFor="daily-limit">Daily Time Limit</Label>
                    </div>
                    <span className="text-sm font-medium">{dailyTimeLimit} minutes</span>
                  </div>
                  <Slider
                    id="daily-limit"
                    min={15}
                    max={120}
                    step={15}
                    value={[dailyTimeLimit]}
                    onValueChange={(value) => setDailyTimeLimit(value[0])}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="break-reminder" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="break-reminder">Enable break reminders</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-logout" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="auto-logout">Auto-logout when time limit is reached</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>

                <div className="flex items-center space-x-2 pl-6">
                  <Switch
                    id="progress-notifications"
                    checked={notificationsEnabled}
                    disabled={!notificationsEnabled}
                    onCheckedChange={() => {}}
                  />
                  <Label
                    htmlFor="progress-notifications"
                    className={!notificationsEnabled ? "text-muted-foreground" : ""}
                  >
                    Progress updates
                  </Label>
                </div>

                <div className="flex items-center space-x-2 pl-6">
                  <Switch
                    id="achievement-notifications"
                    checked={notificationsEnabled}
                    disabled={!notificationsEnabled}
                    onCheckedChange={() => {}}
                  />
                  <Label
                    htmlFor="achievement-notifications"
                    className={!notificationsEnabled ? "text-muted-foreground" : ""}
                  >
                    Achievement alerts
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content & Safety</CardTitle>
                <CardDescription>Control content access and safety settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="content-filtering" checked={contentFiltering} onCheckedChange={setContentFiltering} />
                  <Label htmlFor="content-filtering">Enable content filtering</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="supervised-mode" checked={true} onCheckedChange={() => {}} />
                  <Label htmlFor="supervised-mode">
                    Supervised mode (requires parent approval for certain actions)
                  </Label>
                </div>

                <div className="pt-4">
                  <Button onClick={saveSettings}>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Children</CardTitle>
                <CardDescription>View and manage your children's accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {childAccounts.map((child) => (
                    <div key={child.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{child.name}</p>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Age: {child.age} • Learning: {child.language} • Progress: {child.progress}%
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Add Child Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Reports</CardTitle>
                <CardDescription>View detailed reports on your children's learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="child-select">Select Child</Label>
                    <select
                      id="child-select"
                      className="flex h-10 w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="1">Arjun</option>
                      <option value="2">Priya</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">Time Period</span>
                      </div>
                      <select className="flex h-8 rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="week">Last 7 days</option>
                        <option value="month">Last 30 days</option>
                        <option value="all">All time</option>
                      </select>
                    </div>

                    <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-md">
                      <div className="text-center">
                        <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">Learning Progress Report</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Detailed reports will be available after more practice sessions.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="outline">Download Report</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

