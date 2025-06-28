"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useRef } from "react"
import { productSchema, type ProductFormData, type Product } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-products"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface AdminProductFormProps {
  product?: Product
  onSuccess?: () => void
  onCancel?: () => void
}

export function AdminProductForm({ product, onSuccess, onCancel }: AdminProductFormProps) {
  const createProduct = useCreateProduct()
  const updateProduct = useUpdateProduct()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(product?.thumbnail || "")
  const [imagesPreviews, setImagesPreviews] = useState<string[]>(product?.images || [])
  const [uploadingImages, setUploadingImages] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      price: product?.price || 0,
      description: product?.description || "",
      brand: product?.brand || "",
      category: product?.category || "",
      thumbnail: product?.thumbnail || "",
      images: product?.images || [],
    },
  })

  // Simulate image upload (in real app, you'd upload to cloud storage)
  const handleImageUpload = async (files: FileList | null, isMultiple = false) => {
    if (!files || files.length === 0) return

    setUploadingImages(true)

    try {
      const uploadedUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        // Create a preview URL (in real app, upload to cloud storage)
        const previewUrl = URL.createObjectURL(file)

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // In real app, you'd get the actual URL from your storage service
        const uploadedUrl = `https://images.unsplash.com/photo-${Date.now()}-${i}?w=400&h=400&fit=crop`
        uploadedUrls.push(uploadedUrl)
      }

      if (isMultiple) {
        const newImages = [...imagesPreviews, ...uploadedUrls]
        setImagesPreviews(newImages)
        setValue("images", newImages)
      } else {
        setThumbnailPreview(uploadedUrls[0])
        setValue("thumbnail", uploadedUrls[0])
      }
    } catch (error) {
      console.error("Error uploading images:", error)
    } finally {
      setUploadingImages(false)
    }
  }

  const removeImage = (index: number, isThumbnail = false) => {
    if (isThumbnail) {
      setThumbnailPreview("")
      setValue("thumbnail", "")
    } else {
      const newImages = imagesPreviews.filter((_, i) => i !== index)
      setImagesPreviews(newImages)
      setValue("images", newImages)
    }
  }

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

  const isLoading = createProduct.isPending || updateProduct.isPending || uploadingImages

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Product Title *
            </label>
            <Input id="title" {...register("title")} placeholder="Enter product title" />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand *
              </label>
              <Input id="brand" {...register("brand")} placeholder="Enter brand name" />
              {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              {...register("category")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
              <option value="furniture">Furniture</option>
              <option value="tops">Tops</option>
              <option value="womens-dresses">Women's Dresses</option>
              <option value="womens-shoes">Women's Shoes</option>
              <option value="mens-shirts">Men's Shirts</option>
              <option value="mens-shoes">Men's Shoes</option>
              <option value="mens-watches">Men's Watches</option>
              <option value="womens-watches">Women's Watches</option>
              <option value="womens-bags">Women's Bags</option>
              <option value="womens-jewellery">Women's Jewellery</option>
              <option value="sunglasses">Sunglasses</option>
              <option value="automotive">Automotive</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="lighting">Lighting</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <Textarea id="description" {...register("description")} placeholder="Enter product description" rows={4} />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Product Images</h3>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {thumbnailPreview ? (
                <div className="relative">
                  <Image
                    src={thumbnailPreview || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeImage(0, true)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImages}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploadingImages ? "Uploading..." : "Upload Thumbnail"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />
            {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail.message}</p>}
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images (Optional)</label>
            <div className="grid grid-cols-2 gap-4">
              {imagesPreviews.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}

              {imagesPreviews.length < 4 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const input = document.createElement("input")
                      input.type = "file"
                      input.accept = "image/*"
                      input.multiple = true
                      input.onchange = (e) => handleImageUpload((e.target as HTMLInputElement).files, true)
                      input.click()
                    }}
                    disabled={uploadingImages}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
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
