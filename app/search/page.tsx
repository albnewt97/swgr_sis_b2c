import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsListClient } from "@/components/products-list-client"
import { searchBigCommerceProducts } from "@/lib/bigcommerce/products"
import { validateBigCommerceConfig } from "@/lib/bigcommerce/config"
import { Suspense } from "react"

export const revalidate = 0 // Don't cache search results

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

async function SearchResults({ query }: { query: string }) {
  const isConfigValid = validateBigCommerceConfig()

  if (!isConfigValid) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-red-600 mb-2">Configuration Error</h2>
          <p className="text-slate-600 mb-4">BigCommerce integration is not properly configured.</p>
          <p className="text-sm text-slate-500">Please check your environment variables.</p>
        </div>
      </div>
    )
  }

  let products = []
  let error = null

  try {
    products = await searchBigCommerceProducts(query)
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to search products"
    console.error("Error searching products:", e)
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Searching Products</h2>
          <p className="text-slate-600 mb-4">{error}</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Results Found</h2>
          <p className="text-slate-600 mb-4">We couldn't find any products matching "{query}"</p>
          <p className="text-sm text-slate-500">Try different keywords or browse all products</p>
          <a
            href="/products"
            className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            View All Products
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-slate-600">
          Found <span className="font-semibold text-slate-900">{products.length}</span> results for "{query}"
        </p>
      </div>
      <ProductsListClient products={products} />
    </>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-2">
            Search Results
          </h1>
          {!query && <p className="text-slate-600">Enter a search term to find products</p>}
        </div>

        {query ? (
          <Suspense
            fallback={
              <div className="text-center py-16">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
                <p className="mt-4 text-slate-600">Searching products...</p>
              </div>
            }
          >
            <SearchResults query={query} />
          </Suspense>
        ) : (
          <div className="text-center py-16">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Start Your Search</h2>
              <p className="text-slate-600">Use the search bar above to find products</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
