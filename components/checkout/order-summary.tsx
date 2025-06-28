"use client"

import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"

export function OrderSummary() {
  const { items, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="bg-white rounded-lg border p-6 sticky top-4">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Items */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-3">
            <Image
              src={item.product.thumbnail || "/placeholder.svg"}
              alt={item.product.title}
              width={50}
              height={50}
              className="rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {shipping > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!</p>
        </div>
      )}
    </div>
  )
}
