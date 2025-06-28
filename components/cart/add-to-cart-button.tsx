"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/schemas"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
  showQuantity?: boolean
}

export function AddToCartButton({ product, quantity = 1, className, showQuantity = false }: AddToCartButtonProps) {
  const { addItem, setIsOpen } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(quantity)

  const handleAddToCart = () => {
    addItem(product, selectedQuantity)
    setIsAdded(true)

    // Show success state for 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)

    // Open cart sidebar after a short delay
    setTimeout(() => {
      setIsOpen(true)
    }, 500)
  }

  if (product.stock === 0) {
    return (
      <Button disabled className={className}>
        Out of Stock
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      {showQuantity && (
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Quantity:</label>
          <select
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[...Array(Math.min(product.stock, 10))].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button onClick={handleAddToCart} className={className} disabled={isAdded}>
        {isAdded ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  )
}
