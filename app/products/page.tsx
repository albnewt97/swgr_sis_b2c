import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsListClient } from "@/components/products-list-client"
import { fetchBigCommerceProducts } from "@/lib/bigcommerce/products"
import { validateBigCommerceConfig } from "@/lib/bigcommerce/config"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ProductsPage() {
  // Validate BigCommerce configuration
  const isConfigValid = validateBigCommerceConfig()

  if (!isConfigValid) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Configuration Error</h1>
            <p className="text-slate-600 mb-8">BigCommerce integration is not properly configured.</p>
            <p className="text-sm text-slate-500">Please check your environment variables.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Fetch products from BigCommerce
  let products = []
  let error = null

  try {
    products = await fetchBigCommerceProducts()
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to fetch products"
    console.error("Error fetching products:", e)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-2">
            All Products
          </h1>
          <p className="text-slate-600">Browse our complete range of safety equipment and industrial supplies</p>
          {products.length > 0 && <p className="text-sm text-slate-500 mt-2">Found {products.length} products</p>}
        </div>

        {error ? (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Products</h2>
              <p className="text-slate-600 mb-4">{error}</p>
              <p className="text-sm text-slate-500">
                Please ensure your BigCommerce store is properly configured and has products.
              </p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h2>
              <p className="text-slate-600 mb-4">
                Your BigCommerce store doesn't have any products yet, or they're not visible to the storefront.
              </p>
              <p className="text-sm text-slate-500">Add products in your BigCommerce admin panel to see them here.</p>
            </div>
          </div>
        ) : (
          <ProductsListClient products={products} />
        )}
      </main>

      <Footer />
    </div>
  )
}
