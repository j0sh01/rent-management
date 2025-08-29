"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Building2, MapPin, Phone, Mail, Calendar, User } from "lucide-react"
import { Link } from "react-router-dom"

export default function TenantProperty() {
  // Mock tenant data - in real app, this would come from authentication
  const tenantId = "1"

  // Mock property data - in real app, this would be fetched based on tenant
  const property = {
    id: "1",
    name: "Sunset Apartments - Unit 2B",
    address: "123 Sunset Boulevard, Dar es Salaam",
    description: "A beautiful 2-bedroom apartment with modern amenities and stunning city views.",
    bedrooms: 2,
    bathrooms: 2,
    area: "850 sq ft",
    rentAmount: 800000,
    amenities: ["Parking", "Security", "Water Tank", "Backup Generator", "WiFi", "AC"],
    images: ["/cozy-suburban-house.png", "/modern-city-apartment.png"],
    landlord: {
      name: "John Smith",
      phone: "+255 123 456 789",
      email: "john.smith@example.com",
    },
    lease: {
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      monthlyRent: 800000,
      deposit: 1600000,
      status: "Active",
    },
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Property</h1>
          <p className="text-muted-foreground">View your rental property details</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/tenant-portal/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Property Images */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Property Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {property.images.map((image, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Property view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{property.name}</CardTitle>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{property.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Bedrooms:</span>
                  <p>{property.bedrooms}</p>
                </div>
                <div>
                  <span className="font-medium">Bathrooms:</span>
                  <p>{property.bathrooms}</p>
                </div>
                <div>
                  <span className="font-medium">Area:</span>
                  <p>{property.area}</p>
                </div>
                <div>
                  <span className="font-medium">Monthly Rent:</span>
                  <p className="font-semibold text-primary">{formatCurrency(property.rentAmount)}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lease Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lease Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="secondary">{property.lease.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span className="text-sm font-medium">{new Date(property.lease.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">End Date:</span>
                <span className="text-sm font-medium">{new Date(property.lease.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Monthly Rent:</span>
                <span className="text-sm font-medium">{formatCurrency(property.lease.monthlyRent)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Security Deposit:</span>
                <span className="text-sm font-medium">{formatCurrency(property.lease.deposit)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Landlord Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Landlord Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{property.landlord.name}</p>
                <p className="text-sm text-muted-foreground">Property Owner</p>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href={`tel:${property.landlord.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {property.landlord.phone}
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href={`mailto:${property.landlord.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    {property.landlord.email}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
