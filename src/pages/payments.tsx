import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"
import { payments, formatCurrency, getTenantById, getPropertyById } from "../lib/demo-data"
import { format } from "date-fns"

export default function Payments() {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Payments</h1>
          <p className="text-muted-foreground">Track and manage rent payments</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/payments/new">
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payments recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Tenant</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Property</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => {
                    const tenant = getTenantById(payment.tenantId)
                    const property = getPropertyById(payment.propertyId)

                    return (
                      <tr key={payment.id} className="border-b">
                        <td className="px-4 py-3 text-sm font-medium">{tenant?.name || "Unknown"}</td>
                        <td className="px-4 py-3 text-sm">{property?.name || "Unknown"}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                        <td className="px-4 py-3 text-sm">{format(payment.date, "MMM d, yyyy")}</td>
                        <td className="px-4 py-3 text-sm">{payment.mode}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
