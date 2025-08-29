"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
import { Link } from "react-router-dom"
import { getTenantById } from "../lib/demo-data"

export default function UploadDocument() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isUploading, setIsUploading] = useState(false)
  const tenant = id ? getTenantById(id) : null

  if (!tenant) {
    return (
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Tenant not found</h1>
        <Button asChild>
          <Link to="/dashboard/tenants">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tenants
          </Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      navigate(`/dashboard/tenants/${id}`)
    }, 2000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link
          to={`/dashboard/tenants/${id}`}
          className="text-sm text-primary hover:underline inline-flex items-center mb-2"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Tenant
        </Link>
        <h1 className="text-3xl font-bold">Upload Document</h1>
        <p className="text-muted-foreground">Upload documents for {tenant.name}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="document">Select Document</Label>
              <Input id="document" type="file" accept=".pdf,.doc,.docx,.jpg,.png" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter document description" />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link to={`/dashboard/tenants/${id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
