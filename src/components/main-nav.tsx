import { Link } from "react-router-dom"
import { Building } from "lucide-react"

export function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
        <Building className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">RentFlow Pro</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link to="/dashboard" className="transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link to="/dashboard/properties" className="transition-colors hover:text-primary">
          Properties
        </Link>
        <Link to="/dashboard/tenants" className="transition-colors hover:text-primary">
          Tenants
        </Link>
        <Link to="/dashboard/payments" className="transition-colors hover:text-primary">
          Payments
        </Link>
        <Link to="/dashboard/reports" className="transition-colors hover:text-primary">
          Reports
        </Link>
      </nav>
    </div>
  )
}
