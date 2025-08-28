import type { Payment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, getPropertyById, getTenantById } from "@/lib/demo-data"
import { format } from "date-fns"
import { Eye, FileText } from "lucide-react"
import Link from "next/link"

interface PaymentListProps {
  payments: Payment[]
}

export function PaymentList({ payments }: PaymentListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium">Tenant</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Property</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
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
                    <td className="px-4 py-3 text-sm">{format(payment.date, "MMM d, yyyy")}</td>
                    <td className="px-4 py-3 text-sm font-medium">{formatCurrency(payment.amount)}</td>
                    <td className="px-4 py-3 text-sm">{payment.mode}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>{payment.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/dashboard/payments/${payment.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Receipt</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
