"use client"

import { create } from "zustand"
import {
  addToCartAction,
  getCartAction,
  updateCartItemAction,
  removeFromCartAction,
  getCheckoutUrlAction,
} from "@/app/actions/cart"

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

interface CartState {
  cart: Cart | null
  isLoading: boolean
  error: string | null

  // Actions
  addItem: (productId: number, variantId?: number, quantity?: number) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  fetchCart: () => Promise<void>
  goToCheckout: () => Promise<void>
}

export const useCart = create<CartState>((set, get) => ({

  cart: null,
  isLoading: false,
  error: null,

  addItem: async (productId: number, variantId?: number, quantity = 1) => {
    // console.log("cart id is:=="+ productId);
    set({ isLoading: true, error: null })

    try {
      const result = await addToCartAction(productId, variantId, quantity)

      if (result.success && result.cart) {
        set({ cart: result.cart, isLoading: false })
      } else {
        set({
          error: result.error || "Failed to add item to cart",
          isLoading: false,
        })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add item to cart",
        isLoading: false,
      })
    }
  },

  updateItem: async (itemId: string, quantity: number) => {
    set({ isLoading: true, error: null })

    try {
      const result = await updateCartItemAction(itemId, quantity)

      if (result.success && result.cart) {
        set({ cart: result.cart, isLoading: false })
      } else {
        set({
          error: result.error || "Failed to update cart item",
          isLoading: false,
        })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update cart item",
        isLoading: false,
      })
    }
  },

  removeItem: async (itemId: string) => {
    set({ isLoading: true, error: null })

    try {
      const result = await removeFromCartAction(itemId)

      if (result.success && result.cart) {
        set({ cart: result.cart, isLoading: false })
      } else {
        set({
          error: result.error || "Failed to remove cart item",
          isLoading: false,
        })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to remove cart item",
        isLoading: false,
      })
    }
  },

  fetchCart: async () => {
    set({ isLoading: true, error: null })

    try {
      const result = await getCartAction()
      // console.log("show carts:==" +result); 

      if (result.success) {

        set({ cart: result.cart, isLoading: false })
      } else {
        set({
          error: result.error || "Failed to fetch cart",
          isLoading: false,
        })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch cart",
        isLoading: false,
      })
    }
  },

  goToCheckout: async () => {
    try {
      const result = await getCheckoutUrlAction()

      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl
      } else {
        set({ error: result.error || "Failed to get checkout URL" })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to get checkout URL",
      })
    }
  },
}))








// "use client"

// import { create } from "zustand"
// import {
//   addToCartAction,
//   getCartAction,
//   updateCartItemAction,
//   removeFromCartAction,
//   getCheckoutUrlAction,
// } from "@/app/actions/cart"

// export const useCart = create((set, get) => ({
//   cart: null,
//   isLoading: false,
//   error: null,

//   addItem: async (productId, variantId, quantity = 1) => {
//     set({ isLoading: true, error: null })
//     try {
//       const storedCartId = localStorage.getItem("cart_id")
//       console.log("🧾 Stored cart ID before add:", storedCartId)

//       const result = await addToCartAction(productId, variantId, quantity, storedCartId || undefined)
//       console.log("🧾 addToCartAction result:", result)

//       if (result.success && result.cart) {
//         localStorage.setItem("cart_id", result.cart.id)
//         set({ cart: result.cart, isLoading: false })
//       } else {
//         set({ error: result.error || "Failed to add item", isLoading: false })
//       }
//     } catch (err) {
//       console.error("❌ addItem error:", err)
//       set({ error: err.message, isLoading: false })
//     }
//   },

//   fetchCart: async () => {
//     set({ isLoading: true })
//     const cartId = localStorage.getItem("cart_id")
//     console.log("🔄 Fetching cart using ID:", cartId)

//     if (!cartId) return set({ cart: null, isLoading: false })

//     try {
//       const result = await getCartAction(cartId)
//       console.log("🧾 getCartAction result:", result)
//       if (result.success && result.cart) set({ cart: result.cart, isLoading: false })
//       else set({ cart: null, isLoading: false })
//     } catch (err) {
//       console.error("❌ fetchCart error:", err)
//       set({ cart: null, isLoading: false })
//     }
//   },

//   updateItem: async (itemId, quantity) => {
//     const cartId = localStorage.getItem("cart_id")
//     console.log("✏️ Updating cart:", cartId, "item:", itemId, "quantity:", quantity)
//     if (!cartId) return

//     const result = await updateCartItemAction(cartId, itemId, quantity)
//     console.log("🧾 updateCartItemAction result:", result)
//     if (result.success) set({ cart: result.cart })
//   },

//   removeItem: async (itemId) => {
//     const cartId = localStorage.getItem("cart_id")
//     console.log("🗑️ Removing item:", itemId, "from cart:", cartId)
//     if (!cartId) return

//     const result = await removeFromCartAction(cartId, itemId)
//     console.log("🧾 removeFromCartAction result:", result)
//     if (result.success) set({ cart: result.cart })
//   },

//   goToCheckout: async () => {
//     console.log("🚀 Checkout starting...")
//     const result = await getCheckoutUrlAction()
//     if (result.success && result.checkoutUrl) {
//       window.location.href = result.checkoutUrl
//     }
//   },
// }))






//  3rd



// "use client"

// import { create } from "zustand"
// import {
//   addToCartAction,
//   getCartAction,
//   updateCartItemAction,
//   removeFromCartAction,
//   getCheckoutUrlAction,
// } from "@/app/actions/cart"

// import type { Cart } from "@/lib/bigcommerce/cart"

// // Define type for our store
// interface CartStore {
//   cart: Cart | null
//   isLoading: boolean
//   error: string | null
//   addItem: (productId: number, variantId: number, quantity?: number) => Promise<void>
//   fetchCart: () => Promise<void>
//   updateItem: (itemId: string, quantity: number) => Promise<void>
//   removeItem: (itemId: string) => Promise<void>
//   goToCheckout: () => Promise<void>
// }

// // Zustand store
// export const useCart = create<CartStore>((set, get) => ({
//   cart: null,
//   isLoading: false,
//   error: null,

//   // Add product to cart
//   addItem: async (productId, variantId, quantity = 1) => {
//     set({ isLoading: true, error: null })
//     try {
      
//       const storedCartId = localStorage.getItem("cart_id")

//       console.log("🧾 Stored cart ID before add:", storedCartId)

//       const result = await addToCartAction(productId, variantId, quantity, storedCartId || undefined)
//       console.log("🧾 addToCartAction result:", result)

//       if (result.success && result.cart) {
//         localStorage.setItem("cart_id", result.cart.id)
//         set({ cart: result.cart, isLoading: false })
//       } else {
//         set({ error: result.error || "Failed to add item", isLoading: false })
//       }
//     } catch (err: any) {
//       console.error("❌ addItem error:", err)
//       set({ error: err.message, isLoading: false })
//     }
//   },

//   // Fetch cart
//   fetchCart: async () => {

//     set({ isLoading: true })

//     const cartId = localStorage.getItem("cart_id")

//     console.log("🔄 Fetching cart using ID:", cartId)

//     if (!cartId) {
//       set({ cart: null, isLoading: false })
//       return
//     }

//     try {
//       const result = await getCartAction(cartId)
//       console.log("🧾 getCartAction result:", result)
//       if (result.success && result.cart) set({ cart: result.cart, isLoading: false })
//       else set({ cart: null, isLoading: false })
//     } catch (err) {
//       console.error("❌ fetchCart error:", err)
//       set({ cart: null, isLoading: false })
//     }
//   },

//   // Update item
//   updateItem: async (itemId, quantity) => {
//     const cartId = localStorage.getItem("cart_id")
//     console.log("✏️ Updating cart:", cartId, "item:", itemId, "quantity:", quantity)
//     if (!cartId) return

//     const result = await updateCartItemAction(cartId, itemId, quantity)
//     console.log("🧾 updateCartItemAction result:", result)
//     if (result.success) set({ cart: result.cart })
//   },

//   // Remove item
//   removeItem: async (itemId) => {
//     const cartId = localStorage.getItem("cart_id")
//     console.log("🗑️ Removing item:", itemId, "from cart:", cartId)
//     if (!cartId) return

//     const result = await removeFromCartAction(cartId, itemId)
//     console.log("🧾 removeFromCartAction result:", result)
//     if (result.success) set({ cart: result.cart })
//   },

//   // Checkout
//   goToCheckout: async () => {
//     console.log("🚀 Checkout starting...")
//     const result = await getCheckoutUrlAction()
//     if (result.success && result.checkoutUrl) {
//       window.location.href = result.checkoutUrl
//     }
//   },
// }))
