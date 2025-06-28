"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Plus, Edit, Trash2, Eye, Grid, List } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { DataTable, type Column } from "@/components/table/data-table"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductForm } from "@/components/product-form"
import { DeleteProductDialog } from "@/components/delete-product-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Product } from "@/lib/schemas"
import Image from "next/image"

const ITEMS_PER_PAGE = 12

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")

  const skip = (currentPage - 1) * ITEMS_PER_PAGE
  const { data, isLoading, error } = useProducts(ITEMS_PER_PAGE, skip)

  // Filter products based on search and category
  const filteredProducts =
    data?.products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === "" || product.category.toLowerCase().includes(selectedCategory.toLowerCase())

      return matchesSearch && matchesCategory
    }) || []

  useEffect(() => {
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    if (search) setSearchQuery(search)
    if (category) setSelectedCategory(category)
  }, [searchParams])

  const columns: Column<Product>[] = [
    {
      key: "thumbnail",
      header: "Image",
      render: (value) => (
        <Image
          src={value || "/placeholder.svg"}
          alt="Product"
          width={40}
          height={40}
          className="rounded object-cover"
        />
      ),
    },
    {
      key: "title",
      header: "Title",
      sortable: true,
    },
    {
      key: "brand",
      header: "Brand",
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      render: (value) => `${value.toFixed(1)} ⭐`,
    },
    {
      key: "stock",
      header: "Stock",
      render: (value) => <span className={value > 0 ? "text-green-600" : "text-red-600"}>{value}</span>,
    },
    {
      key: "id",
      header: "Actions",
      render: (_, product) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/products/${product.id}`)
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              setEditingProduct(product)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
              setDeletingProduct(product)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">Error loading products: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">All Products – MyShop</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home & Kitchen</option>
            <option value="beauty">Beauty</option>
            <option value="sports">Sports</option>
          </select>
          <div className="flex items-center space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <DataTable
          data={filteredProducts}
          columns={columns}
          onRowClick={(product) => router.push(`/products/${product.id}`)}
        />
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700">
          Showing {skip + 1} to {Math.min(skip + ITEMS_PER_PAGE, data?.total || 0)} of {data?.total || 0} products
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Create Product Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm onSuccess={() => setShowCreateDialog(false)} onCancel={() => setShowCreateDialog(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct || undefined}
            onSuccess={() => setEditingProduct(null)}
            onCancel={() => setEditingProduct(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <DeleteProductDialog
        product={deletingProduct}
        open={!!deletingProduct}
        onOpenChange={() => setDeletingProduct(null)}
      />
    </div>
  )
}
