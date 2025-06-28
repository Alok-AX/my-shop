"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, type ProductFormData, type Product } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products"
import { useEffect } from "react"

interface ProductFormProps {
  product?: Product
  onSuccess?: () => void
  onCancel?: () => void
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      brand: "",
      category: "",
      thumbnail: "",
      images: [],
    },
  })

  useEffect(() => {
    if (product) {
      setValue("title", product.title)
      setValue("price", product.price)
      setValue("description", product.description)
      setValue("brand", product.brand)
      setValue("category", product.category)
      setValue("thumbnail", product.thumbnail)
      setValue("images", product.images)
    }
  }, [product, setValue])

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, data })
      } else {
        await createProduct.mutateAsync(data)
      }
      reset()
      onSuccess?.()
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  const isLoading = createProduct.isPending || updateProduct.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input id="title" {...register("title")} className="mt-1" placeholder="Product title" />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="mt-1"
          placeholder="0.00"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
          Brand
        </label>
        <Input id="brand" {...register("brand")} className="mt-1" placeholder="Product brand" />
        {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <Input id="category" {...register("category")} className="mt-1" placeholder="Product category" />
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Thumbnail URL
        </label>
        <Input id="thumbnail" {...register("thumbnail")} className="mt-1" placeholder="https://example.com/image.jpg" />
        {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          className="mt-1"
          placeholder="Product description"
          rows={3}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
