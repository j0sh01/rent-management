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
import { ArrowLeft, CreditCard, Download, Calendar, Clock, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { getPaymentsByTenantId, getUpcomingPaymentByTenantId, formatCurrency } from "../../lib/demo-data"
import { format } from "date-fns"

export default function TenantPayments() {
  const tenantId = "1" // In a real app, this would come from auth context
  const payments = getPaymentsByTenantId(tenantId)
  const upcomingPayment = getUpcomingPaymentByTenantId(tenantId)

  const totalPaid = payments.filter((p) => p.status === "Completed").reduce((sum, payment) => sum + payment.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/tenant-portal/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
          <Link to="/tenant-portal/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">Payment History</h1>
        <p className="text-muted-foreground">View your payment history and upcoming payments</p>
      </div>

      <div className="grid gap-6">
        {/* Payment Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
              <p className="text-xs text-muted-foreground">
                {payments.filter((p) => p.status === "Completed").length} payments completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(pendingAmount)}</div>
              <p className="text-xs text-muted-foreground">
                {payments.filter((p) => p.status === "Pending").length} pending payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {upcomingPayment ? formatCurrency(upcomingPayment.amount) : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {upcomingPayment ? `Due ${format(upcomingPayment.dueDate, "MMM d, yyyy")}` : "No upcoming payments"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Payment */}
        {upcomingPayment && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Calendar className="h-5 w-5" />
                Upcoming Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-blue-900">{formatCurrency(upcomingPayment.amount)}</p>
                  <p className="text-sm text-blue-700">Due on {format(upcomingPayment.dueDate, "MMMM d, yyyy")}</p>
                  <p className="text-sm text-blue-600">Period: {upcomingPayment.period}</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Button>
                  <Button variant="outline">Set Reminder</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No payment history found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-full">
                        <CreditCard className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.period}</p>
                        <p className="text-sm text-muted-foreground">
                          Paid on {format(payment.date, "MMM d, yyyy")} via {payment.mode}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                      <Badge
                        variant={payment.status === "Completed" ? "default" : "secondary"}
                        className={payment.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Bank Transfer</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Bank: CRDB Bank</p>
                  <p>Account: 0150-123456789</p>
                  <p>Account Name: RentFlow Properties</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">M-Pesa</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Business Number: 123456</p>
                  <p>Account: Your Tenant ID</p>
                  <p>Reference: Property + Month</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Cash Payment</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Office: Masaki, Dar es Salaam</p>
                  <p>Hours: Mon-Fri, 8AM-6PM</p>
                  <p>Contact: +255 123 456 789</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
