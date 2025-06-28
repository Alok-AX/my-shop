import type { Product, ProductsResponse, ProductFormData } from "./schemas"

const API_BASE = "https://dummyjson.com"

export const productsApi = {
  getProducts: async (limit = 10, skip = 0): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return response.json()
  },

  createProduct: async (data: ProductFormData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to create product")
    }
    return response.json()
  },

  updateProduct: async (id: number, data: ProductFormData): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error("Failed to update product")
    }
    return response.json()
  },

  deleteProduct: async (id: number): Promise<{ id: number; isDeleted: boolean }> => {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete product")
    }
    return response.json()
  },
}
