"use client"

import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { Link } from "react-router-dom"
import { getPropertyById } from "../lib/demo-data"

export default function GenerateLease() {
  const { id } = useParams<{ id: string }>()
  const property = id ? getPropertyById(id) : null

  if (!property) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <Button asChild>
          <Link to="/dashboard/properties">
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
          to={`/dashboard/properties/${id}`}
          className="text-sm text-primary hover:underline inline-flex items-center mb-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Property
        </Link>
        <h1 className="text-3xl font-bold">Generate Lease Agreement</h1>
        <p className="text-muted-foreground">Create a lease agreement for {property.name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Lease Agreement Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Lease Agreement Ready</h3>
            <p className="text-muted-foreground mb-6">Generate a professional lease agreement for {property.name}</p>
            <div className="flex justify-center gap-4">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
