"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function PropertySearch() {
  const [status, setStatus] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 1500000])
  const [rooms, setRooms] = useState<string>("all")

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search properties..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>Adjust filters to find the perfect property</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Price Range (TZS)</Label>
                  <div className="pt-4">
                    <Slider
                      defaultValue={[0, 1500000]}
                      max={2000000}
                      step={50000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {new Intl.NumberFormat("en-TZ", {
                        style: "currency",
                        currency: "TZS",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(priceRange[0])}
                    </span>
                    <span className="text-sm">
                      {new Intl.NumberFormat("en-TZ", {
                        style: "currency",
                        currency: "TZS",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(priceRange[1])}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rooms">Number of Rooms</Label>
                  <Select value={rooms} onValueChange={setRooms}>
                    <SelectTrigger id="rooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Parking", "Security", "Water Tank", "Backup Generator", "Swimming Pool", "Gym"].map(
                      (amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <input type="checkbox" id={amenity} className="rounded border-gray-300" />
                          <label htmlFor={amenity} className="text-sm">
                            {amenity}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
