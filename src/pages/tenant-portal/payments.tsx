"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, Calendar, DollarSign, Clock } from "lucide-react"
import { Link } from "react-router-dom"

export default function TenantPayments() {
  // Mock payment data - in real app, this would be fetched from API
  const payments = [
    {
      id: "1",
      date: "2024-01-15",
      amount: 800000,
      status: "Paid",
      method: "Bank Transfer",
      period: "January 2024",
      reference: "PAY001",
    },
    {
      id: "2",
      date: "2024-02-15",
      amount: 800000,
      status: "Paid",
      method: "M-Pesa",
      period: "February 2024",
      reference: "PAY002",
    },
    {
      id: "3",
      date: "2024-03-15",
      amount: 800000,
      status: "Paid",
      method: "Cash",
      period: "March 2024",
      reference: "PAY003",
    },
    {
      id: "4",
      date: "2024-04-15",
      amount: 800000,
      status: "Pending",
      method: "Bank Transfer",
      period: "April 2024",
      reference: "PAY004",
    },
  ]

  const nextPayment = {
    dueDate: "2024-05-15",
    amount: 800000,
    period: "May 2024",
  }

  const paymentSummary = {
    totalPaid: payments.filter((p) => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: payments.filter((p) => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0),
    paymentsCount: payments.filter((p) => p.status === "Paid").length,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge variant="secondary">Paid</Badge>
      case "Pending":
        return <Badge variant="destructive">Pending</Badge>
      case "Overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-muted-foreground">View your rent payments and upcoming dues</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/tenant-portal/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(paymentSummary.totalPaid)}</div>
            <p className="text-xs text-muted-foreground">{paymentSummary.paymentsCount} payments made</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(paymentSummary.pendingAmount)}</div>
            <p className="text-xs text-muted-foreground">Outstanding balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(nextPayment.amount)}</div>
            <p className="text-xs text-muted-foreground">Due {new Date(nextPayment.dueDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Next Payment Due */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">{nextPayment.period}</h3>
              <p className="text-sm text-muted-foreground">Due: {new Date(nextPayment.dueDate).toLocaleDateString()}</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(nextPayment.amount)}</p>
            </div>
            <div className="space-x-2">
              <Button>Make Payment</Button>
              <Button variant="outline">Set Reminder</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment History
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Statement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div key={payment.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{payment.period}</h4>
                      {getStatusBadge(payment.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()} • {payment.method}
                    </p>
                    <p className="text-xs text-muted-foreground">Reference: {payment.reference}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                    {payment.status === "Paid" && (
                      <Button variant="ghost" size="sm" className="mt-1">
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
                {index < payments.length - 1 && <Separator />}
              </div>
            ))}
          </div>
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
              <p className="text-sm text-muted-foreground mb-2">Transfer directly to landlord's account</p>
              <p className="text-xs">
                <strong>Account:</strong> 1234567890
                <br />
                <strong>Bank:</strong> CRDB Bank
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">M-Pesa</h4>
              <p className="text-sm text-muted-foreground mb-2">Pay using mobile money</p>
              <p className="text-xs">
                <strong>Number:</strong> +255 123 456 789
                <br />
                <strong>Name:</strong> John Smith
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Cash Payment</h4>
              <p className="text-sm text-muted-foreground mb-2">Pay in person to landlord</p>
              <p className="text-xs">
                Contact landlord to arrange
                <br />
                cash payment meeting
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
