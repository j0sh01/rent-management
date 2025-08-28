"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Building, Lock, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export default function TenantLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // For demo purposes, we'll use a simple check
    // In a real app, this would verify against a database
    setTimeout(() => {
      // Demo tenant login
      if (email === "tenant@example.com" && password === "tenant123") {
        // In a real app, you would set a cookie or token here
        localStorage.setItem(
          "tenantUser",
          JSON.stringify({
            id: "tenant-001",
            name: "Amina Hassan",
            email: "tenant@example.com",
          }),
        )
        navigate("/tenant-portal/dashboard")
      } else {
        setError("Invalid email or password")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Building className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold gradient-heading">RentFlow Pro</h1>
          <p className="text-muted-foreground">Tenant Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Login</CardTitle>
            <CardDescription>Enter your credentials to access your tenant portal</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tenant@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/tenant-portal/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            Demo credentials: <span className="font-medium">tenant@example.com</span> /{" "}
            <span className="font-medium">tenant123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
