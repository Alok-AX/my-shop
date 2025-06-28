import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { productsApi } from "@/lib/api"
import { ProductDetailClient } from "./product-detail-client"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await productsApi.getProduct(Number.parseInt(params.id))
    return {
      title: `${product.title} – MyShop`,
      description: product.description,
    }
  } catch {
    return {
      title: "Product Not Found – MyShop",
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = Number.parseInt(params.id)

  if (isNaN(id)) {
    notFound()
  }

  try {
    const product = await productsApi.getProduct(id)
    return <ProductDetailClient product={product} />
  } catch {
    notFound()
  }
}
