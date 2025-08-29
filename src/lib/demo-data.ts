import { addDays } from "date-fns"

// Types
export interface Property {
  id: string
  name: string
  location: string
  rooms: number
  rentFee: number
  status: "Open" | "Rented"
  description?: string
  images: string[]
  amenities: string[]
  createdAt: Date
}

export interface Tenant {
  id: string
  name: string
  contact: string
  email: string
  propertyId?: string
  createdAt: Date
  status: "Active" | "Inactive"
}

export interface Payment {
  id: string
  tenantId: string
  propertyId: string
  amount: number
  date: Date
  mode: string
  period?: string
  status: "Completed" | "Pending"
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "landlord"
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
  period: string
}

export interface DashboardSummary {
  activeTenantsCount: number
  totalCollected: number
  openPropertiesCount: number
  occupancyRate: number
}

// Mock Data
export const properties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments - Unit 2B",
    location: "Masaki, Dar es Salaam",
    rooms: 2,
    rentFee: 800000,
    status: "Rented",
    description: "A beautiful 2-bedroom apartment with modern amenities and stunning city views.",
    images: ["/cozy-suburban-house.png", "/modern-city-apartment.png"],
    amenities: ["Parking", "Security", "Water Tank", "Backup Generator", "WiFi", "AC"],
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Garden View House",
    location: "Mikocheni, Dar es Salaam",
    rooms: 3,
    rentFee: 1200000,
    status: "Open",
    description: "Spacious 3-bedroom house with a beautiful garden and parking space.",
    images: ["/modern-city-apartment.png", "/cozy-suburban-house.png"],
    amenities: ["Parking", "Security", "Water Tank", "Garden"],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "City Center Studio",
    location: "City Center, Dar es Salaam",
    rooms: 1,
    rentFee: 500000,
    status: "Rented",
    description: "Modern studio apartment in the heart of the city.",
    images: ["/cozy-suburban-house.png"],
    amenities: ["Security", "WiFi", "AC"],
    createdAt: new Date("2024-02-01"),
  },
]

export const tenants: Tenant[] = [
  {
    id: "1",
    name: "John Doe",
    contact: "+255 123 456 789",
    email: "john.doe@example.com",
    propertyId: "1",
    createdAt: new Date("2024-01-01"),
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    contact: "+255 987 654 321",
    email: "jane.smith@example.com",
    propertyId: "3",
    createdAt: new Date("2024-02-01"),
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    contact: "+255 555 123 456",
    email: "mike.johnson@example.com",
    createdAt: new Date("2024-02-15"),
    status: "Inactive",
  },
]

export const payments: Payment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: new Date("2024-01-15"),
    mode: "Bank Transfer",
    period: "January 2024",
    status: "Completed",
  },
  {
    id: "2",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: new Date("2024-02-15"),
    mode: "M-Pesa",
    period: "February 2024",
    status: "Completed",
  },
  {
    id: "3",
    tenantId: "2",
    propertyId: "3",
    amount: 500000,
    date: new Date("2024-02-15"),
    mode: "Cash",
    period: "February 2024",
    status: "Completed",
  },
  {
    id: "4",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: new Date("2024-03-15"),
    mode: "Bank Transfer",
    period: "March 2024",
    status: "Pending",
  },
]

export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentflow.com",
    role: "admin",
  },
]

export const activities: Activity[] = [
  {
    id: "1",
    type: "payment",
    message: "John Doe paid rent for January 2024",
    date: new Date("2024-01-15"),
  },
  {
    id: "2",
    type: "tenant_added",
    message: "New tenant Jane Smith added to City Center Studio",
    date: new Date("2024-02-01"),
  },
  {
    id: "3",
    type: "property_status",
    message: "Garden View House status changed to Open",
    date: new Date("2024-02-10"),
  },
]

export const upcomingPayments: UpcomingPayment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    dueDate: addDays(new Date(), 5),
    period: "April 2024",
  },
  {
    id: "2",
    tenantId: "2",
    propertyId: "3",
    amount: 500000,
    dueDate: addDays(new Date(), 10),
    period: "April 2024",
  },
]

// Helper Functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id)
}

export const getTenantById = (id: string): Tenant | undefined => {
  return tenants.find((tenant) => tenant.id === id)
}

export const getPaymentsByTenantId = (tenantId: string): Payment[] => {
  return payments.filter((payment) => payment.tenantId === tenantId)
}

export const getPaymentsByPropertyId = (propertyId: string): Payment[] => {
  return payments.filter((payment) => payment.propertyId === propertyId)
}

export const getUpcomingPaymentByTenantId = (tenantId: string): UpcomingPayment | undefined => {
  return upcomingPayments.find((payment) => payment.tenantId === tenantId)
}

export const getDashboardSummary = (): DashboardSummary => {
  const activeTenantsCount = tenants.filter((tenant) => tenant.status === "Active").length
  const totalCollected = payments
    .filter((payment) => payment.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0)
  const openPropertiesCount = properties.filter((property) => property.status === "Open").length
  const totalProperties = properties.length
  const occupancyRate =
    totalProperties > 0 ? Math.round(((totalProperties - openPropertiesCount) / totalProperties) * 100) : 0

  return {
    activeTenantsCount,
    totalCollected,
    openPropertiesCount,
    occupancyRate,
  }
}

export const getRentCollectionData = () => {
  return [
    { month: "Jan", amount: 2400000 },
    { month: "Feb", amount: 1300000 },
    { month: "Mar", amount: 800000 },
    { month: "Apr", amount: 1600000 },
    { month: "May", amount: 2100000 },
    { month: "Jun", amount: 1800000 },
  ]
}

export const getPropertyOccupancyData = () => {
  const occupied = properties.filter((p) => p.status === "Rented").length
  const vacant = properties.filter((p) => p.status === "Open").length
  return { occupied, vacant }
}

// Export all data as demoData object
export const demoData = {
  properties,
  tenants,
  payments,
  users,
  activities,
  upcomingPayments,
  formatCurrency,
  getPropertyById,
  getTenantById,
  getPaymentsByTenantId,
  getPaymentsByPropertyId,
  getUpcomingPaymentByTenantId,
  getDashboardSummary,
  getRentCollectionData,
  getPropertyOccupancyData,
}
