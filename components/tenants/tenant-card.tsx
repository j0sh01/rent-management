import type { Tenant } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getPropertyById } from "@/lib/demo-data"
import { Eye, Home, Mail, Phone } from "lucide-react"
import Link from "next/link"

interface TenantCardProps {
  tenant: Tenant
}

export function TenantCard({ tenant }: TenantCardProps) {
  const property = tenant.propertyId ? getPropertyById(tenant.propertyId) : null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarFallback className="text-xl">{getInitials(tenant.name)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{tenant.name}</h3>
          <p className="text-sm text-muted-foreground">{tenant.occupation}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{tenant.contact}</span>
          </div>
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{tenant.email}</span>
          </div>
          {property && (
            <div className="flex items-center text-sm">
              <Home className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{property.name}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/dashboard/tenants/${tenant.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
