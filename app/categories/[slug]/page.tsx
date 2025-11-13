import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsListClient } from "@/components/products-list-client"
import { fetchBigCommerceProducts } from "@/lib/bigcommerce/products"
import { validateBigCommerceConfig } from "@/lib/bigcommerce/config"
import { notFound } from "next/navigation"

export const revalidate = 60

// Define available categories
const CATEGORIES = {
  "safety-equipment": "Safety Equipment",
  ppe: "Personal Protective Equipment",
  "industrial-supplies": "Industrial Supplies",
  tools: "Tools & Equipment",
  workwear: "Workwear",
  "first-aid": "First Aid",
} as const

type CategorySlug = keyof typeof CATEGORIES

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = params
  const categoryName = CATEGORIES[slug as CategorySlug]

  if (!categoryName) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${categoryName} | SIS Safety Industrial Supplies`,
    description: `Browse our ${categoryName.toLowerCase()} collection. High-quality safety equipment and industrial supplies.`,
  }
}

export default  function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const categoryName = CATEGORIES[slug as CategorySlug]

  if (!categoryName) {
    notFound()
  }

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

  let products: any[] = []
  let error: string | null = null

  try {
    const allProducts =  fetchBigCommerceProducts()
    if (Array.isArray(allProducts)) {
      products = allProducts.filter((product) => product.category === categoryName)
    } else {
      error = "Invalid product data received."
    }
  } catch (e) {
    console.error("Error fetching products:", e)
    error = e instanceof Error ? e.message : "Failed to fetch products"
  }




  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <nav className="text-sm text-slate-500 mb-4">
            <a href="/" className="hover:text-orange-500">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-orange-500">
              Products
            </a>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{categoryName}</span>
          </nav>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent mb-2">
            {categoryName}
          </h1>
          <p className="text-slate-600">Explore our complete range of {categoryName.toLowerCase()} products</p>
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
              <p className="text-slate-600 mb-4">No products found in the {categoryName} category yet.</p>
              <a
                href="/products"
                className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                View All Products
              </a>
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
