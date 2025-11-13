async function generateProductsCode() {
  try {
    console.log("Fetching CSV data...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SIS%20Website%20Product%20Data-LaOhw4iPcpARNYiQyo9fDMIHEfYoFb.csv",
    )
    const csvText = await response.text()

    const lines = csvText.split("\n").filter((line) => line.trim())
    const headers = parseCSVLine(lines[0])

    console.log("CSV Headers:", headers)
    console.log("\n" + "=".repeat(80) + "\n")

    // Parse products
    const products = []
    for (let i = 1; i < Math.min(lines.length, 51); i++) {
      // Get first 50 products
      const values = parseCSVLine(lines[i])
      const product = {}
      headers.forEach((header, index) => {
        product[header] = values[index] || ""
      })
      products.push(product)
    }

    console.log(`Parsed ${products.length} sample products`)
    console.log("\nFirst product fields:")
    console.log(JSON.stringify(products[0], null, 2))
    console.log("\n" + "=".repeat(80) + "\n")

    // Generate TypeScript code
    console.log("// Generated Products Data")
    console.log("// Copy this into data/products.ts")
    console.log("\nimport type { Product } from '@/lib/products'\n")
    console.log("export const products: Product[] = [")

    products.forEach((p, index) => {
      // Try to intelligently map fields
      const sku =
        findField(p, ["SKU", "Code", "Item Code", "Product Code"]) || `SIS-${String(index + 1).padStart(5, "0")}`
      const name = findField(p, ["Name", "Title", "Product Name", "Description"]) || "Product"
      const brand = findField(p, ["Brand", "Manufacturer", "Supplier"]) || "SIS"
      const category = findField(p, ["Category", "Type", "Group"]) || "General"
      const priceStr = findField(p, ["Price", "Cost", "RRP", "Unit Price"]) || "0"
      const price = Number.parseFloat(priceStr.replace(/[£$,]/g, "")) || 0
      const desc = findField(p, ["Description", "Details", "Long Description"]) || name

      console.log(`  {`)
      console.log(`    id: '${index + 1}',`)
      console.log(`    name: ${JSON.stringify(name)},`)
      console.log(`    sku: ${JSON.stringify(sku)},`)
      console.log(`    brand: ${JSON.stringify(brand)},`)
      console.log(`    category: ${JSON.stringify(category)},`)
      console.log(`    price: ${price.toFixed(2)},`)
      console.log(`    description: ${JSON.stringify(desc)},`)
      console.log(`    stock: 100,`)
      console.log(`  },`)
    })

    console.log("]")

    console.log("\n" + "=".repeat(80))
    console.log("\n✅ TypeScript code generated!")
    console.log("Copy the output above into data/products.ts")
  } catch (error) {
    console.error("Error:", error.message)
  }
}

function findField(obj, possibleNames) {
  for (const name of possibleNames) {
    if (obj[name]) return obj[name]
    // Try lowercase
    const lowerName = name.toLowerCase()
    for (const key in obj) {
      if (key.toLowerCase() === lowerName) return obj[key]
    }
  }
  return null
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

generateProductsCode()
