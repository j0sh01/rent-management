import { PropertyList } from "@/components/properties/property-list"
import { PropertySearch } from "@/components/properties/property-search"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function PropertiesPage() {
  // This would normally fetch data from Firebase
  const properties = [
    {
      id: "1",
      name: "WING A",
      rooms: 3,
      rentFee: 500,
      status: "Rented" as const,
      images: ["/placeholder.svg?height=200&width=300"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "WING B",
      rooms: 2,
      rentFee: 400,
      status: "Open" as const,
      images: ["/placeholder.svg?height=200&width=300"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "WING C",
      rooms: 4,
      rentFee: 600,
      status: "Open" as const,
      images: ["/placeholder.svg?height=200&width=300"],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  return (
    <div className="container py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Button asChild>
          <Link href="/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>
      <PropertySearch />
      <PropertyList properties={properties} />
    </div>
  )
}
