"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { properties } from "@/lib/demo-data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function TenantForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get("propertyId")

  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [occupation, setOccupation] = useState("")
  const [nextOfKin, setNextOfKin] = useState("")
  const [nextOfKinContact, setNextOfKinContact] = useState("")
  const [selectedProperty, setSelectedProperty] = useState(propertyId || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would save to a database
    console.log({
      id: `tenant-${Date.now()}`,
      name,
      contact,
      email,
      occupation,
      nextOfKin,
      nextOfKinContact,
      propertyId: selectedProperty,
      documents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Redirect back to tenants list
    router.push("/dashboard/tenants")
  }

  return (
    <>
      <Link href="/dashboard/tenants" className="text-sm text-primary hover:underline inline-flex items-center mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Tenants
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Add New Tenant</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Magufuli"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. +255 712 345 678"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Software Developer"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nextOfKin">Next of Kin</Label>
                <Input
                  id="nextOfKin"
                  value={nextOfKin}
                  onChange={(e) => setNextOfKin(e.target.value)}
                  placeholder="e.g. Janet Magufuli"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextOfKinContact">Next of Kin Contact</Label>
                <Input
                  id="nextOfKinContact"
                  value={nextOfKinContact}
                  onChange={(e) => setNextOfKinContact(e.target.value)}
                  placeholder="e.g. +255 765 432 109"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="property">Assign to Property</Label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger id="property">
                  <SelectValue placeholder="Select property (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {properties
                    .filter((p) => p.status === "Open")
                    .map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">Add Tenant</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
