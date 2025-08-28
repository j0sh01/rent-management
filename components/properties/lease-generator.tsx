"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency, tenants } from "@/lib/demo-data"
import { format, addMonths } from "date-fns"
import { ArrowLeft, CalendarIcon, FileText, Printer } from "lucide-react"
import Link from "next/link"
import type { Property, Tenant } from "@/lib/types"
import { cn } from "@/lib/utils"

interface LeaseGeneratorProps {
  property: Property
  tenant?: Tenant
}

export function LeaseGenerator({ property, tenant }: LeaseGeneratorProps) {
  const router = useRouter()

  const [selectedTenantId, setSelectedTenantId] = useState(tenant?.id || "")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addMonths(new Date(), 12))
  const [rentAmount, setRentAmount] = useState(property.rentFee.toString())
  const [depositAmount, setDepositAmount] = useState((property.rentFee * 2).toString())
  const [additionalTerms, setAdditionalTerms] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const availableTenants = tenants.filter((t) => !t.propertyId || t.propertyId === property.id)

  const handleGenerateLease = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate lease generation
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 1500)
  }

  return (
    <>
      <Link
        href={`/dashboard/properties/${property.id}`}
        className="text-sm text-primary hover:underline inline-flex items-center mb-4"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Property
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Generate Lease Agreement for {property.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {isGenerated ? (
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">LEASE AGREEMENT</h2>
                  <p className="text-muted-foreground">
                    This agreement is made on {format(new Date(), "MMMM d, yyyy")}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold">BETWEEN:</h3>
                    <p>RentFlow Pro Management (hereinafter referred to as "LANDLORD")</p>
                  </div>

                  <div>
                    <h3 className="font-semibold">AND:</h3>
                    <p>
                      {tenant?.name || tenants.find((t) => t.id === selectedTenantId)?.name} (hereinafter referred to as
                      "TENANT")
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold">PROPERTY:</h3>
                    <p>{property.name}</p>
                    <p>{property.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">LEASE TERM:</h3>
                      <p>Start Date: {format(startDate, "MMMM d, yyyy")}</p>
                      <p>End Date: {format(endDate, "MMMM d, yyyy")}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold">PAYMENT TERMS:</h3>
                      <p>Monthly Rent: {formatCurrency(Number.parseInt(rentAmount))}</p>
                      <p>Security Deposit: {formatCurrency(Number.parseInt(depositAmount))}</p>
                    </div>
                  </div>

                  {additionalTerms && (
                    <div>
                      <h3 className="font-semibold">ADDITIONAL TERMS:</h3>
                      <p>{additionalTerms}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <p className="font-semibold">LANDLORD SIGNATURE</p>
                    <div className="border-t border-dashed mt-8 pt-2">
                      <p>Date: ___________________</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">TENANT SIGNATURE</p>
                    <div className="border-t border-dashed mt-8 pt-2">
                      <p>Date: ___________________</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsGenerated(false)}>
                  Edit Lease
                </Button>
                <Button variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Lease
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerateLease} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tenant">Select Tenant</Label>
                <Select value={selectedTenantId} onValueChange={setSelectedTenantId} required>
                  <SelectTrigger id="tenant">
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTenants.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Lease Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(startDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={(date) => date && setStartDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Lease End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(endDate, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={(date) => date && setEndDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rentAmount">Monthly Rent (TZS)</Label>
                  <Input
                    id="rentAmount"
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formatCurrency(Number.parseInt(rentAmount))}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depositAmount">Security Deposit (TZS)</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{formatCurrency(Number.parseInt(depositAmount))}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalTerms">Additional Terms (Optional)</Label>
                <Textarea
                  id="additionalTerms"
                  value={additionalTerms}
                  onChange={(e) => setAdditionalTerms(e.target.value)}
                  placeholder="Enter any additional terms or conditions..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate Lease"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </>
  )
}
