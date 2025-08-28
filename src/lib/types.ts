export interface Property {
  id: string
  name: string
  rooms: number
  rentFee: number
  status: "Open" | "Rented"
  images: string[]
  location?: string
  description?: string
  amenities?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Tenant {
  id: string
  name: string
  contact: string
  email: string
  nextOfKin: string
  nextOfKinContact?: string
  occupation: string
  documents: Document[]
  propertyId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  name: string
  url: string
  type: "ID" | "Lease" | "Other"
  uploadedAt: Date
}

export interface Payment {
  id: string
  tenantId: string
  propertyId: string
  amount: number
  date: Date
  mode: "M-Pesa" | "Cash" | "Bank"
  reference?: string
  createdAt: Date
  status: "Pending" | "Completed" | "Failed"
  period?: string
}

export interface DashboardSummary {
  activeTenantsCount: number
  totalCollected: number
  openPropertiesCount: number
  recentActivity: Activity[]
  upcomingPayments: UpcomingPayment[]
  occupancyRate: number
}

export interface Activity {
  id: string
  type: "payment" | "property_status" | "tenant_added"
  message: string
  date: Date
}

export interface UpcomingPayment {
  id: string
  tenantId: string
  propertyId: string
  amount: number
  dueDate: Date
  period?: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "admin" | "manager" | "viewer"
}

export interface ChartData {
  month: string
  amount: number
}

// Re-export Prisma types for use in components
export type {
  User,
  Tenant,
  Property,
  Payment,
  Lease,
  MaintenanceRequest,
  Document,
  Activity,
  Notification,
  UserRole,
  TenantStatus,
  PropertyType,
  PropertyStatus,
  PaymentStatus,
  PaymentType,
  PaymentMethod,
  LeaseStatus,
  Priority,
  MaintenanceStatus,
  DocumentType,
  ActivityType,
  NotificationType,
} from "@prisma/client"

// Additional types for the application
export interface DashboardStats {
  totalProperties: number
  occupiedProperties: number
  totalTenants: number
  activeTenants: number
  totalPayments: number
  paidPayments: number
  overduePayments: number
  pendingMaintenance: number
  occupancyRate: number
  collectionRate: number
}

export interface PropertyWithDetails extends Property {
  owner: User
  tenants: (Tenant & { user: User })[]
  _count: {
    tenants: number
    payments: number
  }
}

export interface TenantWithDetails extends Tenant {
  user: User
  property?: Property
  payments: Payment[]
  _count: {
    payments: number
    maintenanceRequests: number
  }
}

export interface PaymentWithDetails extends Payment {
  property: Property
  tenant: Tenant & { user: User }
}

export interface ActivityWithDetails extends Activity {
  user: User
  property?: Property
}
