"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { CartSidebar } from "./cart-sidebar"

export function CartButton() {
  const { getTotalItems, setIsOpen, isOpen } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <>
      <Button variant="ghost" size="sm" className="relative flex items-center" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Button>
      <CartSidebar />
    </>
  )
}
