"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, Phone, Mail, MapPin, Bed, Bath, Square, Calendar, DollarSign } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { getPropertyById, getTenantById, formatCurrency } from "../../lib/demo-data"

export default function TenantProperty() {
  const { id } = useParams()
  const tenantId = "1" // In a real app, this would come from auth context
  const tenant = getTenantById(tenantId)
  const property = tenant?.propertyId ? getPropertyById(tenant.propertyId) : null

  if (!tenant || !property) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-4">No property is assigned to your account.</p>
          <Button asChild>
            <Link to="/tenant-portal/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/tenant-portal/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Property</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
          <Link to="/tenant-portal/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">My Property</h1>
        <p className="text-muted-foreground">Details about your rental property</p>
      </div>

      <div className="grid gap-6">
        {/* Property Images */}
        <Card>
          <CardHeader>
            <CardTitle>Property Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.images.map((image, index) => (
                <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${property.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{property.name}</h3>
                <p className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.rooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">2 Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">120 sqm</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{formatCurrency(property.rentFee)}/month</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{property.description || "No description available."}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <Badge key={index} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lease Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Lease Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Lease Start</p>
                    <p className="font-medium">Jan 1, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lease End</p>
                    <p className="font-medium">Dec 31, 2024</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="font-medium">{formatCurrency(property.rentFee)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Security Deposit</p>
                    <p className="font-medium">{formatCurrency(property.rentFee * 2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Status</p>
                  <Badge variant="default" className="mt-1">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Landlord Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Landlord Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">RentFlow Property Management</p>
                  <p className="text-sm text-muted-foreground">Property Manager</p>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="tel:+255123456789">
                      <Phone className="mr-2 h-4 w-4" />
                      +255 123 456 789
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                    <a href="mailto:manager@rentflow.com">
                      <Mail className="mr-2 h-4 w-4" />
                      manager@rentflow.com
                    </a>
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Office Hours: Monday - Friday, 8:00 AM - 6:00 PM</p>
                  <p>Emergency Contact: +255 987 654 321</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
