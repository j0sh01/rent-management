import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar || undefined,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function createUser(data: {
  email: string
  password: string
  name: string
  role?: string
  phone?: string
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10)

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: (data.role as any) || "TENANT",
    },
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      tenantProfile: {
        include: {
          property: true,
        },
      },
    },
  })
}
