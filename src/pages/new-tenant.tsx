"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { properties } from "../lib/demo-data"

export default function NewTenant() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const propertyId = searchParams.get("propertyId")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/dashboard/tenants")
    }, 1000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link to="/dashboard/tenants" className="text-sm text-primary hover:underline inline-flex items-center mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Tenants
        </Link>
        <h1 className="text-3xl font-bold">Add New Tenant</h1>
        <p className="text-muted-foreground">Register a new tenant</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tenant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter tenant name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Phone Number</Label>
                <Input id="contact" placeholder="Enter phone number" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
                <Select defaultValue={propertyId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaseStart">Lease Start Date</Label>
                <Input id="leaseStart" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaseEnd">Lease End Date</Label>
                <Input id="leaseEnd" type="date" required />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/tenants">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Tenant"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
