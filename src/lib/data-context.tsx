"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  getProperties,
  getTenants,
  getPayments,
  getRecentActivities,
  getDashboardStats,
  getMaintenanceRequests,
} from "./database"

interface DataContextType {
  properties: any[]
  tenants: any[]
  payments: any[]
  activities: any[]
  maintenanceRequests: any[]
  dashboardStats: any
  loading: boolean
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<any[]>([])
  const [tenants, setTenants] = useState<any[]>([])
  const [payments, setPayments] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [maintenanceRequests, setMaintenanceRequests] = useState<any[]>([])
  const [dashboardStats, setDashboardStats] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const refreshData = async () => {
    try {
      setLoading(true)
      const [propertiesData, tenantsData, paymentsData, activitiesData, maintenanceData, statsData] = await Promise.all(
        [
          getProperties(),
          getTenants(),
          getPayments(),
          getRecentActivities(),
          getMaintenanceRequests(),
          getDashboardStats(),
        ],
      )

      setProperties(propertiesData)
      setTenants(tenantsData)
      setPayments(paymentsData)
      setActivities(activitiesData)
      setMaintenanceRequests(maintenanceData)
      setDashboardStats(statsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <DataContext.Provider
      value={{
        properties,
        tenants,
        payments,
        activities,
        maintenanceRequests,
        dashboardStats,
        loading,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
