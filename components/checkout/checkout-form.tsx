"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Truck, User } from "lucide-react"

const checkoutSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Shipping Address
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 digits"),
  country: z.string().min(1, "Country is required"),

  // Payment Information
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
  cardName: z.string().min(1, "Cardholder name is required"),

  // Optional
  notes: z.string().optional(),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  isProcessing: boolean
}

export function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center mb-4">
          <User className="mr-2 h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <Input {...register("firstName")} placeholder="John" />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <Input {...register("lastName")} placeholder="Doe" />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input {...register("email")} type="email" placeholder="john@example.com" />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input {...register("phone")} placeholder="+1 (555) 123-4567" />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center mb-4">
          <Truck className="mr-2 h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Shipping Address</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input {...register("address")} placeholder="123 Main Street" />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <Input {...register("city")} placeholder="New York" />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <Input {...register("state")} placeholder="NY" />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <Input {...register("zipCode")} placeholder="10001" />
              {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <Input {...register("country")} placeholder="United States" />
              {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center mb-4">
          <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Payment Information</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <Input {...register("cardNumber")} placeholder="1234 5678 9012 3456" maxLength={19} />
            {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <Input {...register("expiryDate")} placeholder="MM/YY" maxLength={5} />
              {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <Input {...register("cvv")} placeholder="123" maxLength={4} />
              {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
            <Input {...register("cardName")} placeholder="John Doe" />
            {errors.cardName && <p className="text-red-600 text-sm mt-1">{errors.cardName.message}</p>}
          </div>
        </div>
      </div>

      {/* Order Notes */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Order Notes (Optional)</h2>
        <Textarea {...register("notes")} placeholder="Any special instructions for your order..." rows={3} />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full py-3 text-lg" disabled={isProcessing}>
        {isProcessing ? "Processing Order..." : "Place Order"}
      </Button>
    </form>
  )
}
