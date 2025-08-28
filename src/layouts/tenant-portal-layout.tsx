"use client"

import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { TenantPortalSidebar } from "../components/tenant-portal-sidebar"
import { ThemeToggle } from "../components/theme-toggle"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

export default function TenantPortalLayout() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [tenant, setTenant] = useState<any>(null)

  useEffect(() => {
    // Check if tenant is logged in
    const storedTenant = localStorage.getItem("tenant")
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
  }, [navigate])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <TenantPortalSidebar tenant={tenant} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/tenant-portal/dashboard">Tenant Portal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 bg-muted/30">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
