"use client"

import { useState, useEffect } from "react"
import { useProducts } from "@/hooks/use-products"
import { ProductCard } from "@/components/product-card"
import { Clock } from "lucide-react"

export function DealsSection() {
  const { data, isLoading } = useProducts(6, 10)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold">⚡ Flash Deals</h2>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-mono">Loading...</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse border">
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">⚡ Flash Deals</h2>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="text-lg font-mono">
                {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>
          <p className="text-lg opacity-90 mt-2">Limited time offers - Grab them before they're gone!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))}
        </div>
      </div>
    </section>
  )
}
