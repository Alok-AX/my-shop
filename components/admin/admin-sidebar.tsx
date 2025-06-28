"use client"

import { X, LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "users", label: "Users", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminSidebar({ currentView, onViewChange, isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30",
          "lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  currentView === item.id && "bg-blue-600 text-white hover:bg-blue-700",
                )}
                onClick={() => {
                  onViewChange(item.id)
                  onClose()
                }}
              >
                <IconComponent className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
