"use client"

import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { getTenantById, getPropertyById } from "../lib/demo-data"

export default function TenantDetails() {
  const { id } = useParams<{ id: string }>()
  const tenant = id ? getTenantById(id) : null
  const property = tenant ? getPropertyById(tenant.propertyId) : null

  if (!tenant) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Tenant not found</h1>
        <Button asChild>
          <Link to="/dashboard/tenants">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tenants
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link to="/dashboard/tenants" className="text-sm text-primary hover:underline inline-flex items-center mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Tenants
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{tenant.name}</h1>
          <div className="flex items-center gap-2">
            <Badge variant={tenant.status === "Active" ? "default" : "secondary"}>{tenant.status}</Badge>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Tenant
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{tenant.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{tenant.contact}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent>
            {property && (
              <div className="space-y-2">
                <p className="font-medium">{property.name}</p>
                <p className="text-sm text-muted-foreground">{property.location}</p>
                <p className="text-sm">Rent: TZS {tenant.rentAmount.toLocaleString()}/month</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
