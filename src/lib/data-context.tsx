"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { demoData } from "./demo-data"
import type { Property, Tenant, Payment, Activity } from "./types"

interface DataContextType {
  properties: Property[]
  tenants: Tenant[]
  payments: Payment[]
  activities: Activity[]
  loading: boolean
  error: string | null
  // Methods for updating data
  addProperty: (property: Omit<Property, "id">) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  addTenant: (tenant: Omit<Tenant, "id">) => void
  updateTenant: (id: string, updates: Partial<Tenant>) => void
  addPayment: (payment: Omit<Payment, "id">) => void
  updatePayment: (id: string, updates: Partial<Payment>) => void
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        setLoading(true)
        // In a real app, this would be API calls
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setProperties(demoData.properties)
        setTenants(demoData.tenants)
        setPayments(demoData.payments)
        setActivities(demoData.activities)
      } catch (err) {
        setError("Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const addProperty = (property: Omit<Property, "id">) => {
    const newProperty: Property = {
      ...property,
      id: `prop_${Date.now()}`,
    }
    setProperties((prev) => [newProperty, ...prev])

    addActivity({
      type: "property_created",
      description: `Property "${property.name}" was created`,
      userId: "current-user-id",
    })
  }

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((property) => (property.id === id ? { ...property, ...updates } : property)))

    addActivity({
      type: "property_updated",
      description: `Property was updated`,
      userId: "current-user-id",
    })
  }

  const addTenant = (tenant: Omit<Tenant, "id">) => {
    const newTenant: Tenant = {
      ...tenant,
      id: `tenant_${Date.now()}`,
    }
    setTenants((prev) => [newTenant, ...prev])

    addActivity({
      type: "tenant_created",
      description: `Tenant "${tenant.name}" was added`,
      userId: "current-user-id",
    })
  }

  const updateTenant = (id: string, updates: Partial<Tenant>) => {
    setTenants((prev) => prev.map((tenant) => (tenant.id === id ? { ...tenant, ...updates } : tenant)))

    addActivity({
      type: "tenant_updated",
      description: `Tenant information was updated`,
      userId: "current-user-id",
    })
  }

  const addPayment = (payment: Omit<Payment, "id">) => {
    const newPayment: Payment = {
      ...payment,
      id: `payment_${Date.now()}`,
    }
    setPayments((prev) => [newPayment, ...prev])

    addActivity({
      type: "payment_created",
      description: `Payment of $${payment.amount} was recorded`,
      userId: "current-user-id",
    })
  }

  const updatePayment = (id: string, updates: Partial<Payment>) => {
    setPayments((prev) => prev.map((payment) => (payment.id === id ? { ...payment, ...updates } : payment)))

    if (updates.status === "paid") {
      addActivity({
        type: "payment_received",
        description: `Payment was marked as paid`,
        userId: "current-user-id",
      })
    }
  }

  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
    setActivities((prev) => [newActivity, ...prev])
  }

  const value: DataContextType = {
    properties,
    tenants,
    payments,
    activities,
    loading,
    error,
    addProperty,
    updateProperty,
    addTenant,
    updateTenant,
    addPayment,
    updatePayment,
    addActivity,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
