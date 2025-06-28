"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { productsApi } from "@/lib/api"
import type { ProductFormData } from "@/lib/schemas"

export function useProducts(limit = 10, skip = 0) {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => productsApi.getProducts(limit, skip),
  })
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductFormData }) => productsApi.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", id] })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.removeQueries({ queryKey: ["product", id] })
    },
  })
}
