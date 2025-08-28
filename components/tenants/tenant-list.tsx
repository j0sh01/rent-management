import type { Tenant } from "@/lib/types"
import { TenantCard } from "./tenant-card"

interface TenantListProps {
  tenants: Tenant[]
}

export function TenantList({ tenants }: TenantListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tenants.map((tenant) => (
        <TenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  )
}
