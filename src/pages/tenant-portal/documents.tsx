"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Upload, Eye } from "lucide-react"

export default function TenantDocuments() {
  // Mock documents data
  const documents = [
    {
      id: "1",
      name: "Lease Agreement",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-01",
      status: "Active",
      category: "Legal",
    },
    {
      id: "2",
      name: "Property Inspection Report",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2024-01-15",
      status: "Completed",
      category: "Inspection",
    },
    {
      id: "3",
      name: "Tenant ID Copy",
      type: "PDF",
      size: "0.5 MB",
      uploadDate: "2023-12-28",
      status: "Verified",
      category: "Identity",
    },
    {
      id: "4",
      name: "Payment Receipt - January",
      type: "PDF",
      size: "0.3 MB",
      uploadDate: "2024-01-05",
      status: "Processed",
      category: "Payment",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Completed":
        return "secondary"
      case "Verified":
        return "default"
      case "Processed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Documents</h1>
            <p className="text-muted-foreground">Manage your rental documents and files</p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{document.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {document.type} • {document.size} • {new Date(document.uploadDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {document.category}
                        </Badge>
                        <Badge variant={getStatusColor(document.status)} className="text-xs">
                          {document.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Documents</span>
                <span className="font-medium">{documents.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Legal Documents</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payment Receipts</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Other Documents</span>
                <span className="font-medium">2</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                View Lease Agreement
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download All Documents
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
