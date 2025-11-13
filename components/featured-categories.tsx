import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    title: "Hi Vis Workwear",
    description: "High visibility clothing including jackets, vests, trousers, and protective workwear",
    image: "/hi-vis-yellow-safety-workwear.jpg",
    itemCount: "800+ items",
    link: "/products?category=Hi Vis Workwear",
  },
  {
    title: "Flame Retardant",
    description: "Fire-resistant clothing and protective gear for high-risk environments",
    image: "/flame-retardant-safety-clothing.jpg",
    itemCount: "300+ items",
    link: "/products?category=Flame Retardant",
  },
  {
    title: "Footwear",
    description: "Safety boots, wellingtons, and protective footwear for all industries",
    image: "/steel-toe-safety-boots.jpg",
    itemCount: "600+ items",
    link: "/products?category=Footwear",
  },
  {
    title: "Personal Protective Equipment",
    description: "Comprehensive PPE including helmets, gloves, eyewear, and respiratory protection",
    image: "/ppe-safety-equipment-helmet-gloves.jpg",
    itemCount: "2,500+ items",
    link: "/products?category=Personal Protective Equipment",
  },
  {
    title: "Corporate Clothing",
    description: "Professional corporate wear and branded clothing solutions",
    image: "/corporate-business-clothing.jpg",
    itemCount: "500+ items",
    link: "/products?category=Corporate Clothing",
  },
  {
    title: "Women's Workwear",
    description: "Specialized workwear designed for women across all industries",
    image: "/womens-safety-workwear.jpg",
    itemCount: "400+ items",
    link: "/products?category=Womens Workwear",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Shop By Category
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Browse our comprehensive range of industrial workwear and safety equipment across all major categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={index} href={category.link}>
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden h-full border-0 bg-gradient-to-br from-white to-slate-50 hover:from-orange-50 hover:to-blue-50">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {category.itemCount}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{category.description}</p>
                  <div className="flex items-center text-orange-500 font-semibold group-hover:text-blue-600 transition-colors">
                    <span>Explore Products </span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
