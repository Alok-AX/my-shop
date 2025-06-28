"use client"

import { Menu, Bell, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AdminHeaderProps {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/admin" className="flex items-center space-x-2">
          <div className="text-xl font-bold text-blue-600">MyShop Admin</div>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          <Link href="/">
            <Button variant="ghost" size="icon" title="Back to Store">
              <LogOut className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
