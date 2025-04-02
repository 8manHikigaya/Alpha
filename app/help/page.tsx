"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardHeader from "@/components/dashboard-header"
import { HelpCircle, BookOpen, MessageCircle, Mail, Search } from "lucide-react"

interface User {
  name: string
  email: string
  userType: string
  isLoggedIn: boolean
}

export default function HelpPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")

    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      // For help page, we'll allow access without login
      setUser(null)
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {user ? (
        <DashboardHeader user={user} onLogout={handleLogout} />
      ) : (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">Indian Alphabet Learning</span>
              </a>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/auth/login" className="text-sm font-medium transition-colors hover:text-primary">
                Login
              </a>
              <Button asChild>
                <a href="/auth/login">Get Started</a>
              </Button>
            </nav>
          </div>
        </header>
      )}

      <main className="container py-6">
        <div className="flex flex-col items-center text-center mb-8">
          <HelpCircle className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Find answers to common questions and learn how to get the most out of the Indian Alphabet Learning System
          </p>

          <div className="relative w-full max-w-md mt-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="faq">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Parent Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to the most common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the alphabet learning system work?</AccordionTrigger>
                    <AccordionContent>
                      Our system uses interactive visual and audio elements to teach Indian language alphabets. Children
                      can see the alphabet, hear its pronunciation, and practice writing it using our drawing tool. The
                      system provides real-time feedback and tracks progress over time.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>What languages are supported?</AccordionTrigger>
                    <AccordionContent>
                      Currently, we support Hindi, Tamil, Telugu, Kannada, Malayalam, and Bengali. We are continuously
                      working to add more Indian languages to our platform.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What age group is this system designed for?</AccordionTrigger>
                    <AccordionContent>
                      The Indian Alphabet Learning System is primarily designed for children aged 3-5 years. However, it
                      can be used by anyone who wants to learn Indian language alphabets, regardless of age.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How can I track my child's progress?</AccordionTrigger>
                    <AccordionContent>
                      Parents can create an account and add their children as users. From the parent dashboard, you can
                      view detailed reports on your child's learning progress, including time spent, alphabets learned,
                      and achievements earned.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is there a time limit for using the system?</AccordionTrigger>
                    <AccordionContent>
                      By default, there is no time limit. However, parents can set daily time limits through the
                      parental controls to manage screen time for their children.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      You can reset your password by clicking on the "Forgot password?" link on the login page. You will
                      receive an email with instructions to reset your password.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Parent Guides</CardTitle>
                <CardDescription>
                  Helpful resources for parents to support their child's learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Getting Started Guide</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to set up your child's account and start their learning journey.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Parental Controls</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn how to use parental controls to manage your child's learning experience.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Supporting Your Child's Learning</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tips and strategies to support your child's language learning journey.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Progress Tracking</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Understanding your child's progress reports and learning analytics.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Get in touch with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Live Chat</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Chat with our support team in real-time. Available Monday to Friday, 9 AM to 5 PM IST.
                    </p>
                    <Button>Start Chat</Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Email Support</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Send us an email and we'll get back to you within 24 hours.
                    </p>
                    <Button variant="outline">support@indianalphabet.com</Button>
                  </div>

                  <div className="md:col-span-2 mt-6">
                    <h3 className="font-medium mb-4">Send us a message</h3>
                    <form className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Your email" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help you?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Please describe your issue or question in detail..."
                        />
                      </div>
                      <Button type="submit">Send Message</Button>
                    </form>
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

// Label component for the form
function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  )
}

