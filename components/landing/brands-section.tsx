import Image from "next/image"

const brands = [
  { name: "Apple", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Samsung", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Nike", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Adidas", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Sony", logo: "/placeholder.svg?height=80&width=120" },
  { name: "LG", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Puma", logo: "/placeholder.svg?height=80&width=120" },
  { name: "HP", logo: "/placeholder.svg?height=80&width=120" },
]

export function BrandsSection() {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Top Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={80}
                className="max-w-full h-auto group-hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
