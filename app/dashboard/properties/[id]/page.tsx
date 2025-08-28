import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, getPropertyById } from "@/lib/demo-data"
import { PropertyTenants } from "@/components/properties/property-tenants"
import { PropertyPayments } from "@/components/properties/property-payments"
import { PropertyAmenities } from "@/components/properties/property-amenities"
import { PropertyStatusChanger } from "@/components/properties/property-status-changer"
import { ArrowLeft, Edit, FileText, Home, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = getPropertyById(params.id)

  if (!property) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <Button asChild>
          <Link href="/dashboard/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link
          href="/dashboard/properties"
          className="text-sm text-primary hover:underline inline-flex items-center mb-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Properties
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant={property.status === "Open" ? "secondary" : "default"} className="text-sm">
              {property.status}
            </Badge>
            <Button asChild variant="outline" size="sm">
              <Link href={`/dashboard/properties/${property.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Property
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-6">
            <Image
              src={property.images[0] || "/placeholder.svg?height=300&width=600"}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>

          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="tenants">Tenants</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
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
            </TabsContent>
            <TabsContent value="tenants">
              <PropertyTenants propertyId={property.id} />
            </TabsContent>
            <TabsContent value="payments">
              <PropertyPayments propertyId={property.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href={`/dashboard/payments/new?propertyId=${property.id}`}>Record Payment</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/tenants/new?propertyId=${property.id}`}>Add Tenant</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/dashboard/properties/${property.id}/lease`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Lease
                </Link>
              </Button>
              <PropertyStatusChanger property={property} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
