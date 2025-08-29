"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, Download } from "lucide-react"

export default function TenantPayments() {
  // Mock payment data
  const payments = [
    {
      id: "1",
      amount: 800000,
      date: "2024-01-01",
      period: "January 2024",
      status: "Paid",
      method: "Bank Transfer",
      reference: "TXN123456",
    },
    {
      id: "2",
      amount: 800000,
      date: "2024-02-01",
      period: "February 2024",
      status: "Paid",
      method: "Mobile Money",
      reference: "TXN123457",
    },
    {
      id: "3",
      amount: 800000,
      date: "2024-03-01",
      period: "March 2024",
      status: "Pending",
      method: "Bank Transfer",
      reference: "TXN123458",
    },
  ]

  const nextPayment = {
    amount: 800000,
    dueDate: "2024-04-01",
    period: "April 2024",
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Payments</h1>
        <p className="text-muted-foreground">View your payment history and upcoming payments</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.period}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString()} • {payment.method}
                      </p>
                      <p className="text-xs text-muted-foreground">Ref: {payment.reference}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">TZS {payment.amount.toLocaleString()}</p>
                    <Badge variant={payment.status === "Paid" ? "default" : "secondary"}>{payment.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Next Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Amount Due</p>
                <p className="text-2xl font-bold">TZS {nextPayment.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">{new Date(nextPayment.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Period</p>
                <p className="font-medium">{nextPayment.period}</p>
              </div>
              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Paid (2024)</span>
                <span className="font-medium">TZS 1,600,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payments Made</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Outstanding</span>
                <span className="font-medium">TZS 800,000</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Statement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
