import type { Property } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Eye, Edit, MapPin, Bed } from "lucide-react"
import { formatCurrency } from "@/lib/demo-data"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={property.images[0] || "/placeholder.svg?height=200&width=300"}
            alt={property.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={property.status === "Open" ? "secondary" : "default"}>{property.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{property.name}</h3>
        {property.location && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{property.location}</span>
          </div>
        )}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center text-sm">
            <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>
              {property.rooms} {property.rooms === 1 ? "Room" : "Rooms"}
            </span>
          </div>
          <div className="text-sm font-medium">{formatCurrency(property.rentFee)}/mo</div>
        </div>
        {property.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{property.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0 gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link href={`/dashboard/properties/${property.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link href={`/dashboard/properties/${property.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
