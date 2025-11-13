// import { bigCommerce } from "./client"
// import { bigCommerceConfig } from "./config"

// export interface CartItem {
//   id: string
//   productId: number
//   variantId: number
//   quantity: number
//   name: string
//   image: string
//   price: number
//   url: string
// }

// export interface Cart {
//   id: string
//   items: CartItem[]
//   subtotal: number
//   total: number
//   checkoutUrl: string
// }

// /**
//  * Create a new cart
//  */
// export async function createCart(
//   lineItems: Array<{
//     productId: number
//     variantId?: number
//     quantity: number
//   }>,
// ): Promise<Cart> {
//   try {
//     const response = await bigCommerce.rest<{
//       data: {
//         id: string
//         line_items: {
//           physical_items: Array<any>
//         }
//         cart_amount: number
//         redirect_urls: {
//           checkout_url: string
//         }
//       }
//     }>("/api/storefront/carts", {
//       method: "POST",
//       body: {
//         channel_id: Number.parseInt(bigCommerceConfig.channelId),
//         line_items: lineItems.map((item) => ({
//           product_id: item.productId,
//           variant_id: item.variantId,
//           quantity: item.quantity,
//         })),
//       },
//     })

//     return transformCart(response.data)
//   } catch (error) {
//     console.error("Error creating cart:", error)
//     throw error
//   }
// }

// /**
//  * Add item to existing cart
//  */
// export async function addToCart(
//   cartId: string,
//   lineItems: Array<{
//     productId: number
//     variantId?: number
//     quantity: number
//   }>,
// ): Promise<Cart> {
//   try {
//     const response = await bigCommerce.rest<{
//       data: any
//     }>(`/api/storefront/carts/${cartId}/items`, {
//       method: "POST",
//       body: {
//         line_items: lineItems.map((item) => ({
//           product_id: item.productId,
//           variant_id: item.variantId,
//           quantity: item.quantity,
//         })),
//       },
//     })

//     return transformCart(response.data)
//   } catch (error) {
//     console.error("Error adding to cart:", error)
//     throw error
//   }
// }

// /**
//  * Get cart by ID
//  */
// export async function getCart(cartId: string): Promise<Cart | null> {
//   try {
//     const response = await bigCommerce.rest<{
//       data: any
//     }>(`/api/storefront/carts/${cartId}`)

//     return transformCart(response.data)
//   } catch (error) {
//     console.error("Error fetching cart:", error)
//     return null
//   }
// }

// /**
//  * Update cart item quantity
//  */
// export async function updateCartItem(cartId: string, itemId: string, quantity: number): Promise<Cart> {
//   try {
//     const response = await bigCommerce.rest<{
//       data: any
//     }>(`/api/storefront/carts/${cartId}/items/${itemId}`, {
//       method: "PUT",
//       body: {
//         line_item: {
//           quantity,
//         },
//       },
//     })

//     return transformCart(response.data)
//   } catch (error) {
//     console.error("Error updating cart item:", error)
//     throw error
//   }
// }

// /**
//  * Remove item from cart
//  */
// export async function removeFromCart(cartId: string, itemId: string): Promise<Cart> {
//   try {
//     const response = await bigCommerce.rest<{
//       data: any
//     }>(`/api/storefront/carts/${cartId}/items/${itemId}`, {
//       method: "DELETE",
//     })

//     return transformCart(response.data)
//   } catch (error) {
//     console.error("Error removing from cart:", error)
//     throw error
//   }
// }

// /**
//  * Transform BigCommerce cart to our Cart type
//  */
// function transformCart(bcCart: any): Cart {
//   return {
//     id: bcCart.id,
//     items:
//       bcCart.line_items?.physical_items?.map((item: any) => ({
//         id: item.id,
//         productId: item.product_id,
//         variantId: item.variant_id,
//         quantity: item.quantity,
//         name: item.name,
//         image: item.image_url,
//         price: item.sale_price || item.list_price,
//         url: item.url,
//       })) || [],
//     subtotal: bcCart.cart_amount || 0,
//     total: bcCart.cart_amount || 0,
//     checkoutUrl: bcCart.redirect_urls?.checkout_url || "",
//   }
// }



"use client"

import { bigCommerce } from "./client"
import { bigCommerceConfig } from "./config"

export interface CartItem {
  id: string
  productId: number
  variantId: number
  quantity: number
  name: string
  image: string
  price: number
  url: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  total: number
  checkoutUrl: string
}

function transformCart(bcCart: any): Cart {
  console.log("🧩 Raw BigCommerce Cart Response:", bcCart)

  return {
    id: bcCart.id,
    items:
      bcCart.line_items?.physical_items?.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        variantId: item.variant_id,
        quantity: item.quantity,
        name: item.name,
        image: item.image_url,
        price: item.sale_price || item.list_price || 0,
        url: item.url,
      })) || [],
    subtotal: bcCart.cart_amount || 0,
    total: bcCart.cart_amount || 0,
    checkoutUrl: bcCart.redirect_urls?.checkout_url || "",
  }
}

export async function createCart(lineItems: any[]): Promise<Cart> {
  try {
    console.log("🛒 Creating new cart with items:", lineItems)

    const response = await bigCommerce.rest<{ data: any }>("/api/storefront/carts", {
      method: "POST",
      body: {
        channel_id: Number.parseInt(bigCommerceConfig.channelId),
        line_items: lineItems.map((item) => ({
          product_id: item.productId,
          variant_id: item.variantId,
          quantity: item.quantity,
        })),
      },
    })

    console.log("✅ Cart Created Response:", response.data)

    return transformCart(response.data)

  } catch (error) {

    console.error("❌ Error creating cart:", error)

    throw error
  }
}

export async function addToCart(cartId: string, lineItems: any[]): Promise<Cart> {

  try {
    console.log("🛍️ Adding to cart ID:", cartId, "with items:", lineItems)

    const response = await bigCommerce.rest<{ data: any }>(
      
      `/api/storefront/carts/${cartId}/items`,
      {
        method: "POST",
        body: {
          line_items: lineItems.map((item) => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
          })),
        },
      },
    )

    console.log("✅ Add to Cart Response:", response.data)
    return transformCart(response.data)
  } catch (error) {
    console.error("❌ Error adding to cart:", error)
    throw error
  }
}


export async function getCart(): Promise<Cart | null> {
  try {
    const cartId =process.env.CART_ID;
    console.log("🔍 Fetching cart by ID:", cartId)
    const response = await bigCommerce.rest<{ data: any }>(
      `/api/storefront/carts/${cartId}`,
    )

    console.log("✅ Cart Fetched Response:", response.data)


    return transformCart(response.data)
  } catch (error) {
    console.error("❌ Error fetching cart:", error)
    return null
  }
}

export async function updateCartItem(
  cartId: string,
  itemId: string,
  quantity: number,
): Promise<Cart> {
  try {
    console.log("✏️ Updating item:", itemId, "to quantity:", quantity, "in cart:", cartId)

    const response = await bigCommerce.rest<{ data: any }>(
      `/api/storefront/carts/${cartId}/items/${itemId}`,
      {
        method: "PUT",
        body: { line_item: { quantity } },
      },
    )

    console.log("✅ Update Cart Item Response:", response.data)
    return transformCart(response.data)
  } catch (error) {
    console.error("❌ Error updating cart item:", error)
    throw error
  }
}

export async function removeFromCart(cartId: string, itemId: string): Promise<Cart> {
  try {
    console.log("🗑️ Removing item:", itemId, "from cart:", cartId)

    const response = await bigCommerce.rest<{ data: any }>(
      `/api/storefront/carts/${cartId}/items/${itemId}`,
      { method: "DELETE" },
    )

    console.log("✅ Remove Cart Item Response:", response.data)
    return transformCart(response.data)
  } catch (error) {
    console.error("❌ Error removing cart item:", error)
    throw error
  }
}

