export interface Property {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  type: "apartment" | "house" | "condo" | "townhouse" | "studio"
  bedrooms: number
  bathrooms: number
  squareFeet?: number
  rent: number
  deposit?: number
  description?: string
  amenities: string[]
  images: string[]
  status: "available" | "occupied" | "maintenance" | "unavailable"
  createdAt: string
  updatedAt: string
}

export interface Tenant {
  id: string
  name: string
  email: string
  phone?: string
  dateOfBirth?: string
  occupation?: string
  income?: number
  propertyId?: string
  leaseStart?: string
  leaseEnd?: string
  status: "active" | "inactive" | "pending" | "terminated"
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  amount: number
  dueDate: string
  paidDate?: string
  method: "cash" | "bank_transfer" | "credit_card" | "debit_card" | "mpesa" | "check"
  status: "pending" | "paid" | "overdue" | "partial" | "failed"
  description?: string
  transactionId?: string
  propertyId: string
  tenantId: string
  leaseId?: string
  createdAt: string
  updatedAt: string
}

export interface Lease {
  id: string
  propertyId: string
  tenantId: string
  startDate: string
  endDate: string
  rentAmount: number
  depositAmount?: number
  terms?: string
  status: "active" | "expired" | "terminated" | "pending"
  createdAt: string
  updatedAt: string
}

export interface MaintenanceRequest {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in_progress" | "completed" | "cancelled"
  images: string[]
  cost?: number
  completedAt?: string
  propertyId: string
  tenantId: string
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  name: string
  type:
    | "lease_agreement"
    | "id_copy"
    | "income_proof"
    | "receipt"
    | "maintenance_report"
    | "inspection_report"
    | "other"
  url: string
  size?: number
  mimeType?: string
  tenantId?: string
  leaseId?: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  type:
    | "user_login"
    | "user_logout"
    | "property_created"
    | "property_updated"
    | "property_deleted"
    | "tenant_created"
    | "tenant_updated"
    | "tenant_deleted"
    | "lease_created"
    | "lease_updated"
    | "lease_terminated"
    | "payment_created"
    | "payment_updated"
    | "payment_received"
    | "maintenance_created"
    | "maintenance_updated"
    | "maintenance_completed"
    | "document_uploaded"
    | "document_deleted"
  description: string
  userId?: string
  tenantId?: string
  propertyId?: string
  leaseId?: string
  paymentId?: string
  maintenanceId?: string
  metadata?: Record<string, any>
  timestamp: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type:
    | "payment_due"
    | "payment_received"
    | "payment_overdue"
    | "lease_expiring"
    | "maintenance_request"
    | "maintenance_completed"
    | "system_alert"
    | "general"
  read: boolean
  userId?: string
  tenantId?: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name?: string
  role: "admin" | "landlord" | "property_manager"
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalProperties: number
  occupiedProperties: number
  totalTenants: number
  activeTenants: number
  totalPayments: number
  paidPayments: number
  pendingPayments: number
  overduePayments: number
  maintenanceRequests: number
  occupancyRate: number
  collectionRate: number
}
