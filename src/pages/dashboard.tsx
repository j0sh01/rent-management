import { DashboardSummary } from "../components/dashboard/dashboard-summary"
import { QuickActions } from "../components/dashboard/quick-actions"
import { RecentActivity } from "../components/dashboard/recent-activity"
import { UpcomingPayments } from "../components/dashboard/upcoming-payments"
import { RentCollectionChart } from "../components/dashboard/rent-collection-chart"
import { PropertyOccupancyChart } from "../components/dashboard/property-occupancy-chart"
import {
  activities,
  monthlyCollections,
  occupancyData,
  payments,
  properties,
  tenants,
  upcomingPayments,
} from "../lib/demo-data"

export default function Dashboard() {
  // Calculate dashboard summary data
  const dashboardData = {
    activeTenantsCount: tenants.length,
    totalCollected: payments.reduce((sum, payment) => sum + payment.amount, 0),
    openPropertiesCount: properties.filter((p) => p.status === "Open").length,
    recentActivity: activities,
    upcomingPayments: upcomingPayments,
    occupancyRate: Math.round((occupancyData.occupied / (occupancyData.occupied + occupancyData.vacant)) * 100),
  }

  return (
    <div className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your rental properties.</p>
      </div>

      <div className="grid gap-6">
        <DashboardSummary data={dashboardData} />

        <div className="grid gap-6 md:grid-cols-2">
          <UpcomingPayments payments={upcomingPayments} />
          <QuickActions />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RentCollectionChart data={monthlyCollections} />
          <PropertyOccupancyChart data={occupancyData} />
        </div>

        <RecentActivity activities={activities} />
      </div>
    </div>
  )
}
