"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { Product } from "@/lib/products"
import { getBrandLogo, formatPrice } from "@/lib/products"

interface ProductsListClientProps {
  products: Product[]
}

export function ProductsListClient({ products }: ProductsListClientProps) {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("name-asc")
  const [showFilters, setShowFilters] = useState(false)

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const brandParam = searchParams.get("brand")
    const searchParam = searchParams.get("search")

    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
    if (brandParam) {
      setSelectedBrands([brandParam])
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort()
  }, [products])

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand))
    }

    // Sorting
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  }, [products, searchQuery, selectedCategories, selectedBrands, sortBy])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSearchQuery("")
  }

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        </div>

        <Button
          variant="outline"
          className="md:hidden rounded-xl bg-transparent"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {selectedCategories.length + selectedBrands.length > 0 && (
            <Badge className="ml-2 bg-orange-500">{selectedCategories.length + selectedBrands.length}</Badge>
          )}
        </Button>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low-High)</SelectItem>
            <SelectItem value="price-desc">Price (High-Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-slate-700">Active filters:</span>
          {selectedCategories.map((cat) => (
            <Badge key={cat} variant="secondary" className="gap-1">
              {cat}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleCategory(cat)} />
            </Badge>
          ))}
          {selectedBrands.map((brand) => (
            <Badge key={brand} variant="secondary" className="gap-1">
              {brand}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleBrand(brand)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-orange-500 hover:text-orange-600">
            Clear all
          </Button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`md:w-64 ${showFilters ? "block" : "hidden md:block"}`}>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                {selectedCategories.length + selectedBrands.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-orange-500 hover:text-orange-600 text-xs"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-sm text-slate-700">Categories</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-semibold mb-3 text-sm text-slate-700">Brands</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
                      <span className="text-sm">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-slate-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg mb-4">No products found</p>
              <Button onClick={clearFilters} variant="outline">
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      {/* Product Image or Brand Logo */}
                      <div className="aspect-square mb-4 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="p-8">
                            {getBrandLogo(product.brand) ? (
                              <img
                                src={getBrandLogo(product.brand) || "/placeholder.svg"}
                                alt={product.brand}
                                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <span className="text-4xl font-bold">{product.brand[0]}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.brand}
                        </Badge>
                        <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-1">SKU: {product.sku}</p>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-2xl font-bold text-orange-500">{formatPrice(product.price)}</span>
                          {product.stock > 0 ? (
                            <Badge className="bg-green-100 text-green-700">In Stock</Badge>
                          ) : (
                            <Badge variant="destructive">Out of Stock</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
