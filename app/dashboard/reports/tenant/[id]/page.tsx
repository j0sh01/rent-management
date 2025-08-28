import { TenantReport } from "@/components/reports/tenant-report"
import { getTenantById } from "@/lib/demo-data"
import { notFound } from "next/navigation"

interface TenantReportPageProps {
  params: {
    id: string
  }
}

export default function TenantReportPage({ params }: TenantReportPageProps) {
  const tenant = getTenantById(params.id)

  if (!tenant) {
    notFound()
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Tenant Report: {tenant.name}</h1>
      <TenantReport tenant={tenant} />
    </div>
  )
}
