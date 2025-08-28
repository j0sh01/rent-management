import { PropertyList } from "../components/properties/property-list"
import { PropertySearch } from "../components/properties/property-search"
import { Button } from "../components/ui/button"
import { properties } from "../lib/demo-data"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

export default function Properties() {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Properties</h1>
          <p className="text-muted-foreground">Manage your rental properties</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/properties/new">
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
