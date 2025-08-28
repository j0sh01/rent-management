import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getTenantById } from "@/lib/demo-data"
import { format } from "date-fns"
import { AlertCircle, Download, FileText, Upload } from "lucide-react"

interface TenantDocumentsProps {
  tenantId: string
}

export function TenantDocuments({ tenantId }: TenantDocumentsProps) {
  const tenant = getTenantById(tenantId)

  if (!tenant) {
    return <div>Tenant not found</div>
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {tenant.documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-sm text-muted-foreground mb-4">You don't have any documents uploaded yet.</p>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Uploaded</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tenant.documents.map((document) => (
                    <tr key={document.id} className="border-b">
                      <td className="px-4 py-3 text-sm font-medium">{document.name}</td>
                      <td className="px-4 py-3 text-sm">{document.type}</td>
                      <td className="px-4 py-3 text-sm">{format(document.uploadedAt, "MMM d, yyyy")}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={document.url} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </a>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Property Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Lease Agreement</td>
                  <td className="px-4 py-3 text-sm">Contract</td>
                  <td className="px-4 py-3 text-sm">{format(tenant.createdAt, "MMM d, yyyy")}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">Property Rules</td>
                  <td className="px-4 py-3 text-sm">Guidelines</td>
                  <td className="px-4 py-3 text-sm">{format(tenant.createdAt, "MMM d, yyyy")}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
