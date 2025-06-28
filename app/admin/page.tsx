"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ProductsManagement } from "@/components/admin/products-management"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { OrdersManagement } from "@/components/admin/orders-management"
import { UsersManagement } from "@/components/admin/users-management"

type AdminView = "dashboard" | "products" | "orders" | "users"

export default function AdminPage() {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <AdminDashboard />
      case "products":
        return <ProductsManagement />
      case "orders":
        return <OrdersManagement />
      case "users":
        return <UsersManagement />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <AdminSidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
