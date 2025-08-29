import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users } from "lucide-react"

export default function Reports() {
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate detailed reports and insights</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Financial Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive financial overview including rent collection, expenses, and profit analysis.
            </p>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Tenant Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed tenant information, lease status, and payment history.
            </p>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Occupancy Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Property occupancy rates, vacancy analysis, and rental trends.
            </p>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
