import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("password123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@rentflow.com" },
    update: {},
    create: {
      email: "admin@rentflow.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
      phone: "+1234567890",
    },
  })

  // Create landlord user
  const landlordPassword = await bcrypt.hash("landlord123", 10)
  const landlord = await prisma.user.upsert({
    where: { email: "landlord@rentflow.com" },
    update: {},
    create: {
      email: "landlord@rentflow.com",
      password: landlordPassword,
      name: "John Landlord",
      role: "LANDLORD",
      phone: "+1234567891",
    },
  })

  // Create tenant users
  const tenantPassword = await bcrypt.hash("tenant123", 10)
  const tenant1 = await prisma.user.upsert({
    where: { email: "tenant1@example.com" },
    update: {},
    create: {
      email: "tenant1@example.com",
      password: tenantPassword,
      name: "Alice Johnson",
      role: "TENANT",
      phone: "+1234567892",
    },
  })

  const tenant2 = await prisma.user.upsert({
    where: { email: "tenant2@example.com" },
    update: {},
    create: {
      email: "tenant2@example.com",
      password: tenantPassword,
      name: "Bob Smith",
      role: "TENANT",
      phone: "+1234567893",
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
      squareFeet: 850,
      rent: 2500,
      deposit: 2500,
      description: "Beautiful apartment in the heart of the city",
      status: "OCCUPIED",
      images: ["/modern-city-apartment.png"],
      amenities: ["Parking", "Gym", "Pool", "Laundry"],
      ownerId: landlord.id,
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
      squareFeet: 1200,
      rent: 3200,
      deposit: 3200,
      description: "Spacious house with garden view",
      status: "AVAILABLE",
      images: ["/cozy-suburban-house.png"],
      amenities: ["Garden", "Garage", "Air Conditioning"],
      ownerId: landlord.id,
    },
  })

  // Create tenant profiles
  const tenantProfile1 = await prisma.tenant.create({
    data: {
      userId: tenant1.id,
      emergencyContact: "Jane Johnson - +1234567894",
      occupation: "Software Engineer",
      monthlyIncome: 8000,
      moveInDate: new Date("2024-01-01"),
      leaseEndDate: new Date("2024-12-31"),
      status: "ACTIVE",
      propertyId: property1.id,
    },
  })

  const tenantProfile2 = await prisma.tenant.create({
    data: {
      userId: tenant2.id,
      emergencyContact: "Mary Smith - +1234567895",
      occupation: "Teacher",
      monthlyIncome: 5000,
      status: "ACTIVE",
    },
  })

  // Create leases
  await prisma.lease.create({
    data: {
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      monthlyRent: 2500,
      deposit: 2500,
      terms: "Standard lease agreement terms and conditions",
      status: "ACTIVE",
      propertyId: property1.id,
      tenantId: tenantProfile1.id,
    },
  })

  // Create payments
  await prisma.payment.createMany({
    data: [
      {
        amount: 2500,
        dueDate: new Date("2024-01-01"),
        paidDate: new Date("2024-01-01"),
        status: "PAID",
        type: "RENT",
        method: "BANK_TRANSFER",
        propertyId: property1.id,
        tenantId: tenantProfile1.id,
      },
      {
        amount: 2500,
        dueDate: new Date("2024-02-01"),
        paidDate: new Date("2024-02-01"),
        status: "PAID",
        type: "RENT",
        method: "BANK_TRANSFER",
        propertyId: property1.id,
        tenantId: tenantProfile1.id,
      },
      {
        amount: 2500,
        dueDate: new Date("2024-03-01"),
        status: "PENDING",
        type: "RENT",
        propertyId: property1.id,
        tenantId: tenantProfile1.id,
      },
    ],
  })

  // Create maintenance requests
  await prisma.maintenanceRequest.create({
    data: {
      title: "Leaky Faucet",
      description: "The kitchen faucet is leaking and needs repair",
      priority: "MEDIUM",
      status: "PENDING",
      category: "Plumbing",
      propertyId: property1.id,
      tenantId: tenantProfile1.id,
    },
  })

  // Create activities
  await prisma.activity.createMany({
    data: [
      {
        type: "PROPERTY_CREATED",
        description: 'Property "Sunset Apartments" was created',
        userId: landlord.id,
        propertyId: property1.id,
      },
      {
        type: "TENANT_ADDED",
        description: "Tenant Alice Johnson was added to Sunset Apartments",
        userId: admin.id,
        propertyId: property1.id,
      },
      {
        type: "PAYMENT_RECEIVED",
        description: "Rent payment of $2,500 received from Alice Johnson",
        userId: admin.id,
        propertyId: property1.id,
      },
    ],
  })

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        title: "Rent Due Soon",
        message: "Your rent payment is due in 3 days",
        type: "PAYMENT_DUE",
        userId: tenant1.id,
      },
      {
        title: "Maintenance Request",
        message: "New maintenance request for Sunset Apartments",
        type: "MAINTENANCE_REQUEST",
        userId: landlord.id,
      },
    ],
  })

  console.log("✅ Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
