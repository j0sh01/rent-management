"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, payments, tenants } from "@/lib/demo-data"
import { format } from "date-fns"
import { ArrowLeft, Download, Printer } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/lib/types"

interface PropertyReportProps {
  property: Property
}

export function PropertyReport({ property }: PropertyReportProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const propertyTenants = tenants.filter((tenant) => tenant.propertyId === property.id)
  const propertyPayments = payments.filter((payment) => payment.propertyId === property.id)

  const totalCollected = propertyPayments.reduce((sum, payment) => sum + payment.amount, 0)

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 500)
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Link href="/dashboard/reports" className="text-sm text-primary hover:underline inline-flex items-center">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Reports
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} disabled={isPrinting}>
            <Printer className="mr-2 h-4 w-4" />
            {isPrinting ? "Preparing..." : "Print Report"}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{property.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{property.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rooms</p>
                  <p className="font-medium">
                    {property.rooms} {property.rooms === 1 ? "Room" : "Rooms"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Rent</p>
                  <p className="font-medium">{formatCurrency(property.rentFee)}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    <Badge variant={property.status === "Open" ? "secondary" : "default"}>{property.status}</Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Collected</p>
                  <p className="font-medium">{formatCurrency(totalCollected)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tenants</p>
                  <p className="font-medium">{propertyTenants.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{format(property.createdAt, "MMMM d, yyyy")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
          </CardHeader>
          <CardContent>
            {propertyTenants.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No tenants assigned to this property</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Occupation</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyTenants.map((tenant) => (
                      <tr key={tenant.id} className="border-b">
                        <td className="px-4 py-3 text-sm font-medium">{tenant.name}</td>
                        <td className="px-4 py-3 text-sm">{tenant.contact}</td>
                        <td className="px-4 py-3 text-sm">{tenant.email}</td>
                        <td className="px-4 py-3 text-sm">{tenant.occupation}</td>
                        <td className="px-4 py-3 text-sm">{format(tenant.createdAt, "MMM d, yyyy")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {propertyPayments.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No payment records found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Tenant</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyPayments.map((payment) => {
                      const tenant = tenants.find((t) => t.id === payment.tenantId)
                      return (
                        <tr key={payment.id} className="border-b">
                          <td className="px-4 py-3 text-sm">{format(payment.date, "MMM d, yyyy")}</td>
                          <td className="px-4 py-3 text-sm font-medium">{tenant?.name || "Unknown"}</td>
                          <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-4 py-3 text-sm">{payment.mode}</td>
                          <td className="px-4 py-3 text-sm">{payment.period || "-"}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td className="px-4 py-3 text-sm font-bold">Total</td>
                      <td></td>
                      <td className="px-4 py-3 text-sm font-bold">{formatCurrency(totalCollected)}</td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
