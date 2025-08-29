export interface Property {
  id: string
  name: string
  address: string
  type: "apartment" | "house" | "commercial"
  bedrooms: number
  bathrooms: number
  area: number
  rent: number
  status: "available" | "occupied" | "maintenance"
  description: string
  amenities: string[]
  images: string[]
  landlord: {
    name: string
    phone: string
    email: string
  }
}

export interface Tenant {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  leaseStart: Date
  leaseEnd: Date
  rentAmount: number
  deposit: number
  status: "active" | "inactive" | "pending"
  documents: Document[]
}

export interface Payment {
  id: string
  tenantId: string
  propertyId: string
  amount: number
  type: "rent" | "deposit" | "maintenance" | "utilities"
  status: "paid" | "pending" | "overdue"
  dueDate: Date
  paidDate?: Date
  method?: "bank" | "mpesa" | "cash"
  reference?: string
}

export interface Document {
  id: string
  name: string
  type: string
  category: "lease" | "id" | "income" | "other"
  status: "approved" | "pending" | "rejected"
  uploadDate: Date
  size: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "tenant"
  avatar?: string
}

export interface Activity {
  id: string
  type: "payment" | "maintenance" | "lease" | "tenant"
  description: string
  date: Date
  user: string
}

// Mock data
export const properties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Sunset Boulevard, Dar es Salaam",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 850,
    rent: 800000,
    status: "occupied",
    description: "Modern 2-bedroom apartment with city views and modern amenities.",
    amenities: ["Parking", "Security", "Water", "Internet", "Generator"],
    images: ["/placeholder.jpg", "/placeholder.jpg"],
    landlord: {
      name: "John Mwalimu",
      phone: "+255 123 456 789",
      email: "john@example.com",
    },
  },
  {
    id: "2",
    name: "Garden View House",
    address: "456 Garden Street, Arusha",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    rent: 1200000,
    status: "available",
    description: "Spacious 3-bedroom house with garden and parking.",
    amenities: ["Garden", "Parking", "Security", "Water"],
    images: ["/placeholder.jpg"],
    landlord: {
      name: "Mary Kimani",
      phone: "+255 987 654 321",
      email: "mary@example.com",
    },
  },
]

export const tenants: Tenant[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+255 111 222 333",
    propertyId: "1",
    leaseStart: new Date("2024-01-01"),
    leaseEnd: new Date("2024-12-31"),
    rentAmount: 800000,
    deposit: 1600000,
    status: "active",
    documents: [],
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "+255 444 555 666",
    propertyId: "2",
    leaseStart: new Date("2024-02-01"),
    leaseEnd: new Date("2025-01-31"),
    rentAmount: 1200000,
    deposit: 2400000,
    status: "active",
    documents: [],
  },
]

export const payments: Payment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    type: "rent",
    status: "paid",
    dueDate: new Date("2024-03-01"),
    paidDate: new Date("2024-02-28"),
    method: "mpesa",
    reference: "MP240228001",
  },
  {
    id: "2",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    type: "rent",
    status: "pending",
    dueDate: new Date("2024-04-01"),
    method: "bank",
  },
  {
    id: "3",
    tenantId: "2",
    propertyId: "2",
    amount: 1200000,
    type: "rent",
    status: "paid",
    dueDate: new Date("2024-03-01"),
    paidDate: new Date("2024-03-01"),
    method: "bank",
    reference: "BK240301001",
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentflow.com",
    role: "admin",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "tenant",
    avatar: "/placeholder-user.jpg",
  },
]

export const activities: Activity[] = [
  {
    id: "1",
    type: "payment",
    description: "Alice Johnson paid rent for March 2024",
    date: new Date("2024-02-28"),
    user: "Alice Johnson",
  },
  {
    id: "2",
    type: "tenant",
    description: "New tenant Bob Smith registered",
    date: new Date("2024-02-01"),
    user: "Admin User",
  },
  {
    id: "3",
    type: "maintenance",
    description: "Maintenance request submitted for Sunset Apartments",
    date: new Date("2024-03-10"),
    user: "Alice Johnson",
  },
]

export const monthlyCollections = [
  { month: "Jan", amount: 2000000 },
  { month: "Feb", amount: 2400000 },
  { month: "Mar", amount: 1600000 },
  { month: "Apr", amount: 2800000 },
  { month: "May", amount: 2200000 },
  { month: "Jun", amount: 3000000 },
]

export const occupancyData = {
  occupied: 75,
  vacant: 25,
}

export const upcomingPayments = [
  {
    id: "1",
    tenant: "Alice Johnson",
    property: "Sunset Apartments",
    amount: 800000,
    dueDate: new Date("2024-04-01"),
    status: "pending" as const,
  },
  {
    id: "2",
    tenant: "Bob Smith",
    property: "Garden View House",
    amount: 1200000,
    dueDate: new Date("2024-04-01"),
    status: "pending" as const,
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

export function getPaymentsByTenantId(tenantId: string): Payment[] {
  return payments.filter((payment) => payment.tenantId === tenantId)
}

export function getUpcomingPaymentByTenantId(tenantId: string): Payment | undefined {
  return payments.find(
    (payment) => payment.tenantId === tenantId && payment.status === "pending" && payment.dueDate > new Date(),
  )
}

export function getTenantsByPropertyId(propertyId: string): Tenant[] {
  return tenants.filter((tenant) => tenant.propertyId === propertyId)
}

export function getPaymentsByPropertyId(propertyId: string): Payment[] {
  return payments.filter((payment) => payment.propertyId === propertyId)
}

export function calculateTotalRent(): number {
  return properties.reduce((total, property) => {
    if (property.status === "occupied") {
      return total + property.rent
    }
    return total
  }, 0)
}

export function calculateOccupancyRate(): number {
  const occupiedProperties = properties.filter((p) => p.status === "occupied").length
  return Math.round((occupiedProperties / properties.length) * 100)
}

export function getRecentActivities(limit = 5): Activity[] {
  return activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, limit)
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
  getPaymentsByTenantId,
  getUpcomingPaymentByTenantId,
  getTenantsByPropertyId,
  getPaymentsByPropertyId,
  calculateTotalRent,
  calculateOccupancyRate,
  getRecentActivities,
}
