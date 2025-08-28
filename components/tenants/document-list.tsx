import type { Document } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { format } from "date-fns"

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-  {
  return (
    <Card>
      <CardContent className=\"p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Uploaded</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-sm text-muted-foreground">
                    No documents found
                  </td>
                </tr>
              ) : (
                documents.map((document) => (
                  <tr key={document.id} className="border-b">
                    <td className="px-4 py-3 text-sm font-medium">
                      {document.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {document.type}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {format(document.uploadedAt, 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={document.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </a>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
