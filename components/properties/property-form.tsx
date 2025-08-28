"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { formatCurrency } from "@/lib/demo-data"
import type { Property } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PropertyFormProps {
  property?: Property
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const isEditing = !!property

  const [name, setName] = useState(property?.name || "")
  const [rooms, setRooms] = useState(property?.rooms?.toString() || "1")
  const [rentFee, setRentFee] = useState(property?.rentFee?.toString() || "")
  const [status, setStatus] = useState<"Open" | "Rented">(property?.status || "Open")
  const [location, setLocation] = useState(property?.location || "")
  const [description, setDescription] = useState(property?.description || "")
  const [amenities, setAmenities] = useState<string[]>(property?.amenities || [])

  const availableAmenities = [
    "Parking",
    "Security",
    "Water Tank",
    "Backup Generator",
    "Swimming Pool",
    "Gym",
    "WiFi",
    "TV",
    "AC",
    "Kitchen",
    "Balcony",
    "Garden",
    "Elevator",
    "Beach Access",
  ]

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities([...amenities, amenity])
    } else {
      setAmenities(amenities.filter((a) => a !== amenity))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would save to a database
    console.log({
      id: property?.id || `prop-${Date.now()}`,
      name,
      rooms: Number.parseInt(rooms),
      rentFee: Number.parseInt(rentFee),
      status,
      location,
      description,
      amenities,
      images: property?.images || ["/placeholder.svg?height=200&width=300"],
      createdAt: property?.createdAt || new Date(),
      updatedAt: new Date(),
    })

    // Redirect back to properties list
    router.push("/dashboard/properties")
  }

  return (
    <>
      <Link href="/dashboard/properties" className="text-sm text-primary hover:underline inline-flex items-center mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Properties
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Property" : "Add New Property"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Serengeti Apartments - Block A"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mikocheni, Dar es Salaam"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Select value={rooms} onValueChange={setRooms}>
                  <SelectTrigger id="rooms">
                    <SelectValue placeholder="Select rooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentFee">Monthly Rent (TZS)</Label>
                <Input
                  id="rentFee"
                  type="number"
                  value={rentFee}
                  onChange={(e) => setRentFee(e.target.value)}
                  placeholder="e.g. 450000"
                  required
                />
                {rentFee && <p className="text-xs text-muted-foreground">{formatCurrency(Number.parseInt(rentFee))}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as "Open" | "Rented")}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the property..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={amenities.includes(amenity)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked === true)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">{isEditing ? "Update Property" : "Add Property"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
