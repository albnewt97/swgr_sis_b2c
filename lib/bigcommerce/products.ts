import { bigCommerce } from "./client"
import type { Product } from "@/lib/products"

interface BigCommerceProduct {
  entityId: number
  name: string
  sku: string
  path: string
  brand?: {
    name: string
  }
  categories: {
    edges: Array<{
      node: {
        name: string
        path: string
      }
    }>
  }
  prices: {
    price: {
      value: number
      currencyCode: string
    }
    retailPrice?: {
      value: number
    }
  }
  description: string
  plainTextDescription: string
  defaultImage?: {
    url: string
    altText: string
  }
  inventory: {
    isInStock: boolean
  }
  customFields: {
    edges: Array<{
      node: {
        name: string
        value: string
      }
    }>
  }
}

const PRODUCTS_QUERY = `

query Products($first: Int, $after: String) {
  site {
    products(first: $first, after: $after) {

        edges {
          node {
            entityId
            name
            sku
            path
            brand {
              name
            }
            categories {
              edges {
                node {
                  name
                  path
                }
              }
            }
            prices {
              price {
                value
                currencyCode
              }
              retailPrice {
                value
              }
            }
            description
            plainTextDescription
            defaultImage {
              url(width: 800)
              altText
            }
            inventory {
              isInStock
            }
            customFields {
              edges {
                node {
                  name
                  value
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

/**
 * Fetch all products from BigCommerce
 */
export async function fetchBigCommerceProducts(): Promise<Product[]> {
  try {
    const allProducts: Product[] = []
    let hasNextPage = true
    let cursor: string | null = null

    while (hasNextPage) {

      const products = (await bigCommerce.graphql<{
        site: {
          products: {
            edges: Array<{ node: BigCommerceProduct} >
            pageInfo: { hasNextPage: boolean; endCursor: string} 
          }
        }
      }>(PRODUCTS_QUERY, {
        first: 50,
        after: cursor,
      })).site.products.edges.map(({ node }) => transformProduct(node))
      allProducts.push(...products)

      hasNextPage = (await bigCommerce.graphql<{
        site: {
          products: {
            edges: Array<{ node: BigCommerceProduct} >
            pageInfo: { hasNextPage: boolean; endCursor: string} 
          }
        }
      }>(PRODUCTS_QUERY, {
        first: 50,
        after: cursor,
      })).site.products.pageInfo.hasNextPage
      cursor = (await bigCommerce.graphql<{
        site: {
          products: {
            edges: Array<{ node: BigCommerceProduct} >
            pageInfo: { hasNextPage: boolean; endCursor: string} 
          }
        }
      }>(PRODUCTS_QUERY, {
        first: 50,
        after: cursor,
      })).site.products.pageInfo.endCursor
    }

    return allProducts
  } catch (error) {
    console.error("Error fetching BigCommerce products:", error)
    return []
  }
}

/**
 * Fetch a single product by ID
 */



// export async function fetchBigCommerceProduct(id: string): Promise<Product | null> {

//   const PRODUCT_QUERY = `

//   query Products($first: Int, $after: String) {
//     site {
//       products(first: $first, after: $after) {
//         edges {
//           node {
//             entityId
//             name
//             sku
//             path
//             brand {
//               name
//             }
//             categories {
//               edges {
//                 node {
//                   name
//                   path
//                 }
//               }
//             }
//             prices {
//               price {
//                 value
//                 currencyCode
//               }
//               retailPrice {
//                 value
//               }
//             }
//             description
//             plainTextDescription
//             defaultImage {
//               url(width: 800)
//               altText
//             }
//             inventory {
//               isInStock
//             }
//             customFields {
//               edges {
//                 node {
//                   name
//                   value
//                 }
//               }
//             }
//           }
//         }
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//       }
//     }
//   }
// `


//   try {
//     const data = await bigCommerce.graphql<{
//       site: {
//         product: BigCommerceProduct | null
//       }
//     }>(PRODUCT_QUERY, {
//       entityId: Number.parseInt(id),
//     })


//     if (!data.site.product) return null

//     return transformProduct(data.site.product)

//   } catch (error) {
//     console.error("Error fetching BigCommerce product:", error)
//     return null
//   }
// }

/**
 * Transform BigCommerce product to our Product type
 */
// function transformProduct(bcProduct: BigCommerceProduct): Product {
//   const category = bcProduct.categories.edges[0]?.node.name || "General"
//   const customFields: Record<string, string> = {}

//   bcProduct.customFields.edges.forEach(({ node }) => {
//     customFields[node.name] = node.value
//   })

//   return {
//     id: bcProduct.entityId.toString(),
//     name: bcProduct.name,
//     sku: bcProduct.sku,
//     brand: bcProduct.brand?.name || "SIS",
//     category,
//     price: bcProduct.prices.price.value,
//     description: bcProduct.plainTextDescription || bcProduct.description,
//     stock: bcProduct.inventory.isInStock ? 100 : 0,
//     image: bcProduct.defaultImage?.url,
//     specifications: customFields,
//     // Add BigCommerce-specific data
//     bigCommerceId: bcProduct.entityId,
//     productUrl: bcProduct.path,
//   }
// }



/**
 * ✅ Fetch a single product by ID
 */
export async function fetchBigCommerceProduct(
  id: string
): Promise<Product | null> {
  const PRODUCT_QUERY = `
    query ProductById($entityId: Int!) {
      site {
        product(entityId: $entityId) {
          entityId
          name
          sku
          path
          brand {
            name
          }
          categories {
            edges {
              node {
                name
                path
              }
            }
          }
          prices {
            price {
              value
              currencyCode
            }
            retailPrice {
              value
            }
          }
          description
          plainTextDescription
          defaultImage {
            url(width: 800)
            altText
          }
          inventory {
            isInStock
          }
          customFields {
            edges {
              node {
                name
                value
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await bigCommerce.graphql<{
      site: {
        product: BigCommerceProduct | null
      }
    }>(PRODUCT_QUERY, {
      entityId: Number.parseInt(id),
    })

    if (!data.site.product) return null
    return transformProduct(data.site.product)
  } catch (error) {
    console.error("Error fetching BigCommerce product:", error)
    return null
  }
}

/**
 * 🔄 Transform BigCommerce product into your Product type
 */
function transformProduct(bcProduct: BigCommerceProduct): Product {
  const category = bcProduct.categories.edges[0]?.node.name || "General"
  const customFields: Record<string, string> = {}

  bcProduct.customFields.edges.forEach(({ node }) => {
    customFields[node.name] = node.value
  })

  return {
    id: bcProduct.entityId.toString(),
    name: bcProduct.name,
    sku: bcProduct.sku,
    brand: bcProduct.brand?.name || "SIS",
    category,
    price: bcProduct.prices.price.value,
    description: bcProduct.plainTextDescription || bcProduct.description,
    stock: bcProduct.inventory.isInStock ? 100 : 0,
    image: bcProduct.defaultImage?.url,
    specifications: customFields,
    bigCommerceId: bcProduct.entityId,
    productUrl: bcProduct.path,
  }
}




/**
 * Search products in BigCommerce
 */
// export async function searchBigCommerceProducts(query: string): Promise<Product[]> {
//   try {
//     const data = await bigCommerce.graphql<{
//       site: {
//         search: {
//           searchProducts: {
//             products: {
//               edges: Array<{ node: BigCommerceProduct }>
//             }
//           }
//         }
//       }
//     }>(
//       `
//       query Search($query: String!) {
//         site {
//           search {
//             searchProducts(filters: { searchTerm: $query }) {
//               products {
//                 edges {
//                   node {
//                     entityId
//                     name
//                     sku
//                     path
//                     brand {
//                       name
//                     }
//                     categories {
//                       edges {
//                         node {
//                           name
//                           path
//                         }
//                       }
//                     }
//                     prices {
//                       price {
//                         value
//                         currencyCode
//                       }
//                       retailPrice {
//                         value
//                       }
//                     }
//                     description
//                     plainTextDescription
//                     defaultImage {
//                       url(width: 800)
//                       altText
//                     }
//                     inventory {
//                       isInStock
//                     }
//                     customFields {
//                       edges {
//                         node {
//                           name
//                           value
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//       { query },
//     )

//     return data.site.search.searchProducts.products.edges.map(({ node }) => transformProduct(node))
//   } catch (error) {
//     console.error("Error searching BigCommerce products:", error)
//     return []
//   }
// }






