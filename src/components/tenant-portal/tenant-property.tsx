import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { formatCurrency, getPropertyById, getTenantById } from "../../lib/demo-data"
import { PropertyAmenities } from "../properties/property-amenities"
import { Home, MapPin } from "lucide-react"

interface TenantPropertyProps {
  tenantId: string
}

export function TenantProperty({ tenantId }: TenantPropertyProps) {
  const tenant = getTenantById(tenantId)

  if (!tenant) {
    return <div>Tenant not found</div>
  }

  if (!tenant.propertyId) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No property assigned to your account.</p>
        </CardContent>
      </Card>
    )
  }

  const property = getPropertyById(tenant.propertyId)

  if (!property) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Property information not found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
        <img
          src={property.images[0] || "/placeholder.png?height=300&width=600"}
          alt={property.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle>{property.name}</CardTitle>
                <Badge variant={property.status === "Open" ? "secondary" : "default"}>{property.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {property.description && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                  <p>{property.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Rooms</h3>
                  <p className="flex items-center">
                    <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                    {property.rooms} {property.rooms === 1 ? "Room" : "Rooms"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Rent</h3>
                  <p className="font-semibold">{formatCurrency(property.rentFee)}/month</p>
                </div>

                {property.location && (
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Location</h3>
                    <p className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      {property.location}
                    </p>
                  </div>
                )}
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Amenities</h3>
                  <PropertyAmenities amenities={property.amenities} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Landlord Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Property Manager</h3>
                <p className="font-medium">RentFlow Pro Management</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Contact Number</h3>
                <p className="font-medium">+255 712 345 678</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                <p className="font-medium">management@rentflow.com</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Office Hours</h3>
                <p className="text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-sm">Saturday: 9:00 AM - 12:00 PM</p>
                <p className="text-sm">Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
