"use client"

import type React from "react"

import Link from "next/link"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"
import { formatPrice, getBrandLogo } from "@/lib/products"

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {

  const { addItem, isLoading } = useCart()
  
  const { toast } = useToast()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.bigCommerceId) {
      toast({
        title: "Error",
        description: "This product cannot be added to cart",
        variant: "destructive",
      })
      return
    }

    try {
      await addItem(product.bigCommerceId)

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 h-full">
        <div className="relative">
          <div className="w-full h-64 bg-white flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : getBrandLogo(product.brand) ? (
              <div className="p-8">
                <img
                  src={getBrandLogo(product.brand) || "/placeholder.svg"}
                  alt={product.brand}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
            ) : (
              <div className="text-4xl font-bold text-slate-400">{product.brand[0]}</div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all rounded-xl backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-6">
          <div className="text-sm text-orange-500 font-medium mb-1">{product.brand}</div>
          <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg min-h-[3.5rem]">
            {product.name}
          </h3>

          {featured && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < 4 ? "text-orange-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-slate-500 ml-2">(156)</span>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900">{formatPrice(product.price)}</span>
            </div>
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            disabled={product.stock === 0 || isLoading}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
