"use client"

import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const featuredProducts = [
  {
    id: "1",
    sku: "HV10040009",
    name: "Leo Tawstock Iso 20471 Class 3 Anorak",
    brand: "Leo",
    price: 31.43,
    originalPrice: 20.95,
    rating: 4.8,
    reviews: 156,
    image: "/products/product-1.jpg",
    badge: "Best Seller",
    inStock: true,
    category: "Hi-Vis Workwear",
    type: "Jacket",
    description:
      "Railway Group Standard RIS-3279-TOM. Warm baffle lining, Lycra storm cuff, Hood in collar, Drop tail back.",
  },
  {
    id: "2",
    sku: "AL010107",
    name: "Leo Clovelly + Torrington 3-in-1 Anorak + Bodywarmer",
    brand: "Leo",
    price: 89.01,
    originalPrice: 59.34,
    rating: 4.9,
    reviews: 89,
    image: "/products/product-2.jpg",
    badge: "Popular",
    inStock: true,
    category: "Hi-Vis Workwear",
    type: "Jacket",
    description:
      "Bodywarmer zips into the Anorak to provide additional warmth without compromising freedom of movement.",
  },
  {
    id: "3",
    sku: "WW03050402",
    name: "Leo Clovelly + Hartland 3-in-1 Anorak + Fleece Jacket",
    brand: "Leo",
    price: 91.89,
    originalPrice: 61.26,
    rating: 4.7,
    reviews: 134,
    image: "/products/product-3.jpg",
    badge: "New",
    inStock: true,
    category: "Hi-Vis Workwear",
    type: "Jacket",
    description:
      "Fleece zips into the Anorak to provide additional warmth. Outer Clovelly (A04) Anorak made from waterproof, windproof and breathable fabric.",
  },
  {
    id: "4",
    sku: "HV02020358",
    name: "Leo Clovelly Iso 20471 Class 3 Breathable Executive Anorak",
    brand: "Leo",
    price: 67.31,
    originalPrice: 44.87,
    rating: 4.9,
    reviews: 67,
    image: "/products/product-4.jpg",
    inStock: true,
    category: "Hi-Vis Workwear",
    type: "Jacket",
    description:
      "Railway Group Standard RIS-3279-TOM. Waterproof, windproof & breathable fabric. Meets the requirements of the rain tower test.",
  },
]

export function ProductShowcase() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium hi-vis workwear from Leo, trusted by industry leaders worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products?search=${encodeURIComponent(product.sku)}`}>
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50">
                <div className="relative">
                  <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {product.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.badge === "Best Seller"
                          ? "bg-gradient-to-r from-orange-500 to-orange-600"
                          : product.badge === "New"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-blue-500 to-blue-600"
                      } shadow-lg`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all rounded-xl backdrop-blur-sm"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="text-sm text-orange-500 font-medium mb-1">{product.brand}</div>
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-orange-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-500 ml-2">({product.reviews})</span>
                  </div>

                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-slate-900">£{product.price.toFixed(2)}</span>
                      
                    </div>
                    <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    disabled={!product.inStock}
                    onClick={(e) => e.preventDefault()}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
