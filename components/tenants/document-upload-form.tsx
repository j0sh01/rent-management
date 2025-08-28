"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

interface DocumentUploadFormProps {
  tenantId: string
}

export function DocumentUploadForm({ tenantId }: DocumentUploadFormProps) {
  const router = useRouter()
  const [documentName, setDocumentName] = useState("")
  const [documentType, setDocumentType] = useState<"ID" | "Lease" | "Other">("ID")
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would upload the file and save to a database
    console.log({
      tenantId,
      documentName,
      documentType,
      file,
    })

    // Redirect back to tenant details
    router.push(`/dashboard/tenants/${tenantId}`)
  }

  return (
    <>
      <Link
        href={`/dashboard/tenants/${tenantId}`}
        className="text-sm text-primary hover:underline inline-flex items-center mb-4"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Tenant
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="e.g. National ID Card"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select
                value={documentType}
                onValueChange={(value) => setDocumentType(value as "ID" | "Lease" | "Other")}
              >
                <SelectTrigger id="documentType">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ID">ID Document</SelectItem>
                  <SelectItem value="Lease">Lease Agreement</SelectItem>
                  <SelectItem value="Other">Other Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <div className="flex items-center gap-4">
                <Input id="file" type="file" onChange={handleFileChange} className="flex-1" required />
              </div>
              <p className="text-xs text-muted-foreground">Accepted file formats: PDF, JPG, PNG (max 5MB)</p>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
