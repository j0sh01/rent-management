import type { UpcomingPayment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency, getPropertyById, getTenantById } from "@/lib/demo-data"
import { format, differenceInDays } from "date-fns"
import { AlertCircle, Clock } from "lucide-react"
import Link from "next/link"

interface UpcomingPaymentsProps {
  payments: UpcomingPayment[]
}

export function UpcomingPayments({ payments }: UpcomingPaymentsProps) {
  const getDueBadge = (dueDate: Date) => {
    const daysUntilDue = differenceInDays(dueDate, new Date())

    if (daysUntilDue < 0) {
      return <Badge variant="destructive">Overdue</Badge>
    } else if (daysUntilDue <= 3) {
      return <Badge variant="secondary">Due Soon</Badge>
    } else {
      return <Badge variant="outline">Upcoming</Badge>
    }
  }

  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Upcoming Payments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No upcoming payments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => {
              const tenant = getTenantById(payment.tenantId)
              const property = getPropertyById(payment.propertyId)

              return (
                <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{tenant?.name}</p>
                      {getDueBadge(payment.dueDate)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {property?.name} • {payment.period}
                    </p>
                    <p className="text-sm font-semibold">{formatCurrency(payment.amount)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-right text-muted-foreground">
                      Due: {format(payment.dueDate, "MMM d, yyyy")}
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/dashboard/payments/new?tenantId=${payment.tenantId}`}>Record</Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
