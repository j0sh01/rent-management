"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Home, MapPin, Calendar, Phone, Mail } from "lucide-react"

export default function TenantProperty() {
  // Mock tenant property data
  const property = {
    id: "1",
    name: "Sunset Apartments Unit 2B",
    location: "Masaki, Dar es Salaam",
    rooms: 3,
    rent: 800000,
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    landlord: {
      name: "John Smith",
      phone: "+255 123 456 789",
      email: "john@rentflow.com",
    },
    amenities: ["WiFi", "Parking", "Security", "Water", "Electricity"],
    description: "A beautiful 3-bedroom apartment with modern amenities and great city views.",
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">My Property</h1>
        <p className="text-muted-foreground">View your rental property details</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="mr-2 h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{property.name}</h3>
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Rooms</p>
                <p className="font-medium">{property.rooms} Bedrooms</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">TZS {property.rent.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-sm">{property.description}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Lease Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Lease Start</p>
                  <p className="font-medium">{new Date(property.leaseStart).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease End</p>
                  <p className="font-medium">{new Date(property.leaseEnd).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className="mt-1">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Landlord Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{property.landlord.name}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.landlord.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{property.landlord.email}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
