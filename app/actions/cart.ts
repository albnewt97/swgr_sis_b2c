"use server"

import { cookies } from "next/headers"
import { bigCommerce } from "@/lib/bigcommerce/client"

const CART_COOKIE_NAME = "sis_cart_id"

interface CartItem {
  id: string
  productId: number
  variantId: number
  quantity: number
  name: string
  image: string
  price: number
  url: string
}

interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  total: number
  checkoutUrl: string
}

/**
 * Transform BigCommerce cart to our Cart type
 */
function transformCart(bcCart: any): Cart {
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
        price: item.sale_price || item.list_price,
        url: item.url,
      })) || [],
    subtotal: bcCart.cart_amount || 0,
    total: bcCart.cart_amount || 0,
    checkoutUrl: bcCart.redirect_urls?.checkout_url || "",
  }
}

/**
 * Get the cart ID from cookies
 */
async function getCartId(): Promise<string | null> {


  const cookieStore = await cookies()

  console.log('cart id : ', cookieStore.get(CART_COOKIE_NAME)?.value);


  return cookieStore.get(CART_COOKIE_NAME)?.value || null

}

/**
 * Set the cart ID in cookies
 */
async function setCartId(cartId: string) {
  const cookieStore = await cookies()
  cookieStore.set(CART_COOKIE_NAME, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
 
}



/**
 * Add item to cart (Server Action)
 */
export async function addToCartAction(productId: number, variantId?: number, quantity = 1) {


  try {

    // console.log("here ids is:=="+productId+"and"+variantId+"and"+quantity )
    const cartId = await getCartId()



    // const cartId = process.env.CART_ID;
    console.log('now find cart id : ', cartId);

    
    
    if (cartId) {

      // Add to existing cart
      const response = await bigCommerce.rest<{ data: any }>(`/api/storefront/carts/${cartId}/items`, {
        method: "POST",
        body: {
          line_items: [
            {
              product_id: productId,
              variant_id: variantId,
              quantity,
            },
          ],
        },
      })

      return { success: true, cart: transformCart(response.data) }

    } else {
      
      // Create new cart
      const response = await bigCommerce.rest<{ data: any }>("/api/storefront/carts", {
        method: "POST",
        body: {
          line_items: [
            {
              product_id: productId,
              variant_id: variantId,
              quantity,
            },
          ],
        },
      })

      await setCartId(response.id);
      
      return { success: true, cart: transformCart(response) }
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add item to cart",
    }
  }
}




/**
 * Get cart (Server Action)
 */
export async function getCartAction() {
  try {

    const cartId = await getCartId()

    if (!cartId) {
      return { success: true, cart: null }
    }


    console.log('cart result from getCartAction : ', cartId);

    const response = await bigCommerce.rest<{ data: any }>(`/api/storefront/carts/${cartId}`)

    console.log( " res from getCartAction 2 : ", response);

    return { success: true, cart: transformCart(response.data) }

  } catch (error) {
    console.error("Error fetching cart:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch cart",
    }
  }
}

/**
 * Update cart item quantity (Server Action)
 */
export async function updateCartItemAction(itemId: string, quantity: number) {
  try {
    const cartId = await getCartId()

    if (!cartId) {
      return { success: false, error: "No cart found" }
    }

    const response = await bigCommerce.rest<{ data: any }>(`/api/storefront/carts/${cartId}/items/${itemId}`, {
      method: "PUT",
      body: {
        line_item: {
          quantity,
        },
      },
    })

    return { success: true, cart: transformCart(response.data) }
  } catch (error) {
    console.error("Error updating cart item:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update cart item",
    }
  }
}

/**
 * Remove item from cart (Server Action)
 */
export async function removeFromCartAction(itemId: string) {
  try {
    const cartId = await getCartId()

    if (!cartId) {
      return { success: false, error: "No cart found" }
    }

    const response = await bigCommerce.rest<{ data: any }>(`/api/storefront/carts/${cartId}/items/${itemId}`, {
      method: "DELETE",
    })

    return { success: true, cart: transformCart(response.data) }
  } catch (error) {
    console.error("Error removing from cart:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to remove item from cart",
    }
  }
}

/**
 * Get checkout URL (Server Action)
 */
export async function getCheckoutUrlAction() {
  try {
    const cartId = await getCartId()

    if (!cartId) {
      return { success: false, error: "No cart found" }
    }

    const response = await bigCommerce.rest<{ data: any }>(`/api/storefront/carts/${cartId}`)

    return {
      success: true,
      checkoutUrl: response.data.redirect_urls?.checkout_url || "",
    }
  } catch (error) {
    console.error("Error getting checkout URL:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get checkout URL",
    }
  }
}
