"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NewProperty() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/dashboard/properties")
    }, 1000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link to="/dashboard/properties" className="text-sm text-primary hover:underline inline-flex items-center mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Properties
        </Link>
        <h1 className="text-3xl font-bold">Add New Property</h1>
        <p className="text-muted-foreground">Create a new rental property listing</p>
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
                <Input id="name" placeholder="Enter property name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rooms" />
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
                <Input id="rent" type="number" placeholder="Enter rent amount" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter property description" rows={4} />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/properties">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Property"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
