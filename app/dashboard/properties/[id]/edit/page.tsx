import { PropertyForm } from "@/components/properties/property-form"
import { getPropertyById } from "@/lib/demo-data"
import { notFound } from "next/navigation"

interface EditPropertyPageProps {
  params: {
    id: string
  }
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>
      <PropertyForm property={property} />
    </div>
  )
}
