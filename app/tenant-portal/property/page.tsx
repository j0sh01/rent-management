import { TenantProperty } from "@/components/tenant-portal/tenant-property"

export default function TenantPropertyPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">My Property</h1>
      <TenantProperty tenantId="tenant-001" />
    </div>
  )
}
