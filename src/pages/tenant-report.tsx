"use client"

import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { Link } from "react-router-dom"
import { getTenantById, getPropertyById } from "../lib/demo-data"

export default function TenantReport() {
  const { id } = useParams<{ id: string }>()
  const tenant = id ? getTenantById(id) : null
  const property = tenant ? getPropertyById(tenant.propertyId) : null

  if (!tenant) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Tenant not found</h1>
        <Button asChild>
          <Link to="/dashboard/reports">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link to="/dashboard/reports" className="text-sm text-primary hover:underline inline-flex items-center mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Reports
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Tenant Report: {tenant.name}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{tenant.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{tenant.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-medium">{tenant.contact}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{tenant.status}</p>
            </div>
            {property && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground">Property</p>
                  <p className="font-medium">{property.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Rent</p>
                  <p className="font-medium">TZS {tenant.rentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease Start</p>
                  <p className="font-medium">{tenant.leaseStart.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lease End</p>
                  <p className="font-medium">{tenant.leaseEnd.toLocaleDateString()}</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
