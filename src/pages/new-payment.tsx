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
import { tenants, properties } from "../lib/demo-data"

export default function NewPayment() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tenantId = searchParams.get("tenantId")
  const propertyId = searchParams.get("propertyId")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/dashboard/payments")
    }, 1000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link to="/dashboard/payments" className="text-sm text-primary hover:underline inline-flex items-center mb-2">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Payments
        </Link>
        <h1 className="text-3xl font-bold">Record Payment</h1>
        <p className="text-muted-foreground">Record a new rent payment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="tenant">Tenant</Label>
                <Select defaultValue={tenantId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="amount">Amount (TZS)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Payment Date</Label>
                <Input id="date" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mode">Payment Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input id="period" placeholder="e.g., January 2024" />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/payments">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Recording..." : "Record Payment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
