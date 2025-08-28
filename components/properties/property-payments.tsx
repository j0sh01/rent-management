import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { payments, formatCurrency, getTenantById } from "@/lib/demo-data"
import { format } from "date-fns"
import { CreditCard } from "lucide-react"
import Link from "next/link"

interface PropertyPaymentsProps {
  propertyId: string
}

export function PropertyPayments({ propertyId }: PropertyPaymentsProps) {
  const propertyPayments = payments.filter((payment) => payment.propertyId === propertyId)

  return (
    <Card>
      <CardContent className="p-0">
        {propertyPayments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center p-6">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No payments yet</h3>
            <p className="text-sm text-muted-foreground mb-4">There are no payment records for this property yet.</p>
            <Button asChild>
              <Link href={`/dashboard/payments/new?propertyId=${propertyId}`}>
                <CreditCard className="mr-2 h-4 w-4" />
                Record Payment
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">Tenant</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
                </tr>
              </thead>
              <tbody>
                {propertyPayments.map((payment) => {
                  const tenant = getTenantById(payment.tenantId)

                  return (
                    <tr key={payment.id} className="border-b">
                      <td className="px-4 py-3 text-sm font-medium">{tenant?.name || "Unknown"}</td>
                      <td className="px-4 py-3 text-sm">{format(payment.date, "MMM d, yyyy")}</td>
                      <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                      <td className="px-4 py-3 text-sm">{payment.mode}</td>
                      <td className="px-4 py-3 text-sm">{payment.period || "-"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
