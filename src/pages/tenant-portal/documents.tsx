"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, Upload, FileText, Download, Eye, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

interface Document {
  id: string
  name: string
  type: string
  category: "lease" | "id" | "income" | "other"
  status: "approved" | "pending" | "rejected"
  uploadDate: Date
  size: string
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Lease Agreement 2024.pdf",
    type: "PDF",
    category: "lease",
    status: "approved",
    uploadDate: new Date("2024-01-01"),
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "National ID Copy.pdf",
    type: "PDF",
    category: "id",
    status: "approved",
    uploadDate: new Date("2024-01-01"),
    size: "1.2 MB",
  },
  {
    id: "3",
    name: "Employment Letter.pdf",
    type: "PDF",
    category: "income",
    status: "pending",
    uploadDate: new Date("2024-02-15"),
    size: "856 KB",
  },
]

export default function TenantDocuments() {
  const [documents] = useState<Document[]>(mockDocuments)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState<string>("")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile && category) {
      // In a real app, this would upload the file
      console.log("Uploading file:", selectedFile.name, "Category:", category)
      setSelectedFile(null)
      setCategory("")
    }
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/tenant-portal/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Documents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
          <Link to="/tenant-portal/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-2">My Documents</h1>
        <p className="text-muted-foreground">Upload and manage your rental documents</p>
      </div>

      <div className="grid gap-6">
        {/* Document Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {documents.filter((d) => d.status === "approved").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {documents.filter((d) => d.status === "pending").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {documents.filter((d) => d.status === "rejected").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Document */}
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
                <Label htmlFor="file">Select File</Label>
                <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Document Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lease">Lease Agreement</SelectItem>
                    <SelectItem value="id">Identification</SelectItem>
                    <SelectItem value="income">Income Proof</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleUpload} disabled={!selectedFile || !category} className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </CardContent>
        </Card>

        {/* Document List */}
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No documents uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-full">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{document.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Uploaded {document.uploadDate.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{document.size}</span>
                          <span>•</span>
                          <span className="capitalize">{document.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(document.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(document.status)}
                          {document.status}
                        </span>
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Document Categories Info */}
        <Card>
          <CardHeader>
            <CardTitle>Document Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Required Documents</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lease Agreement (signed copy)</li>
                  <li>• National ID or Passport</li>
                  <li>• Proof of Income (employment letter/payslip)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Optional Documents</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Bank Statements</li>
                  <li>• References</li>
                  <li>• Insurance Documents</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
