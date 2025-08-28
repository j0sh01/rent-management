import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  formatCurrency,
  getPaymentsByTenantId,
  getPropertyById,
  getTenantById,
  getUpcomingPaymentByTenantId,
} from "@/lib/demo-data"
import { format, differenceInDays } from "date-fns"
import { AlertCircle, Download, FileText } from "lucide-react"

interface TenantPaymentsProps {
  tenantId: string
}

export function TenantPayments({ tenantId }: TenantPaymentsProps) {
  const tenant = getTenantById(tenantId)

  if (!tenant) {
    return <div>Tenant not found</div>
  }

  const property = tenant.propertyId ? getPropertyById(tenant.propertyId) : null
  const payments = getPaymentsByTenantId(tenant.id)
  const upcomingPayment = getUpcomingPaymentByTenantId(tenant.id)

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="grid gap-6">
      {upcomingPayment && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Upcoming Payment</span>
              {differenceInDays(upcomingPayment.dueDate, new Date()) <= 3 ? (
                <Badge variant="destructive">Due Soon</Badge>
              ) : (
                <Badge variant="outline">Upcoming</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Amount Due</p>
                <p className="text-2xl font-bold">{formatCurrency(upcomingPayment.amount)}</p>
                <p className="text-sm text-muted-foreground">For period: {upcomingPayment.period || "N/A"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="text-lg font-medium">{format(upcomingPayment.dueDate, "MMMM d, yyyy")}</p>
                <p className="text-sm text-muted-foreground">
                  {differenceInDays(upcomingPayment.dueDate, new Date())} days remaining
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full sm:w-auto">Make Payment</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No payment records</h3>
              <p className="text-sm text-muted-foreground">You don't have any payment records yet.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Reference</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Receipt</th>
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
                        <td className="px-4 py-3 text-sm">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Receipt</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td className="px-4 py-3 text-sm font-bold">Total</td>
                      <td className="px-4 py-3 text-sm font-bold">{formatCurrency(totalPaid)}</td>
                      <td colSpan={4}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Statement
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
