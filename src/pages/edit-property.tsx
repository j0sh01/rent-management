"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { getPropertyById } from "../lib/demo-data"

export default function EditProperty() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      navigate(`/dashboard/properties/${id}`)
    }, 1000)
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
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">Update property information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input id="name" defaultValue={property.name} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue={property.location} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Select defaultValue={property.rooms.toString()}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Room</SelectItem>
                    <SelectItem value="2">2 Rooms</SelectItem>
                    <SelectItem value="3">3 Rooms</SelectItem>
                    <SelectItem value="4">4 Rooms</SelectItem>
                    <SelectItem value="5">5+ Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (TZS)</Label>
                <Input id="rent" type="number" defaultValue={property.rentFee} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" defaultValue={property.description} rows={4} />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to={`/dashboard/properties/${id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Property"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
