"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const banners = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 80% Off on Smartphones, Laptops & More",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Shop Now",
    link: "/products?category=electronics",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Fashion Fiesta",
    subtitle: "Trending Styles at Unbeatable Prices",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Explore Fashion",
    link: "/products?category=fashion",
    bgColor: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "Home Makeover",
    subtitle: "Transform Your Space with Our Collection",
    image: "/placeholder.svg?height=400&width=800",
    cta: "Shop Home",
    link: "/products?category=home",
    bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`w-full h-full ${banner.bgColor} flex items-center`}>
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white space-y-4">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">{banner.title}</h1>
                  <p className="text-lg md:text-xl opacity-90">{banner.subtitle}</p>
                  <Link href={banner.link}>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <Image
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
