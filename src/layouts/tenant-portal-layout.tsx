"use client"

import { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { TenantPortalNav } from "../components/tenant-portal/tenant-portal-nav"
import { Loader2 } from "lucide-react"

export default function TenantPortalLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [tenant, setTenant] = useState<any>(null)

  useEffect(() => {
    // Don't check auth for login page
    if (location.pathname.includes("/login")) {
      setIsLoading(false)
      return
    }

    // Check if tenant is logged in
    const storedTenant = localStorage.getItem("tenantUser")
    if (!storedTenant) {
      navigate("/tenant-portal/login")
      return
    }

    try {
      const parsedTenant = JSON.parse(storedTenant)
      setTenant(parsedTenant)
    } catch (error) {
      navigate("/tenant-portal/login")
      return
    }

    setIsLoading(false)
  }, [navigate, location])

  // Don't apply layout to login page
  if (location.pathname.includes("/login")) {
    return <Outlet />
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TenantPortalNav tenant={tenant} />
      <main className="flex-1 bg-muted/30 pt-16">
        <Outlet />
      </main>
    </div>
  )
}
