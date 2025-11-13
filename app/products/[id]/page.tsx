import Link from "next/link"
import { Heart, Share2, ChevronLeft, Package, Shield, Truck } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { fetchBigCommerceProduct } from "@/lib/bigcommerce/products"
import { getBrandLogo, formatPrice } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"

export const revalidate = 60

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await fetchBigCommerceProduct(id)

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-8">The product you're looking for doesn't exist or is no longer available.</p>
          <Link href="/products">
            <Button>View All Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const brandLogo = getBrandLogo(product.brand)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center text-sm text-slate-600">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <ChevronLeft className="h-4 w-4 rotate-180 mx-2" />
          <Link href="/products" className="hover:text-orange-500">
            Products
          </Link>
          <ChevronLeft className="h-4 w-4 rotate-180 mx-2" />
          <span className="text-slate-900 line-clamp-1">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-slate-50 flex items-center justify-center p-12">
                  {product.image ? (
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : brandLogo ? (
                    <img
                      src={brandLogo || "/placeholder.svg"}
                      alt={product.brand}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-6xl font-bold">{product.brand[0]}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div>
            <Badge className="mb-4">{product.brand}</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-orange-500">{formatPrice(product.price)}</span>
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-700">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {product.description && (
              <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-line">{product.description}</p>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-5 w-5 text-orange-500" />
                <span className="text-slate-700">SKU: {product.sku}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-orange-500" />
                <span className="text-slate-700">Category: {product.category}</span>
              </div>
              {product.subCategory && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-5 w-5 text-orange-500" />
                  <span className="text-slate-700">Type: {product.subCategory}</span>
                </div>
              )}
            </div>

            <Separator className="mb-8" />

            <div className="flex gap-4 mb-8">

              <AddToCartButton product={product} />
              
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Truck className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Free Delivery</h3>
                    <p className="text-sm text-slate-600">On orders over £300. Delivery within 2-3 business days.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        {((product.features && product.features.length > 0) ||
          (product.specifications && Object.keys(product.specifications).length > 0)) && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Product Information</h2>

              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-slate-200 pb-3">
                        <span className="font-medium text-slate-700 block mb-1">{key}:</span>
                        <span className="text-slate-600 whitespace-pre-line">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
