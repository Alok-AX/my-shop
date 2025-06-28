import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - MyShop",
  description: "Manage your e-commerce store",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
