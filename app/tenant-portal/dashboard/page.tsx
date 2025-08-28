import { TenantDashboard } from "@/components/tenant-portal/tenant-dashboard"

export default function TenantDashboardPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Tenant Dashboard</h1>
      <TenantDashboard tenantId="tenant-001" />
    </div>
  )
}
