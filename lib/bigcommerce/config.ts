// BigCommerce API Configuration (Server-side only)
// These should NEVER be prefixed with NEXT_PUBLIC_

export const bigCommerceConfig = {
  storeHash: process.env.BC_STORE_HASH || "xrcsa1wme9",
  storefrontToken: process.env.BC_STOREFRONT_TOKEN || "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOltdLCJjb3JzIjpbXSwiZWF0IjoyMTQ3NDgzNjQ3LCJpYXQiOjE3NjE5MDA0NzEsImlzcyI6IkJDIiwic2lkIjoxMDAzNDIwODAzLCJzdWIiOiJzMXE0aW83bWFoMmxtMWk2dXdwOXlsMWVpdDgwbjNiIiwic3ViX3R5cGUiOjIsInRva2VuX3R5cGUiOjF9.GhCixpFcMe5iXOhhBnmYQrBGvhQCMCrp0IhbgX7f20Z8HfX39z_DPXY67SXCiFqNQF27x8MvV2B8BchjfYEKBQ",
  apiUrl: process.env.BC_API_URL || "https://sisb2c.mybigcommerce.com",
  graphqlUrl: process.env.BC_GRAPHQL_URL || "https://store-xrcsa1wme9.mybigcommerce.com/graphql",
  checkoutUrl: process.env.BC_CHECKOUT_URL || "https://sisb2c.mybigcommerce.com",
  channelId: process.env.BC_CHANNEL_ID || "1",
}

// Public configuration that's safe for the client
export const publicConfig = {
  checkoutUrl: process.env.NEXT_PUBLIC_BC_CHECKOUT_URL || "https://sisb2c.mybigcommerce.com",
  storeUrl: process.env.NEXT_PUBLIC_BC_STORE_URL || "https://sisb2c.mybigcommerce.com",
}

// Validate configuration (server-side only)
export function validateBigCommerceConfig() {
  const required = ["storeHash", "storefrontToken", "checkoutUrl"]
  const missing = required.filter((key) => !bigCommerceConfig[key as keyof typeof bigCommerceConfig])

  if (missing.length > 0) {
    console.warn(`Missing BigCommerce configuration: ${missing.join(", ")}`)
    return false
  }

  return true
}
