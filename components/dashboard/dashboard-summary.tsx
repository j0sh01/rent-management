import type { DashboardSummary as DashboardSummaryType } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Users, DollarSign, PercentCircle } from "lucide-react"
import { formatCurrency } from "@/lib/demo-data"

interface DashboardSummaryProps {
  data: DashboardSummaryType
}

export function DashboardSummary({ data }: DashboardSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="stats-card stats-card-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Tenants</p>
              <h3 className="text-2xl font-bold mt-1">{data.activeTenantsCount}</h3>
            </div>
            <div className="rounded-full p-2 bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stats-card stats-card-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(data.totalCollected)}</h3>
            </div>
            <div className="rounded-full p-2 bg-secondary/10">
              <DollarSign className="h-5 w-5 text-secondary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stats-card stats-card-accent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Properties</p>
              <h3 className="text-2xl font-bold mt-1">{data.openPropertiesCount}</h3>
            </div>
            <div className="rounded-full p-2 bg-accent/10">
              <Home className="h-5 w-5 text-accent-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="stats-card stats-card-muted">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Occupancy Rate</p>
              <h3 className="text-2xl font-bold mt-1">{data.occupancyRate}%</h3>
            </div>
            <div className="rounded-full p-2 bg-muted">
              <PercentCircle className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
