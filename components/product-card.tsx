import Link from "next/link"
import Image from "next/image"
import { Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/schemas"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

interface ProductCardProps {
  product: Product
  showDiscount?: boolean
}

export function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const discountedPrice = showDiscount ? product.price * (1 - product.discountPercentage / 100) : product.price

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {showDiscount && product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">${discountedPrice.toFixed(2)}</span>
              {showDiscount && product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="text-xs text-gray-600">{product.brand}</p>
          </div>

          <div className="text-right">
            <div
              className={`text-xs px-2 py-1 rounded ${
                product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>
        </div>

        <AddToCartButton product={product} className="w-full" />
      </div>
    </div>
  )
}
