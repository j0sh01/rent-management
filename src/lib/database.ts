import { prisma } from "./prisma"

// Properties
export async function getProperties() {
  return prisma.property.findMany({
    include: {
      owner: true,
      tenants: {
        include: {
          user: true,
        },
      },
      _count: {
        select: {
          tenants: true,
          payments: true,
        },
      },
    },
  })
}

export async function getPropertyById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      owner: true,
      tenants: {
        include: {
          user: true,
          payments: true,
        },
      },
      payments: {
        include: {
          tenant: {
            include: {
              user: true,
            },
          },
        },
      },
      maintenanceRequests: {
        include: {
          tenant: {
            include: {
              user: true,
            },
          },
        },
      },
      leases: {
        include: {
          tenant: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })
}

// Tenants
export async function getTenants() {
  return prisma.tenant.findMany({
    include: {
      user: true,
      property: true,
      payments: true,
      _count: {
        select: {
          payments: true,
          maintenanceRequests: true,
        },
      },
    },
  })
}

export async function getTenantById(id: string) {
  return prisma.tenant.findUnique({
    where: { id },
    include: {
      user: true,
      property: true,
      payments: {
        orderBy: {
          dueDate: "desc",
        },
      },
      maintenanceRequests: {
        orderBy: {
          createdAt: "desc",
        },
      },
      leases: {
        orderBy: {
          startDate: "desc",
        },
      },
    },
  })
}

// Payments
export async function getPayments() {
  return prisma.payment.findMany({
    include: {
      property: true,
      tenant: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      dueDate: "desc",
    },
  })
}

export async function getOverduePayments() {
  return prisma.payment.findMany({
    where: {
      status: "OVERDUE",
    },
    include: {
      property: true,
      tenant: {
        include: {
          user: true,
        },
      },
    },
  })
}

// Activities
export async function getRecentActivities(limit = 10) {
  return prisma.activity.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      property: true,
    },
  })
}

// Dashboard stats
export async function getDashboardStats() {
  const [
    totalProperties,
    occupiedProperties,
    totalTenants,
    activeTenants,
    totalPayments,
    paidPayments,
    overduePayments,
    pendingMaintenance,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: "OCCUPIED" } }),
    prisma.tenant.count(),
    prisma.tenant.count({ where: { status: "ACTIVE" } }),
    prisma.payment.count(),
    prisma.payment.count({ where: { status: "PAID" } }),
    prisma.payment.count({ where: { status: "OVERDUE" } }),
    prisma.maintenanceRequest.count({ where: { status: "PENDING" } }),
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
    overduePayments,
    pendingMaintenance,
    occupancyRate,
    collectionRate,
  }
}

// Maintenance requests
export async function getMaintenanceRequests() {
  return prisma.maintenanceRequest.findMany({
    include: {
      property: true,
      tenant: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

// Notifications
export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  })
}
