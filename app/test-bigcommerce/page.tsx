import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { fetchBigCommerceProducts } from "@/lib/bigcommerce/products"
import { validateBigCommerceConfig } from "@/lib/bigcommerce/config"
import { Card, CardContent } from "@/components/ui/card"

export const revalidate = 0 // Don't cache this page

export default async function TestBigCommercePage() {
  const isConfigValid = validateBigCommerceConfig()

  let products = []
  let error = null
  let fetchTime = 0

  if (isConfigValid) {
    const startTime = Date.now()
    try {
      products = await fetchBigCommerceProducts()
      fetchTime = Date.now() - startTime
    } catch (e) {
      error = e instanceof Error ? e.message : "Unknown error"
    }
  }

  const categories = [...new Set(products.map((p) => p.category))].sort()
  const brands = [...new Set(products.map((p) => p.brand))].sort()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">BigCommerce Integration Test</h1>

        {/* Configuration Status */}
        <Card className={`mb-8 ${isConfigValid ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Configuration Status</h2>
            <div className="space-y-2">
              <p>
                <strong>Status:</strong>{" "}
                <span className={isConfigValid ? "text-green-600" : "text-red-600"}>
                  {isConfigValid ? "✓ Valid" : "✗ Invalid"}
                </span>
              </p>
              <p>
                <strong>Store Hash:</strong> xrcsa1wme9
              </p>
              <p>
                <strong>GraphQL Endpoint:</strong> https://store-xrcsa1wme9.mybigcommerce.com/graphql
              </p>
              <p>
                <strong>Token:</strong> {isConfigValid ? "✓ Configured" : "✗ Missing"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Products Summary */}
        {error ? (
          <Card className="bg-red-50 border-red-200 mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="text-slate-700 mb-4">{error}</p>
              <div className="text-sm text-slate-600">
                <p className="mb-2">Common issues:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Invalid API token</li>
                  <li>CORS configuration in BigCommerce</li>
                  <li>Store has no products</li>
                  <li>Network connectivity issues</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Products Summary</h2>
              <div className="space-y-2">
                <p>
                  <strong>Total Products:</strong> {products.length}
                </p>
                <p>
                  <strong>Categories:</strong> {categories.length}
                </p>
                <p>
                  <strong>Brands:</strong> {brands.length}
                </p>
                <p>
                  <strong>Fetch Time:</strong> {fetchTime}ms
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {products.length > 0 && (
          <>
            {/* Categories */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Categories ({categories.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat).length
                    return (
                      <div key={cat} className="text-sm bg-slate-100 px-3 py-2 rounded">
                        {cat} <span className="text-slate-500">({count})</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Brands */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Brands ({brands.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {brands.map((brand) => {
                    const count = products.filter((p) => p.brand === brand).length
                    return (
                      <div key={brand} className="text-sm bg-slate-100 px-3 py-2 rounded">
                        {brand} <span className="text-slate-500">({count})</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sample Products */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Sample Products (First 5)</h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="border-b border-slate-200 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg">{product.name}</h4>
                          <p className="text-sm text-slate-600">SKU: {product.sku}</p>
                          <p className="text-sm text-slate-600">BigCommerce ID: {product.bigCommerceId}</p>
                        </div>
                        <span className="text-2xl font-bold text-orange-500">£{product.price.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Brand: {product.brand}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          Category: {product.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
