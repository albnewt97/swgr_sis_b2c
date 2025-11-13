async function parseProductData() {
  try {
    console.log("Fetching product data from CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIS%20Website%20Product%20Data-LaOhw4iPcpARNYiQyo9fDMIHEfYoFb.csv",
    )
    const csvText = await response.text()

    console.log("CSV fetched successfully. Parsing data...\n")

    // Parse CSV - handle quoted fields properly
    const lines = csvText.split("\n")
    const headers = parseCSVLine(lines[0])

    console.log("Headers:", headers)
    console.log("Total rows:", lines.length - 1)
    console.log("\n" + "=".repeat(80) + "\n")

    // Parse first 10 rows to understand structure
    const sampleProducts = []
    for (let i = 1; i <= Math.min(10, lines.length - 1); i++) {
      if (!lines[i].trim()) continue

      const values = parseCSVLine(lines[i])
      const product = {}
      headers.forEach((header, index) => {
        product[header] = values[index] || ""
      })
      sampleProducts.push(product)
    }

    console.log("SAMPLE PRODUCTS (First 10):")
    console.log(JSON.stringify(sampleProducts, null, 2))
    console.log("\n" + "=".repeat(80) + "\n")

    // Parse all products
    const allProducts = []
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = parseCSVLine(lines[i])
      const product = {}
      headers.forEach((header, index) => {
        product[header] = values[index] || ""
      })
      allProducts.push(product)
    }

    console.log(`Total products parsed: ${allProducts.length}\n`)

    // Analyze categories
    const categoryFields = ["Category", "category", "Categories", "categories", "Type", "type"]
    let categoryField = null
    for (const field of categoryFields) {
      if (headers.includes(field)) {
        categoryField = field
        break
      }
    }

    if (categoryField) {
      const categories = new Set(allProducts.map((p) => p[categoryField]).filter(Boolean))
      console.log(`\nUnique Categories (${categories.size}):`)
      Array.from(categories)
        .sort()
        .forEach((cat) => console.log(`  - ${cat}`))
    }

    // Analyze brands
    const brandFields = ["Brand", "brand", "Manufacturer", "manufacturer", "Supplier", "supplier"]
    let brandField = null
    for (const field of brandFields) {
      if (headers.includes(field)) {
        brandField = field
        break
      }
    }

    if (brandField) {
      const brands = new Set(allProducts.map((p) => p[brandField]).filter(Boolean))
      console.log(`\nUnique Brands (${brands.size}):`)
      Array.from(brands)
        .sort()
        .forEach((brand) => console.log(`  - ${brand}`))
    }

    // Analyze price fields
    const priceFields = ["Price", "price", "Cost", "cost", "RRP", "rrp"]
    let priceField = null
    for (const field of priceFields) {
      if (headers.includes(field)) {
        priceField = field
        break
      }
    }

    if (priceField) {
      const prices = allProducts
        .map((p) => Number.parseFloat(p[priceField]?.replace(/[£$,]/g, "") || "0"))
        .filter((p) => p > 0)

      if (prices.length > 0) {
        console.log(`\nPrice Range:`)
        console.log(`  Min: £${Math.min(...prices).toFixed(2)}`)
        console.log(`  Max: £${Math.max(...prices).toFixed(2)}`)
        console.log(`  Average: £${(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)}`)
      }
    }

    console.log("\n" + "=".repeat(80))
    console.log("\nANALYSIS COMPLETE!")
    console.log("\nPlease review the sample products and field names above.")
    console.log("I'll use this information to populate the product database.")

    return allProducts
  } catch (error) {
    console.error("Error parsing product data:", error)
    throw error
  }
}

// Helper function to parse CSV line with quoted fields
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

parseProductData()
