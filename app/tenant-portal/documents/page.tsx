import { TenantDocuments } from "@/components/tenant-portal/tenant-documents"

export default function TenantDocumentsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">My Documents</h1>
      <TenantDocuments tenantId="tenant-001" />
    </div>
  )
}
