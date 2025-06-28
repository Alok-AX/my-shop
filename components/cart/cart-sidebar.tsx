"use client"

import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CartSidebar() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
  const router = useRouter()

  const handleCheckout = () => {
    setIsOpen(false)
    router.push("/checkout")
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some products to get started</p>
              <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <Link href={`/products/${item.product.id}`} onClick={() => setIsOpen(false)}>
                    <Image
                      src={item.product.thumbnail || "/placeholder.svg"}
                      alt={item.product.title}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product.id}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-gray-500">{item.product.brand}</p>
                    <p className="text-sm font-semibold text-green-600">${item.product.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
