import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RentCollectionChart } from "@/components/dashboard/rent-collection-chart"
import { PropertyOccupancyChart } from "@/components/dashboard/property-occupancy-chart"
import { PaymentList } from "@/components/payments/payment-list"
import { monthlyCollections, occupancyData, payments, properties, tenants } from "@/lib/demo-data"
import { BarChart3, Download, FileText, Printer } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Reports</h1>
          <p className="text-muted-foreground">Generate and view financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                  Financial Summary
                </CardTitle>
                <CardDescription>Rental income and occupancy overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <RentCollectionChart data={monthlyCollections} />
                  <PropertyOccupancyChart data={occupancyData} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Available Reports
                </CardTitle>
                <CardDescription>Generate detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Monthly Income Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Tenant Payment History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Property Occupancy Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Outstanding Payments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Annual Financial Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <PaymentList payments={payments} />
        </TabsContent>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Reports</CardTitle>
              <CardDescription>View detailed property performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <Button key={property.id} variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/dashboard/reports/property/${property.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      {property.name} Report
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenants">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Reports</CardTitle>
              <CardDescription>View detailed tenant payment history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenants.map((tenant) => (
                  <Button key={tenant.id} variant="outline" className="w-full justify-start" asChild>
                    <Link href={`/dashboard/reports/tenant/${tenant.id}`}>
                      <FileText className="mr-2 h-4 w-4" />
                      {tenant.name} Report
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
