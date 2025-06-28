"use client"

import { useProducts } from "@/hooks/use-products"
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

export function AdminDashboard() {
  const { data: productsData } = useProducts(100, 0) // Get more products for stats

  const stats = [
    {
      title: "Total Products",
      value: productsData?.total || 0,
      icon: Package,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Orders",
      value: "1,234",
      icon: ShoppingCart,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Total Users",
      value: "5,678",
      icon: Users,
      color: "bg-purple-500",
      change: "+15%",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "+23%",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">Order #{1000 + i}</p>
                  <p className="text-sm text-gray-600">Customer {i}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-3">
            {productsData?.products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium line-clamp-1">{product.title}</p>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${product.price}</p>
                  <p className="text-sm text-gray-600">{product.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
