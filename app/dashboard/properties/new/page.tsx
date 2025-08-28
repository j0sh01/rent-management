import { PropertyForm } from "@/components/properties/property-form"

export default function NewPropertyPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      <PropertyForm />
    </div>
  )
}
