import { DocumentUploadForm } from "@/components/tenants/document-upload-form"
import { getTenantById } from "@/lib/demo-data"
import { notFound } from "next/navigation"

interface UploadDocumentPageProps {
  params: {
    id: string
  }
}

export default function UploadDocumentPage({ params }: UploadDocumentPageProps) {
  const tenant = getTenantById(params.id)

  if (!tenant) {
    notFound()
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Upload Document for {tenant.name}</h1>
      <DocumentUploadForm tenantId={tenant.id} />
    </div>
  )
}
