"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductForm } from "@/components/product-form"
import { DeleteProductDialog } from "@/components/delete-product-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Product } from "@/lib/schemas"
import Image from "next/image"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteSuccess = () => {
    router.push("/products")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Image
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              width={400}
              height={400}
              className="w-full rounded-lg object-cover"
            />
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <Image
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded object-cover aspect-square"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)} rating</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Category</h3>
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Stock</h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

            <div className="space-y-4">
              <AddToCartButton product={product} showQuantity className="w-full" />
              <Button variant="outline" className="w-full bg-transparent">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={product}
            onSuccess={() => setShowEditDialog(false)}
            onCancel={() => setShowEditDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <DeleteProductDialog product={product} open={showDeleteDialog} onOpenChange={setShowDeleteDialog} />
    </div>
  )
}
