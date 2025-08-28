import { TenantPayments } from "@/components/tenant-portal/tenant-payments"

export default function TenantPaymentsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      <TenantPayments tenantId="tenant-001" />
    </div>
  )
}
