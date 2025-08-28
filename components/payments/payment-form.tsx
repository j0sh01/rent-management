"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { properties, tenants } from "@/lib/demo-data"

export function PaymentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tenantId = searchParams.get("tenantId")
  const propertyId = searchParams.get("propertyId")

  const [selectedTenant, setSelectedTenant] = useState(tenantId || "")
  const [selectedProperty, setSelectedProperty] = useState(propertyId || "")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [paymentMode, setPaymentMode] = useState("M-Pesa")
  const [reference, setReference] = useState("")
  const [period, setPeriod] = useState(format(new Date(), "MMMM yyyy"))

  // Set property based on tenant selection
  const handleTenantChange = (value: string) => {
    setSelectedTenant(value)
    const tenant = tenants.find((t) => t.id === value)
    if (tenant && tenant.propertyId) {
      setSelectedProperty(tenant.propertyId)
    }
  }

  // Set tenant based on property selection
  const handlePropertyChange = (value: string) => {
    setSelectedProperty(value)
    // If there's only one tenant for this property, select them automatically
    const propertyTenants = tenants.filter((t) => t.propertyId === value)
    if (propertyTenants.length === 1) {
      setSelectedTenant(propertyTenants[0].id)
    }
  }

  // Initialize tenant and property if provided in URL
  useState(() => {
    if (tenantId) {
      handleTenantChange(tenantId)
    } else if (propertyId) {
      handlePropertyChange(propertyId)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would normally save to Firebase
    console.log({
      tenantId: selectedTenant,
      propertyId: selectedProperty,
      amount: Number.parseFloat(amount),
      date,
      mode: paymentMode,
      reference,
      period,
    })

    // Redirect to payments list
    router.push("/dashboard/payments")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tenant">Tenant</Label>
              <Select value={selectedTenant} onValueChange={handleTenantChange} required>
                <SelectTrigger id="tenant">
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
              <Select value={selectedProperty} onValueChange={handlePropertyChange} required>
                <SelectTrigger id="property">
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (TZS)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="mode">Payment Mode</Label>
              <Select value={paymentMode} onValueChange={setPaymentMode} required>
                <SelectTrigger id="mode">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M-Pesa">M-Pesa</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference (Optional)</Label>
              <Input
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Transaction ID or reference"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Payment Period</Label>
              <Input
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. April 2024"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Submit Payment</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
