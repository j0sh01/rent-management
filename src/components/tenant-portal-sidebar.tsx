"use client"

import type * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { Building, LayoutDashboard, Home, CreditCard, FileText, LogOut, User, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Tenant navigation items
const tenantNavItems = [
  {
    title: "Dashboard",
    url: "/tenant-portal/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Property",
    url: "/tenant-portal/property",
    icon: Home,
  },
  {
    title: "Payments",
    url: "/tenant-portal/payments",
    icon: CreditCard,
  },
  {
    title: "Documents",
    url: "/tenant-portal/documents",
    icon: FileText,
  },
]

export function TenantPortalSidebar({ tenant, ...props }: React.ComponentProps<typeof Sidebar> & { tenant?: any }) {
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("tenant")
    window.location.href = "/tenant-portal/login"
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Building className="h-8 w-8 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-lg">RentFlow Pro</span>
            <span className="text-xs text-muted-foreground">Tenant Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Tenant Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Tenant Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {tenantNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{tenant?.name?.charAt(0) || tenant?.email?.charAt(0) || "T"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{tenant?.name || "Tenant"}</span>
                    <span className="text-xs text-muted-foreground">{tenant?.email || "tenant@example.com"}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
