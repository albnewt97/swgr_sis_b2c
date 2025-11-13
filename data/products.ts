import type { Product } from "@/lib/products"
import { fetchProducts } from "@/lib/fetch-products"

export let products: Product[] = []

// Initialize products
fetchProducts().then((p) => {
  products = p
})

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsBySKU(sku: string): Product | undefined {
  return products.find((p) => p.sku === sku)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery),
  )
}

export function getUniqueCategories(): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort()
}

export function getUniqueBrands(): string[] {
  return Array.from(new Set(products.map((p) => p.brand))).sort()
}

export function getPriceRange(): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 }
  const prices = products.map((p) => p.price).filter((p) => p > 0)
  if (prices.length === 0) return { min: 0, max: 0 }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

export async function initializeProducts() {
  if (products.length === 0) {
    products = await fetchProducts()
  }
  return products
}
