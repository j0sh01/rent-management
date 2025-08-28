"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  formatCurrency,
  getPaymentsByTenantId,
  getPropertyById,
  getTenantById,
  getUpcomingPaymentByTenantId,
} from "../../lib/demo-data"
import { format, differenceInDays } from "date-fns"
import { Building, CreditCard, FileText, Home } from "lucide-react"
import { Link } from "react-router-dom"

interface TenantDashboardProps {
  tenantId: string
}

export function TenantDashboard({ tenantId }: TenantDashboardProps) {
  const tenant = getTenantById(tenantId)

  if (!tenant) {
    return <div>Tenant not found</div>
  }

  const property = tenant.propertyId ? getPropertyById(tenant.propertyId) : null
  const payments = getPaymentsByTenantId(tenant.id)
  const upcomingPayment = getUpcomingPaymentByTenantId(tenant.id)

  const lastPayment = payments.length > 0 ? payments.sort((a, b) => b.date.getTime() - a.date.getTime())[0] : null

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Welcome, {tenant.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  Tenant
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Since {format(tenant.createdAt, "MMMM yyyy")}
                </Badge>
              </div>

              {property ? (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Your Property</h3>
                  </div>
                  <p className="font-semibold mb-1">{property.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Monthly Rent:</span>{" "}
                    <span className="font-medium">{formatCurrency(property.rentFee)}</span>
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-muted-foreground">No property assigned</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lastPayment && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Last Payment</h3>
                  </div>
                  <p className="font-semibold">{formatCurrency(lastPayment.amount)}</p>
                  <p className="text-sm text-muted-foreground">Paid on {format(lastPayment.date, "MMMM d, yyyy")}</p>
                  <p className="text-sm text-muted-foreground">For period: {lastPayment.period || "N/A"}</p>
                </div>
              )}

              {upcomingPayment && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Upcoming Payment</h3>
                    </div>
                    {differenceInDays(upcomingPayment.dueDate, new Date()) <= 3 ? (
                      <Badge variant="destructive">Due Soon</Badge>
                    ) : (
                      <Badge variant="outline">Upcoming</Badge>
                    )}
                  </div>
                  <p className="font-semibold">{formatCurrency(upcomingPayment.amount)}</p>
                  <p className="text-sm text-muted-foreground">
                    Due on {format(upcomingPayment.dueDate, "MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">For period: {upcomingPayment.period || "N/A"}</p>
                  <Button size="sm" className="w-full">
                    Make Payment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/tenant-portal/property">
                  <Home className="mr-2 h-4 w-4" />
                  View Property Details
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/tenant-portal/payments">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment History
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/tenant-portal/documents">
                  <FileText className="mr-2 h-4 w-4" />
                  View Documents
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No payment records found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-xs font-medium">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Mode</th>
                      <th className="px-4 py-2 text-left text-xs font-medium">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.slice(0, 3).map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="px-4 py-2 text-xs">{format(payment.date, "MMM d, yyyy")}</td>
                        <td className="px-4 py-2 text-xs font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-2 text-xs">{payment.mode}</td>
                        <td className="px-4 py-2 text-xs">{payment.period || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {payments.length > 3 && (
                  <div className="mt-2 text-right">
                    <Button variant="link" size="sm" asChild>
                      <Link to="/tenant-portal/payments">View all payments</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
