"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Upload, Eye, Calendar, File } from "lucide-react"
import { Link } from "react-router-dom"

export default function TenantDocuments() {
  // Mock documents data - in real app, this would be fetched from API
  const documents = [
    {
      id: "1",
      name: "Lease Agreement",
      type: "PDF",
      category: "Legal",
      uploadDate: "2024-01-01",
      size: "2.5 MB",
      status: "Active",
      description: "Main lease agreement document",
    },
    {
      id: "2",
      name: "Property Inspection Report",
      type: "PDF",
      category: "Inspection",
      uploadDate: "2024-01-05",
      size: "1.8 MB",
      status: "Completed",
      description: "Initial property condition report",
    },
    {
      id: "3",
      name: "Tenant ID Copy",
      type: "PDF",
      category: "Identity",
      uploadDate: "2024-01-01",
      size: "0.5 MB",
      status: "Verified",
      description: "Copy of tenant identification",
    },
    {
      id: "4",
      name: "Payment Receipt - January",
      type: "PDF",
      category: "Payment",
      uploadDate: "2024-01-15",
      size: "0.3 MB",
      status: "Processed",
      description: "January 2024 rent payment receipt",
    },
    {
      id: "5",
      name: "Payment Receipt - February",
      type: "PDF",
      category: "Payment",
      uploadDate: "2024-02-15",
      size: "0.3 MB",
      status: "Processed",
      description: "February 2024 rent payment receipt",
    },
    {
      id: "6",
      name: "Maintenance Request Form",
      type: "PDF",
      category: "Maintenance",
      uploadDate: "2024-03-10",
      size: "0.8 MB",
      status: "Pending",
      description: "Kitchen faucet repair request",
    },
  ]

  const documentSummary = {
    total: documents.length,
    active: documents.filter((d) => d.status === "Active" || d.status === "Verified").length,
    pending: documents.filter((d) => d.status === "Pending").length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="secondary">Active</Badge>
      case "Verified":
        return <Badge variant="secondary">Verified</Badge>
      case "Completed":
        return <Badge variant="outline">Completed</Badge>
      case "Processed":
        return <Badge variant="outline">Processed</Badge>
      case "Pending":
        return <Badge variant="destructive">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Legal":
        return "text-blue-600"
      case "Payment":
        return "text-green-600"
      case "Maintenance":
        return "text-orange-600"
      case "Identity":
        return "text-purple-600"
      case "Inspection":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>
          <p className="text-muted-foreground">Manage your rental documents and files</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/tenant-portal/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      {/* Document Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentSummary.total}</div>
            <p className="text-xs text-muted-foreground">All uploaded documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Documents</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentSummary.active}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentSummary.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload New Document */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input id="document-name" placeholder="Enter document name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="document-category">Category</Label>
              <select id="document-category" className="w-full p-2 border rounded-md">
                <option value="">Select category</option>
                <option value="Legal">Legal</option>
                <option value="Payment">Payment</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Identity">Identity</option>
                <option value="Inspection">Inspection</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="document-file">Choose File</Label>
              <Input id="document-file" type="file" accept=".pdf,.doc,.docx,.jpg,.png" />
            </div>
            <div className="md:col-span-2">
              <Button className="w-full md:w-auto">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((document, index) => (
              <div key={document.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{document.name}</h4>
                        {getStatusBadge(document.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className={getCategoryColor(document.category)}>{document.category}</span>
                        <span>{document.type}</span>
                        <span>{document.size}</span>
                        <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                {index < documents.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-blue-600">Legal Documents</h4>
              <p className="text-sm text-muted-foreground">Lease agreements, contracts, and legal papers</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-green-600">Payment Records</h4>
              <p className="text-sm text-muted-foreground">Receipts, payment confirmations, and financial records</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-orange-600">Maintenance</h4>
              <p className="text-sm text-muted-foreground">Repair requests, maintenance reports, and work orders</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-purple-600">Identity</h4>
              <p className="text-sm text-muted-foreground">ID copies, passport, and identification documents</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-red-600">Inspection</h4>
              <p className="text-sm text-muted-foreground">Property condition reports and inspection documents</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2 text-gray-600">Other</h4>
              <p className="text-sm text-muted-foreground">Miscellaneous documents and files</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
