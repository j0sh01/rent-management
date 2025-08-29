export interface Property {
  id: string
  name: string
  location: string
  rooms: number
  rentFee: number
  status: "Open" | "Rented"
  description?: string
  amenities?: string[]
  images: string[]
}

export interface Tenant {
  id: string
  name: string
  contact: string
  email: string
  propertyId: string
  rentAmount: number
  leaseStart: string
  leaseEnd: string
  status: "Active" | "Inactive"
}

export interface Payment {
  id: string
  tenantId: string
  propertyId: string
  amount: number
  date: string
  method: "Cash" | "Bank Transfer" | "M-Pesa"
  status: "Completed" | "Pending" | "Failed"
  reference?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Tenant"
}

export interface Activity {
  id: string
  type: "payment" | "tenant_added" | "property_added" | "lease_signed"
  description: string
  date: string
  userId: string
}

// Demo data
export const properties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    location: "Masaki, Dar es Salaam",
    rooms: 3,
    rentFee: 800000,
    status: "Rented",
    description: "Modern 3-bedroom apartment with ocean view",
    amenities: ["Parking", "Security", "Water Tank", "Backup Generator"],
    images: ["/modern-city-apartment.png", "/placeholder.jpg"],
  },
  {
    id: "2",
    name: "Garden Villa",
    location: "Mikocheni, Dar es Salaam",
    rooms: 4,
    rentFee: 1200000,
    status: "Open",
    description: "Spacious villa with beautiful garden",
    amenities: ["Parking", "Security", "Swimming Pool", "Garden"],
    images: ["/cozy-suburban-house.png", "/placeholder.jpg"],
  },
  {
    id: "3",
    name: "City Center Studio",
    location: "Kariakoo, Dar es Salaam",
    rooms: 1,
    rentFee: 300000,
    status: "Rented",
    description: "Compact studio in the heart of the city",
    amenities: ["Security", "Water Tank"],
    images: ["/placeholder.jpg"],
  },
]

export const tenants: Tenant[] = [
  {
    id: "1",
    name: "John Mwangi",
    contact: "+255 712 345 678",
    email: "john.mwangi@email.com",
    propertyId: "1",
    rentAmount: 800000,
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Kimani",
    contact: "+255 723 456 789",
    email: "sarah.kimani@email.com",
    propertyId: "3",
    rentAmount: 300000,
    leaseStart: "2024-02-01",
    leaseEnd: "2025-01-31",
    status: "Active",
  },
]

export const payments: Payment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: "2024-01-01",
    method: "M-Pesa",
    status: "Completed",
    reference: "MP240101001",
  },
  {
    id: "2",
    tenantId: "2",
    propertyId: "3",
    amount: 300000,
    date: "2024-02-01",
    method: "Bank Transfer",
    status: "Completed",
    reference: "BT240201001",
  },
  {
    id: "3",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: "2024-02-01",
    method: "M-Pesa",
    status: "Pending",
    reference: "MP240201002",
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentflow.com",
    role: "Admin",
  },
]

export const activities: Activity[] = [
  {
    id: "1",
    type: "payment",
    description: "Payment received from John Mwangi - TZS 800,000",
    date: "2024-01-01",
    userId: "1",
  },
  {
    id: "2",
    type: "tenant_added",
    description: "New tenant Sarah Kimani added to City Center Studio",
    date: "2024-02-01",
    userId: "1",
  },
  {
    id: "3",
    type: "property_added",
    description: "New property Garden Villa added",
    date: "2024-01-15",
    userId: "1",
  },
]

// Chart data
export const monthlyCollections = [
  { month: "Jan", amount: 800000 },
  { month: "Feb", amount: 1100000 },
  { month: "Mar", amount: 1100000 },
  { month: "Apr", amount: 1100000 },
  { month: "May", amount: 1100000 },
  { month: "Jun", amount: 1100000 },
]

export const occupancyData = [
  { month: "Jan", occupied: 1, total: 3 },
  { month: "Feb", occupied: 2, total: 3 },
  { month: "Mar", occupied: 2, total: 3 },
  { month: "Apr", occupied: 2, total: 3 },
  { month: "May", occupied: 2, total: 3 },
  { month: "Jun", occupied: 2, total: 3 },
]

export const upcomingPayments = [
  {
    id: "1",
    tenantName: "John Mwangi",
    propertyName: "Sunset Apartments",
    amount: 800000,
    dueDate: "2024-03-01",
    status: "Due Soon" as const,
  },
  {
    id: "2",
    tenantName: "Sarah Kimani",
    propertyName: "City Center Studio",
    amount: 300000,
    dueDate: "2024-03-01",
    status: "Due Soon" as const,
  },
]

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id)
}

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((tenant) => tenant.id === id)
}

export function getPaymentById(id: string): Payment | undefined {
  return payments.find((payment) => payment.id === id)
}

export function getUpcomingPaymentByTenantId(tenantId: string) {
  return upcomingPayments.find((payment) =>
    tenants.find((tenant) => tenant.id === tenantId && tenant.name === payment.tenantName),
  )
}

export function getPaymentsByTenantId(tenantId: string): Payment[] {
  return payments.filter((payment) => payment.tenantId === tenantId)
}

export function getPaymentsByPropertyId(propertyId: string): Payment[] {
  return payments.filter((payment) => payment.propertyId === propertyId)
}

export function getTenantsByPropertyId(propertyId: string): Tenant[] {
  return tenants.filter((tenant) => tenant.propertyId === propertyId)
}

// Export all data as a single object for convenience
export const demoData = {
  properties,
  tenants,
  payments,
  users,
  activities,
  monthlyCollections,
  occupancyData,
  upcomingPayments,
  formatCurrency,
  getPropertyById,
  getTenantById,
  getPaymentById,
  getUpcomingPaymentByTenantId,
  getPaymentsByTenantId,
  getPaymentsByPropertyId,
  getTenantsByPropertyId,
}
