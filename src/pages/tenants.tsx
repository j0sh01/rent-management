import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, Phone } from "lucide-react"
import { Link } from "react-router-dom"
import { tenants, getPropertyById } from "../lib/demo-data"

export default function Tenants() {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tenants</h1>
          <p className="text-muted-foreground">Manage your tenants and their information</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/tenants/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Tenant
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tenants.map((tenant) => {
          const property = getPropertyById(tenant.propertyId)

          return (
            <Card key={tenant.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tenant.name}</CardTitle>
                  <Badge variant={tenant.status === "Active" ? "default" : "secondary"}>{tenant.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{tenant.contact}</span>
                  </div>
                </div>

                {property && (
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium">{property.name}</p>
                    <p className="text-xs text-muted-foreground">{property.location}</p>
                    <p className="text-sm">Rent: TZS {tenant.rentAmount.toLocaleString()}/month</p>
                  </div>
                )}

                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link to={`/dashboard/tenants/${tenant.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {tenants.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-medium mb-2">No tenants yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first tenant</p>
            <Button asChild>
              <Link to="/dashboard/tenants/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
