import { PropertyReport } from "@/components/reports/property-report"
import { getPropertyById } from "@/lib/demo-data"
import { notFound } from "next/navigation"

interface PropertyReportPageProps {
  params: {
    id: string
  }
}

export default function PropertyReportPage({ params }: PropertyReportPageProps) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Property Report: {property.name}</h1>
      <PropertyReport property={property} />
    </div>
  )
}
