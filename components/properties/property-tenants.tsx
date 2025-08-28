import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { tenants } from "@/lib/demo-data"
import { UserPlus } from "lucide-react"
import Link from "next/link"

interface PropertyTenantsProps {
  propertyId: string
}

export function PropertyTenants({ propertyId }: PropertyTenantsProps) {
  const propertyTenants = tenants.filter((tenant) => tenant.propertyId === propertyId)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card>
      <CardContent className="p-6">
        {propertyTenants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tenants yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This property doesn't have any tenants assigned to it yet.
            </p>
            <Button asChild>
              <Link href={`/dashboard/tenants/new?propertyId=${propertyId}`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Tenant
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {propertyTenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{getInitials(tenant.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{tenant.name}</h3>
                    <p className="text-sm text-muted-foreground">{tenant.contact}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/tenants/${tenant.id}`}>View</Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
