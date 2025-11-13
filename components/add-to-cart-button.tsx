"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/products"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function AddToCartButton({ product, variant = "default", size = "lg", className = "" }: AddToCartButtonProps) {
  
  const { addItem, isLoading } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {

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

       console.log('products id : ',product.bigCommerceId);

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={`${variant === "default" ? "flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" : ""} rounded-xl ${className}`}
      disabled={product.stock === 0 || isLoading}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {isLoading ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}
