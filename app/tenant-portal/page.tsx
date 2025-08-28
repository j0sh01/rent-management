import { redirect } from "next/navigation"

export default function TenantPortalPage() {
  redirect("/tenant-portal/login")
  return null
}
