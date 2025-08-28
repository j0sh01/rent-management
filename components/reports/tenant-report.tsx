"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, getPaymentsByTenantId, getPropertyById } from "@/lib/demo-data"
import { format } from "date-fns"
import { ArrowLeft, Download, FileText, Printer } from "lucide-react"
import Link from "next/link"
import type { Tenant } from "@/lib/types"

interface TenantReportProps {
  tenant: Tenant
}

export function TenantReport({ tenant }: TenantReportProps) {
  const [isPrinting, setIsPrinting] = useState(false)
  const payments = getPaymentsByTenantId(tenant.id)
  const property = tenant.propertyId ? getPropertyById(tenant.propertyId) : null

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)

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

      <Tabs defaultValue="summary">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{tenant.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{tenant.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{tenant.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Occupation</p>
                      <p className="font-medium">{tenant.occupation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next of Kin</p>
                      <p className="font-medium">{tenant.nextOfKin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next of Kin Contact</p>
                      <p className="font-medium">{tenant.nextOfKinContact || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rental Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Property</p>
                    <p className="font-medium">{property?.name || "Not assigned"}</p>
                  </div>
                  {property && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Rent</p>
                        <p className="font-medium">{formatCurrency(property.rentFee)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{property.location}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Tenant Since</p>
                    <p className="font-medium">{format(tenant.createdAt, "MMMM d, yyyy")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Paid to Date</p>
                    <p className="font-medium">{formatCurrency(totalPaid)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {payments.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No payment records found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Reference</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="px-4 py-3 text-sm">{format(payment.date, "MMM d, yyyy")}</td>
                          <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                          <td className="px-4 py-3 text-sm">{payment.mode}</td>
                          <td className="px-4 py-3 text-sm">{payment.reference || "-"}</td>
                          <td className="px-4 py-3 text-sm">{payment.period || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t">
                        <td className="px-4 py-3 text-sm font-bold">Total</td>
                        <td className="px-4 py-3 text-sm font-bold">{formatCurrency(totalPaid)}</td>
                        <td colSpan={3}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {tenant.documents.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No documents found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Uploaded</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenant.documents.map((document) => (
                        <tr key={document.id} className="border-b">
                          <td className="px-4 py-3 text-sm font-medium">{document.name}</td>
                          <td className="px-4 py-3 text-sm">{document.type}</td>
                          <td className="px-4 py-3 text-sm">{format(document.uploadedAt, "MMM d, yyyy")}</td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="ghost" size="sm" asChild>
                              <a href={document.url} target="_blank" rel="noopener noreferrer">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </a>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
