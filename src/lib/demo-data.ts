import type { Activity, Payment, Property, Tenant, DashboardSummary, UpcomingPayment } from "./types"
import { addDays, subDays } from "date-fns"

// Helper to generate random dates within the last 3 months
const randomRecentDate = () => {
  const today = new Date()
  const daysAgo = Math.floor(Math.random() * 90) // Random day in the last 3 months
  return subDays(today, daysAgo)
}

// Helper to generate upcoming dates within the next month
const randomUpcomingDate = () => {
  const today = new Date()
  const daysAhead = Math.floor(Math.random() * 30) + 1 // Random day in the next month
  return addDays(today, daysAhead)
}

// Properties
export const properties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    location: "Dar es Salaam, Tanzania",
    rooms: 3,
    rentFee: 800000,
    status: "Rented",
    images: ["/cozy-suburban-house.png"],
    amenities: ["Parking", "Security", "Water Tank"],
    description: "Beautiful 3-bedroom apartment in the heart of Dar es Salaam",
  },
  {
    id: "2",
    name: "Ocean View Villa",
    location: "Zanzibar, Tanzania",
    rooms: 4,
    rentFee: 1200000,
    status: "Open",
    images: ["/modern-city-apartment.png"],
    amenities: ["Swimming Pool", "Security", "Parking", "Gym"],
    description: "Luxury villa with stunning ocean views",
  },
  {
    id: "prop-001",
    name: "Serengeti Apartments - Block A",
    rooms: 3,
    rentFee: 450000,
    status: "Rented",
    images: ["/placeholder.png?height=200&width=300"],
    location: "Mikocheni, Dar es Salaam",
    description: "Modern 3-bedroom apartment with balcony and parking",
    amenities: ["Parking", "Security", "Water Tank", "Balcony"],
    createdAt: subDays(new Date(), 120),
    updatedAt: subDays(new Date(), 5),
  },
  {
    id: "prop-002",
    name: "Kilimanjaro Heights - Unit B2",
    rooms: 2,
    rentFee: 350000,
    status: "Rented",
    images: ["/placeholder.png?height=200&width=300"],
    location: "Upanga, Dar es Salaam",
    description: "Cozy 2-bedroom apartment with city views",
    amenities: ["Elevator", "Security", "Backup Generator"],
    createdAt: subDays(new Date(), 110),
    updatedAt: subDays(new Date(), 10),
  },
  {
    id: "prop-003",
    name: "Zanzibar Residences - Flat 5",
    rooms: 4,
    rentFee: 600000,
    status: "Open",
    images: ["/placeholder.png?height=200&width=300"],
    location: "Masaki, Dar es Salaam",
    description: "Luxury 4-bedroom apartment with ocean view",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Backup Generator"],
    createdAt: subDays(new Date(), 90),
    updatedAt: subDays(new Date(), 2),
  },
  {
    id: "prop-004",
    name: "Mwenge Apartments - Unit C",
    rooms: 1,
    rentFee: 250000,
    status: "Rented",
    images: ["/placeholder.png?height=200&width=300"],
    location: "Mwenge, Dar es Salaam",
    description: "Compact 1-bedroom apartment near shopping centers",
    amenities: ["Security", "Water Tank"],
    createdAt: subDays(new Date(), 80),
    updatedAt: subDays(new Date(), 15),
  },
  {
    id: "prop-005",
    name: "Mbezi Beach Villa",
    rooms: 5,
    rentFee: 1200000,
    status: "Open",
    images: ["/placeholder.png?height=200&width=300"],
    location: "Mbezi Beach, Dar es Salaam",
    description: "Spacious 5-bedroom villa with garden and beach access",
    amenities: ["Garden", "Parking", "Security", "Beach Access"],
    createdAt: subDays(new Date(), 70),
    updatedAt: subDays(new Date(), 3),
  },
  {
    id: "prop-006",
    name: "Msasani Peninsula Apartment",
    rooms: 3,
    rentFee: 550000,
    status: "Rented",
    images: ["/placeholder.png?height=200&width=300"],
    location: "Msasani, Dar es Salaam",
    description: "Modern 3-bedroom apartment in expat area",
    amenities: ["Swimming Pool", "Security", "Backup Generator", "Parking"],
    createdAt: subDays(new Date(), 60),
    updatedAt: subDays(new Date(), 7),
  },
]

// Tenants
export const tenants: Tenant[] = [
  {
    id: "1",
    name: "John Mwangi",
    email: "john@example.com",
    contact: "+255 123 456 789",
    propertyId: "1",
    leaseStart: new Date("2024-01-01"),
    leaseEnd: new Date("2024-12-31"),
    rentAmount: 800000,
    status: "Active",
  },
  {
    id: "tenant-001",
    name: "Amina Hassan",
    contact: "+255 712 345 678",
    email: "amina.hassan@example.com",
    nextOfKin: "Juma Hassan",
    nextOfKinContact: "+255 765 432 109",
    occupation: "Software Developer",
    documents: [
      {
        id: "doc-001",
        name: "National ID",
        url: "#",
        type: "ID",
        uploadedAt: subDays(new Date(), 60),
      },
      {
        id: "doc-002",
        name: "Lease Agreement",
        url: "#",
        type: "Lease",
        uploadedAt: subDays(new Date(), 60),
      },
    ],
    propertyId: "prop-001",
    createdAt: subDays(new Date(), 60),
    updatedAt: subDays(new Date(), 60),
  },
  {
    id: "tenant-002",
    name: "Emmanuel Mkono",
    contact: "+255 754 876 543",
    email: "emmanuel.mkono@example.com",
    nextOfKin: "Grace Mkono",
    nextOfKinContact: "+255 789 012 345",
    occupation: "Bank Manager",
    documents: [
      {
        id: "doc-003",
        name: "National ID",
        url: "#",
        type: "ID",
        uploadedAt: subDays(new Date(), 55),
      },
      {
        id: "doc-004",
        name: "Lease Agreement",
        url: "#",
        type: "Lease",
        uploadedAt: subDays(new Date(), 55),
      },
    ],
    propertyId: "prop-002",
    createdAt: subDays(new Date(), 55),
    updatedAt: subDays(new Date(), 55),
  },
  {
    id: "tenant-003",
    name: "Fatma Juma",
    contact: "+255 732 109 876",
    email: "fatma.juma@example.com",
    nextOfKin: "Ali Juma",
    nextOfKinContact: "+255 756 789 012",
    occupation: "Doctor",
    documents: [
      {
        id: "doc-005",
        name: "National ID",
        url: "#",
        type: "ID",
        uploadedAt: subDays(new Date(), 45),
      },
      {
        id: "doc-006",
        name: "Lease Agreement",
        url: "#",
        type: "Lease",
        uploadedAt: subDays(new Date(), 45),
      },
    ],
    propertyId: "prop-004",
    createdAt: subDays(new Date(), 45),
    updatedAt: subDays(new Date(), 45),
  },
  {
    id: "tenant-004",
    name: "John Magufuli",
    contact: "+255 789 543 210",
    email: "john.magufuli@example.com",
    nextOfKin: "Janet Magufuli",
    nextOfKinContact: "+255 712 987 654",
    occupation: "Civil Engineer",
    documents: [
      {
        id: "doc-007",
        name: "National ID",
        url: "#",
        type: "ID",
        uploadedAt: subDays(new Date(), 30),
      },
      {
        id: "doc-008",
        name: "Lease Agreement",
        url: "#",
        type: "Lease",
        uploadedAt: subDays(new Date(), 30),
      },
    ],
    propertyId: "prop-006",
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 30),
  },
]

// Payments
export const payments: Payment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    date: new Date("2024-01-01"),
    mode: "Bank Transfer",
    period: "January 2024",
    status: "Paid",
  },
  // Amina Hassan payments
  {
    id: "payment-001",
    tenantId: "tenant-001",
    propertyId: "prop-001",
    amount: 450000,
    date: subDays(new Date(), 60),
    mode: "M-Pesa",
    reference: "MP123456789",
    createdAt: subDays(new Date(), 60),
    status: "Completed",
    period: "January 2024",
  },
  {
    id: "payment-002",
    tenantId: "tenant-001",
    propertyId: "prop-001",
    amount: 450000,
    date: subDays(new Date(), 30),
    mode: "M-Pesa",
    reference: "MP987654321",
    createdAt: subDays(new Date(), 30),
    status: "Completed",
    period: "February 2024",
  },
  {
    id: "payment-003",
    tenantId: "tenant-001",
    propertyId: "prop-001",
    amount: 450000,
    date: new Date(),
    mode: "Bank",
    reference: "TRF123456",
    createdAt: new Date(),
    status: "Completed",
    period: "March 2024",
  },

  // Emmanuel Mkono payments
  {
    id: "payment-004",
    tenantId: "tenant-002",
    propertyId: "prop-002",
    amount: 350000,
    date: subDays(new Date(), 55),
    mode: "M-Pesa",
    reference: "MP567891234",
    createdAt: subDays(new Date(), 55),
    status: "Completed",
    period: "January 2024",
  },
  {
    id: "payment-005",
    tenantId: "tenant-002",
    propertyId: "prop-002",
    amount: 350000,
    date: subDays(new Date(), 25),
    mode: "Cash",
    reference: "",
    createdAt: subDays(new Date(), 25),
    status: "Completed",
    period: "February 2024",
  },

  // Fatma Juma payments
  {
    id: "payment-006",
    tenantId: "tenant-003",
    propertyId: "prop-004",
    amount: 250000,
    date: subDays(new Date(), 45),
    mode: "M-Pesa",
    reference: "MP345678912",
    createdAt: subDays(new Date(), 45),
    status: "Completed",
    period: "January 2024",
  },
  {
    id: "payment-007",
    tenantId: "tenant-003",
    propertyId: "prop-004",
    amount: 250000,
    date: subDays(new Date(), 15),
    mode: "Bank",
    reference: "TRF789012",
    createdAt: subDays(new Date(), 15),
    status: "Completed",
    period: "February 2024",
  },

  // John Magufuli payments
  {
    id: "payment-008",
    tenantId: "tenant-004",
    propertyId: "prop-006",
    amount: 550000,
    date: subDays(new Date(), 30),
    mode: "M-Pesa",
    reference: "MP891234567",
    createdAt: subDays(new Date(), 30),
    status: "Completed",
    period: "February 2024",
  },
]

// Upcoming payments (due dates)
export const upcomingPayments: UpcomingPayment[] = [
  {
    id: "1",
    tenantId: "1",
    propertyId: "1",
    amount: 800000,
    dueDate: new Date("2024-02-01"),
    period: "February 2024",
  },
  {
    id: "upcoming-001",
    tenantId: "tenant-001",
    propertyId: "prop-001",
    amount: 450000,
    dueDate: addDays(new Date(), 5),
    period: "April 2024",
  },
  {
    id: "upcoming-002",
    tenantId: "tenant-002",
    propertyId: "prop-002",
    amount: 350000,
    dueDate: addDays(new Date(), 3),
    period: "March 2024",
  },
  {
    id: "upcoming-003",
    tenantId: "tenant-003",
    propertyId: "prop-004",
    amount: 250000,
    dueDate: addDays(new Date(), 10),
    period: "March 2024",
  },
  {
    id: "upcoming-004",
    tenantId: "tenant-004",
    propertyId: "prop-006",
    amount: 550000,
    dueDate: addDays(new Date(), 1),
    period: "March 2024",
  },
]

// Recent activities
export const activities: Activity[] = [
  {
    id: "1",
    type: "payment",
    message: "Payment received from John Mwangi",
    date: new Date("2024-01-01"),
  },
  {
    id: "activity-001",
    type: "payment",
    message: "Amina Hassan paid TZS 450,000 for Serengeti Apartments",
    date: new Date(),
  },
  {
    id: "activity-002",
    type: "property_status",
    message: "Zanzibar Residences is now Open",
    date: subDays(new Date(), 2),
  },
  {
    id: "activity-003",
    type: "tenant_added",
    message: "John Magufuli added as tenant for Msasani Peninsula Apartment",
    date: subDays(new Date(), 30),
  },
  {
    id: "activity-004",
    type: "payment",
    message: "Fatma Juma paid TZS 250,000 for Mwenge Apartments",
    date: subDays(new Date(), 15),
  },
  {
    id: "activity-005",
    type: "property_status",
    message: "Mbezi Beach Villa is now Open",
    date: subDays(new Date(), 3),
  },
]

// Monthly collection data for charts
export const monthlyCollections = [
  { month: "Jan", amount: 1600000 },
  { month: "Feb", amount: 1600000 },
  { month: "Mar", amount: 1250000 },
  { month: "Apr", amount: 0 }, // Future month
  { month: "May", amount: 0 }, // Future month
  { month: "Jun", amount: 0 }, // Future month
]

// Property occupancy data for charts
export const occupancyData = {
  occupied: 4,
  vacant: 2,
}

// Users for authentication
export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@rentflow.com",
    password: "password123", // In a real app, this would be hashed
    role: "admin",
  },
  {
    id: "user-002",
    name: "Property Manager",
    email: "manager@rentflow.com",
    password: "password123", // In a real app, this would be hashed
    role: "manager",
  },
]

// Dashboard summary
export const dashboardSummary: DashboardSummary = {
  activeTenantsCount: 1,
  totalCollected: 800000,
  openPropertiesCount: 1,
  occupancyRate: 50,
}

// Get tenant by ID
export const getTenantById = (id: string): Tenant | undefined => {
  return tenants.find((tenant) => tenant.id === id)
}

// Get property by ID
export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id)
}

// Get payments by tenant ID
export const getPaymentsByTenantId = (tenantId: string): Payment[] => {
  return payments.filter((payment) => payment.tenantId === tenantId)
}

// Get upcoming payment by tenant ID
export const getUpcomingPaymentByTenantId = (tenantId: string): UpcomingPayment | undefined => {
  return upcomingPayments.find((payment) => payment.tenantId === tenantId)
}

// Format currency in TZS
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Export as demoData for compatibility
export const demoData = {
  properties,
  tenants,
  payments,
  activities,
  users,
  upcomingPayments,
  dashboardSummary,
}
