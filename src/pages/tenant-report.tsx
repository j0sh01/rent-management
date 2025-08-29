"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Download,
  Printer as Print,
  User,
  Home,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { getTenantById, getPropertyById, getPaymentsByTenantId, formatCurrency } from "../lib/demo-data"

export default function TenantReport() {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <div>Tenant ID not provided</div>
  }

  const tenant = getTenantById(id)
  const property = tenant?.propertyId ? getPropertyById(tenant.propertyId) : null
  const payments = getPaymentsByTenantId(id)

  if (!tenant) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Tenant Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested tenant could not be found.</p>
            <Button asChild>
              <Link to="/dashboard/tenants">Back to Tenants</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalPaid = payments.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0)

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Download functionality would be implemented here")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard/tenants">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Tenant Report</h1>
            <p className="text-muted-foreground">Detailed report for {tenant.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Print className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Report Header - Print Visible */}
      <div className="hidden print:block mb-6">
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">RentFlow Pro</h1>
          <p className="text-sm text-muted-foreground">Tenant Report</p>
          <p className="text-xs text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Tenant Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Tenant Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg font-semibold">{tenant.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{tenant.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{tenant.contact}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <Badge variant={tenant.status === "Active" ? "secondary" : "outline"}>{tenant.status}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tenant Since</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p>{tenant.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Tenant ID</label>
                <p className="font-mono text-sm">{tenant.id}</p>
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
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Property Name</label>
                  <p className="text-lg font-semibold">{property.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p>{property.location}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rooms</label>
                  <p>
                    {property.rooms} {property.rooms === 1 ? "Room" : "Rooms"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
                  <p className="text-lg font-semibold text-primary">{formatCurrency(property.rentFee)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Property Status</label>
                  <div className="mt-1">
                    <Badge variant={property.status === "Rented" ? "secondary" : "outline"}>{property.status}</Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Property ID</label>
                  <p className="font-mono text-sm">{property.id}</p>
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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Total Payments</p>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(pendingAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No payment records found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((payment, index) => (
                <div key={payment.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{payment.period || "Payment"}</p>
                        <Badge variant={payment.status === "Completed" ? "secondary" : "destructive"}>
                          {payment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {payment.date.toLocaleDateString()} • {payment.mode}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                    </div>
                  </div>
                  {index < payments.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Footer - Print Visible */}
      <div className="hidden print:block mt-8 pt-4 border-t text-center text-xs text-muted-foreground">
        <p>This report was generated by RentFlow Pro on {new Date().toLocaleDateString()}</p>
        <p>© 2024 RentFlow Pro. All rights reserved.</p>
      </div>
    </div>
  )
}
