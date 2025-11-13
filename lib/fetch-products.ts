import type { Product } from "@/lib/products"

let cachedProducts: Product[] | null = null

export async function fetchProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIS%20Website%20Product%20Data-LaOhw4iPcpARNYiQyo9fDMIHEfYoFb.csv",
    )
    const csvText = await response.text()

    const lines = csvText.split("\n").filter((line) => line.trim())
    const products: Product[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])

      if (values.length < 15) continue

      const [
        productCode,
        productName,
        sizes,
        cost,
        currentPrice,
        productType,
        productCategory,
        productDescription,
        productImage,
        fabric,
        certifications,
        dataSheet,
        sizeChart,
        grsGuide,
        arcGuide,
        washCareGuide,
        brandingGuide,
        brand,
        brandLogo,
      ] = values

      const costNum = Number.parseFloat(cost?.replace(/[£$,]/g, "") || "0") || 0
      const priceNum = Number.parseFloat(currentPrice?.replace(/[£$,]/g, "") || "0") || 0
      const finalPrice = priceNum > 0 ? priceNum : costNum

      const features = productDescription
        ? productDescription
            .split("\n")
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
            .slice(0, 10)
        : []

      products.push({
        id: String(i),
        name: productName || "Unnamed Product",
        sku: productCode || `SIS-${String(i).padStart(5, "0")}`,
        brand: brand || "SIS",
        category: productCategory || "General",
        subCategory: productType,
        price: finalPrice,
        description: productDescription || "",
        stock: 100,
        image: productImage || undefined,
        features: features.length > 0 ? features : undefined,
        specifications: {
          ...(sizes && { Sizes: sizes }),
          ...(fabric && { Fabric: fabric }),
          ...(certifications && { Certifications: certifications }),
        },
      })
    }

    cachedProducts = products
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}




