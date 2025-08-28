"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export function TenantSearch() {
  const [propertyFilter, setPropertyFilter] = useState<string>("all")

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tenants..." className="pl-9" />
      </div>
      <Select value={propertyFilter} onValueChange={setPropertyFilter}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by property" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Properties</SelectItem>
          <SelectItem value="prop-001">Serengeti Apartments</SelectItem>
          <SelectItem value="prop-002">Kilimanjaro Heights</SelectItem>
          <SelectItem value="prop-004">Mwenge Apartments</SelectItem>
          <SelectItem value="prop-006">Msasani Peninsula</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
