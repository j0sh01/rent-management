import { LeaseGenerator } from "@/components/properties/lease-generator"
import { getPropertyById, getTenantById } from "@/lib/demo-data"
import { notFound } from "next/navigation"

interface LeasePageProps {
  params: {
    id: string
  }
  searchParams: {
    tenantId?: string
  }
}

export default function LeasePage({ params, searchParams }: LeasePageProps) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  const tenant = searchParams.tenantId ? getTenantById(searchParams.tenantId) : undefined

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Generate Lease Agreement</h1>
      <LeaseGenerator property={property} tenant={tenant} />
    </div>
  )
}
