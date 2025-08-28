import { PaymentList } from "@/components/payments/payment-list"
import { PaymentSearch } from "@/components/payments/payment-search"
import { Button } from "@/components/ui/button"
import { payments } from "@/lib/demo-data"
import { CreditCard } from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Payments</h1>
          <p className="text-muted-foreground">Manage your rental payments</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/payments/new">
            <CreditCard className="mr-2 h-4 w-4" />
            Record Payment
          </Link>
        </Button>
      </div>
      <PaymentSearch />
      <PaymentList payments={payments} />
    </div>
  )
}
