"use client"

import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { MainNav } from "../components/main-nav"
import { MobileNav } from "../components/mobile-nav"
import { ThemeToggle } from "../components/theme-toggle"
import { UserNav } from "../components/user-nav"
import { Loader2 } from "lucide-react"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      navigate("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    } catch (error) {
      navigate("/login")
      return
    }

    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            <MainNav />
            <MobileNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/30">
        <Outlet />
      </main>
    </div>
  )
}
