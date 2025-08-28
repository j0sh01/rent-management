"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { useNavigate } from "react-router-dom"
import type { Property } from "../../lib/types"

interface PropertyStatusChangerProps {
  property: Property
}

export function PropertyStatusChanger({ property }: PropertyStatusChangerProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"Open" | "Rented">(property.status)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // In a real app, this would update the database
    console.log({
      propertyId: property.id,
      newStatus: status,
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOpen(false)
      // In React Router, we need to manually refresh the page or update state
      // For simplicity, we'll just reload the current page
      window.location.reload()
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          Change Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Property Status</DialogTitle>
          <DialogDescription>Update the status of {property.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
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
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
