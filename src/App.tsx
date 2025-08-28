import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/login"
import DashboardLayout from "./layouts/dashboard-layout"
import Dashboard from "./pages/dashboard"
import Properties from "./pages/properties"
import PropertyDetails from "./pages/property-details"
import NewProperty from "./pages/new-property"
import EditProperty from "./pages/edit-property"
import GenerateLease from "./pages/generate-lease"
import Tenants from "./pages/tenants"
import TenantDetails from "./pages/tenant-details"
import NewTenant from "./pages/new-tenant"
import UploadDocument from "./pages/upload-document"
import Payments from "./pages/payments"
import NewPayment from "./pages/new-payment"
import Reports from "./pages/reports"
import PropertyReport from "./pages/property-report"
import TenantReport from "./pages/tenant-report"

// Tenant Portal
import TenantPortalLayout from "./layouts/tenant-portal-layout"
import TenantLogin from "./pages/tenant-portal/login"
import TenantDashboard from "./pages/tenant-portal/dashboard"
import TenantProperty from "./pages/tenant-portal/property"
import TenantPayments from "./pages/tenant-portal/payments"
import TenantDocuments from "./pages/tenant-portal/documents"

function App() {
  return (
    <Routes>
      {/* Main App Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        <Route path="properties/new" element={<NewProperty />} />
        <Route path="properties/:id/edit" element={<EditProperty />} />
        <Route path="properties/:id/lease" element={<GenerateLease />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="tenants/:id" element={<TenantDetails />} />
        <Route path="tenants/new" element={<NewTenant />} />
        <Route path="tenants/:id/upload" element={<UploadDocument />} />
        <Route path="payments" element={<Payments />} />
        <Route path="payments/new" element={<NewPayment />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports/property/:id" element={<PropertyReport />} />
        <Route path="reports/tenant/:id" element={<TenantReport />} />
      </Route>

      {/* Tenant Portal Routes */}
      <Route path="/tenant-portal" element={<Navigate to="/tenant-portal/login" replace />} />
      <Route path="/tenant-portal/login" element={<TenantLogin />} />
      <Route path="/tenant-portal" element={<TenantPortalLayout />}>
        <Route path="dashboard" element={<TenantDashboard />} />
        <Route path="property" element={<TenantProperty />} />
        <Route path="payments" element={<TenantPayments />} />
        <Route path="documents" element={<TenantDocuments />} />
      </Route>
    </Routes>
  )
}

export default App
