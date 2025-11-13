import { fetchProducts } from "@/lib/fetch-products"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function TestProductsPage() {
  const products = await fetchProducts()

  const categories = [...new Set(products.map((p) => p.category))].sort()
  const brands = [...new Set(products.map((p) => p.brand))].sort()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Products Test Page</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <strong>Total Products:</strong> {products.length}
            </p>
            <p className="text-lg">
              <strong>Categories:</strong> {categories.length}
            </p>
            <p className="text-lg">
              <strong>Brands:</strong> {brands.length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Categories Found ({categories.length})</h3>
            <ul className="space-y-1 max-h-96 overflow-y-auto">
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat).length
                return (
                  <li key={cat} className="text-sm">
                    {cat} <span className="text-slate-500">({count} products)</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Brands Found ({brands.length})</h3>
            <ul className="space-y-1 max-h-96 overflow-y-auto">
              {brands.map((brand) => {
                const count = products.filter((p) => p.brand === brand).length
                return (
                  <li key={brand} className="text-sm">
                    {brand} <span className="text-slate-500">({count} products)</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Sample Products (First 10)</h3>
          <div className="space-y-4">
            {products.slice(0, 10).map((product) => (
              <div key={product.id} className="border-b border-slate-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg">{product.name}</h4>
                    <p className="text-sm text-slate-600">SKU: {product.sku}</p>
                  </div>
                  <span className="text-2xl font-bold text-orange-500">£{product.price.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">Brand: {product.brand}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">Category: {product.category}</span>
                  {product.subCategory && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">Type: {product.subCategory}</span>
                  )}
                </div>
                {product.description && (
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{product.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
