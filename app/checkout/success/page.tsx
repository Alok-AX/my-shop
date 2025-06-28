"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Package, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  useEffect(() => {
    // You could track the conversion here for analytics
    console.log("Order completed successfully")
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Order Details</h2>
        <p className="text-gray-600">
          Order Number: <span className="font-mono font-semibold">#{orderNumber}</span>
        </p>
        <p className="text-gray-600">You will receive a confirmation email shortly.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border rounded-lg p-6">
          <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Processing</h3>
          <p className="text-sm text-gray-600">Your order is being prepared for shipment.</p>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Shipping</h3>
          <p className="text-sm text-gray-600">Estimated delivery: 3-5 business days.</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link href="/products">
          <Button className="w-full md:w-auto">Continue Shopping</Button>
        </Link>
        <div>
          <Link href="/orders" className="text-blue-600 hover:text-blue-800">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  )
}
