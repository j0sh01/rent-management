"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { TenantPortalNav } from "@/components/tenant-portal/tenant-portal-nav"
import { Loader2 } from "lucide-react"

export default function TenantPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [tenant, setTenant] = useState<any>(null)

  useEffect(() => {
    // Check if tenant is logged in
    const storedTenant = localStorage.getItem("tenantUser")
    if (!storedTenant) {
      router.push("/tenant-portal/login")
      return
    }

    try {
      const parsedTenant = JSON.parse(storedTenant)
      setTenant(parsedTenant)
    } catch (error) {
      router.push("/tenant-portal/login")
      return
    }

    setIsLoading(false)
  }, [router])

  // Don't apply layout to login page
  if (typeof window !== "undefined" && window.location.pathname.includes("/login")) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    )
  }

  if (isLoading) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex h-screen items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </ThemeProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <TenantPortalNav tenant={tenant} />
            <main className="flex-1 bg-muted/30 pt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
