import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategoryMenu } from "@/components/category-menu"
import { BrandShowcase } from "@/components/brand-showcase"
import { ProductShowcase } from "@/components/product-showcase"
import { FeaturedCategories } from "@/components/featured-categories"
import { WhyChooseSIS } from "@/components/why-choose-sis"
import { BrandsRange } from "@/components/brands-range"
import { Footer } from "@/components/footer"

export default function HomePage() {
  console.log("Store Hash:", process.env.BIGCOMMERCE_STORE_HASH);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <CategoryMenu />
        <BrandShowcase />
        <ProductShowcase />
        <FeaturedCategories />
        <WhyChooseSIS />
        <BrandsRange />
      </main>
      <Footer />
    </div>
  )
}
