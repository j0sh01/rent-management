import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, CreditCard, UserPlus, FileText, Plus } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Plus className="mr-2 h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/dashboard/properties/new" className="flex flex-col items-start gap-1">
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Add Property</span>
              </div>
              <span className="text-xs text-muted-foreground">Register a new rental property</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/dashboard/tenants/new" className="flex flex-col items-start gap-1">
              <div className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Add Tenant</span>
              </div>
              <span className="text-xs text-muted-foreground">Register a new tenant</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/dashboard/payments/new" className="flex flex-col items-start gap-1">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Record Payment</span>
              </div>
              <span className="text-xs text-muted-foreground">Log a new rent payment</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto py-4 justify-start">
            <Link href="/dashboard/reports" className="flex flex-col items-start gap-1">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Generate Report</span>
              </div>
              <span className="text-xs text-muted-foreground">Create financial reports</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
