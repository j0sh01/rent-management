import type { Payment } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"

interface PaymentHistoryProps {
  payments: Payment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Reference</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-sm text-muted-foreground">
                    No payment history found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{format(payment.date, "MMM d, yyyy")}</td>
                    <td className="px-4 py-3 text-sm font-medium">${payment.amount}</td>
                    <td className="px-4 py-3 text-sm">{payment.mode}</td>
                    <td className="px-4 py-3 text-sm">{payment.reference || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
