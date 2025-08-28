import Link from "next/link"
import { Building } from "lucide-react"

export function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
        <Building className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">RentFlow Pro</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/dashboard" className="transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link href="/dashboard/properties" className="transition-colors hover:text-primary">
          Properties
        </Link>
        <Link href="/dashboard/tenants" className="transition-colors hover:text-primary">
          Tenants
        </Link>
        <Link href="/dashboard/payments" className="transition-colors hover:text-primary">
          Payments
        </Link>
        <Link href="/dashboard/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
      </nav>
    </div>
  )
}
