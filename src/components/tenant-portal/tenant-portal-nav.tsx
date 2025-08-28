"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ThemeToggle } from "../theme-toggle"
import { Building, CreditCard, FileText, Home, LogOut, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

interface TenantPortalNavProps {
  tenant: {
    id: string
    name: string
    email: string
  }
}

export function TenantPortalNav({ tenant }: TenantPortalNavProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("tenantUser")
    navigate("/tenant-portal/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/tenant-portal/dashboard" className="flex items-center">
            <Building className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold hidden md:inline-block">RentFlow Tenant Portal</span>
            <span className="font-bold md:hidden">Tenant Portal</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/tenant-portal/dashboard" className="transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/tenant-portal/property" className="transition-colors hover:text-primary">
            My Property
          </Link>
          <Link to="/tenant-portal/payments" className="transition-colors hover:text-primary">
            Payments
          </Link>
          <Link to="/tenant-portal/documents" className="transition-colors hover:text-primary">
            Documents
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(tenant.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{tenant.name}</p>
                    <p className="text-xs text-muted-foreground">{tenant.email}</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  <Link
                    to="/tenant-portal/dashboard"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/tenant-portal/property"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    <Building className="h-4 w-4" />
                    My Property
                  </Link>
                  <Link
                    to="/tenant-portal/payments"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Payments
                  </Link>
                  <Link
                    to="/tenant-portal/documents"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    Documents
                  </Link>
                </nav>

                <Button variant="outline" className="mt-auto" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">{getInitials(tenant.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{tenant.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{tenant.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/tenant-portal/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
