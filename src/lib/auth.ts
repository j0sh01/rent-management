import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: string
}

export interface AuthTenant {
  id: string
  email: string
  name: string
  propertyId: string | null
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    })

    if (!user) {
      return null
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.password)
    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function authenticateTenant(credentials: LoginCredentials): Promise<AuthTenant | null> {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { email: credentials.email },
    })

    if (!tenant) {
      return null
    }

    const isValidPassword = await bcrypt.compare(credentials.password, tenant.password)
    if (!isValidPassword) {
      return null
    }

    return {
      id: tenant.id,
      email: tenant.email,
      name: tenant.name,
      propertyId: tenant.propertyId,
    }
  } catch (error) {
    console.error("Tenant authentication error:", error)
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}
