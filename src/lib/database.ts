import { prisma } from "./prisma"
import type {
  Property,
  Tenant,
  Payment,
  Lease,
  MaintenanceRequest,
  Activity,
  Notification,
  PropertyStatus,
  PaymentStatus,
  MaintenanceStatus,
} from "@prisma/client"

// Property operations
export async function getProperties(ownerId?: string) {
  return prisma.property.findMany({
    where: ownerId ? { ownerId } : undefined,
    include: {
      tenants: true,
      leases: {
        include: {
          tenant: true,
        },
      },
      _count: {
        select: {
          tenants: true,
          payments: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPropertyById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      owner: true,
      tenants: true,
      leases: {
        include: {
          tenant: true,
        },
      },
      payments: {
        include: {
          tenant: true,
        },
        orderBy: { createdAt: "desc" },
      },
      maintenance: {
        include: {
          tenant: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })
}

export async function createProperty(data: Omit<Property, "id" | "createdAt" | "updatedAt">) {
  return prisma.property.create({
    data,
  })
}

export async function updateProperty(id: string, data: Partial<Property>) {
  return prisma.property.update({
    where: { id },
    data,
  })
}

export async function updatePropertyStatus(id: string, status: PropertyStatus) {
  return prisma.property.update({
    where: { id },
    data: { status },
  })
}

// Tenant operations
export async function getTenants() {
  return prisma.tenant.findMany({
    include: {
      property: true,
      leases: {
        include: {
          property: true,
        },
      },
      _count: {
        select: {
          payments: true,
          maintenance: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getTenantById(id: string) {
  return prisma.tenant.findUnique({
    where: { id },
    include: {
      property: true,
      leases: {
        include: {
          property: true,
        },
      },
      payments: {
        include: {
          property: true,
        },
        orderBy: { createdAt: "desc" },
      },
      documents: true,
      maintenance: {
        include: {
          property: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })
}

export async function createTenant(data: Omit<Tenant, "id" | "createdAt" | "updatedAt">) {
  return prisma.tenant.create({
    data,
  })
}

export async function updateTenant(id: string, data: Partial<Tenant>) {
  return prisma.tenant.update({
    where: { id },
    data,
  })
}

// Payment operations
export async function getPayments() {
  return prisma.payment.findMany({
    include: {
      property: true,
      tenant: true,
      lease: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getPaymentById(id: string) {
  return prisma.payment.findUnique({
    where: { id },
    include: {
      property: true,
      tenant: true,
      lease: true,
    },
  })
}

export async function createPayment(data: Omit<Payment, "id" | "createdAt" | "updatedAt">) {
  return prisma.payment.create({
    data,
  })
}

export async function updatePaymentStatus(id: string, status: PaymentStatus, paidDate?: Date) {
  return prisma.payment.update({
    where: { id },
    data: {
      status,
      paidDate,
    },
  })
}

// Lease operations
export async function getLeases() {
  return prisma.lease.findMany({
    include: {
      property: true,
      tenant: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createLease(data: Omit<Lease, "id" | "createdAt" | "updatedAt">) {
  return prisma.lease.create({
    data,
  })
}

// Maintenance operations
export async function getMaintenanceRequests() {
  return prisma.maintenanceRequest.findMany({
    include: {
      property: true,
      tenant: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createMaintenanceRequest(data: Omit<MaintenanceRequest, "id" | "createdAt" | "updatedAt">) {
  return prisma.maintenanceRequest.create({
    data,
  })
}

export async function updateMaintenanceStatus(id: string, status: MaintenanceStatus) {
  return prisma.maintenanceRequest.update({
    where: { id },
    data: {
      status,
      completedAt: status === "COMPLETED" ? new Date() : null,
    },
  })
}

// Activity operations
export async function getActivities(limit = 50) {
  return prisma.activity.findMany({
    include: {
      user: true,
      tenant: true,
      property: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  })
}

export async function createActivity(data: Omit<Activity, "id" | "createdAt">) {
  return prisma.activity.create({
    data,
  })
}

// Notification operations
export async function getNotifications(userId?: string, tenantId?: string) {
  return prisma.notification.findMany({
    where: {
      OR: [userId ? { userId } : {}, tenantId ? { tenantId } : {}],
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function createNotification(data: Omit<Notification, "id" | "createdAt">) {
  return prisma.notification.create({
    data,
  })
}

export async function markNotificationAsRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  })
}

// Dashboard statistics
export async function getDashboardStats(ownerId?: string) {
  const [
    totalProperties,
    occupiedProperties,
    totalTenants,
    activeTenants,
    totalPayments,
    paidPayments,
    pendingPayments,
    overduePayments,
    maintenanceRequests,
  ] = await Promise.all([
    prisma.property.count({
      where: ownerId ? { ownerId } : undefined,
    }),
    prisma.property.count({
      where: {
        status: "OCCUPIED",
        ...(ownerId ? { ownerId } : {}),
      },
    }),
    prisma.tenant.count(),
    prisma.tenant.count({
      where: { status: "ACTIVE" },
    }),
    prisma.payment.count(),
    prisma.payment.count({
      where: { status: "PAID" },
    }),
    prisma.payment.count({
      where: { status: "PENDING" },
    }),
    prisma.payment.count({
      where: { status: "OVERDUE" },
    }),
    prisma.maintenanceRequest.count({
      where: { status: { not: "COMPLETED" } },
    }),
  ])

  const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0
  const collectionRate = totalPayments > 0 ? (paidPayments / totalPayments) * 100 : 0

  return {
    totalProperties,
    occupiedProperties,
    totalTenants,
    activeTenants,
    totalPayments,
    paidPayments,
    pendingPayments,
    overduePayments,
    maintenanceRequests,
    occupancyRate,
    collectionRate,
  }
}
