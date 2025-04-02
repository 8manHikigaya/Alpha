import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { BookOpen, Award, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="kid-container flex min-h-screen flex-col">
      <header className="kid-header">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
              Indian Alphabet Learning
            </span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/auth/login" className="kid-nav-item">
                Login
              </Link>
              <Link href="/help" className="kid-nav-item">
                Help
              </Link>
            </nav>
            <ThemeToggle />
            <Button asChild variant="kid">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
                  Learn Indian Alphabets
                </span>
                <br />
                <span className="text-foreground">the Fun Way!</span>
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                An interactive learning platform for children to learn Indian language alphabets through fun activities
                and games.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" variant="kid" className="text-lg">
                  <Link href="/auth/login">Start Learning</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link href="/help">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                  src="/tiger.png"
                  alt="Learning Illustration"
                  fill
                  className="object-contain animate-bounce-slow"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-accent/10">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-kid-secondary to-kid-blue bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-kid-primary/10 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-kid-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    Learn alphabets through interactive drawing exercises and audio pronunciation guides.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-kid-secondary/10 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-kid-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                  <p className="text-muted-foreground">
                    Track your child's learning progress with detailed analytics and achievements.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-kid-accent/10 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <Settings className="h-8 w-8 text-kid-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Parental Controls</h3>
                  <p className="text-muted-foreground">
                    Set screen time limits and monitor your child's learning activities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-kid-purple to-kid-blue bg-clip-text text-transparent">
                Supported Languages
              </span>
            </h2>
            <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Our platform currently supports the following Indian languages:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "Hindi", image: "/hindi.png" },
                { name: "Tamil", image: "/tamil.png" },
                { name: "Telugu", image: "/telegu.png" },
                { name: "Kannada", image: "/kanada.png" },
                { name: "Malayalam", image: "/malayalam.png" },
                { name: "Bengali", image: "/bengali.png" },
              ].map((language) => (
                <div key={language.name} className="flex flex-col items-center">
                  <div className="relative h-20 w-20 mb-2 rounded-xl overflow-hidden border-2 border-kid-accent/30">
                    <Image
                      src={language.image || "/placeholder.svg"}
                      alt={language.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">{language.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
              Indian Alphabet Learning
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              © 2023 Indian Alphabet Learning System. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
              Help
            </Link>
            <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

