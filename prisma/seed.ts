import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create users
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@rentflow.com",
      name: "Admin User",
      password: await bcrypt.hash("password123", 10),
      role: "ADMIN",
    },
  })

  const landlordUser = await prisma.user.create({
    data: {
      email: "landlord@rentflow.com",
      name: "John Landlord",
      password: await bcrypt.hash("landlord123", 10),
      role: "LANDLORD",
    },
  })

  // Create properties
  const property1 = await prisma.property.create({
    data: {
      name: "Sunset Apartments",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      type: "APARTMENT",
      bedrooms: 2,
      bathrooms: 1.5,
      squareFeet: 1200,
      rent: 2500.0,
      deposit: 2500.0,
      description: "Beautiful 2-bedroom apartment in the heart of the city",
      amenities: ["Parking", "Gym", "Pool", "Laundry"],
      images: ["/modern-city-apartment.png"],
      status: "OCCUPIED",
      ownerId: landlordUser.id,
    },
  })

  const property2 = await prisma.property.create({
    data: {
      name: "Garden View House",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      type: "HOUSE",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      rent: 3200.0,
      deposit: 3200.0,
      description: "Spacious 3-bedroom house with garden view",
      amenities: ["Garden", "Garage", "Air Conditioning"],
      images: ["/cozy-suburban-house.png"],
      status: "AVAILABLE",
      ownerId: landlordUser.id,
    },
  })

  // Create tenants
  const tenant1 = await prisma.tenant.create({
    data: {
      email: "tenant1@example.com",
      name: "Alice Johnson",
      phone: "+1-555-0123",
      password: await bcrypt.hash("tenant123", 10),
      dateOfBirth: new Date("1990-05-15"),
      occupation: "Software Engineer",
      income: 75000,
      status: "ACTIVE",
      propertyId: property1.id,
    },
  })

  const tenant2 = await prisma.tenant.create({
    data: {
      email: "tenant2@example.com",
      name: "Bob Smith",
      phone: "+1-555-0124",
      password: await bcrypt.hash("tenant123", 10),
      dateOfBirth: new Date("1985-08-22"),
      occupation: "Marketing Manager",
      income: 65000,
      status: "ACTIVE",
    },
  })

  // Create leases
  const lease1 = await prisma.lease.create({
    data: {
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      rentAmount: 2500.0,
      depositAmount: 2500.0,
      terms: "Standard 12-month lease agreement",
      status: "ACTIVE",
      propertyId: property1.id,
      tenantId: tenant1.id,
    },
  })

  // Create payments
  await prisma.payment.create({
    data: {
      amount: 2500.0,
      dueDate: new Date("2024-01-01"),
      paidDate: new Date("2024-01-01"),
      method: "BANK_TRANSFER",
      status: "PAID",
      description: "January 2024 Rent",
      transactionId: "TXN-001",
      propertyId: property1.id,
      tenantId: tenant1.id,
      leaseId: lease1.id,
    },
  })

  await prisma.payment.create({
    data: {
      amount: 2500.0,
      dueDate: new Date("2024-02-01"),
      method: "BANK_TRANSFER",
      status: "PENDING",
      description: "February 2024 Rent",
      propertyId: property1.id,
      tenantId: tenant1.id,
      leaseId: lease1.id,
    },
  })

  // Create maintenance requests
  await prisma.maintenanceRequest.create({
    data: {
      title: "Leaky Faucet",
      description: "Kitchen faucet is dripping constantly",
      priority: "MEDIUM",
      status: "OPEN",
      images: [],
      propertyId: property1.id,
      tenantId: tenant1.id,
    },
  })

  // Create activities
  await prisma.activity.create({
    data: {
      type: "PROPERTY_CREATED",
      description: 'Property "Sunset Apartments" was created',
      userId: landlordUser.id,
      propertyId: property1.id,
    },
  })

  await prisma.activity.create({
    data: {
      type: "TENANT_CREATED",
      description: 'Tenant "Alice Johnson" was added',
      userId: landlordUser.id,
      tenantId: tenant1.id,
    },
  })

  await prisma.activity.create({
    data: {
      type: "PAYMENT_RECEIVED",
      description: "Payment of $2,500 received from Alice Johnson",
      userId: landlordUser.id,
      tenantId: tenant1.id,
      propertyId: property1.id,
    },
  })

  // Create notifications
  await prisma.notification.create({
    data: {
      title: "Payment Due",
      message: "Rent payment for February 2024 is due",
      type: "PAYMENT_DUE",
      tenantId: tenant1.id,
    },
  })

  await prisma.notification.create({
    data: {
      title: "Maintenance Request",
      message: "New maintenance request for leaky faucet",
      type: "MAINTENANCE_REQUEST",
      userId: landlordUser.id,
    },
  })

  console.log("✅ Database seeded successfully!")
  console.log("👤 Admin: admin@rentflow.com / password123")
  console.log("🏠 Landlord: landlord@rentflow.com / landlord123")
  console.log("🏠 Tenant 1: tenant1@example.com / tenant123")
  console.log("🏠 Tenant 2: tenant2@example.com / tenant123")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
