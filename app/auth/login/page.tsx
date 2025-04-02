"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("student")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user info in localStorage (in a real app, use secure cookies or tokens)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: loginEmail,
          name: loginEmail.split("@")[0],
          userType: "student",
          isLoggedIn: true,
        }),
      )

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to register
      // For demo purposes, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store user info in localStorage (in a real app, use secure cookies or tokens)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          name,
          userType,
          isLoggedIn: true,
        }),
      )

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="kid-container flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative w-24 h-24 mb-2">
            <Image src="/tiger.png" alt="Logo" fill className="object-contain animate-bounce-slow" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
            Indian Alphabet Learning
          </h1>
          <p className="text-sm text-muted-foreground">Sign in to track your learning progress</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
            <TabsTrigger value="login" className="rounded-lg">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Welcome Back!</CardTitle>
                <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="kid-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="kid-input"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full kid-button" variant="kid" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Create an account</CardTitle>
                <CardDescription className="text-center">Enter your information to create an account</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="kid-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="kid-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="kid-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-type">Account Type</Label>
                    <select
                      id="user-type"
                      className="flex h-10 w-full rounded-xl border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="student">Student</option>
                      <option value="parent">Parent</option>
                      <option value="teacher">Teacher</option>
                    </select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full kid-button" variant="kid-secondary" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

