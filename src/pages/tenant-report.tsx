"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, Download, Printer as Print, User, Home, CreditCard, Calendar } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { getTenantById, getPropertyById, getPaymentsByTenantId, formatCurrency } from "../lib/demo-data"
import { format } from "date-fns"

export default function TenantReport() {
  const { id } = useParams()
  const tenant = id ? getTenantById(id) : null
  const property = tenant?.propertyId ? getPropertyById(tenant.propertyId) : null
  const payments = tenant ? getPaymentsByTenantId(tenant.id) : []

  if (!tenant) {
    return (
      <div className="container py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tenant Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested tenant could not be found.</p>
          <Button asChild>
            <Link to="/dashboard/tenants">Back to Tenants</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalPaid = payments.filter((p) => p.status === "Completed").reduce((sum, payment) => sum + payment.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, payment) => sum + payment.amount, 0)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading tenant report for:", tenant.name)
  }

  return (
    <div className="container py-6">
      <div className="mb-6 print:hidden">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard/reports">Reports</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tenant Report</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6 print:hidden">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" asChild className="mb-4 bg-transparent">
              <Link to="/dashboard/reports">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Reports
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">Tenant Report</h1>
            <p className="text-muted-foreground">Detailed report for {tenant.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Print Header */}
      <div className="hidden print:block mb-8">
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">RentFlow Pro</h1>
          <p className="text-muted-foreground">Tenant Report</p>
          <p className="text-sm text-muted-foreground">Generated on {format(new Date(), "MMMM d, yyyy")}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Tenant Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Tenant Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg mb-2">{tenant.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2">{tenant.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="ml-2">{tenant.contact}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={tenant.status === "Active" ? "default" : "secondary"} className="ml-2">
                      {tenant.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Account Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tenant ID:</span>
                    <span className="ml-2">{tenant.id}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <span className="ml-2">{format(tenant.createdAt, "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Information */}
        {property && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <span className="ml-2">{property.location}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rooms:</span>
                      <span className="ml-2">{property.rooms}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Rent:</span>
                      <span className="ml-2 font-medium">{formatCurrency(property.rentFee)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
                <div className="text-sm text-green-700">Total Paid</div>
                <div className="text-xs text-muted-foreground">
                  {payments.filter((p) => p.status === "Completed").length} payments
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{formatCurrency(pendingAmount)}</div>
                <div className="text-sm text-orange-700">Pending Amount</div>
                <div className="text-xs text-muted-foreground">
                  {payments.filter((p) => p.status === "Pending").length} pending
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{payments.length}</div>
                <div className="text-sm text-blue-700">Total Transactions</div>
                <div className="text-xs text-muted-foreground">All time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No payment history found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Period</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Method</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-2">{format(payment.date, "MMM d, yyyy")}</td>
                        <td className="py-2">{payment.period}</td>
                        <td className="py-2 font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="py-2">{payment.mode}</td>
                        <td className="py-2">
                          <Badge
                            variant={payment.status === "Completed" ? "default" : "secondary"}
                            className={payment.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                          >
                            {payment.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report Footer */}
        <div className="text-center text-sm text-muted-foreground print:block">
          <p>Report generated on {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}</p>
          <p>RentFlow Pro - Property Management System</p>
        </div>
      </div>
    </div>
  )
}
