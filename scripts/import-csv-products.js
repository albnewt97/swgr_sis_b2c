async function importProducts() {
  try {
    console.log("Fetching CSV data...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIS%20Website%20Product%20Data-LaOhw4iPcpARNYiQyo9fDMIHEfYoFb.csv",
    )
    const csvText = await response.text()

    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = parseCSVLine(lines[0])

    console.log(`Found ${lines.length - 1} products in CSV\n`)

    // Parse all products
    const products = []
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      const product = {}
      headers.forEach((header, index) => {
        product[header] = values[index] || ""
      })
      products.push(product)
    }

    console.log("Transforming products...\n")

    // Transform to our format
    const transformed = products.map((p, index) => {
      const cost = Number.parseFloat(p.Cost?.replace(/[£$,]/g, "") || "0") || 0
      const currentPrice = Number.parseFloat(p["Current Price"]?.replace(/[£$,]/g, "") || "0") || 0

      return {
        id: String(index + 1),
        name: p["Product Name"] || "Unnamed Product",
        sku: p["Product Code"] || `SIS-${String(index + 1).padStart(5, "0")}`,
        brand: p.Brand || "SIS",
        category: p["Product Category"] || "General",
        subCategory: p["Product Type"] || undefined,
        price: currentPrice > 0 ? currentPrice : cost,
        originalPrice: currentPrice > cost && cost > 0 ? cost : undefined,
        description: p["Product Description"] || "",
        sizes: p.Sizes || undefined,
        fabric: p.Fabric || undefined,
        certifications: p.Certifications || undefined,
        image: p["Product Image"] || undefined,
        dataSheet: p["Data Sheet"] || undefined,
        stock: 100,
        features: p["Product Description"]
          ? p["Product Description"]
              .split("\n")
              .filter((f) => f.trim())
              .slice(0, 8)
          : [],
      }
    })

    // Get statistics
    const categories = [...new Set(transformed.map((p) => p.category))].sort()
    const brands = [...new Set(transformed.map((p) => p.brand))].sort()

    console.log("=".repeat(80))
    console.log(`\n✅ Successfully imported ${transformed.length} products!\n`)
    console.log(`Categories (${categories.length}):`, categories.join(", "))
    console.log(`\nBrands (${brands.length}):`, brands.join(", "))

    const prices = transformed.map((p) => p.price).filter((p) => p > 0)
    console.log(`\nPrice Range: £${Math.min(...prices).toFixed(2)} - £${Math.max(...prices).toFixed(2)}`)

    console.log("\n" + "=".repeat(80))
    console.log("\nSample product:")
    console.log(JSON.stringify(transformed[0], null, 2))

    return transformed
  } catch (error) {
    console.error("Error:", error.message)
  }
}

function parseCSVLine(line) {
  const result = []
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

importProducts()
