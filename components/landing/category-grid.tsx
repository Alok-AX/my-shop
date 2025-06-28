import Link from "next/link"
import { Smartphone, Shirt, Home, Sparkles, Dumbbell, Book, Car, Baby } from "lucide-react"

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=electronics",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Fashion",
    icon: Shirt,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=fashion",
    color: "bg-pink-100 text-pink-600",
  },
  {
    name: "Home & Kitchen",
    icon: Home,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=home",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Beauty",
    icon: Sparkles,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=beauty",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=sports",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Books",
    icon: Book,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=books",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Automotive",
    icon: Car,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=automotive",
    color: "bg-gray-100 text-gray-600",
  },
  {
    name: "Baby & Kids",
    icon: Baby,
    image: "/placeholder.svg?height=150&width=150",
    link: "/products?category=baby",
    color: "bg-yellow-100 text-yellow-600",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.name}
                href={category.link}
                className="group flex flex-col items-center p-4 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
                </div>
                <span className="text-sm md:text-base font-medium text-center text-gray-700 group-hover:text-gray-900">
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
