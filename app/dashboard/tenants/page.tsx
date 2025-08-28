import { TenantList } from "@/components/tenants/tenant-list"
import { TenantSearch } from "@/components/tenants/tenant-search"
import { Button } from "@/components/ui/button"
import { tenants } from "@/lib/demo-data"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function TenantsPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tenants</h1>
          <p className="text-muted-foreground">Manage your property tenants</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tenants/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Tenant
          </Link>
        </Button>
      </div>
      <TenantSearch />
      <TenantList tenants={tenants} />
    </div>
  )
}
