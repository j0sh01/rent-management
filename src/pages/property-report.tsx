"use client"

import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { Link } from "react-router-dom"
import { getPropertyById } from "../lib/demo-data"

export default function PropertyReport() {
  const { id } = useParams<{ id: string }>()
  const property = id ? getPropertyById(id) : null

  if (!property) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
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
          <h1 className="text-3xl font-bold">Property Report: {property.name}</h1>
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
          <CardTitle>Property Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{property.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rooms</p>
              <p className="font-medium">{property.rooms}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Rent</p>
              <p className="font-medium">TZS {property.rentFee.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">{property.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
