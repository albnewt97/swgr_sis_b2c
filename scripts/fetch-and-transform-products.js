async function fetchAndTransformProducts() {
  try {
    console.log("Fetching product data from CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIS%20Website%20Product%20Data-LaOhw4iPcpARNYiQyo9fDMIHEfYoFb.csv",
    )
    const csvText = await response.text()

    console.log("CSV fetched successfully. Parsing data...\n")

    // Parse CSV
    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = parseCSVLine(lines[0])

    console.log("Headers found:", headers.join(", "))
    console.log(`Total rows: ${lines.length - 1}\n`)

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

    console.log(`Successfully parsed ${products.length} products\n`)

    // Show first 3 products to understand structure
    console.log("SAMPLE PRODUCTS:")
    console.log(JSON.stringify(products.slice(0, 3), null, 2))
    console.log("\n" + "=".repeat(80) + "\n")

    // Transform to our format
    const transformedProducts = products.map((p, index) => {
      // Try to find common field names
      const sku = p.SKU || p.sku || p["Product Code"] || p["Item Code"] || `SIS-${String(index + 1).padStart(5, "0")}`
      const name = p.Name || p.name || p.Title || p.title || p.Description || p.description || "Unnamed Product"
      const brand = p.Brand || p.brand || p.Manufacturer || p.manufacturer || "SIS"
      const category = p.Category || p.category || p.Type || p.type || "General"
      const priceStr =
        p.Price || p.price || p.Cost || p.cost || p.RRP || p.rrp || p["Unit Price"] || p["unit price"] || "0"
      const price = Number.parseFloat(priceStr.replace(/[£$,]/g, "")) || 0
      const description =
        p.Description || p.description || p.Details || p.details || p["Long Description"] || name || ""
      const stock = Number.parseInt(p.Stock || p.stock || p.Quantity || p.quantity || "100") || 100

      return {
        id: String(index + 1),
        name,
        sku,
        brand,
        category,
        price,
        description,
        stock,
      }
    })

    // Get unique categories and brands
    const categories = [...new Set(transformedProducts.map((p) => p.category))].sort()
    const brands = [...new Set(transformedProducts.map((p) => p.brand))].sort()

    console.log(`Unique Categories (${categories.length}):`)
    categories.forEach((cat) => console.log(`  - ${cat}`))

    console.log(`\nUnique Brands (${brands.length}):`)
    brands.forEach((brand) => console.log(`  - ${brand}`))

    console.log("\n" + "=".repeat(80))
    console.log("\nTRANSFORMED DATA SAMPLE (First 3 products):")
    console.log(JSON.stringify(transformedProducts.slice(0, 3), null, 2))

    const prices = transformedProducts.map((p) => p.price).filter((p) => p > 0)
    if (prices.length > 0) {
      console.log(`\nPrice Range:`)
      console.log(`  Min: £${Math.min(...prices).toFixed(2)}`)
      console.log(`  Max: £${Math.max(...prices).toFixed(2)}`)
      console.log(`  Average: £${(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)}`)
    }

    console.log("\n✅ Data transformation complete!")
    console.log(`\nReady to import ${transformedProducts.length} products into the system.`)

    return transformedProducts
  } catch (error) {
    console.error("Error:", error.message)
    throw error
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

fetchAndTransformProducts()
