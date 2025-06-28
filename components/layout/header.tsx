"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, User, Menu, X, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartButton } from "@/components/cart/cart-button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Deliver to 110001
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Download App</span>
            <span>Become a Seller</span>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600">MyShop</div>
            <div className="hidden sm:block text-xs text-gray-500">
              Explore <span className="text-yellow-500">Plus</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border-2 border-blue-200 focus:border-blue-500 rounded-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-full px-4 bg-blue-600 hover:bg-blue-700 rounded-l-none"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Login */}
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center">
              <User className="h-4 w-4 mr-1" />
              Login
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Wishlist
            </Button>

            {/* Cart */}
            <CartButton />

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 border-2 border-blue-200 focus:border-blue-500"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-0 top-0 h-full px-4 bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="hidden md:flex items-center space-x-8 py-2">
            <Link href="/products" className="text-sm hover:text-blue-600 transition-colors">
              All Products
            </Link>
            <Link href="/products?category=electronics" className="text-sm hover:text-blue-600 transition-colors">
              Electronics
            </Link>
            <Link href="/products?category=fashion" className="text-sm hover:text-blue-600 transition-colors">
              Fashion
            </Link>
            <Link href="/products?category=home" className="text-sm hover:text-blue-600 transition-colors">
              Home & Kitchen
            </Link>
            <Link href="/products?category=beauty" className="text-sm hover:text-blue-600 transition-colors">
              Beauty
            </Link>
            <Link href="/products?category=sports" className="text-sm hover:text-blue-600 transition-colors">
              Sports
            </Link>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link href="/products" className="text-sm hover:text-blue-600 transition-colors">
                  All Products
                </Link>
                <Link href="/products?category=electronics" className="text-sm hover:text-blue-600 transition-colors">
                  Electronics
                </Link>
                <Link href="/products?category=fashion" className="text-sm hover:text-blue-600 transition-colors">
                  Fashion
                </Link>
                <Link href="/products?category=home" className="text-sm hover:text-blue-600 transition-colors">
                  Home & Kitchen
                </Link>
                <Link href="/products?category=beauty" className="text-sm hover:text-blue-600 transition-colors">
                  Beauty
                </Link>
                <Link href="/products?category=sports" className="text-sm hover:text-blue-600 transition-colors">
                  Sports
                </Link>
                <hr />
                <Link href="/login" className="text-sm hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link href="/wishlist" className="text-sm hover:text-blue-600 transition-colors">
                  Wishlist
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
