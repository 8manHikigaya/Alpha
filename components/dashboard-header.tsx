"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, HelpCircle, LogOut, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface UserType {
  name: string
  email: string
  userType: string
}

interface DashboardHeaderProps {
  user: UserType
  onLogout: () => void
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full kid-header">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-kid-primary to-kid-purple bg-clip-text text-transparent">
              Indian Alphabet Learning
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/dashboard" className="kid-nav-item">
            Dashboard
          </Link>
          <Link href="/select-language" className="kid-nav-item">
            Languages
          </Link>
          {user.userType === "parent" && (
            <Link href="/parent-controls" className="kid-nav-item">
              Parent Controls
            </Link>
          )}
          <Link href="/help" className="kid-nav-item">
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-r from-kid-primary to-kid-purple text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl border-2 border-kid-primary/20">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="rounded-lg cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-4">
            <Link href="/dashboard" className="flex w-full items-center py-2 text-sm font-medium kid-nav-item">
              Dashboard
            </Link>
            <Link href="/select-language" className="flex w-full items-center py-2 text-sm font-medium kid-nav-item">
              Languages
            </Link>
            {user.userType === "parent" && (
              <Link href="/parent-controls" className="flex w-full items-center py-2 text-sm font-medium kid-nav-item">
                Parent Controls
              </Link>
            )}
            <Link href="/help" className="flex w-full items-center py-2 text-sm font-medium kid-nav-item">
              Help
            </Link>
            <Button variant="ghost" className="w-full justify-start pl-0 kid-nav-item" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

