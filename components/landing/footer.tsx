import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MyShop</h3>
            <p className="text-gray-300">
              Your ultimate shopping destination for quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
              <Youtube className="h-5 w-5 hover:text-red-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
              <Link
                href="/products?category=electronics"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Electronics
              </Link>
              <Link
                href="/products?category=fashion"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Fashion
              </Link>
              <Link href="/products?category=home" className="block text-gray-300 hover:text-white transition-colors">
                Home & Kitchen
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">support@myshop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">123 Shopping St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 MyShop. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  )
}
