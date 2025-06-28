import { HeroSection } from "@/components/landing/hero-section"
import { CategoryGrid } from "@/components/landing/category-grid"
import { FeaturedProducts } from "@/components/landing/featured-products"
import { DealsSection } from "@/components/landing/deals-section"
import { BrandsSection } from "@/components/landing/brands-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <DealsSection />
      <BrandsSection />
      <Footer />
    </div>
  )
}
