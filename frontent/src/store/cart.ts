import { create } from "zustand"
import { persist } from "zustand/middleware";
import { Producto } from "../interfaces";

interface State {
 cart: Producto[]
 totalPrice: number
}

interface Actions {
 addToCart: (Item: Producto) => void
 removeFromCart: (Item: Producto) => void
}

const State = {
 cart: [],
 totalPrice: 0,
}

export const useCartStore = create(persist<State & Actions>((set, get) => ({
 cart: State.cart,
 totalPrice: State.totalPrice,

 addToCart: (product: Producto) => {
  const cart = get().cart
  const cartItem = cart.find(item => item.id === product.id)

  if (cartItem) {
   const updatedCart = cart.map(item =>
    item.id === product.id ? { ...item, quantity: (item.quantity as number) + 1 } : item
   )
   set(state => ({
    cart: updatedCart,
    totalPrice: state.totalPrice + Number(product.price),
   }))
  } else {
   const updatedCart = [...cart, { ...product, quantity: 1 }]

   set(state => ({
    cart: updatedCart,
    totalPrice: state.totalPrice + Number(product.price),
   }))
  }
 },

 removeFromCart: (product: Producto) => {
  const cart = get().cart
  const cartItem = cart.find(item => item.id === product.id)

  if (cartItem && cartItem.quantity && cartItem.quantity > 1) {
   const updatedCart = cart.map(item =>
    item.id === product.id ? { ...item, quantity: (item.quantity as number) - 1 } : item
   )
   set(state => ({
    cart: updatedCart,
    totalPrice: state.totalPrice - Number(product.price),
   }))
  } else {
    set(state => ({
        cart: state.cart.filter(item => item.id !== product.id),
        totalPrice: state.totalPrice - Number(product.price),
    }))
  }
 },
}),

{
      name: "cart-storage",
}

))