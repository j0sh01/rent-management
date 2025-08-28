import { TenantForm } from "@/components/tenants/tenant-form"

export default function NewTenantPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Add New Tenant</h1>
      <TenantForm />
    </div>
  )
}
