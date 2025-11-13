import { bigCommerceConfig } from "./config"

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  cache?: RequestCache
}

/**
 * BigCommerce Storefront API Client
 * Uses GraphQL for optimal performance
 */
export class BigCommerceClient {

  private graphqlUrl: string
  private apiUrl: string
  private token: string

  constructor() {
    this.graphqlUrl = bigCommerceConfig.graphqlUrl
    this.apiUrl = bigCommerceConfig.apiUrl
    this.token = bigCommerceConfig.storefrontToken
  }


  
  async graphql<T>(query: string, variables?: Record<string, any>): Promise<T> {


    console.log("Graphqlurl : ", this.graphql);
    console.log("apiUrl : ", this.apiUrl);
    console.log("token : ", this.token);


    try {
      const response = await fetch(this.graphqlUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 }, // Cache for 60 seconds
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("BigCommerce API error response:", errorText)
        throw new Error(`BigCommerce API error: ${response.status} ${response.statusText}`)
      }

      const json = await response.json()

      if (json.errors) {
        console.error("GraphQL errors:", json.errors)
        throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`)
      }

      return json.data as T

    } catch (error) {
      console.error("BigCommerce GraphQL error:", error)
      throw error
    }
  }

  /**
   * REST API methods for cart operations
   */

  async rest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: options.cache || "no-store",
      })




      if (!response.ok) {
        const errorText = await response.text()
        console.error("BigCommerce REST API error:", errorText)
        throw new Error(`BigCommerce REST API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("BigCommerce REST API error:", error)
      throw error
    }
  }
}

export const bigCommerce = new BigCommerceClient()
