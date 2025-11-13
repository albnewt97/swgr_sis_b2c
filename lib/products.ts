export interface Product {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  subCategory?: string
  price: number
  description: string
  features?: string[]
  specifications?: Record<string, string>
  stock: number
  image?: string
  brandLogo?: string
  // BigCommerce specific fields
  bigCommerceId?: number
  productUrl?: string
}

// Map brand names to their logo paths
export const brandLogoMap: Record<string, string> = {
  bolle: "/brands/bolle.png",
  bollé: "/brands/bolle.png",
  centurion: "/brands/centurion.jpg",
  "black knight": "/brands/black-knight.png",
  beeswift: "/brands/beeswift.png",
  castle: "/brands/castle.jpg",
  "castle clothing": "/brands/castle.jpg",
  goliath: "/brands/goliath.jpg",
  atg: "/brands/atg.png",
  alpha: "/brands/alpha.jpg",
  "alpha solway": "/brands/alpha.jpg",
  dunlop: "/brands/dunlop.png",
  buckbootz: "/brands/buckbootz.png",
  prestige: "/brands/prestige.jpg",
  msa: "/brands/msa.png",
  leo: "/brands/leo.png",
  pulsar: "/brands/pulsar.png",
  regatta: "/brands/regatta.png",
  lighthouse: "/brands/lighthouse.png",
  portwest: "/brands/portwest.png",
  jsp: "/brands/jsp.jpg",
  hercules: "/brands/hercules.png",
  traffi: "/brands/traffi.jpg",
  uneek: "/brands/uneek.png",
  "gore-tex": "/brands/goretex.png",
  goretex: "/brands/goretex.png",
}

export function getBrandLogo(brandName: string): string | undefined {
  const normalized = brandName.toLowerCase().trim()
  return brandLogoMap[normalized]
}

export function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}
