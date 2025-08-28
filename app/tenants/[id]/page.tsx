import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentHistory } from "@/components/tenants/payment-history"
import { DocumentList } from "@/components/tenants/document-list"
import { Upload } from "lucide-react"
import Link from "next/link"

interface TenantPageProps {
  params: {
    id: string
  }
}

export default function TenantPage({ params }: TenantPageProps) {
  // This would normally fetch data from Firebase
  const tenant = {
    id: params.id,
    name: "Dadila Sedi",
    contact: "+255712345678",
    email: "dadila@example.com",
    nextOfKin: "Lucy Sedi",
    occupation: "Software Developer",
    documents: [
      {
        id: "1",
        name: "ID Card",
        url: "#",
        type: "ID" as const,
        uploadedAt: new Date(),
      },
      {
        id: "2",
        name: "Lease Agreement",
        url: "#",
        type: "Lease" as const,
        uploadedAt: new Date(),
      },
    ],
    propertyId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const property = {
    id: "1",
    name: "WING A",
    rentFee: 500,
  }

  const payments = [
    {
      id: "1",
      tenantId: tenant.id,
      propertyId: property.id,
      amount: 500,
      date: new Date(),
      mode: "M-Pesa" as const,
      reference: "MP12345",
      createdAt: new Date(),
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container py-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{tenant.name}</h1>
        <Link href="/tenants" className="text-sm text-muted-foreground hover:underline">
          ← Back to tenants
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">{getInitials(tenant.name)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{tenant.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{tenant.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next of Kin</p>
                  <p className="font-medium">{tenant.nextOfKin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Occupation</p>
                  <p className="font-medium">{tenant.occupation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Rental Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rented Property</p>
                  <p className="font-medium">{property.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Payment</p>
                  <p className="font-medium">${payments[0].amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">May 30, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="payments">
            <TabsList className="mb-4">
              <TabsTrigger value="payments">Payment History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="payments">
              <PaymentHistory payments={payments} />
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/payments/new?tenantId=${tenant.id}`}>Record Payment</Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <DocumentList documents={tenant.documents} />
              <div className="mt-4">
                <Button asChild>
                  <Link href={`/tenants/${tenant.id}/upload`}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
