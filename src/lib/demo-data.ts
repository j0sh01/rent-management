export interface Property {
  id: string
  name: string
  location: string
  rooms: number
  rentFee: number
  status: "Available" | "Occupied" | "Maintenance"
  images: string[]
  description?: string
  amenities?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Tenant {
  id: string
  name: string
  email: string
  contact: string
  propertyId: string
  rentAmount: number
  leaseStart: Date
  leaseEnd: Date
  status: "Active" | "Inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  tenantId: string
  propertyId: string
  amount: number
  date: Date
  period: string
  mode: "Cash" | "Bank Transfer" | "Mobile Money" | "Check"
  status: "Paid" | "Pending" | "Overdue"
  reference?: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "landlord"
}

// Demo data
export const properties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments Unit 2B",
    location: "Masaki, Dar es Salaam",
    rooms: 3,
    rentFee: 800000,
    status: "Occupied",
    images: ["/cozy-suburban-house.png"],
    description: "A beautiful 3-bedroom apartment with modern amenities and great city views.",
    amenities: ["WiFi", "Parking", "Security", "Water", "Electricity"],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Garden View Studio",
    location: "Mikocheni, Dar es Salaam",
    rooms: 1,
    rentFee: 400000,
    status: "Available",
    images: ["/modern-city-apartment.png"],
    description: "Cozy studio apartment perfect for young professionals.",
    amenities: ["WiFi", "Security", "Water"],
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Family House Mbezi",
    location: "Mbezi Beach, Dar es Salaam",
    rooms: 4,
    rentFee: 1200000,
    status: "Occupied",
    images: ["/placeholder.jpg"],
    description: "Spacious family house with garden and parking space.",
    amenities: ["WiFi", "Parking", "Security", "Water", "Electricity", "Garden"],
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2024-03-10"),
  },
]

export const tenants: Tenant[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    contact: "+255 123 456 789",
    propertyId: "1",
    rentAmount: 800000,
    leaseStart: new Date("2024-01-01"),
    leaseEnd: new Date("2024-12-31"),
    status: "Active",
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    contact: "+255 987 654 321",
    propertyId: "3",
    rentAmount: 1200000,
    leaseStart: new Date("2024-02-01"),
    leaseEnd: new Date("2025-01-31"),
    status: "Active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-02-01"),
  },
]

export const payments: Payment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: new Date("2024-01-01"),
    period: "January 2024",
    mode: "Bank Transfer",
    status: "Paid",
    reference: "TXN123456",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    tenantId: "2",
    propertyId: "3",
    amount: 1200000,
    date: new Date("2024-02-01"),
    period: "February 2024",
    mode: "Mobile Money",
    status: "Paid",
    reference: "TXN123457",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentflow.com",
    password: "password123",
    role: "admin",
  },
]

// Helper functions
export const formatCurrency = (amount: number): string => {
  return `TZS ${amount.toLocaleString()}`
}

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id)
}

export const getTenantById = (id: string): Tenant | undefined => {
  return tenants.find((tenant) => tenant.id === id)
}

export const getPaymentById = (id: string): Payment | undefined => {
  return payments.find((payment) => payment.id === id)
}

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id)
}

export const getTenantsByPropertyId = (propertyId: string): Tenant[] => {
  return tenants.filter((tenant) => tenant.propertyId === propertyId)
}

export const getPaymentsByTenantId = (tenantId: string): Payment[] => {
  return payments.filter((payment) => payment.tenantId === tenantId)
}

export const getPaymentsByPropertyId = (propertyId: string): Payment[] => {
  return payments.filter((payment) => payment.propertyId === propertyId)
}

// Export all data as demoData for compatibility
export const demoData = {
  properties,
  tenants,
  payments,
  users,
}
